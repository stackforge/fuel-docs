
.. _nic-bonding-ui:

Configure network bonding
-------------------------

Network bonding, or network aggregation, or NIC bonding is
a network technology that enables you to maximize throughput by
aggregating multiple physical links into a single high-speed aggregated
network interface. In addition to increasing bandwidth, network bonding
provides fault tolerance.

You must configure NIC bonding before or in the scope of
mapping logical networks to physical network interfaces.

The following tables describe the types of one-side and two-side bonding
that Fuel supports.

.. list-table:: **Types of one-side bonding**
   :widths: 10 25
   :header-rows: 1

   * - Name
     - Description
   * - ``balance-rr``
     - Implements the round-robin policy. This mode provides load balancing
       and fault tolerance.
   * - ``Active-backup``
     - Implements the active-backup policy. In this mode, one network interface
       is active and other network interface is passive. When an active network
       interface fails, a failover occurs and the previously passive NIC
       becomes active.
   * - ``balance-xor``
     - Implements the XOR policy. Transmit network packets are based on the
       selected transmit hash policy. This mode provides load balancing and
       fault tolerance.
   * - ``Broadcast``
     - Implements the broadcast policy. Transmits network traffic on all slave
       interfaces. This mode provides fault tolerance.
   * - ``balance-tlb``
     - Adaptive transmit load balancing based on the link
       utilization. This mode provides load balancing and fault tolerance.
   * - ``balance-alb``
     - Adaptive transmit and receive load balancing based on the
       link utilization. This mode provides load balancing and fault
       tolerance.
   * - ``balance-slb``
     - Modification of the ``balance-alb`` mode. SLB bonding enables a limited
       form of load balancing. The mode does not require
       information about the remote switch.
       SLB assigns each source MAC and VLAN pair to a link and transmits all
       packets from the MAC and VLAN pair through that link.
   * - ``balance-tcp``
     - Adaptive transmit load balancing among network interfaces.

.. list-table:: **Types of one-side bonding**
   :widths: 10 25
   :header-rows: 1

   * - Name
     - Description
   * - ``layer2``
     - Uses XOR of hardware MAC addresses to generate the hash.
   * - ``layer2+3``
     - Uses a combination of layer2 and layer3 protocol information to
       generate the hash.
   * - ``layer3+4``
     - Uses the upper layer protocol information, when available, to generate
       the hash.
   * - ``encap2+3``
     - Uses the same formula as ``layer2+3``, but relies on
       ``skb_flow_dissect`` to obtain the header fields which may result in
       the use of inner headers if an encapsulation protocol is used.
   * - ``encap3+4``
     - Similar to ``encap2+3``, but uses``layer3+4``.


**To configure network interfaces:**

#. In the Fuel web UI, click the :guilabel:`Nodes` tab.
#. Select nodes.
#. Click :guilabel:`Configure Interfaces`
#. Select network interfaces that you want to aggregate.
#. Click :guilabel:`Bond Network Interfaces`.
#. In the :guilabel:`Mode` drop-down list, select an appropriate bonding
   mode.

   .. note:: When bonding an Admin interface, you can select the
             ``balance-rr`` and ``Active Backup`` modes. Fuel
             supports Admin interface bonding in LACP
             mode as an experimental feature. For the ``802.3ad (LACP)`` bond,
             you can also select an LACP rate. The values of the LACP
             rate include: ``fast`` and ``slow``.

#. Create and configure additional network interfaces, if needed.
#. Click :guilabel:`Apply`.
