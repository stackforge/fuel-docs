
.. _nova-config-vlan:

Nova-network VLAN Manager
-------------------------

Depending on the number of NICs you have in your node servers,
you can use the following examples to plan your NIC assignment
to the OpenStack :ref:`logical-networks-arch`:

1 NIC deployment

-  eth0 - VLAN tagged port for networks: Storage, Public/Floating,
   Private  (where the number of VLANs depends on the number of tenant
   networks with a continuous range), Management and Administrative
   network (untagged)

2 NIC deployment

-  eth0 - Management network (tagged), Storage network (tagged) and
   Administrative network  (untagged)  
-  eth1 - VLAN tagged port with minimum two VLANs for networks:
   Public/Floating, Private (where number of VLANs depend on number of
   tenant networks - continuous range)

3 NIC deployment

-  eth0 - untagged port for Administrative network
-  eth1 - VLAN tagged port with two VLANs for networks: Public/Floating,
   Management Private (where the number of VLANs depends on the number
   of tenant networks with a continuous range)
-  eth2 - untagged port for Storage network

4 NIC deployment

-  eth0 - untagged port for Administrative network
-  eth1 - tagged port for networks: Public/Floating, Management
-  eth2 - VLAN tagged port for Private network, with defined VLAN range
   IDs - continuous range
-  eth3 - untagged port for Storage network

Routing recommendations

-  Use the default routing via a router in the Public network
-  Use the the management network to access to your management
   infrastructure (L3 connectivity if necessary)
-  The administrative network or only the Fuel server (via dedicated
   NIC) should have Internet access
-  The Storage and Private network (VLANs) should be configured without
   access to other networks (no L3 connectivity)

