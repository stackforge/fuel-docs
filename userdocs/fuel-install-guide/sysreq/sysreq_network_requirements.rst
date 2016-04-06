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

Fuel creates the *default* node network group that includes the Public,
Storage, Management, Private, and Baremetal networks if you installed
the OpenStack Bare Metal service.

The requirements for Public, Storage, and Management networks are:

* For Public network

  * Floating IP range must fit into Public network CIDR of any
    of the node network groups in the environment and share that
    CIDR with Public IP ranges of that network.
  * Each deployed Controller node requires one IP address from the Public IP range.
  * If you set :guilabel:`Assign public network to all nodes` option
    in the Settings tab, then each deployed node requires one IP.
  * Virtual IPs and the default gateway require three additional IP addresses for
    the environment: two IP addresses for Virtual IPs and one IP address for
    the default gateway.
  * If the Neutron DVR feature is enabled, the DVR requires one additional IP address
    for each Compute node in case you plan to use Floating IPs in the deployment.
  * If you install plugins, refer to the plugin guides for Public IP requirements.

* For Storage and Management networks

  * These are internal networks and, hence, the address range should be private,
    not globally routable.

Neutron L2 and L3 requirements are:

* Each project's network requires one unique VLAN ID.
* Internal network must be isolated from both private and public networks
  for security reasons.
* For floating network each defined project, including the Admin project,
  requires one IP address from the floating IP address range.
  This IP address goes to the virtual interface of the project's virtual router.
* Each VM instance connected to the external network requires one IP address
  from the floating IP range.
* The floating IP address range should not intersect with the Public network
  address range.
* Specify adresses for the guest OS DNS servers if you do not want to use
  the default DNS servers.
