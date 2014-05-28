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

Keystone assigned public ports to Ceph RadosGW
----------------------------------------------

In earlier releases,
Keystone assigned public ports to Ceph RadosGW communications,
which created a security vulnerability.
This has been fixed.
See `LP1285613 <https://bugs.launchpad.net/fuel/+bug/1285613>`_.

Network verification correctly verifies Neutron connectivity
------------------------------------------------------------

The Fuel "Verify Networks" function
now correctly verifies network connectivity on Neutron-enabled
deployments.
See the `Network checks for Neutron blueprint <https://blueprints.launchpad.net/fuel/+spec/network-checker-neutron-vlan>`_.

Network verification now works with Netgear gs108e switch
---------------------------------------------------------

Issues that prevented network verification from working
with the Netgear gs108e switch have been resolved.
See `LP1291655 <https://bugs.launchpad.net/fuel/+bug/1291655>`_.

Network validation now checks floating IP pools for Nova-network
----------------------------------------------------------------

Nova-network cannot use floating IP pools
that have names and do not use auto_assignment for the floating IP's.
Network validation now checks this.
See `LP1308541 <https://bugs.launchpad.net/fuel/+bug/1308541>`_.

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

Nodes deleted using Fuel CLI are now handled correctly
------------------------------------------------------

In earlier releases,
nodes that were deleted using the Fuel CLI
were listed as "PENDING DELETION" on the Fuel UI.
Nailgun now handles these deleted nodes properly:
if a node was never provisioned,
it is deleted from the cluster immediately;
if the node had been provisioned,
the "pending_deletion" flag is set
and the node is deleted after the environment is deployed.
See `LP1265036 <https://bugs.launchpad.net/fuel/+bug/1265036>`_.

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

"Stop Deployment" now works during operating system provisioning stage
----------------------------------------------------------------------

The "Stop Deployment" button was added to the Fuel UI
in Mirantis OpenStack 4.1;
see :ref:`Stop_Deployment`.
However, this failed if you attempted to stop the deployment
during the operating system provisioning phase
because the operating system remained in a state
where it could not receive commands over the network
until the entire operating system had been installed.
This has been resolved
and the "Stop Deployment" function
can now be used successfully at any time during the environment deployment.

SQLAlchemy connection pool is now tuned for the deployment
----------------------------------------------------------

The SQLAlchemy (and, if appropriate, the Neutron database pool)
are now tuned to scale
to better accomodate Nova-network, Neutron,
Cinder, and Glance on larger hardware configurations.
See `LP1274784 <https://bugs.launchpad.net/fuel/+bug/1274784>`_.

Nailgund now scales better for large environments
-------------------------------------------------

The nailgund daemon has been redesigned to better accomodate
environments with more than 50 nodes.
See `LP1274614 <https://bugs.launchpad.net/fuel/+bug/1274614>`_.
Additional improvements to the scalability of nailgund
are in development;
see the `Move nailgun to uwsgi blueprint <https://blueprints.launchpad.net/fuel/+spec/nailgun-move-to-uwsgi>`_.

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

Support for HP Smart Array CCISS devices has been restored
----------------------------------------------------------

Issues with support for HP Smart Array CCISS devices
have been resolved.
See `LP1291692 <https://bugs.launchpad.net/fuel/+bug/1291692>`_.

Fuel Master Node now runs on HP systems with Smart Array RAID hardware
----------------------------------------------------------------------

See `LP1312311 <https://bugs.launchpad.net/fuel/+bug/1312311>`_.

Fuel UI now represents multiple disks correctly for Ubuntu on Vbox
------------------------------------------------------------------

This bug occurred because the Ubuntu kernel maps all hard drives on Vbox
into one address (sysfs PATH_ID)
so, when multiple disks were configured,
all the links were mapped to this one address.
The solution was to rewrite Fuel so it identifies disks
by ID and path rather than using the path that Vbox populates.
See `LP1263648 <https://bugs.launchpad.net/fuel/+bug/1263648>`_.

Disk partitions are now unmounted before partitions are updated
---------------------------------------------------------------

With some RAID cards, the installer failed to update partitions
and file systems if any partition on the device was already mounted.
Fuel now unmounts all partitions on a disk
before creating new partitions on that device.
See `LP1297792 <https://bugs.launchpad.net/fuel/+bug/1297792>`_.

First controller fails to deploy when environment is restarted
--------------------------------------------------------------

IPs inside the HAProxy namespace could not be ping'ed
from inside the HAProxy namespace
because the loopback interface has not yet started.
This was fixed by starting the loopback driver
inside net.namespace when it is initially created.
See `LP1308356 <https://bugs.launchpad.net/fuel/+bug/1308356>`_.

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

RabbitMQ cluster no longer locks up when a member is removed
------------------------------------------------------------

Under certain conditions,
the RabbitMQ cluster locked up when a member was removed.
Upgrading the version of RabbitMQ used
in Mirantis OpenStack solved the problem.
See `LP1288831 <https://bugs.launchpad.net/fuel/+bug/1288831>`_.

Ceilometer (Resource Usage) tab is activated in Horizon
-------------------------------------------------------

The Ceilometer (Resource Usage) tab is restored to Horizon.
It was disabled in earlier releases to avoid another, more severe problem.
See `LP1284578 <https://bugs.launchpad.net/fuel/+bug/1284578>`_.

Kernel parameters are now set by Nailgun rather than grub
---------------------------------------------------------

Beginning with Mirantis OpenStack 5.0,
kernel parameters for nodes in an environment can be
provided on Settings tab of Fuel UI. This can be useful when
you need to set some special parameter to work around a bug.
See `LP1295131 <https://bugs.launchpad.net/fuel/+bug/1295131>`_.

Parsing errors in nova.conf have been fixed
-------------------------------------------

Parsing errors in the nova.conf file
that sometimes caused initialization errors for nova-compute
have been resolved.
See `LP1312627 <https://bugs.launchpad.net/fuel/+bug/1312627>`_.

Some disk drivers do not support a 4K sector size for XFS file systems
----------------------------------------------------------------------

The issue was worked around by using 512-byte sectors.
See `LP1316266 <https://bugs.launchpad.net/fuel/+bug/1316266>`_.

Health Check tests now work in slow environments
------------------------------------------------

Health Checks no longer fail if multiple environments are being
deployed or if the environments are slow.
