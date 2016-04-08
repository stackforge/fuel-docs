.. _cli-nodes:

Node management commands
------------------------

The following table describes node management commands
available in the Fuel CLI.

.. list-table:: **Node management commands**
   :widths: 10 10 20
   :header-rows: 1

   * - Description
     - Command
     - Example
   * - List all available nodes.
     - ``fuel node list``
     - List nodes for a specific environment:

       ::

         fuel --env-id <env_id> node list
   * - Assign nodes with specific roles to an OpenStack environment.
     - ``fuel node set --node <node_id> --role <role> --env <env_id>``
     - ::

         fuel node set --node <node_id> --role controller --env <env_id>

       ::

         fuel node set --node <node1_id>,<node2_id>,<node3_id> \
         --role compute,cinder --env <env_id>
   * - Remove nodes from an OpenStack environment.
     - ``fuel node remove --node <node1_id>,<node2_id> --env <env_id>``
     - Remove nodes without specifying an OpenStack environment:

       ::

          fuel node remove --node <node1_id>,<node2_id>

       Remove all nodes from a specific OpenStack environment:

       ::

         fuel node remove --env <env_id>
   * - Delete nodes with the *offline* status from the Fuel database.
     - ``fuel node --node-id <id> --delete-from-db``
     - Delete nodes with any status from the Fuel database:

       ::

         fuel node --node-id <id> --delete-from-db --force
