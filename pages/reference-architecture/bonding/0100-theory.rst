NICs Aggregation
================

The NIC bonding allows you to aggregate multiple physical links to one link
to increase speed and provide fault tolerance.

**Documentation**

* The Linux kernel documentation about bonding can be found in Linux Ethernet Bonding Driver
  `HOWTO <https://www.kernel.org/doc/Documentation/networking/bonding.txt>`_

* You can find shorter `introduction <http://wiki.mikrotik.com/wiki/Manual:Interface/Bonding>`_
  to bonding and tips on link monitoring here

* Cisco switches configuration
  `guide <http://www.cisco.com/c/en/us/td/docs/switches/datacenter/nexus3000/sw/layer2/503_U2_1/b_Cisco_n3k_layer2_config_guide_503_U2_1/b_Cisco_n3k_layer2_config_gd_503_U2_1_chapter_01000.html>`_

* Switches configuration tips for Fuel can be found
  `here <https://etherpad.openstack.org/p/LACP_FUEL_bonding>`_

Types of Bonding
----------------

Open VSwitch supports the same bonding features as the Linux kernel.
Fuel supports bonding either via Open VSwitch or by using Linux native bonding interfaces. Open vSwitch mode is supported
in Fuel UI and should be used by default. You may want to fall back to Linux native interfaces if Open vSwitch bonding
is not working for you or is not compatible with your hardware.

Linux supports two types of bonding:
* IEEE 802.1AX (formerly known as 802.3ad) Link Aggregation Control Protocol (LACP). Devices on both sides of links must communicate using LACP to set up an aggregated link. So both devices must support LACP, enable and configure it on these links.
* One side bonding does not require any special feature support from the switch side. Linux handles it using a set of traffic balancing algorithms.

One Side Bonding Policies:

* **Balance-rr** - Round-robin policy. This mode provides load balancing and fault tolerance.
* **Active-backup** - Active-backup policy: Only one slave in the bond is active.This mode provides fault tolerance.
* **Balance-xor** - XOR policy: Transmit based on the selected transmit hash policy. This mode provides load balancing and fault tolerance.
* **Broadcast** - Broadcast policy: transmits everything on all slave interfaces. This mode provides fault tolerance.
* **balance-tlb** - Adaptive transmit load balancing based on a current links' utilisation. This mode provides load balancing and fault tolerance.
* **balance-alb** - Adaptive transmit and receive load balancing based on the current links' utilisation. This mode provides load balancing and fault tolerance.
* **balance-slb** - Modification of balance-alb mode. SLB bonding allows a limited form of load balancing without the
  remote switch's knowledge or cooperation. SLB assigns each source MAC+VLAN pair to a link and transmits all packets from
  that MAC+VLAN through that link. Learning in the remote switch causes it to send packets to that MAC+VLAN through the same link.
* **balance-tcp** - Adaptive transmit load balancing among interfaces.

LACP Policies:

* **Layer2** - Uses XOR of hardware MAC addresses to generate the hash.
* **Layer2+3** - uses a combination of layer2 and layer3 protocol information to generate the hash.
* **Layer3+4** - uses upper layer protocol information, when available, to generate the hash.
* **Encap2+3** - uses the same formula as layer2+3 but it relies on skb_flow_dissect to obtain the header fields which might result in the use of inner headers if an encapsulation protocol is used. For example this will improve the performance for tunnel users because the packets will be distributed according to the encapsulated flows.
* **Encap3+4** - Similar to Encap2+3 but uses layer3+4.

**Policies Supported by Fuel**

Fuel supports the following policies: Active Backup, Balance SLB and LACP Balance TCP.
These interfaces can be configured in Fuel UI when nodes are being added tho the environment or by using
Fuel CLI and editing YAML configuration manually.

**Network Verification in Fuel**

Fuel has limited network verification capabilities when working with bonds.
Network connectivity can be checked for the new cluster only (not for deployed one)
so check is done when nodes are in bootstrap and no bonds are up. Connectivity
between slave interfaces can be checked but not bonds themselves.
