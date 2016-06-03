
.. _skip-core-tasks:

Skipping core tasks
-------------------

Core tasks are the tasks defined by Fuel, as opposed to plugin tasks.

You can disable core tasks from running on target nodes either completely
or to overrun the core tasks with your plugin tasks.

For example, networking plugins often disable creation of the default
networks, which are usually created by Fuel during deployment. You can
do this by describing the task with the same ID as the existing one and
the type ``skipped``:

``deployment_tasks.yaml``:

.. code-block:: ini

   - id: openstack-network-networks
     type: skipped

.. note:: If you try to redefine a core task by creating a new task with same
          ID as the one of the existing, the deployment will fail.