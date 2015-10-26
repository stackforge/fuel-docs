.. _sysreqs_network_reqs:

Network requirements
~~~~~~~~~~~~~~~~~~~~

Your OpenStack environment must have an efficient, scalable, and manageable
network infrastructure that addresses your immediate business needs and
future growth. All nodes must communicate with each other through
allocated networks. Network configuration of your target nodes depends
significantly on the network topology that you select.

Fuel can deploy the following network topologies:

* Nova-network
   Nova-network is a simple network manager that provides layer 3 network
   virtualization. Nova-network is recommended if you use VMware vCenter as
   hypervisor. To configure nova-network you must have at least 1 NIC on
   each Fuel Target node. Capacity and number of network interfaces depends on
   the workloads that you plan to run in your environment and requires
   extensive planning that is out of scope of this document.

  If you select nova-network, you can configure the following using Fuel:

  * Nova-network FlatDHCP Manager
     Nova-network FlatDHCP Manager is the simplest network configuration that
     Fuel can create. FlatDHCP Manager ensures that each virtual machine
     instance is connected to the network bridge on the compute node.
     FlatDHCP Manager also provides a DHCP server (`dnsmasq`) that allocates
     IP addresses from the subnetwork assigned by a network administrator to
     virtual machine instances. You must configure switch ports as tagged
     (trunk) to use this network configuration.

  * Nova-network VLAN Manager
     Nova-network VLAN Manager enables you to isolate traffic that flows
     in one tenant from the traffic that flows inside other tenants by tagging
     IP frames. VLAN  Manager creates a network bridge, a VLAN, and a
     subnetwork for each tenant. Use this option if you plan to have
     multiple tenants in your environment. Configure switch ports as tagged.

    .. note::
       Since the introduction of Neutron, development effort of nova-network
       has been gradually reducing and may be deprecated in the future
       OpenStack releases. Neutron is recommended in all new deployments.

* Neutron
   Neutron is a flexible network manager that enables you to create
   complex network configurations. Neutron provides both level 2 and 3 network
   virtualization, as well as IP address management (IPAM). In addition,
   Neutron has multiple open source and enterprise class plugins that enable
   interoperability with such networking technologies as virtual switches and
   software defined networking (SDN).

  If you select Neutron, you can configure the following using Fuel:

  * Neutron with VLAN segmentation
     Similarly to nova-network VLAN Manager, in Neutron's VLAN segmentation
     topology a VLAN is assigned to each tenant. IP subnets and ranges in
     different tenants can overlap. This is the default networking option
     in Fuel. The disadvantage of this option is that you must configure your
     networking equipment, as well as provide the total number of tenants,
     before configuring the network.

    If you select Neutron with VLAN segmentation, you must have at least 3
    network interfaces (NICs).

    **Neutron with VLAN segmentation examples:**

    +----------+------------------------+-------------------------+
    |          | 3 NICs                 | 4 NICs                  |
    +----------+------------------------+-------------------------+
    | eth0     | Untagged port for      | Port for Administrative |
    |          | Administrative network | network                 |
    +----------+------------------------+-------------------------+
    | eth1     | Port for the following | Port for the following  |
    | (br-eth1)| networks:              | networks:               |
    |          |                        |                         |
    |          | * Public/Floating      | * Public/Floating       |
    |          | * Management           | * Management            |
    |          | * Storage              |                         |
    +----------+------------------------+-------------------------+
    | eth2     | Port for Private       | Port for Private network|
    | (br-eth2)| network. The number of | with defined VLAN ID    |
    |          | VLANs depends on the   | range                   |
    |          | number of tenant       |                         |
    |          | networks with a        |                         |
    |          | continuous range.      |                         |
    +----------+------------------------+-------------------------+
    | eth3     | N/A                    | Port for Storage        |
    | (br-eth3)|                        | network                 |
    +----------+------------------------+-------------------------+

  * Neutron with tunneling segmentation
     You can choose between VXLAN and GRE segmentation, with VXLAN being a
     default and preferred option. In both VXLAN and GRE segmentations,
     tenant traffic is isolated by encapsulation the traffic in tunnels.
     Both VXLAN and GRE segmentation is more flexible in terms of the number
     of tenants (supports up to 65535 tenants). Network hardware configuration
     is significantly simpler compared to the VLAN segmentation and does not
     need to be synchronized with your L2 switch configuration. Both VXLAN
     and GRE support subnet overlapping in different tenants. However, the
     disadvantage of using GRE segmentation is that GRE encapsulation
     decreases the network speed between the instances, as well as increases
     the CPU usage on the compute and controller nodes.

    **Neutron with GRE segmentation examples:**

    +----------+-------------------+-------------------+---------------------+
    |          | 2 NICs            | 3 NICs            | 4 NICs              |
    +----------+-------------------+-------------------+---------------------+
    | eth0     | Untagged port for | Untagged port for | Untagged port for   |
    |          | Administrative    | Administrative    | Administrative      |
    |          | network           | network           | network             |
    +----------+-------------------+-------------------+---------------------+
    | eth1     | Port for the      | Port for the      | Port for Management |
    | (br-eth1)| following         | following         | network             |
    |          | networks:         | networks:         |                     |
    |          |                   |                   |                     |
    |          | * Public/Floating | * Public/Floating |                     |
    |          | * Management      | * Management      |                     |
    |          | * Storage         |                   |                     |
    +----------+-------------------+-------------------+---------------------+
    | eth2     | N/A               | Port for Storage  | Port for Public/    |
    | (br-eth2)|                   | network           | Floating network    |
    +----------+-------------------+-------------------+---------------------+
    | eth3     | N/A               | N/A               | Port for Storage    |
    | (br-eth3)|                   |                   | network             |
    +----------+-------------------+-------------------+---------------------+

    Routing recommendations:

    * Public network: use the default routing through the router.
    * Management network: use management network to access your management
      infrastructure (L3 connectivity, if necessary).
    * Administrative network or only Fuel Master node: must have the Internet
      access through a dedicated NIC.
    * Storage and Private networks (VLANs): isolate from other networks.
