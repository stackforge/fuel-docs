
.. _deployment-history:

Deployment task history
=======================

Fuel stores in its database the information about all deployment
tasks associated with each deployment.

To get the information on a deployment task:

#. Log in to the Fuel master node.
#. Find the ID of the deployment task:

  .. code-block:: console
  
     fuel task
     fuel2 task list

#. Get the information on the deployment task:

  .. code-block:: console

     fuel deployment-tasks --task-id <task-id> --statuses ready, pending --nodes 1,2
     fuel2 task history show <task-id> --nodes 3 --statuses error skipped

  where <task-id> is the ID of the deployment task.

.. warning:: The commands ``fuel task`` and ``fuel2 task list`` show
             the Nailgun tasks; for example, provisioning, deployment,
             verify networks, and so on.
             The commands ``fuel deployment-tasks`` and
             ``fuel2 task history show`` show the deployment tasks
             running on nodes; for example, database, upload_configuration,
             hiera, and so on.