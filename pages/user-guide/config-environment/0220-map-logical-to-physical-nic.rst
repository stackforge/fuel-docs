
.. _map-logical-to-physical:

Mapping logical networks to physical interfaces on servers
----------------------------------------------------------

Fuel allows you to use different physical interfaces
to handle different types of traffic;
see :ref:`logical-networks-arch` for more information.
A logical network can be mapped
to either a NIC or to a bond of NICs.

To access this screen,
to open the physical interfaces configuration screen.
selecting a node or nodes and click the "Configure Interfaces" button.
You can also access this screen
by clicking the gear wheel to the right of the node listing;
in the detailed information window that is displayed,
click the "Configure Interfaces" button.

.. image:: /_images/network_settings.jpg
  :align: center
  :width: 100%

On this screen,
you can drag-and-drop logical networks to physical interfaces
according to your network setup.

All logical networks other than the Admin ("Fuel") network
are presented on the screen.
It runs on the physical interface from which the node was initially PXE booted,
In the current version, it cannot be mapped onto any other physical interface.

Note that, once the network is configured and OpenStack is deployed,
you may not modify network settings,
even to move a logical network to another physical interface or VLAN number.
