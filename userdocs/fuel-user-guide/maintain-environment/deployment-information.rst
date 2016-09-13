.. _deployment-information:

===============================
Download deployment information
===============================

Fuel stores detailed information about deployments in its database.

You can download cluster settings, network configuration, and serialized
cluster data, such as ``astute.yaml`` for all nodes used for a specific
deployment.

**To download the deployment information:**

#. Log in to the Fuel Master node.
#. Get the ID of the deployment task:

   .. code-block:: console

     fuel task
     fuel2 task list

#. Download the deployment information:

   .. code-block:: console

     fuel2 task deployment-info download <task-id> --file deployment-info.yaml
     fuel2 task settings download <task-id> --file settings.yaml
     fuel2 task network-configuration download <task-id> --file networks.yaml

   The ``<task-id>`` value is the ID of the deployment task.
