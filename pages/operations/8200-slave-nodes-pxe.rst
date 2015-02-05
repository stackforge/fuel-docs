.. _8200-slave-nodes-pxe:

How slave nodes choose the interface to use for PXE booting
===========================================================

Fuel configures the NIC named/order based on the data seen by the
Nailgun agent (*/opt/nailgun/bin/agent*) on the discovered nodes.
This is in turn the result of how the NICs are named/ordered on
by the bootstrap node.

The device used by the Admin (PXE) network will be the
interface that is directly attached to this network.
If one is not available, it will fall back to the interface
with the default gateway.

For example:

+---------------+----------+------+
|Physical device|Interface |MAC   |
+---------------+----------+------+
|0              |eth0      |:FE:A0|
+---------------+----------+------+
|1              |eth1      |:BC:6D|
+---------------+----------+------+
|2              |eth2      |:E1:B2|
+---------------+----------+------+

If physical device 0 is connected to the Admin PXE network,
then eth0 will be the admin interface in Fuel.

If instead physical device 1 is connected to the Admin PXE network,
then eth1 will be the admin interface in Fuel.

A common issue here is that physical device 0,
may not always be assigned device eth0.
You may see:

+---------------+----------+------+
|Physical device|Interface |MAC   |
+---------------+----------+------+
|0              |eth2      |:FE:A0|
+---------------+----------+------+
|1              |eth0      |:BC:6D|
+---------------+----------+------+
|2              |eth1      |:E1:B2|
+---------------+----------+------+

In this case, having physical device 0 connected to
the Admin PXE network will result in the eth2 interface
being used as the admin interface in Fuel.

You can confirm that the right interface
is in use because the MAC address did not change even though
the device name did.


