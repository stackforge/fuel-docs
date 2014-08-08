
.. _mysql-galera-arch:

MySQL and Galera
================

My SQL with Galera implements true active/active HA.
Fuel configures MySQL/Galera to have a single active node
that receives write operations and serves read operations.
You can add one or two Galera slave nodes;
this is recommended for environments that have six or more nodes:

- Only one MySQL/Galera node is considered active at a time;
  the remaining cluster nodes are standby masters.
- The standby masters do not have the "slave lag"
  that is typical for MySQL master/slave topologies
  because Galera employs synchronous replication
  and ensures that each cluster node is identical.
- Mirantis OpenStack uses Pacemaker and HAProxy to manage MySQL/Galera:

  * Pacemaker manages the individual MySQL+Galera nodes, HAProxy,
    and the Virtual IP Address (VIP).
  * HAProxy runs in the dedicated network namespace
    and manages connections between the MySQL/Galera active master,
    backup masters, and the MySQL Clients connecting to the VIP.

- Only one MySQL/Galera master is active in the VIP;
  this single direction synchronous replication
  usually provides better performance than other implementations.

The workflow is:

- The node that is tied to the VIP serves new data updates
  and increases its global transaction ID number (GTID).
- Each other node in the Galera cluster then synchronizes its data
  with the node that has a GTID greater than its current values.
- If the status of any node falls too far behind the Galera cache,
  an entire replica is distributed to that node.
  This causes a master to switch to the Donor role,
  allowing an out-of-sync node to catch up.

