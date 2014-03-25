GRE Segmentation
^^^^^^^^^^^^^^^^

Depdnding on the number of NICs you have in your node servers, you can use the
foldowing examples to plan your NIC assignment:

2  NIC deployment 

-  eth0 - untagged port for Administrative network
-  eth1 (br-eth1) - port for networks: Public/Floating, Management,
   Storage

.. image:: /_images/preinstall_d_gre_2nics.png
   :align: center
   :width: 50%

3  NIC deployment 

-  eth0 - untagged port for Administrative network
-  eth1 (br-eth1) - port for networks: Public/Floating, Management
-  eth2 (br-eth2) - port for Storage network

.. image:: /_images/preinstall_d_gre_3nics.png
   :align: center
   :width: 50%

4  NIC deployment 

-  eth0 - untagged port for Administrative network
-  eth1 (br-eth1) - port for Management network
-  eth2 (br-eth2) - port for Public/Floating network
-  eth3 (br-eth3) - port for Storage network

.. image:: /_images/preinstall_d_gre_4nics.png
   :align: center
   :width: 50%

Routing recommendations

-  Use the default routing via router in the Public network
-  Use the management network access to your management infrastructure (L3
   connectivity if necessary) 
-  The administrative network or only Fuel server (via dedicated NIC)
   should have Internet access
-  The Storage and Private network (VLANs) should be configured
   without access to other networks (no L3 connectivity)
