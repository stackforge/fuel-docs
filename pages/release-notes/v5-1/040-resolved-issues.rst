Issues Resolved in Mirantis OpenStack 5.1 and 5.0.2
===================================================

This section lists the issues that are resolved
in both the 5.1 and 5.0.2 releases of Mirantis OpenStack.

Multiple fixes to the built-in tests
------------------------------------

Improvements to Verify Network
------------------------------

The underlying algorithm used for the Verify Networks feature has been modified
to make it more stable and scalable.
Specifically, these changes resolve intermittent Verify Networks failures
that occurred on heavily-loaded systems.
See `LP1306705 <https://bugs.launchpad.net/fuel/+bug/1306705>`_
and `LP1330610 <https://bugs.launchpad.net/fuel/+bug/1330610>`_
for more details.

- **tcpdump** is now used to dump traffic during **net_probe**.
  This is more reliable than the Python libcap bindings
  that were used in earlier releases
  and catches both tagged and untagged traffic.

- The sender now generates traffic based on the time provided
  either using the --duration option or in the configuration file;
  default value is 20 seconds.
  In addition, a limited number of packets (default is 2)
  is sent per iface:vlan pair in each iteration.

- The net_check generator parameters are modified
  to make the duration of traffic generation 5 seconds
  and to send only one packet in each iteration.

Upgrade now puts a new fuelclient on Master Node
------------------------------------------------

The Fuel upgrade procedure now correctly puts
a new fuelclient on the Master Node.
See `LP1346247 <https://bugs.launchpad.net/fuel/+bug/1346247>`_.

Upgrade process now updates Murano database tables correctly
------------------------------------------------------------

Murano now uses Alembic migration rather than SQLAlchemy Migration,
which resolves problems
migrating Murano database tables.
See `LP1349377 <https://bugs.launchpad.net/fuel/+bug/1349377>`_.

RabbitMQ management plug-in idempotency issues are resolvled
------------------------------------------------------------

An idempotency issue that caused Puppet to try to enable
a management plug-in every time it ran has been resolved.
See `LP1355708 <https://bugs.launchpad.net/fuel/+bug/1355708>`_.

GUID is now set correctly for Ceph journals on Ubuntu
-----------------------------------------------------

In earlier releases,
when you had two or more devices configured as Ceph disk volumes
then configured a single continuous range of disks as a Ceph journal,
only the first journal was assigned the Ceph journal GUID.
This meant that the remaining Ceph disk volumes
were not configured with the separate journal device.
GUIDs are now assigned to all Ceph journal partitions.
See `LP1355342 <https://bugs.launchpad.net/fuel/+bug/1355342>`_.

Fix logging to multiple remote rsyslog servers
----------------------------------------------

No LP number.

The following issues were doc'ed as resolved in 5.0.1
under "Syslog log rotation on the Fuel Master Node":

Multiple inconsistencies in the syslog rotation implementation
are fixed:

- The syslog log rotation on the Fuel Master Node
  has been reimplemented to integrate docker logs with other logs,
  to add audit logs to the rotation,
  and to split client logs from server logs.
  See `LP1316957 <https://bugs.launchpad.net/fuel/+bug/1316957>`_.

- Issues that caused duplicated entries in syslog
  and that prevented the log rotation scheme from clearing these logs
  could cause the logs to grow to the point
  where they filled the file system on the Fuel Master Node.
  These have been fixed.
  See `LP1329991 <https://bugs.launchpad.net/bugs/1329991>`_.

syslog logging manifests are refactored
---------------------------------------

The syslog logging manifests are refactored
to use the new use_syslog_rfc_format configuration option from Oslo;
this replaces the python logging configurations
and rsyslog::imfile templates.
See `Refactor logging for puppet modules for openstack services
<https://blueprints.launchpad.net/fuel/+spec/refactor-logging-puppet-openstack-services>`_.

Fuel UI now displays logs for OpenStack services
------------------------------------------------

The Fuel UI now displays logs for OpenStack services.
This is possible because of the syslog refactoring discussed above.

Add modify_horizon_config script
--------------------------------


Use murano-db-manage to run updates
-----------------------------------

The **murano-db-manage** script is now used
to manage upgrades to the Murano database.
The **murano-manage** script is retained in the software
for background compatibility.
See `LP1358738 <https://bugs.launchpad.net/bugs/1358738>`_.

Floating IPs are created only after Keystone is ready
-----------------------------------------------------

Floating IPs are now created only after the Keystone service is fully initialized.
This solves problems in earlier releases
when a reload of the HAProxy service
sometimes caused HAProxy to return an empty response,
which prevented the nova-floating-range provider from authorizing with Nova.
See `LP1351253 <https://bugs.launchpad.net/bugs/1351253>`_
and `LP1348171 <https://bugs.launchpad.net/bugs/1348171>`_.

HAProxy runs Keystone background checks only after ensuring that Keystone is initialized
----------------------------------------------------------------------------------------
Timing issues involving HAProxy Keystone background checks and backend are resolved:

- HAProxy now ensures that Keystone is initialized
  before it runs background checks that specify wait-for-keystone.
  Failure to do this resulted in intermittent Keystone authorization failures.
  See `LP1352964 <https://bugs.launchpad.net/bugs/1352964>`_.

- The HAProxy Keystone backend is now configured
  before the Keystone service is initialized,
  which fixes timing issues that occurred in earlier releases
  when Keystone resources were sometimes created before Keystone was available.
  See `LP1357386 <https://bugs.launchpad.net/bugs/1357386>`_.

- Fix haproxy backend checks dependencies.  Listed separately but is it?

Swift ring is sync'ed only after all Swift packages are installed
-----------------------------------------------------------------

In earlier releases, an error sometimes occurred
when Puppet tried to rsync the Swift ring files
before all Swift packages were installed.
See `LP1360118 <https://bugs.launchpad.net/bugs/1360118>`_.

HAProxy now configures CFN and Cloudwatch API
---------------------------------------------

In earlier releases,
HAProxy did not configure the Heat services:
CFN and Cloudwatch API (on ports 8000 and 8003),
making them unavailable on the public interface.
See `LP1353358 <https://bugs.launchpad.net/bugs/1353358>`_.

RabbitMQ autoheal partitions are now turned on
----------------------------------------------

MySQL backend check dependency is fixed
---------------------------------------

nova_floating_range is now limited to primary Controller node
-------------------------------------------------------------

vcenter_hash is now set to empty hash by default
------------------------------------------------

All unmatched traffic is now dropped from iptables
--------------------------------------------------

iptables now allows GRE traffic
-------------------------------

rabbitmqctl status for RabbitMQ container is fixed
--------------------------------------------------

IP forwarding for ns_IPaddr2 resources is set up
------------------------------------------------

IP forwarding for ns_IPaddr2 resources is now set up in base system.
Without this, HAProxy running in its own namespace
could not access the external world
if net.ipv4.ip_forward == 0 was set in host system.
See `LP1342073 <https://bugs.launchpad.net/bugs/1342073>`_.
and `LP1340968 <https://bugs.launchpad.net/bugs/1340968>`_.


GSSAPI sshd authorization is disabled by default
------------------------------------------------

Additional diagnostic tools are added to CentOS nodes
-----------------------------------------------------

dump_cib method for Corosync service provider is fixed
------------------------------------------------------

Openstack services are no longer started as soon as they are installed on Ubuntu systems
----------------------------------------------------------------------------------------

Puppet installs the Fuel packages.
In earlier releases, the **upstart** process
then initialized the services in these packages
even though they had not yet been configured.
Earlier releases applied tweaks::ubuntu_service_override
for each package that contained a service to solve this issue.
Now, the **upstart** process waits for a service to be configured
before it starts it.
Note that this means that, if Ceph is used for volumes,
the cinder-volume overide is left on its own
until **rbd.pp** configures it.
See `LP1348185 <https://bugs.launchpad.net/bugs/1348185>`_.
and `LP1335804 <https://bugs.launchpad.net/bugs/1335804>`_.

More strong order in Neutron manifests
--------------------------------------

See `LP1328462 <https://bugs.launchpad.net/bugs/1328462>`_.

Neutron database is now created when deploying HA clusters
----------------------------------------------------------

In earlier releases,
the Neutron db migration scripts
were ignored when an HA cluster was deployed.
This was because the migration scripts depended on the neutron-server package,
which is installed as a dependency for the OVS server package,
so Puppet did not generate the necessary event
to trigger the creatng process.
The migration scripts are now install directly, without using Puppet.

AMQP heartbeat
--------------

[This resolution is in the HA-issues section]
See `LP1341656 <https://bugs.launchpad.net/mos/+bug/1341656>`_.

Fuel upgrade process includes non-explicit packages
---------------------------------------------------

In earlier releases, the Fuel upgrade process
only included packages that were explicitly referenced by Puppet manifests.
Other packages were left at the older version
unless an explicit package's requirements
pulled it in as a dependency.
Fuel now uses an explicit list of packages to be upgraded.
See `LP1359705 <https://bugs.launchpad.net/mos/+bug/1359705>`_.


All packages notify service to restart after upgrade
----------------------------------------------------

All packages installed by Fuel now notify their appropriate service
to restart after they are upgraded.
See `LP1362675 <https://bugs.launchpad.net/mos/+bug/1362675>`_.


Swift is now started as a service
---------------------------------

The swift-account-replicator service is refactored
to start Swift as a service rather than through exec.

Start service as a normal service instead of
using exec.

See `LP1363163 <https://bugs.launchpad.net/mos/+bug/1363163>`_.

Add hasrestart to some services
-------------------------------

(5.0.X backport)
Hasrestart makes Puppet use restart instead of stop
and start to manage a service and many init scripts
would work better if used like this.

See `LP1364119 <https://bugs.launchpad.net/mos/+bug/1364119>`_.

Fixed DB connection options
---------------------------

Changed placement of database settings
from DEFAULT to database section of the heat.conf * sql_connection option is deprecated
See `LP1364026 <https://bugs.launchpad.net/mos/+bug/1364026>`_.

* Deleting a snapshot now does not lead to removing its parent volume.
  See `LP1360173 <https://bugs.launchpad.net/fuel/+bug/1360173>`_.

* VM successfully starts when Ceph is used as a backend for ephemeral storage.
  See `LP1360000 <https://bugs.launchpad.net/fuel/+bug/1360000>`_.

* The command for initializing and upgrading Murano DB was changed.
  See `LP1358738 <https://bugs.launchpad.net/fuel/+bug/1358738>`_.

* Nova services are up after deployment.
  See `LP1355749 <https://bugs.launchpad.net/fuel/+bug/1355749>`_.

Issues Resolved in Mirantis OpenStack 5.1 but not 5.0.2
=======================================================

Fuel now enforces need for three MongoDB roles
----------------------------------------------

Fuel 5.0.1 installs :ref:`mongodb-term`
as a backend for :ref:`ceilometer-term`.
When installing OpenStack in HA mode,
at least three MongoDB roles must be configured;
Fuel 5.1 enforces this.
See `LP1338486 <https://bugs.launchpad.net/bugs/1338486>`_.

Fuel properly enforces quorum on Controller clusters
----------------------------------------------------

Fuel now resets the **no-quorum-policy="ignore"** property
in the :ref:`crm<crm-term>` configuration
after the environment is deployed.
This property is required to incrementally add Controllers into the cluster
but not resetting it after deployment
meant that restarting the Management network
resulted in no L3 agents running on any of the nodes in the cluster.
See `LP1348548 <https://bugs.launchpad.net/fuel/+bug/1348548>`_.

Diagnostic Snapshot now includes all appropriate logs
-----------------------------------------------------

The diagnostic snapshot has been modified
to capture logs in */var/log* that are only symbolic links
as well as the logs that are present in that directory.
See `LP1323436 <https://bugs.launchpad.net/bugs/1323436>`_
and `LP1318514 <https://bugs.launchpad.net/bugs/1318514>`_.

New Compute node can be deployed with CLI
-----------------------------------------

In earlier releases,
using the Fuel CLI to add a new Compute node to an environment
caused Puppet to run on all nodes in the environment.
Configuration information is now stored per node rather than per cluster
so that clusters can be managed seemlessly
using either the Fuel UI or the Fuel CLI.
See `LP1280318 <https://bugs.launchpad.net/fuel/+bug/1280318>`_.


The unsupported_hardware option is now supported
------------------------------------------------

The CentOS distribution used with Fuel does not support some recent CPUs
such as the latest Ultra Low Voltage (ULV) line by Intel
(Core iX-4xxxU, Haswell);
newer ultralite Ultrabooks are usually equipped with such CPUs.
As a result, the Fuel Master node
(which always runs the CentOS distribution)
could not be deployed on these systems.
Controller, Compute, and Storage nodes can use these systems
but they must use the Ubuntu distribution.

Fuel 5.1 now provides the **unsupported_hardware** command line option
that disables the warning that blocked Fuel installation.
You can also use a virtualization manager,
such as QEMU or KVM, to emulate an older CPU on such systems.
Note that VirtualBox has no CPU model emulation feature.
See `LP1322502 <https://bugs.launchpad.net/fuel/+bug/1322502>`_.

CentOS issues booting on some servers
-------------------------------------

Fuel can now deploy an environment on hardware
that is affected by a CentOS bug
(see `CentOS6492 <http://bugs.centos.org/view.php?id=6492>`_).
Cobbler now applies appropriate kernel parameters to the deployment
to avoid these boot issues.
See `LP1312671 <https://bugs.launchpad.net/fuel/+bug/1312671>`_.

Brocade and Broadcom 10gig NICs can now be configured from the Fuel UI
----------------------------------------------------------------------

Packages have been added so that the bootstrap process
can detect Brocade and Broadcom 10gig NICs,
which allows them to be configured from the Fuel UI.
In earlier releases,
brocade NICS to be included in the environment
these NICS had to be configured using the Fuel CLI.
See `LP1260492 <https://bugs.launchpad.net/fuel/+bug/1260492>`_.

Controllers can be deployed in parallel
---------------------------------------

Multiple controllers can now be deployed in parallel rather than sequentially.
This decreases the deployment time.
See `LP1310494 <https://bugs.launchpad.net/fuel/+bug/1310494>`_.

Glance properly sends notifications to Ceilometer
-------------------------------------------------

Modifications have been made to the notification driver
and strategy values
so that Glance now sends notifications to Ceilometer.
This means that  notifications such as "image.update" and "image.upload"
are now reported in the "ceilometer meter-list" output.
See `LP1314196 <https://bugs.launchpad.net/fuel/+bug/1314196>`_.

Neutron metadata agent now uses RPC to connect to the server
------------------------------------------------------------
Neutron metadata agent used to connect to Neutron server via REST API with
python-neutronclient; Keystone was involved into the whole process.
See `LP1364348 <https://bugs.launchpad.net/fuel/+bug/1364348>`_.

Other resolved issues
---------------------

* Extra RabbitMQ copy, used for message exchange between Murano and VMs,
  now starts and OS deployment finishes successfully.
  See `LP1360264 <https://bugs.launchpad.net/fuel/+bug/1360264>`_.

* After primary controller is rebooted, volumes are creating without stacking
  in creating state. See `LP1355792 <https://bugs.launchpad.net/fuel/+bug/1355792>`_.

* Murano no longer reports about successful deployment without actual deployment.
  See `LP1355658 <https://bugs.launchpad.net/fuel/+bug/1355658>`_.

* Horizon dashboard displays environment's name correctly after deployment.
  See `LP1355270 <https://bugs.launchpad.net/fuel/+bug/1355270>`_.

* Active Directory now deploys successfully.
  See `LP1355202 <https://bugs.launchpad.net/fuel/+bug/1355202>`_.

* After rebooting Cinder node, attached iSER volumes work without failures.
  See `LP1353576 <https://bugs.launchpad.net/fuel/+bug/1353576>`_.

* OpenStack Heat configuration points to controller's IP address
  instead of pointing to a local host.
  See `LP1352444 <https://bugs.launchpad.net/fuel/+bug/1352444>`_.

* Multiple EDP jobs were fixed.
  See `LP1352311 <https://bugs.launchpad.net/fuel/+bug/1352311>`_.

* HTTP session now does not close in Ambari plugin. See
  `LP1352310 <https://bugs.launchpad.net/fuel/+bug/1352310>`_.

* Instances successfully reach network.
  See `LP1352203 <https://bugs.launchpad.net/fuel/+bug/1352203>`_.

* Openibd Mellanox driver now starts before Open vSwitch does.
  See `LP1351852 <https://bugs.launchpad.net/fuel/+bug/1351852>`_.

* Murano DB migrates on CentOS without failures.
  See `LP1350819 <https://bugs.launchpad.net/fuel/+bug/1350819>`_.

* Neutron server starts without finding several metadata agents error.
  See `LP1350045 <https://bugs.launchpad.net/fuel/+bug/1350045>`_.

* Logic of Murano status page was fixed.
  See `LP1349922 <https://bugs.launchpad.net/fuel/+bug/1349922>`_.

* After failover OSFT tests are passed successfully at Cinder.
  See `LP1349760 <https://bugs.launchpad.net/fuel/+bug/1349760>`_.

* Live migration works with NFS shared storage.
  See `LP1346621 <https://bugs.launchpad.net/fuel/+bug/1346621>`_.






  
 
