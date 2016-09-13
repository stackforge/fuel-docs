
.. _define-plugin-actions:

Define plugin actions
---------------------

All actions that a plugin can execute fall into the following categories:

* Actions for the existing roles -- all nodes have one or more roles
  associated with them; for example, controller or compute. You can
  change the deployment process for the roles defined by Fuel or add
  new actions for these roles.

* Actions for plugin specific roles -- you can create a new role; for
  example, if you want to deploy a product that runs on the nodes separate
  from the ones running the OpenStack services deployed by Fuel,
  and define all the actions that should be executed on such nodes.

* Actions executed on the Fuel Master node -- you can change the Fuel Master
  node. Generally this is not recommended, as you may accidentally affect
  the environments on which the user does not want the plugin to be enabled.
  There are options to do this.

.. note:: There are two files with the definitions of plugin actions:
          ``tasks.yaml`` and :ref:`deployment_tasks.yaml`.
          The ``tasks.yaml`` file is deprecated and can only contain
          definitions of tasks in the outdated format used in Fuel 6.0.
          You can only describe the pre- and post-deployment tasks using
          the old format.
          The file :ref:`deployment_tasks.yaml` can contain tasks in the same old
          format, but also tasks in the new format, which supports the main
          deployment tasks and task dependencies.
          Use :ref:`deployment_tasks.yaml` and only the new format for all task
          definitions.
