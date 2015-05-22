Example 3: HA + Neutron with VLAN + SR-IOV & iSER
=============================================================================

As a model example, the following configuration is used:

* **Deploying mode:** Multi-node HA

* **Networking model:** Neutron with VLAN

**Hardware and environment:**

* 16 servers (1U) with two 1Gb/s ethernet NIC on-board, IPMI
* 16 Mellanox ConnectX-3 Pro 40/56GbE adapter card
* 16 40/56GbE cables (Mellanox OPN MC2207130)
* 1 Mellanox Ethernet switch SX1036 (36 ports of 40/56GbE)
* 1 (or 2) 1G Ethernet switch
* 1 storage server (2U) with two 1Gb/s ethernet NIC on-board, IPMI
* 2 External JBODs + SATA cables - Optional disk + adaptec RAID controller

.. note:: The Fuel node doesn't have to be equipped with Mellanox ConnectX-3 Pro adapter card, as it is not connected to the high speed network.

**Node servers roles:**

* 1  server as Fuel Node
* 3  servers as Controller Nodes
* 1  server as Storage Node (Cinder)
* 12 servers as Compute Nodes

**Network Configuration Plan:**

The switches and servers is designed in this example to support five networks as follows:

**Cloud Networks**

* Admin (PXE) network - 10.142.10.0/24 (no gateway, untagged via the 1GbE switch)
* Management network  - 192.168.0.0/24 (no gateway, VLAN 3 via Mellanox SX1036 40/56GbE switch)
* Storage network     - 192.168.1.0/24 (no gateway, VLAN 4 via Mellanox SX1036 40/56GbE switch)
* Public network      - 10.7.208.0/24  (gateway 10.7.208.1, untagged via the 1GbE switch)
* Private network     - <any>          (no gateway, use range of VLANs e.g. 5-15 via Mellanox SX1036 40/56GbE switch)

.. note:: Internet access is achieved via the Public network.

.. note:: All nodes should be connected to all networks (besides the Fuel node).

.. note:: The 1GbE switch configuration for the Public and Admin (PXE) networks are similar to examples 1 and 2 above.


**Network Configuration**

* Floating IP range 10.7.208.101-200
* DNS 8.8.4.4, 8.8.8.8
* Fuel server: Admin (PXE) IP 10.142.10.10/24

From server side (all nodes), ports with following VLAN IDs are used:

*  eth0 - Admin (PXE) - untagged
*  eth1 - Public - untagged
*  eth2 (40/56GbE port) - Management VLAN 3, Storage VLAN 4 (+ VLANS 5-15 for the private networks)

.. image:: /_images/user_screen_shots/interfaces_example.png
   :align: center
   :width: 75%

Here is an example of the network diagram:

.. image:: /_images/user_screen_shots/ha_high_perf.png
   :align: center

|
| **Rack Design**

Here is a recommended rack design configuration.
Design the rack as the 1G switches are on top, followed by the servers, then the 40/56GbE switch and then the storage server and JBODs.

.. image:: /_images/user_screen_shots/rack.png
   :align: center
   :width: 800px
   :height: 1150px
