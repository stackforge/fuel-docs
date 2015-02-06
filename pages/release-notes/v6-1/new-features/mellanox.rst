.. _mellanox-support:

Infiniband support is enabled for nodes discovery
-------------------------------------------------

Beginning with 6.1 release, nodes discovery is supported
over the prepared Infiniband network via Fuel (with preconfigured
and running IB switch and Subnet Manager). This means, the
Fuel Master node will discover and use EIPOID daemon (Ethernet IP
Over Infiniband) interfaces for the network roles.
Note, that interface driver and bus information are now
available for all discovered NIC interfaces. For
detailed instructions, see *Verify Infiniband links for nodes*
section in the official `Mellanox <https://community.mellanox.com/docs/DOC-2036>`_
documentation. 