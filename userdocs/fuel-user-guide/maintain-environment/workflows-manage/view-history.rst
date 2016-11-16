.. _view_history:

===========================
View the deployment history
===========================

Fuel stores the information about all deployment workflows associated with each
deployment of an environment. You can view the deployment history through
the Fuel web UI (timeline or table view mode) as well as the Fuel CLI.

**To view the deployment history using the Fuel web UI:**

#. Log in to the Fuel web UI.
#. Select the required OpenStack environment.
#. Select from the following options:

   * If you want to view a deployment workflow in progress:

     #. Go to the :guilabel:`Dashboard` tab.
     #. Click :guilabel:`Show Details` under the deployment progress bar.

   * If you want to view the deployment history details of an already deployed
     OpenStack environment:

     #. Go the :guilabel:`History` tab.
     #. Select the required deployment.

**To view the deployment history using the Fuel CLI:**

#. Log in to the Fuel Master node.
#. Obtain the ID of the deployment task using one of the following commands:

   .. code-block:: console

      fuel task
      fuel2 task list

#. Get the information on deployment tasks running on nodes:

   .. code-block:: console

      fuel deployment-tasks --task-id <TASK_ID> --task-name <TASK_NAME> --include-summary --statuses ready, pending --nodes 1,2
      fuel2 task history show <TASK_ID> --include-summary --nodes 3 --statuses error skipped

   where <TASK-ID> is the ID of the deployment task.

.. warning:: The ``fuel task`` and ``fuel2 task list`` commands show
             the Nailgun tasks, such as provisioning, deployment,
             verify networks, and so on.
             The ``fuel deployment-tasks`` and ``fuel2 task history show``
             commands show the deployment tasks running on nodes, such as
             database, upload_configuration, hiera, and so on.