
.. _data-driven:

=================
Data-driven tasks
=================

You can perform lifecycle management tasks based on the history
of the cluster states. You can introduce expressions that can be
computed within the context of cluster configuration, so that you can
control how the task assignment and execution depending on the
the changes in the configuration.

The data-driven tasks feature uses `YAQL <https://github.com/openstack/yaql>`_.

To make the most of the data-driven tasks feature, you must familiarize
yourself with the following items:

* Terms: Task, task condition, task condition types, YAQL
* How YAQL works
* YAQL implementation in Fuel
* YAQL condition examples
* Function examples

Terms
~~~~~

Check the following terms in the Fuel glossary:

* :ref:`deployment-task`
* :ref:`task-condition`
* :ref:`yaql-term`

How YAQL works
~~~~~~~~~~~~~~

Fuel has a YAQL evaluator in Nailgun. When you put together an expression in
a task, the YAQL evaluator assesses the expression. If the evaluator returns
a `true` value, Fuel runs the task on a node.

For proper assessment, the YAQL evaluator must have data and a way to access
the data.
 
For data, the YAQL evaluator uses a representation of customized db fields.

For data access, the YAQL evaluator has a rootn represented as ``$``. When you
call ``$``, Fuel returns a full ``astute.yaml`` file. To the access underlayer
fields, use the dot sign -- ``.``. For example, to access Ceilometer hash,
call ``$.ceilometer``.

YAQL implementation in Fuel
~~~~~~~~~~~~~~~~~~~~~~~~~~~

In Fuel, YAQL uses additional evaluation functions to target expressions.

When you have a deployed cluster, change options and click the
:guilabel:`redeploy` button, you have the current :ref:`yaql-context` for
the node task equal to the future ``astute.yaml`` file of the node.

In this case, your previous context is equal to the context you had on
the **last successful deploy**.

Example:

#. You deploy a cluster. A node of this cluster has the ``/etc/astute.yaml``
file, which is a serialized representation of the context.

#. You name the context ``context_one``.

#. You change some data and attempt to redeploy this cluster.

#. The redeployment fails. At this stage you have a new context for
redeployment that you name ``context_two``.

#. You attempt to redeploy again.

#. This new redepoyment attempt creates a new context -- ``context_three``.
   ``context_three`` is now the current context. To reach the old context and
   call ``old($)``, ``context_one`` returns to us, because it was last
   successful one. You cannot reach the context you have on the failed deploy.

The YAQL evaluator in Fuel uses the following functions:

* ``old()`` -- Returns data from old context.
* ``new()`` -- Returns data from the current context.
* ``changed()`` -- Evaluates the difference between the data of the old and
  new contexts and returns true if the data changed.
* ``changedAny()`` -- Equal to ``changed($.<a>)`` or ``changed($.<b>)``, and
  so on.
* ``added()`` -- Returns the difference between the new and old context for
  the added data.
* ``deleted()`` -- Returns the difference between the new and old context for
  the deleted data.

YAQL condition examples
~~~~~~~~~~~~~~~~~~~~~~~

An Apache example:

.. code-block:: ini

    - id: apache
    <... omitted …>
      condition:
        yaql_exp: "$.uid in added($.nodes.uid)"
    <... omitted …>

The ``condition`` field in the example is a nested dict. The key of the
nested dict is always a `yaql_exp`. The value is the condition itself.

The example does the following:

#. ``added($.nodes.uid)`` -- Get an array of UIDs for the nodes hash from the
   the ``astute.yaml`` file, but get it from the difference of the new and old
   contexts. The ``astute.yaml`` file at this stage is not yet serialized.

#. ``$.uid`` -- Get an UID from the ``astute.yaml`` file that is not yet
   serialized.

#. ``in`` -- Check if the UID in the array.

An Ironic example:

.. code-block:: ini

    - id: ironic-keystone
      <... omitted …>
        yaql_exp: >
          $.ironic.enabled and changedAny($.ironic, $.network_metadata.vips,
          $.public_ssl, $.get('region', 'RegionOne'))
      <... omitted …>

The example does the following:

#. ``$.ironic.enabled`` -- Get the value of the ``enabled`` field from the
   ``ironic`` hash of ``astute.yaml``.

#. ``changedAny(...)`` -- For each ``$.<expression>`` in this function, Fuel
   calls ``changed($.<expression>)``. If any of these returns true, the
   function returns true.

#. ``$.ironic``, ``$.network_metadata.vips``, ``$.public_ssl`` -- Get the
   respective hashes from ``astute.yaml``.

#. ``$.get('region', 'RegionOne')`` -- Get the ‘region’ hash, but put the
   default value if it does not exist.

#. ``and`` -- The unary operator ``and``.

Function examples
~~~~~~~~~~~~~~~~~

**old()**

Fuel has the ability to enable TLS for OpenStack endpoints. With the
self-signed certificates for the endpoints, Fuel generates all data
first on the Fuel master node and then copies the data to the
cluster nodes.

When you add a new node tp the cluster after the deployment and
redeploy the cluster, Fuel spawns for all cluster nodes the task that
copies the HAProxy keys. You do not need to run the task on the previously
deployed nodes since they already have a keypair -- copying the keypair agin
wasted the processor time. You only need to copy the TLS data to the new node.
This is where you must use the ``old()`` function.

Example:

.. code-block:: ini

    - id: copy_haproxy_keys
      type: copy_files
      version: 2.1.0
      role: ['/.*/']
      condition:
        yaql_exp: >
          (((changedAny($.public_ssl.horizon, $.public_ssl.services)) and
              ($.public_ssl.horizon or $.public_ssl.services) and
              (not (old($.public_ssl.horizon) or old($.public_ssl.services)))) or
            (($.public_ssl.horizon or $.public_ssl.services) and
              ($.uid in added($.network_metadata.nodes.values()).uid))) and
          $.public_ssl.cert_source = 'self_signed'

The ``copy_haproxy_keys`` task must run on all the nodes to make sure it is
enabled.

Add the following:

.. code-block:: ini

    changedAny($.public_ssl.horizon, $.public_ssl.services))

This code block translates to "When ``$.public_ssl.horizon`` or
``$.public_ssl.services`` values changed".

The ``($.public_ssl.horizon or $.public_ssl.services)`` block translates to
"and when any of it have value true".

You may have a case when you enable both Horizon and the services at the first
deploy and then you disable Horizon TLS after adding a new node. In this case,
you have true as a return of this statement and Fuel runs the task on the old
nodes. To avoid this, add a new condition:

.. code-block:: ini

    and (not (old($.public_ssl.horizon) or old($.public_ssl.services)))

This code block translates to "and if any of this options was disabled at
previous deployment". This block runs the task only when necessary.

**new()**

The ``new()`` function evaluates all YAQL expressions inside this function
against the full current context.

For example, to run a task only when the network metadata for the current
node changes:

.. code-block:: ini

    $.network_metadata.nodes.values().where($.uid = new($.uid))

``$.network_metadata.nodes.values()`` returns all nodes data in a network
metadata hash.

``new()`` lets you compare the nodes. The ``new()`` function recreates the
current context and operates over it. ``new($.uid)`` returns the UID from
the full current context.

**changed()**

The ``changed()`` function always returns a Boolean value. The value marks if
anything changes between the last and the current deployment.

For example, to run a cgroups task only when cgroups change:

.. code-block:: ini

    - id: cgroups
     …<omitted>...
      condition:
        yaql_exp: "changed($.cgroups)"

If the ``$.cgroups`` value changes from the last successful deployment,
this function returns true.

**changedAny()**, **changedAll()**

These functions represent the changes.

**added()**

This function splits your current context in two.

The first part contains all the data you had at the previous context and it
was not changed. The second part gets all the rest -- the data added to your
context at the current deployment. This is useful to set up the repositories
only when they were changed or do in at a newly added node.

Example:

.. code-block:: ini

    - id: setup_repositories
     …<omitted>...
      condition:
        yaql_exp: '($.uid in added($.network_metadata.nodes.values()).uid)\
        or changed($.repo_setup)'

The ``added($.network_metadata.nodes.values()).uid)`` block returns a list of
UIDs added to the current context compared to the context before the last
successful deployment.

**deleted()**

This function is a reverse to ``added()``. This function returns the data that
was deleted compared to the context before the last successful deployment.

Related links
~~~~~~~~~~~~~

* `YAQL Quickstart <https://yaql.readthedocs.io/en/latest/readme.html#quickstart>`_
* `YAQL functions <https://review.openstack.org/#/c/258517/26/doc/source/getting_started.rst>`_
* `Additional YAQL functions in Fuel <https://github.com/openstack/fuel-web/blob/master/nailgun%2Fnailgun%2Fyaql_ext%2Fdatadiff.py
>`_