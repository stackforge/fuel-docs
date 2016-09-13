
.. _data-driven:

=====================
Run data-driven tasks
=====================

You can perform lifecycle management tasks based on the history
of the cluster states. You can introduce expressions that can be
computed within the context of cluster configuration, so that you can
control how the task assignment and execution depending on the configuration
the changes in the configuration.

This feature uses the `YAQL <https://github.com/openstack/yaql>`_ language.

The YAQL language is extendable and can be used to work with any arbitrary
structured data format such as JSON or YAML.

Through YAQL you get access to the node's ``deployment_info`` during task's
serialization.

This feature allows the developer to:

* Identify cluster status ``$.cluster.status`` in [``operational``, ``new``, ``partially_deployed``]
* Identify node number changes ``changed($.nodes.where($.role = ‘compute’))``
* Identify cluster settings changes ``changed($.configs.nova)``
* Identify node settings changes ``changed($.nodes.where($.attribute = ‘r1’).network_scheme(‘routes’))``
* Identify changes of nodes with particular labels ``changed($.nodes.where($.label = ‘testing’)``
* Identify expected or deployed value of existing parameters ``new($.configs.nova.parameter) = False old($.configs.nova.parameter) = True``
* Identify actual value of existing settings ``new($.settings.murano.parameter) = True``
* Use other valid YAQL expressions
* Use special YAQL helpers: ``changedAny()`` and ``changedAll()`` which can
  be used for multiple parameters instead of logical expressions; for example,
  ``changedAny($.nova, $.mysql, $.network_metadata.vips)``

You can use all these expressions as the fields of deployment tasks.
Use the prefix ``yaql_exp`` to detect the YAQL expressions.

For example:

.. code-block:: ini

   - id: task-id
     condition: yaql_exp: {some yaql expression}
     parameters:
       data: yaql_exp: {some yaql expression}

An example of the ``condition`` field computation using YAQL:

.. code-block:: ini

   changed($.nodes.where($.status = 'ready' and 'controller' in $.roles))
   and changed($.nodes.where($.status = 'discover' and 'controller' in
   $.roles and $.pending_addition = true))


This example executes only the selected tasks on the controller nodes.

Another example of how it can be used is a task of a MySQL configuration
change. For example, for the default deployment you can run a secondary
database nodes deployment in parallel as there is no risk of data corruption
or service degradation for the newly created cluster. However during
the cluster operation it is not acceptable to restart all of
the secondary MySQL instances on configuration change as this will lead
to quorum loss and service degradation. You can create an expression for
the task policy to be parallel to the new deployment and one-by-one
when operating with the existing cluster.

