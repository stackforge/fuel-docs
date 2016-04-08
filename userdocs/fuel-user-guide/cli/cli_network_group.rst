.. _cli-network-group:

Network group management commands
---------------------------------

The following table describes network group management commands
available in the Fuel CLI.

.. list-table:: **Network group management commands**
   :widths: 10 10 20
   :header-rows: 1

   * - Description
     - Command
     - Example
   * - List all available network groups.
     - ``fuel network-group``
     -
   * - List network groups in a particular node group.
     - ``fuel network-group --node-group <GROUP_ID>``
     - .. code-block:: console
 
        fuel network-group --node-group 1
   * - Create a new network group.

       Variables:

       * ``<NODE_GROUP_ID>`` - an ID of a node group
       * ``<NAME>`` - a name of a new network group
       * ``<RELEASE_ID>`` - a release ID this network group belongs to
       * ``<VLAN_ID>`` - a VLAN of a network
       * ``<CIDR>`` - a CIDR of a network
       * ``<GATEWAY_IP>`` - a gateway of a network
       * ``<META_INFO>`` - meta information in JSON format

     - ``fuel network-group --create --node-group <NODE_GROUP_ID> --name \
       <NAME> --release <RELEASE_ID> --vlan <VLAN_ID> --cidr <CIDR> --gateway \
       <GATEWAY_IP> --meta <META_INFO>``
     - .. code-block:: console

        fuel network-group --create --node-group 2 --name "new network" \
               --release 2 --vlan 100 --cidr 10.0.0.0/24 --gateway 10.0.0.1 \
               --meta 'meta information in JSON format'
   * - Set parameters for a network group.

       Variables:

       * ``<ID>`` - an ID of a network group
       * ``<PARAMETER>`` - a parameter you want to set or update.
         See the ``fuel network-group --create`` command for the
         list of parameters.
       * ``<NEW_VALUE>`` - a new value for the specified parameter
     - ``fuel network-group --set --network <ID> --<PARAMETER> <NEW_VALUE>``
     - .. code-block:: console

        fuel network-group --set --network 1 --name new_name

   * - Delete a network group.
     - ``fuel network-group --delete --network <GROUP_ID>``
     - Delete a single network group:

       .. code-block:: console

        fuel network-group --delete --network 1

       Delete multiple network groups:

       .. code-block:: console

        fuel network-group --delete --network 2,3,4
