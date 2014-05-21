
.. _router-plan:

Router
------

Your network must have an IP address set on a router
in the Public :ref:`logical-networks-arch`.
Without this, your VMs are unable to access the outside world.
In many of the examples provided in these documents, 
that IP is 12.0.0.1 in VLAN 101.

The Fuel UI includes a field on the networking tab for the gateway address.
When OpenStack deployment starts,
the network on each node is reconfigured
to use this gateway IP address as the default gateway.

If Floating addresses are from another L3 network,
then you must configure the IP address
(or multiple IPs if Floating addresses are from more than one L3 network)
for them on the router as well.
Otherwise, Floating IPs on nodes will be inaccessible.

Consider the following routing recommendations
when you configure your network:

-  Use the default routing via a router in the Public network
-  Use the the management network to access your management
   infrastructure (L3 connectivity if necessary)
-  The Storage and VM networks should be configured without access to
   other networks (no L3 connectivity)

.. image:: /_images/fuel-network-settings.png
   :width: 90%

.. image:: /_images/fuel-settings.png
   :width: 90%

.. image:: /_images/fuel-nodes.png
   :width: 90%

.. image:: /_images/fuel-nodes-selected.png
   :width: 90%

.. image:: /_images/fuel-node-network.png
   :width: 90%
