.. _network-templates-structure:

Structure of network templates
------------------------------

You can use the structure described in this section, as well
as the default template to create a template that meets the
requirements of your configuration.

The procedure of creation networks is different for service
networks, such as Storage, Management, and Admin networks
and for networks that communicate with the OpenStack
Networking service, or workload networks, such Private and Public
networks. When you add new networks, you must understand whether
traffic from this network flows through the OpenStack Networking
service or not.

Network parameters are defined in the ``adv_net_template``
section in the ``network_template_<ENV_ID>.yaml`` file.

The following tables describe required network parameters:

.. list-table:: **network_scheme**
   :widths: 10 10
   :header-rows: 1

   * - Description
     - Example
   * - Defines the name of the network template as well as the following
       parameters that are applied to each network that needs to be
       configured:

       * ``priority`` - defines the order in which network templates will
         be applied to a node. The values range 0 to 64000.
         For example, you can set ``100``, ``200``, ``300`` with ``100``
         being the highest priority template.

       * ``transformations`` - a sequence of actions that builds the required
         network configuration. For example: ``add-br`` - add a network
         bridge, ``add-port`` - add a network port. The Puppet L23network
         module transforms a physical interface to logical endpoints. Order
         of commands specified in this section is significant.

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

   * - The sequence of commands that create network configuration must
       be reflected in the transformation section:

       * For service networks:

         #. Create a Linux bridge. By default, if you do not specify a
            provider a Linux bridge is created.
         #. Create a network port that connects the Linux bridge and the
            physical network interface.

       * For workload networks:

         #. Create an OVS bridge as a first point of connection between
            the OpenStack Networking service and the physical network
            interface.

         #. Create a Linux bridge. Since OVS bridge cannot directly connect
            to physical interface, a Linux bridge is required.

         #. Create a patch that connects Linux and OVS bridges.

     -
   * - You can specify the following commands in the ``transformation``
       section:

        * ``add-bridge`` - creates a bridge. By default, creates an OVS
        * bridge.
           You can specify the following parameters for this command:

          * ``provider`` - a network technology such as Open vSwitch (OVS) or
             Linux Bridge, that connects physical interface with
             the OpenStack Networking service. Default provider is Linux
             Bridge.
             The options are: ``ovs``.

          * ``mtu`` - enables you to specify MTU for this network bridge.

        * ``add-port`` - create a port that connects a Linux bridge with a
           physical network interface.
        * ``add-patch`` - adds connection between Linux bridge and OVS.

           You can specify the following parameters for this command:

            * ``provider`` - a network technology such as Open vSwitch (OVS)
              or Linux Bridge, that connects physical interface with
              the OpenStack Networking service. Default provider is Linux
              Bridge.
              The options are: ``ovs``.

            * ``mtu`` - enables you to specify MTU for this network bridge.

       * ``endpoints`` - lists L3 logical or physical interfaces or bridges
         with assigned IP addresses to which you can map one or more network
         roles.

       * ``roles`` - mapping of a network role to a logical endpoint. When you
         apply multiple templates to one node, verify that this parameter
         in one template does not contradict this parameter in other template.

     -

.. list-table:: **nic_mapping**
   :widths: 10 10
   :header-rows: 1

   * - Description
     - Example
   * - Specifies aliases to network interface names mapping,
       for example, ``adm: eth0``. If a node does not have an alias,
       default mapping applies. You can configure custom mapping for
       any node by the node name. The number of NICs depends on the
       network topology and may vary. Aliases are optional and if
       all nodes have the same number of NICs connected in a similar
       manner, you can use NIC names instead.

     - ::

         nic_mapping:
         default:
              adm: eth0
              pub: eth1
              man: eth2
              stor: eth3
         node-33:
              pub: eth1
              stor: eth3
              man: eth2
              adm: eth0

.. list-table:: **templates_for_node_role**
   :widths: 10 10
   :header-rows: 1

   * - Description
     - Example
   * - List of template names for every node role used in the environment.
       The order of the template names is significant and must be provided
       according to your configuration requirements. For example, first
       the Puppet module must create a network bridge and then the
       corresponding sub-interface and not vice versa. While templates
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

.. list-table:: **network_assignmentse**
   :widths: 10 10
   :header-rows: 1

   * - Description
     - Example
   * - Describes mapping between endpoints and network names and defines
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
