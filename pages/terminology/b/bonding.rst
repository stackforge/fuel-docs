
.. _bonding-term:

Bonding
-------

NIC Bonding (also called NIC Aggregation)
aggregates multiple physical links to one link
to increase speed and provide fault tolerance.
Mirantis OpenStack uses :ref:`ovs-term`
to implement NIC bonding.

See :ref:`nic-bonding-ui`
for instructions about implementing bonding
through the Fuel UI.
Mirantis OpenStack supports bonding in the following modes:
Active-backup, Balance SLB (Source Level Bonding),
and Balance TCP with LACP (Link Aggregation Control Protocol).
The Fuel UI requires LACP to implement the Balance TCP mode.

