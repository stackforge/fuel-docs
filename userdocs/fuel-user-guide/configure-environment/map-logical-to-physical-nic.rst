
.. _map-logical-to-physical:

Map a logical network to a physical interface
---------------------------------------------

You may want to allocate specific network interfaces
to handle different types of network traffic to achieve better
performance in your OpenStack environment.
Fuel enables you to modify mappings for your entire network, except for the
*Admin* network for which you can make changes only during the Fuel
Master node installation.

Network interface mapping can be modified after you deploy an OpenStack
environment. The ``net-config`` task updates the networking configuration.

**To map a logical network to a physical interface:**

#. In the Fuel web UI, click :guilabel:`Nodes`.
#. Select a node.
#. Click :guilabel:`Configure Interfaces`.
#. Drag and drop a logical network to the corresponding physical interface
   or bond.
