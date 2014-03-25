Example 1: HA + Nova-network FlatDHCP manager
---------------------------------------------

As a model example, the following configuration is used:

* **Deployment mode:** Multi-node HA

* **Networking model:** Nova-network FlatDHCP manager

**Hardware and environment:**

* 7 servers with two 1Gb/s Ethernet NIC and IPMI
* 1 Cisco Catalyst 2960G switch
* Independent out of band management network for IPMI
* Connection to the Internet or/and DC network via a router called
  **Gateway** and IP 172.16.1.1

**Node Server roles:**

* 1 server as Fuel Node
* 3 servers as Controller Node
* 1 server as Cinder Node
* 2 servers as Compute Node


**Network configuration plan:**

* Public network 172.16.1.0/24
* Floating network 172.16.0.0/24 in VLAN 100
* Management network 192.168.0.0/24 in VLAN 101
* Storage network 192.168.1.0/24 in VLAN 102
* Private (Fixed) network 10.0.0.0/24 in VLAN 103
* Administrative network (for Fuel) 10.20.0.0/24 in VLAN 104

**Network Parameters:**

* Fuel server IP: 10.20.0.2/24
* Default gateway: 10.20.0.1
* DNS 10.20.0.1

.. note:: The Internet and rest of DC access is available through the  Public
          network (for OpenStack Nodes) and Administrative network (Fuel server)

From the server node side, ports with the following VLAN IDs for
networks are used:

* eth0 -  Management VLAN 101 (tagged), Storage VLAN 102(tagged) and Administrative VLAN 104 (untagged)

* eth1 -  Public/Floating VLAN 100 (tagged), Private VLAN 103 (tagged)

