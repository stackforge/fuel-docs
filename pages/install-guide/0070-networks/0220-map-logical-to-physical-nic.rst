Mapping logical networks to physical interfaces on servers
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

Fuel allows you to use different physical interfaces to handle different 
types of traffic. When a node is added to the environment, click at the bottom 
line of the node icon. In the detailed information window, click the "Configure 
Interfaces" button to open the physical interfaces configuration screen.

.. image:: /_images/network_settings.jpg
  :align: center
  :width: 100%

On this screen you can drag-and-drop logical networks to physical interfaces 
according to your network setup. 

All networks are presented on the screen, except Fuel.
It runs on the physical interface from which node was initially PXE booted,
and in the current version it is not possible to map it on any other physical 
interface. Also, once the network is configured and OpenStack is deployed,
you may not modify network settings, even to move a logical network to another 
physical interface or VLAN number.
