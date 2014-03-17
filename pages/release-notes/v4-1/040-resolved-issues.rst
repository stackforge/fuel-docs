Issues Resolved in Mirantis OpenStack 4.1
=========================================

Ceph acting as a backend for ephemeral volumes is no longer experimental
------------------------------------------------------------------------

Starting with Mirantis OpenStack 4.0,
Mirantis enables the Nova (Compute) service in Mirantis OpenStack
to support VM instances backed by ephemeral volumes stored in Ceph.
With Glance, Cinder, and Nova all supporting the Ceph RBD backend,
OpenStack VM instances can take advantage of Ceph clustered storage capabilities
through all of the steps of their life cycle.
Ephemeral volumes can be created as copy-on-write clones of Glance images,
recovered from Compute node failures thanks to Ceph object replication,
and shared among Compute nodes to enable live migration of VMs.

In Mirantis OpenStack 4.0,
a `known Ceph issue <http://tracker.ceph.com/issues/5426>`_
could have led to a
`Ceph SEGV error <https://bugs.launchpad.net/fuel/+bug/1260911>`_
while extracting cloned images from RBD,
which left a small possibility that an ephemeral volume became corrupted.
This issue has been corrected in Mirantis OpenStack 4.1 and the feature is now fully supported.

The Ceilometer section within Horizon is now enabled by default
---------------------------------------------------------------

The Ceilometer integration with Horizon in OpenStack Havana
had a known issue
`(LP1260528) <https://bugs.launchpad.net/horizon/+bug/1260528>`_
that the metering panel in Horizon
required the ‘metadata_query’ Ceilometer feature
that was not supported by Ceilometer with the MySQL driver.
This issue has now been resolved.

However, there is still a known issue
`(OpenStack 60317) <https://review.openstack.org/#/c/60317/>`_
that deleting the statistics tables from the resource usage page
causes the tables to interpret some of the statistics incorrectly,
and in some cases it is not possible to get certain statistics.
The panels with these tables are not included in the OpenStack Havana release.

When Neutron agents fail, they now restart automatically
--------------------------------------------------------

PID matching for Pacemaker scripts for managing Neutron agents
now uses the correct options to find the process ID for each Neutron agent.

Ubuntu deployment no longer fails because of NIC ordering issues
----------------------------------------------------------------

Mirantis OpenStack sometimes failed to deploy on Ubuntu
because the Ubuntu kernel uses different ordering rules to detect NICS
compared to the CentOS kernel used by the Mirantis OpenStack bootstrap image.
This has been corrected in Fuel 4.1
by adding explicit interface ordering
and identifying the hardware address that correspond to the admin interface.

Ubuntu deployment no longer fails due to disk ordering
------------------------------------------------------

After deploying Mirantis OpenStack on Ubuntu,
a single disk device showed when listed by path no matter what was configured;
disks iterated by ID produces a correct list.
The problem did not occur on CentOS.
The logic used to identify disks during bootstrap has been updated
so that the proper number of disk nodes of the specified sizes are deployed on Ubuntu.
As background, Fuel and Mirantis OpenStack use the CentOS bootstrap image for hardware discovery.
The Ubuntu kernel uses a different mechanism,
mapping all hard drives on Vbox into a single address (sysfs PATH_ID).
When the udev daemon creates by-path links,
it rewrites the previous links with the new ones,
resulting in a single by-path link for each sdc hard drive.
Fuel 4.1 includes an internal workaround
so that the number and sizes of the disk nodes match what is configured,
although the internal IDs are different after deployment.
See `LP1263648 <https://bugs.launchpad.net/fuel/+bug/1263648>`_.

Verify Networks now correctly finds DHCP servers
------------------------------------------------

The DHCP checker timeout was increased to 10 seconds per interface
to ensure adequate time for DHCP servers to respond.
See `LP1247284 <https://bugs.launchpad.net/fuel/+bug/1247284>`_.

Fuel can be installed in closed network without NTP
---------------------------------------------------

This solution allows users installing in a closed environment
to proceed with Mirantis OpenStack installation when there is no Internet access.
Earlier releases required that an external NTP server be configured
in order to install Mirantis OpenStack.
Note that there may be issues with time synchronization if NTP is not configured.
See `LP1263934 <https://bugs.launchpad.net/fuel/+bug/1263934>`_.

Health Checks for Heat have been fixed for non-HA reference architectures
-------------------------------------------------------------------------

Because of Fuel's network architecture,
it was previously not possible to access the Heat API via a proxy connection.
Now that the Heat client has been updated,
Heat tests work as expected in non-HA reference architectures.
An anomaly still occurs during testing within an HA reference architecture,
so this test is not run against environments deployed as Highly Available.
See `LP1264123 <https://bugs.launchpad.net/fuel/+bug/1264123>`_.

Hardcoded "admin" tenant no longer breaks Neutron default networks
------------------------------------------------------------------

Neutron default networks (net04 and net04-ext) are now properly created
if a user changes the name of the default tenant.
See `LP1267431 <https://bugs.launchpad.net/fuel/+bug/1267431>`_.

Ceph now works properly after primary controller failure
--------------------------------------------------------

Ceph configuration is now updated to contain
the full list of MON nodes when deploying Ceph in HA.
See `LP1268579 <https://bugs.launchpad.net/fuel/+bug/1268579>`_.

Fuel master allocates the proper number of IP addresses for the admin network
-----------------------------------------------------------------------------
Only one IP address is now allocated in the admin network,
which corresponds to the MAC of the network interface
that was identified during the bootstrap discovery process.

Multiple network roles can share a single physical NIC
------------------------------------------------------
In Mirantis OpenStack 4.1,
the  earlier restrictions about networks sharing a physical NIC are removed.
One NIC can be used for all networks --
including Admin(PXE), Private, Storage, Management, and Public --
when using either Nova-network or Neutron with GRE/VLAN segmentation.

Note that, in a production environment,
the public network should never share an L2 broadcast domain
with the Admin(PXE) for security reasons.
Also note that, depending on the load and the hardware used,
having many connections share one physical NIC might degrade performance.

Nova quotas no longer interfere with load testing
-------------------------------------------------

By default, Mirantis OpenStack now configures deployment with Nova quotas disabled.
This allows for load testing and improves performance.
Nova quotas are disabled by default
but can be enabled by checking the option in the Settings Tab of an environment.
See `LP1275987 <https://bugs.launchpad.net/fuel/+bug/1275987>`_.

RabbitMQ now allocates adequate file descriptors
------------------------------------------------

In earlier releases, RabbitMQ sometimes failed
because the kernel did not have enough file descriptors to support its activities.
To solve this problem, the */etc/default/rabbitmq-server* file
now sets the value of the kernel ulimit parameter to support more open FDs.
See `LP1279594 <https://bugs.launchpad.net/fuel/+bug/1279594>`_.

Controller nodes can be added to an existing deployment
-------------------------------------------------------

Controllers can once again be added to an existing environment.
However, in a multi-node HA environment,
all controllers are re-deployed as part of the operation.
Other node roles (Compute, Cinder, Ceph) are not disrupted.

/etc/hosts now updated after adding new nodes
---------------------------------------------
All */etc/hosts* information is stored locally on every node
to minimize the impact of losing a DNS server on the cluster.
Now pre-existing hosts are updated with the latest host record data
whenever new nodes are added or removed.
See `LP1272841 <https://bugs.launchpad.net/fuel/+bug/1272841>`_.

Objects can be put into Ceph using RadosGW without producing 400 error
----------------------------------------------------------------------

In previous release, putting an object into Ceph using RadosGW caused a 400 error.
This has been corrected.
See `LP1276187 <https://bugs.launchpad.net/fuel/+bug/1276187>`_.

