Example 2: HA + Neutron with GRE
--------------------------------
As a model example, the following configuration is used:

* **Deploying mode:** Multi-node HA

* **Networking model:** Neutron with GRE

**Hardware and environment:**

* 7 servers with two 1Gb/s ethernet NIC and IPMI
* 1 Cisco Catalyst 3750 switch
* Independent out of band management network for IPMI
* Connection to the Internet or/and DC network via a router called
  **Gateway** and IP 172.16.1.1

**Node servers roles:**

* 1 server as Fuel Node
* 3 servers as Controller Node
* 1 server as Cinder Node
* 2 servers as Compute Node

**Network Configuration Plan:**

* Floating/Public network 172.16.0.0/24 in VLAN 100 (untagged on
  servers)
* Floating IP range 172.16.0.130 - 254
* Internal network (private) 192.168.111.0/24
* Gateway 192.168.111.1
* DNS 8.8.4.4, 8.8.8.8
* Tunnel ID range 2 - 65535
* Management network 192.168.0.0/24 in VLAN 101
* Storage network 192.168.1.0/24 in VLAN 102
* Administrative network (for Fuel) 10.20.0.0/24 in VLAN 103

**Network Parameters**

* Fuel server: IP 10.20.0.2/24
* Default gateway: 10.20.0.1
* DNS: 10.20.0.1

.. note:: The Internet and rest of DC access via Public network (for OpenStack
          Nodes) and Administrative network (Fuel server).

From server side, ports with following VLAN IDs are used:

*  eth0 - Administrative VLAN 103 (untagged)
*  eth1 - Public/Floating VLAN 100 (untagged), Management VLAN 101
   (tagged), Storage VLAN 102 (tagged)
