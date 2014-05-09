Issues Resolved in Mirantis OpenStack 5.0
=========================================

Sahara logging now works correctly
----------------------------------

Issues with Sahara logging are resolved.
See `LP1285766 <https://bugs.launchpad.net/fuel/+bug/1285766>`_
and `LP1288475 <https://bugs.launchpad.net/fuel/+bug/1288475>`_.

Murano OSTF test for Linux Apache Service no longer fails
---------------------------------------------------------

Problems that caused the Murano OSTF test
for the Linux Apache service to fail with an AssertionError
have been resolved.
See `LP1271089 <https://bugs.launchpad.net/fuel/+bug/1271089>`_.

Ceph RadosGW sometimes failed to start on some controllers
----------------------------------------------------------

In HA mode, RadosGW services occasionally failed
on some controller nodes during deployment;
this could be fixed by manually starting the rados-gw service.
The issue has been resolved.
See `LP1261955 <https://bugs.launchpad.net/fuel/+bug/1261966>`_.

Network verification correctly verifies Neutron connectivity
------------------------------------------------------------

The Fuel "Verify Networks" function
now correctly verifies the connectivity of the underlying Neutron network,
no matter which bridge is used on the target nodes.
See the `Network checks for Neutron blueprint <https://blueprints.launchpad.net/fuel/+spec/network-checker-neutron-vlan>`_.

Compute nodes with running instances can now be redeployed
----------------------------------------------------------

In earlier releases,
environments that contained Compute nodes with running instances
could not be redeployed
because the Puppet iptables-firewall module
did not correctly prefetch OpenStack firewall rules.
This was fixed by adding MAC match support to the firewall module,
which fixes parsing errors and allows for rules with MAC matches.
The neutron-ovs-agent on compute nodes is also notified
so it can delete saved rules from old and removed instances.
See `LP1308963 <https://bugs.launchpad.net/fuel/+bug/1308963>`_.

MySQL reconnect now catches 1047 errors
---------------------------------------

In earlier releases,
the MySQL 1047 error (unknown command)
that occurred after the :ref:`galera-cluster-term`
was in non-primary state.
This could cause the cluster to be non-functional
even after Galera functionality is restored.
See `LP1312212 <https://bugs.launchpad.net/fuel/+bug/1312212>`_.

Tools are now provided to delete expired tokens in the Keystone database
------------------------------------------------------------------------

The Keystone service creates a large number of tokens
in the Keystone database;
if expired tokens are not deleted regularly,
system performance degrades significantly
and the Keystone service will eventually fail
because there is no room in the database for new tokens.
See :ref:`keystone-tokens-perform` for information about
deleting expired tokens from the Keystone database.
This issue is tracked in
`LP1269819 <https://bugs.launchpad.net/fuel/+bug/1269819>`_.

"Stop Deployment" now works during operating system deployment stage
--------------------------------------------------------------------

The "Stop Deployment" button was added to the Fuel UI
in Mirantis OpenStack 4.1;
see :ref:`Stop_Deployment`.
However, this failed if you attempted to stop the deployment
during the operating system deployment phase
because the operating system remained in a state
where it could not receive commands over the network
until the entire operating system had been installed.
This has been resolved
and the "Stop Deployment" function
can now be used successfully at any time during the deployment.

SQLAlchemy connection pool is now tuned for the deployment
----------------------------------------------------------

The SQLAlchemy (and, if appropriate, the Neutron database pool)
are now tuned to scale
to better accomodate Nova-network, Neutron,
Cinder, and Glance on larger hardware configurations.
See `LP1274784 <https://bugs.launchpad.net/fuel/+bug/1274784>`_.

GRO on NICs is now disabled when using the Neutron GRE network topology
-----------------------------------------------------------------------

Fuel now turns off GRO (generic receive offload) on physical NICs
when using the Neutron GRE network topology.
In earlier releases, GRO could be turned off using the ethtool command
but this did not persist across reboots.
The result was serious performance degradation for
communication among OpenStack VMs
and between OpenStack VMs and the outside world.
See `LP1275650 <https://bugs.launchpad.net/fuel/+bug/1275650>`_.

Number of RabbitMQ file descriptors has been increased
------------------------------------------------------

The default number of RabbitMQ file descriptors has been increased
to ensure that enough file descriptors are available
to support communications between the OpenStack services.
In earlier releases, this caused a number of problems.
The most serious situation affected
communications between RabbitMQ and HAProxy.
HAProxy is configured so that
the primary controller is the only active member;
other controllers are backups.
When RabbitMQ runs out of file descriptors,
it still accepts connections
but it is not able to process them.
This means that HAProxy does not know that RabbitMQ is down
and continues to funnel all connections to the primary controller.
Eventually none of the OpenStack sercies can talk to RabbitMQ
and the entire cluster stops working.
Increasing the default size of the pool of file descriptors
greatly reduces the possibility of this happening.
See `LP1275650 <https://bugs.launchpad.net/fuel/+bug/1275650>`_.

Ceilometer (Resource Usage) tab is activated in Horizon
-------------------------------------------------------

The Ceilometer (Resource Usage) tab is restored to Horizon.
It was disabled in earlier releases to solve another problem.
See `LP <https://bugs.launchpad.net/fuel/+bug/1284578>`_.
