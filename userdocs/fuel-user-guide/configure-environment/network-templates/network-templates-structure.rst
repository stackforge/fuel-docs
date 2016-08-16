.. _network-templates-structure:

Structure of network templates
------------------------------

Network parameters are defined in the ``adv_net_template``
section in the ``network_template_<ENV_ID>.yaml`` file:

.. code-block:: console

   adv_net_template:
     default: <name_of_the_node_group>
       nic_mapping:
         ...
       templates_for_node_role:
         ...
       network_assignments:
         ...
       network_scheme:
         ...
     group_11: <name_of_the_node_group>
       nic_mapping:
       templates_for_node_role:
       network_assignments:
       network_scheme:

The following table lists required network parameters:

.. list-table:: **Structure of network templates**
   :widths: 10 10 10
   :header-rows: 1

   * - Section
     - Description
     - Example
   * - ``network_scheme``
     - Defines the name of the network template as well as the following
       parameters that are applied to each network that needs to be
       configured:
       
       * ``priority`` - defines the order in which network templates will
         be applied to a node. The values range 0 to 64000.
         For example, you can set ``100``, ``200``, ``300`` with ``100``
         being the highest priority template.

       * ``transformations`` - a sequence of actions that builds the required
         network configuration. For example: ``add-br`` - add a network
         bridge, ``add-port`` - add a network port. The Puppet L23network
         module transforms a physical interface to logical endpoints. 

       * ``endpoints`` - lists L3 logical or physical interfaces or bridges
         with assigned IP addresses to which you can map one or more network
         roles.
       * ``roles`` - mapping of a network role to a logical endpoint. When you
         apply multiple templates to one node, verify that this parameter
         in one template does not contradict this parameter in other template.
     - ::

         network_scheme:
           storage: <template name>
               priority:
                   ...
               transformations:
                   ...
               endpoints:
                   ...
               roles:
                   ...
           private: <template name>
               priority:
                   ...
               transformations:
                   ...
               endpoints:
                   ...
               roles:
                   ...

   * - ``nic_mapping``
     - Specifies aliases to network interface names mapping,
       for example, ``if1: eth0``. If a node does not have an alias, 
       default mapping applies. You can configure custom mapping for
       any node by the node name. The number of NICs depends on the
       network topology and may vary. Aliases are optional and if
       all nodes have the same number of NICs connected in a similar 
       manner, you can use NIC names instead. 
     - ::

         nic_mapping:
         default:
              if1: eth0
              if2: eth1
              if3: eth2
              if4: eth3
         node-33:
              if1: eth1
              if2: eth3
              if3: eth2
              if4: eth0
   * - ``templates_for_node_role``
     - List of template names for every node role used in the environment.
       The order of the template names is significant and must be provided
       according to your configuration requirements. For example, first
       the Puppet module must create a network bridge and then the
       corresponding sub-interface and not vice versa.  While templates
       can be reused for different node roles, each template is executed
       once for every node.
       When several roles are mixed on one node, an alphabetical order of
       node roles is used to determine the final order of the templates.
     - ::

         templates_for_node_role:
         controller:
               - public
               - private
               - storage
               - common
         compute:
               - common
               - private
               - storage
         ceph-osd:
               - common
               - storage  
   * - ``network_assignments``
     - Describes mapping between endpoints and network names and defines
       the L3 configuration for the network endpoints. The **Example**
       section describes the mapping that Fuel configures by default
       without using templates.
       The set of networks can be changed using API.
     - ::

         network_assignments:
         storage:
               ep: br-storage
         private:
               ep: br-prv
         public:
               ep: br-ex
         management:
               ep: br-mgmt
         fuelweb_admin:
               ep: br-fw-admin
