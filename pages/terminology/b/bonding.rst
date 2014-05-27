
.. _bonding-term:

Bonding
-------

NIC Bonding (also called NIC Aggregation)
uses :ref:`ovs-term`  to aggregate multiple physical links to one link
to increase speed and provide fault tolerance.
See :ref:`nic-bonding-ui`.

Bonding is supported in the following modes:
Active-backup, Balance SLB (Source Level Bonding),
and Balance TCP with LACP (Link Aggregation Control Protocol).

The Fuel UI prevents you from configuring Bonding TCP by itself, without LACP.

