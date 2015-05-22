.. _0010-tasks-schema:

Task schema
-----------

Tasks that are used to build a deployment graph can be grouped
according to the common types:

::

     - id: graph_node_id
       type: one of [stage, group, skipped, puppet, shell etc]
       role: [match where this tasks should be executed]
       requires: [requirements for a specific node]
       required_for: [specify which nodes depend on this task]


Stages
------

Stages are used to build a graph skeleton.
The skeleton is then extended with additional functionality like provisioning, etc.

The deployment graph of Fuel 6.1 has the following stages:

::

       - pre_deployment_start
       - pre_deployment_end
       - deploy_start
       - deploy_end
       - post_deployment_start
       - post_deployment_end



Here is the stage example:

.. code-block:: yaml

  - id: deploy_end
    type: stage
    requires: [deploy_start]

Groups
------

In Fuel 6.1, groups are a representation of roles in the main deployment graph:

::

  - id: controller
    type: group
    role: [controller]
    requires: [primary-controller]
    required_for: [deploy_end]
    parameters:
      strategy:
        type: parallel
          amount: 6

.. note:: Primary-controller should be installed when Controller starts its own execution.
          The execution of this group should be finished to consider ``deploy_end`` done.

Here is the full graph of groups, available in 6.1:

.. image:: /_images/groups.png

Strategy
~~~~~~~~

You can also specify a strategy for groups in the ``parameters`` section.
Fuel 6.1 supports the following strategies:

* parallel - all nodes in this group will be executed in parallel. If there are
  other groups that do not depend on each other, they will be executed in parallel
  as well. For example, Cinder and Compute groups.

* parallel by amount - run in parallel by a specified number. For example, ``amount: 6``.

* one_by_one - deploy all nodes in this group in a strict one-by-one succession.


Skipped
-------

Making a task ``skipped`` will guarantee that this task will not be executed,
but all the task's dependencies will be preserved:

.. code-block:: yaml

    - id: netconfig
      type: skipped
      groups: [primary-controller, controller, cinder, compute, ceph-osd,
               zabbix-server, primary-mongo, mongo]
      required_for: [deploy_end]
      requires: [logging]
      parameters:
        puppet_manifest: /etc/puppet/modules/osnailyfacter/other_path/netconfig.pp
        puppet_modules: /etc/puppet/modules
        timeout: 3600

Puppet
------

Task of ``type: puppet`` is the preferable way to execute the deployment code on nodes.
Only mcollective agent is capable of executing code in background.

In Fuel 6.1, this is the only task that can be used in the main deployment stages,
between ``deploy_start`` and ``deploy_end``.

Example:

.. code-block:: yaml

  - id: netconfig
      type: puppet
      groups: [primary-controller, controller, cinder, compute, ceph-osd,
               zabbix-server, primary-mongo, mongo]
      required_for: [deploy_end]
      requires: [logging]
      parameters:
        puppet_manifest: /etc/puppet/modules/osnailyfacter/other_path/netconfig.pp
        puppet_modules: /etc/puppet/modules
        timeout: 3600

Shell
-----

Shell tasks should be used outside of the main deployment procedure.
Basically, shell tasks will just execute the blocking command on specified roles.

Example:

.. code-block:: yaml

  - id: enable_quorum
    type: shell
    role: [primary-controller]
    requires: [post_deployment_start]
    required_for: [post_deployment_end]
    parameters:
      cmd: ruby /etc/puppet/modules/osnailyfacter/modular/astute/enable_quorum.rb
      timeout: 180


Upload file
-----------

This task will upload data specified in ``data`` parameters to the
``path`` destination:

.. code-block:: yaml

  - id: upload_data_to_file
    type: upload_file
    role: '*'
    requires: [pre_deployment_start]
    parameters:
      path: /etc/file_name
      data: 'arbitrary info'

Sync
----

Sync task will distribute files from ``src`` directory
on the Fuel Master node
to ``dst`` directory on target hosts
that will be matched by role:


.. code-block:: yaml

  - id: rsync_core_puppet
    type: sync
    role: '*'
    required_for: [pre_deployment_end]
    requires: [upload_core_repos]
    parameters:
      src: rsync://10.20.0.2:/puppet/
      dst: /etc/puppet
      timeout:

Copy files
----------

Task with ``copy_files`` type
will read data from ``src`` and save it in the file
specified in ``dst`` argument.
Permissions can be specified for a group
of files, as provided in example:

.. code-block:: yaml

  - id: copy_keys
    type: copy_files
    role: '*'
    required_for: [pre_deployment_end]
    requires: [generate_keys]
    parameters:
      files:
        - src: /var/lib/fuel/keys/{CLUSTER_ID}/neutron/neutron.pub
          dst: /var/lib/astute/neutron/neutron.pub
      permissions: '0600'
      dir_permissions: '0700'

