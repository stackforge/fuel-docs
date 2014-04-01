FlatDHCPManager (single-interface scheme)
-----------------------------------------

.. image:: /_images/flatdhcpmanager-sh_scheme.jpg
  :width: 100%
  :align: center

In order for FlatDHCPManager to work, one designated switch port where each 
Compute node is connected needs to be configured as tagged (trunk) port 
with the required VLANs allowed (enabled, tagged). Virtual machines will 
communicate with each other on L2 even if they are on different Compute nodes. 
If the virtual machine sends IP packets to a different network, they will be 
routed on the host machine according to the routing table. The default route 
will point to the gateway specified on the networks tab in the UI as the 
gateway for the Public network.
