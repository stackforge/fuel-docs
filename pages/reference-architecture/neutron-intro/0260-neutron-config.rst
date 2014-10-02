
.. _neutron-config-vlan:

Neutron VLAN Segmentation Planning
++++++++++++++++++++++++++++++++++

Depending on the number of NICs you have in your node servers,
you can use the following examples to plan your NIC assignment
to the OpenStack :ref:`logical-networks-arch`.
Note that you must have at least three NICS configured
to use the Neutron VLAN topology.

3 NIC deployment

-  eth0 - untagged port for Administrative network
-  eth1 (br-eth1) - port for networks: Public/Floating, Management,
   Storage
-  eth2 (br-eth2) - port for Private network (where the number of VLANs
   depends on the number of tenant networks with a continuous range)

.. image:: /_images/preinstall_d_vlan_3nics.png
   :width: 50%

4 NIC deployment

-  eth0 - port for Administrative network
-  eth1 (br-eth1) - port for networks: Public/Floating, Management
-  eth2 (br-eth2) - port for Private network, with defined VLAN range
   IDs
-  eth3 (br-eth1) - port for Storage network

.. image:: /_images/preinstall_d_vlan_4nics.png
   :width: 50%

Routing recommendations

-  Use the default routing via a router in the Public network
-  Use the the management network to access to your management
   infrastructure (L3 connectivity if necessary)
-  The administrative network or only the Fuel server (via dedicated
   NIC) should have Internet access
-  The Storage and Private network (VLANs) should be configured without
   access to other networks (no L3 connectivity)

.. _neutron-config-gre:

Neutron GRE Segmentation Planning
+++++++++++++++++++++++++++++++++

Depending on the number of NICs you have in your node servers, you can use the
following examples to plan your NIC assignment:

2  NIC deployment 

-  eth0 - untagged port for Administrative network
-  eth1 (br-eth1) - port for networks: Public/Floating, Management,
   Storage

.. image:: /_images/preinstall_d_gre_2nics.png
   :width: 50%

3  NIC deployment 

-  eth0 - untagged port for Administrative network
-  eth1 (br-eth1) - port for networks: Public/Floating, Management
-  eth2 (br-eth2) - port for Storage network

.. image:: /_images/preinstall_d_gre_3nics.png
   :width: 50%

4  NIC deployment 

-  eth0 - untagged port for Administrative network
-  eth1 (br-eth1) - port for Management network
-  eth2 (br-eth2) - port for Public/Floating network
-  eth3 (br-eth3) - port for Storage network

.. image:: /_images/preinstall_d_gre_4nics.png
   :width: 50%

Routing recommendations

-  Use the default routing via router in the Public network
-  Use the management network access to your management infrastructure (L3
   connectivity if necessary)
-  The administrative network or only Fuel server (via dedicated NIC)
   should have Internet access
-  The Storage and Private network (VLANs) should be configured
   without access to other networks (no L3 connectivity)
