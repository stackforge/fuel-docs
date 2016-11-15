.. _deployment-information:

===============================
Download deployment information
===============================

Fuel stores detailed information about deployments in its database.
You can download environment settings, network configuration, and serialized
environment data, such as ``astute.yaml`` for all nodes used for a specific
deployment.

**To download the deployment information:**

#. Log in to the Fuel Master node CLI.
#. Obtain the ID of the deployment task using one of the following commands:

   .. code-block:: console

     fuel task
     fuel2 task list

   .. include:: /userdocs/snippets/notes/fuel2-task-list-filters.rst

#. Download the deployment information:

   .. code-block:: console

     fuel2 task deployment-info download <TASK_ID> --file deployment-info.yaml
     fuel2 task settings download <TASK_ID> --file settings.yaml
     fuel2 task network-configuration download <TASK_ID> --file networks.yaml

   where ``<TASK_ID>`` is the ID of the deployment task.