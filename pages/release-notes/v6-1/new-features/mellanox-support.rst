.. _mellanox-support:

Infiniband support is enabled for nodes discovery
-------------------------------------------------

The nodes discovery is now enabled
over the prepared Infiniband network via Fuel over
Mellanox NICs with Infiniband support, after Mellanox Fuel
plugin installation. This means, the
Fuel Master node will discover and use EIPOIB daemon (Ethernet IP
Over Infiniband) interfaces for the network roles.
Note, that interface driver and bus information are now
available for all discovered NIC interfaces. For
detailed instructions, see *Verify Infiniband links for nodes*
section in the official `Mellanox <https://community.mellanox.com/docs/DOC-2165>`_
documentation.