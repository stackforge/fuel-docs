.. _cli-node-group:

Node group management commands
------------------------------

The following table describes node group management commands
available in the Fuel CLI.

.. list-table:: **Node group management commands**
   :widths: 10 10 20
   :header-rows: 1

   * - Description
     - Command
     - Example
   * - List all available node groups.
     - ``fuel nodegroup``
     - List node groups for a specific OpenStack environment:

       ::

         fuel --env <env_id> nodegroup

   * - Create a node group.
     - ``fuel --env <env_id> nodegroup --create --name "group_name"``
     - ::

          fuel --env <env_id> nodegroup --create --name "group 1"
   * - Delete a node group.
     - ``fuel --env <env_id> nodegroup --delete --group <group_id>``
     -
   * - Assign a node to a specific node group.
     - ``fuel --env <env_id> nodegroup --assign --node <node_id> --group
       <group_id>``
     -
