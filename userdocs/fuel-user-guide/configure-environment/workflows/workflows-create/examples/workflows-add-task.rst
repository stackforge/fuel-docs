.. _workflows-add-task:

Add a task
----------

You can add a task to an existing role.

**To add a task:**

#. Log in to the Fuel CLI.
#. Add the task description to the ``my_tasks.yaml`` file.

   **Example:**

   .. code-block:: console

      - id: my_task
        type: puppet
        groups: [compute]
        required_for: [deploy_end]
        requires: [netconfig]
        parameters:
          puppet_manifest: /etc/puppet/modules/my_task.pp
          puppet_modules: /etc/puppet/modules
          timeout: 3600

#. Run the following command:

   .. code-block:: console

      fuel rel --sync-deployment-tasks --dir <path-to-dir-with-the-task.pp>

   Fuel syncs the with the internal database.

#. Deploy the OpenStack environment.
