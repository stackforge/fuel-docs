.. _sysreqs_network_reqs:

Network requirements
~~~~~~~~~~~~~~~~~~~~

Your OpenStack environment must have an efficient, scalable, and manageable
network infrastructure that addresses your immediate business needs and
future growth. All nodes must communicated with each other through
allocated networks. Network configuration of your target nodes highly depends
on the network topology that you select.

Fuel can deploy the following network topologies:

* Nova-network
  Nova-network is a simple network manager that provides layer 3
  virtualization.

  ..note::
    Fuel allows you to configure nova-network only if you use VMware vCenter
    as compute.
  
  If you select Nova-network, you can configure the following using Fuel:

  * Nova-network FlatDHCP Manager
    Nova-network FlatDHCP Manager is the simplest network configuration that
    Fuel can create. FlatDHCP manager ensures that each virtual machine
    instance is connected to the network bridge on the compute node, as well
    as provides a DHCP server (`dnsmasq`). The DHCP server allocates IP
    addresses from the subnetwork assigned by a network administrator to
    virtual machines instances.

  * Nova-network VLAN Manager
    Nova-network VLAN Manager enables you to isolate traffic that flows
    in one tenant from the traffic that flows inside other tenants. For each
    tenant, VLAN Manager creates a network bridge and a VLAN for each tenant,
    as well as provides the DHCP server functionality. Use this option if you
    have multiple tenants.

    .. note:
       Since the introduction of Neutron, development effort of nova-network
       has been gradually reducing. Though, you can still use nova-network in
       production, consider possible implications and allocate the time for
       upgrade in the future.

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
    networking equipment, as well as know the total number of tenants before
    configuring the network.

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
    Both VXLAN and GRE segmentation is more flexible in terms of the number of
    tenants (supports up to 65535 tenants). Network hardware configuration is
    significantly simpler comparing to the VLAN segmentation and does not
    require to be synchronized with your L2 switch configuration. However, the
    disadvantaged of using GRE segmentation is that GRE encapsulation
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
      access through a dedicate NIC.
    * Storage and Private networks (VLANs): isolate from other networks.
