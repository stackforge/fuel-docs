.. _sysreqs_network_reqs:

Network requirements
--------------------

Your OpenStack environment must have an efficient, scalable, and manageable
network infrastructure that addresses your immediate business needs and
future growth. All nodes must communicate with each other through
allocated networks. Network configuration of your Fuel Slave nodes depends
significantly on the network topology that you select.

Fuel deploys standard network topologies supported by Neutron, as well as
extended Neutron's networking functionality using such plugins as ML2 and so
on. Neutron is a flexible network manager that enables you to create
complex network configurations. Neutron provides both level 2 and 3
network virtualization, as well as IP address management (IPAM). In addition,
Neutron has multiple open-source and enterprise-class plugins that enable
interoperability with such networking technologies as virtual switches and
software defined networking (SDN).

.. note::
      Since the introduction of Neutron, nova-network development efforts
      have been gradually reduced and may be deprecated in the future
      OpenStack releases. Neutron is recommended in all new deployments.

Fuel can deploy the following Neutron network topologies:

Neutron with VLAN segmentation
 Similar to nova-network VLAN Manager, in Neutron's VLAN segmentation
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

Neutron with tunneling segmentation
 You can choose between VXLAN and GRE segmentation, with VXLAN being a
 default and preferred option. In both VXLAN and GRE segmentations,
 tenant traffic is isolated by encapsulation the traffic in tunnels.
 Both VXLAN and GRE segmentation is more flexible in terms of the number
 of tenants (supports up to 65534 tenants). Network hardware configuration
 is significantly simpler compared to the VLAN segmentation and does not
 need to be synchronized with your L2 switch configuration. Both VXLAN
 and GRE support subnet overlapping in different tenants. However, the
 disadvantage of using GRE segmentation is that GRE encapsulation
 decreases the network speed between the instances, as well as increases
 the CPU usage on the compute and controller nodes.

 .. note::
      To use VXLAN segmentation, your network hardware must support VXLAN
      segmentation.

 You can configure GRE segmentation using CLI. For more information, see:
 *Fuel CLI Reference*.

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

 Routing recommendations for Neutron networking topologies:

 * Public network: use the default routing through the router.
 * Management network: use management network to access your management
   infrastructure (L3 connectivity, if necessary).
 * Administrative network or only the Fuel Master node: must have the Internet
   access through a dedicated NIC.
 * Storage and Private networks (VLANs): isolate from other networks.
