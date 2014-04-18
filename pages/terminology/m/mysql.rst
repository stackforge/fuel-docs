
.. _mysql-term:

MySQL
------
The database most frequently used in OpenStack deployments.
The MySQL database runs on the controller node;
MySQL client software must be installed on other nodes
that access the MySQL database.

For HA deployments,
Mirantis OpenStack uses Pacemaker/Corosync
to provide redundancy and failover capabilities
for MySQL.
Mirantis OpenStack uses MySQL/Galera for database replication
in HA deployments that use the CentOS or Ubuntu kernel;
see `Preparing MySQL for Pacemaker high availability <http://docs.openstack.org/trunk/openstack-ops/content/security_groups.html>`_.

