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

* Nova services are up after deployment.
  See `LP1355749 <https://bugs.launchpad.net/fuel/+bug/1355749>`_.

* During rollback and/or patching, there are no errors with "neutron-db-manage upgrade head".
  See `LP1365607 <https://bugs.launchpad.net/fuel/+bug/1365607>`_.

* User can retry patching of OpenStack environment, e.g. when updating from 5.0 to 5.0.2.
  See `LP1365464 <https://bugs.launchpad.net/fuel/+bug/1365464>`_.
  
* Secondary controllers are deployed using sequential logic for 5.0.x clusters.
  See `LP1364519 <https://bugs.launchpad.net/fuel/+bug/1364519>`_.

* Rollback goes without failures on Mongo node.
  See `LP1360289 <https://bugs.launchpad.net/fuel/+bug/1360289>`_.

* 'Fixed network CIDR' parameter is now accepted.
  See `LP1357350 <https://bugs.launchpad.net/fuel/+bug/1357350>`_.

* Murano dashboard updates successfully.
  See `LP1356921 <https://bugs.launchpad.net/fuel/+bug/1356921>`_.

* Waiting for HAProxy mysqld backend now relies on HAProxy service for mysqld.
  See `LP1356748 <https://bugs.launchpad.net/fuel/+bug/1356748>`_.

* Pacemaker service provider has correct race condition.
  See `LP1355816 <https://bugs.launchpad.net/fuel/+bug/1355816>`_.

* OSTF tests succeed in Simple Neutron GRE.
  See `LP1355794 <https://bugs.launchpad.net/fuel/+bug/1355794>`_.

* Idempotancy issue was fixed for Rabbit management plugin.
  See `LP1355708 <https://bugs.launchpad.net/fuel/+bug/1355708>`_.

* When there are many nodes, all of them are able to get provisioning
  information from Cobbler. See `LP1355347 <https://bugs.launchpad.net/fuel/+bug/1355347>`_.

* Ubuntu Ceph journal partition GUID is always set.
  See `LP1355342 <https://bugs.launchpad.net/fuel/+bug/1355342>`_.

* Puppet now does not fail when updating Ceilometer node.
  See `LP1354494 <https://bugs.launchpad.net/fuel/+bug/1354494>`_.

* RabbitMQ cluster successfully recovers from partitioning.
  See `LP1354319 <https://bugs.launchpad.net/fuel/+bug/1354319>`_.

* Heat CFN and Cloudwatch API services are deployed and configured in HAProxy.
  See `LP1353348 <https://bugs.launchpad.net/fuel/+bug/1353348>`_.

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

* After environment is updated, OS hosts resolve without errors.
  See `LP1366875 <https://bugs.launchpad.net/fuel/+bug/1366875>`_.

* If Nailgun container is not running for some reasons, a message about this error is
  displayed. See `LP1366848 <https://bugs.launchpad.net/fuel/+bug/1366848>`_.

* After master node is upgraded from 5.0 to 5.1, no errors occur with 5.0
  environment. See `LP1365951 <https://bugs.launchpad.net/fuel/+bug/1365951>`_.

* NSX plugin has complete configuration of br-int Open vSwitch bridge.
  See `LP1365449 <https://bugs.launchpad.net/fuel/+bug/1365449>`_.

* Autoscaling Heat test is skipped in HA mode.
  See `LP1365431 <https://bugs.launchpad.net/fuel/+bug/1365431>`_.

* Django-pyscss and RPM packages were updated to 1.0.2.
  See `LP1366784 <https://bugs.launchpad.net/fuel/+bug/1366784>`_.

* Patching and rollback now upgrade and downgrade nodes one by one.
  See `LP1364532 <https://bugs.launchpad.net/fuel/+bug/1364532>`_.

* When neutron-openswitch-agent is running on nodes, deployed with NSX plugin,
  the rule is used to stop it at plugin_neutronnsx/manifests/stop_neutron_agents.pp.
  See `LP1364512 <https://bugs.launchpad.net/fuel/+bug/1364512>`_.

* When deployment type is NSX plus Neutron, the deployment goes successfully on Ubuntu.
  See `LP1364403 <https://bugs.launchpad.net/fuel/+bug/1364403>`_.

* Tokens, stored in memcached, are no longer cached. See
  `LP1364401 <https://bugs.launchpad.net/fuel/+bug/1364403>`_.

* During patching and rollback, Nailgun now sends versions of new and old
  environment. See `LP1364343 <https://bugs.launchpad.net/fuel/+bug/1364343>`_.

* When upgraded, Keystone container successfully synchronizes with DB.
  See `LP1364087 <https://bugs.launchpad.net/fuel/+bug/1364087>`_.

* Logs are now rotated on bootstraped nodes.
  See `LP1364083 <https://bugs.launchpad.net/fuel/+bug/1364083>`_.

* OSTF is available after upgrade; port forwarding was fixed.
  See `LP1364054 <https://bugs.launchpad.net/fuel/+bug/1364054>`_.

* In Fuel CLI, options in help and examples for 'fuel task' now are correct.
  See `LP1364007 <https://bugs.launchpad.net/fuel/+bug/1364007>`_.

* Post-deployment no-quorum-policy is steadily updated.
  See `LP1363908 <https://bugs.launchpad.net/fuel/+bug/1363908>`_.

* Open vSwitch packages are installed on a compute node without errors.
  See `LP1363140 <https://bugs.launchpad.net/fuel/+bug/1363140>`_.

* Deployment on controller with NSX plugin installation goes successfully on Ubuntu.
  See `LP1363111 <https://bugs.launchpad.net/fuel/+bug/1363111>`_.

* Upgrade now fails if there is no connectivity between Keystone
  and OSTF container. See `LP1363054 <https://bugs.launchpad.net/fuel/+bug/1363054>`_.

* Fuel Master 5.1 upgrade succeeds without Docker issues.
  See `LP1362685 <https://bugs.launchpad.net/fuel/+bug/1362685>`_.

* Neutron L2 configuration is serialized differently, depending on environment version.
  See `LP1362659 <https://bugs.launchpad.net/fuel/+bug/1362659>`_.

* Fuel client is now installed before Docker containers.
  See `LP1362614 <https://bugs.launchpad.net/fuel/+bug/1362614>`_.

* When upgraded, there are no dockerctl errors in upgrade logs.
  See `LP1362544 <https://bugs.launchpad.net/fuel/+bug/1362544>`_.

* Compute node is successfully deployed with NSX networks.
  See `LP1362536 <https://bugs.launchpad.net/fuel/+bug/1362536>`_.

* When running 5.1 upgrade, it does not fail at health check stage.
  See `LP1362508 <https://bugs.launchpad.net/fuel/+bug/1362508>`_.

* Deployment of controller with NSX plugin installation goes without Neutron
  configuration errors. See `LP1362317 <https://bugs.launchpad.net/fuel/+bug/1362317>`_.

* After reboot, it is now possible to log in to Fuel dashboard.
  See `LP1362207 <https://bugs.launchpad.net/fuel/+bug/1362207>`_.

* Cirros image works properly with vCenter.
  See `LP1362169 <https://bugs.launchpad.net/fuel/+bug/1362169>`_.

* During upgrade, Keystone container has no 'db schema' error.
  See `LP1362139 <https://bugs.launchpad.net/fuel/+bug/1362139>`_.

* Puppet can start supervisor inside container.
  See `LP1361756 <https://bugs.launchpad.net/fuel/+bug/1361756>`_.

* During HA cluster deployment, Neutron DB migrates successfully.
  See `LP1361541 <https://bugs.launchpad.net/fuel/+bug/1361541>`_.

* Upgrade can be run for the second time, if an error occurred.
  See `LP1361284 <https://bugs.launchpad.net/fuel/+bug/1361284>`_.

* IP tables rules now have the tcp rule for logging.
  See `LP1360298 <https://bugs.launchpad.net/fuel/+bug/1360298>`_.

* After environment is deployed, no wrong disk space error appears.
  See `LP1360248 <https://bugs.launchpad.net/fuel/+bug/1360248>`_.

* When selected, experimental Fedora long-term support kernel 3.10 is installed.
  See `LP1360044 <https://bugs.launchpad.net/fuel/+bug/1360044>`_.

* Corosync network verification item is now not available to configure.
  See `LP1360018 <https://bugs.launchpad.net/fuel/+bug/1360018>`_.

* After upgrade to 5.1,Fuel CLI has added nodes list.
  See `LP1359818 <https://bugs.launchpad.net/fuel/+bug/1359818>`_.

* When password is changed, Zabbix deploys without errors.
  See `LP1359773 <https://bugs.launchpad.net/fuel/+bug/1359773>`_.

* Ceph module successfully sets pgp_num. See `LP1359321 <https://bugs.launchpad.net/fuel/+bug/1359321>`_.

* CentOS IP tables now support check for existing rules.
  See `LP1359096 <https://bugs.launchpad.net/fuel/+bug/1359096>`_.

* Fuel snapshot is created and network verification tests are performed
  successfully without 'socket closed' error.
  See `LP1358972 <https://bugs.launchpad.net/fuel/+bug/1358972>`_.

* Dockerctl purges stale iptables rules successfully.
  See `LP1358802 <https://bugs.launchpad.net/fuel/+bug/1358802>`_.

* If cluster redeployment fails, Fuel does not return 'success'.
  See `LP1358735 <https://bugs.launchpad.net/fuel/+bug/1358735>`_.

* Puppet upgrades python-fuelclient without errors; Fuel client is
  successfully upgraded to 5.1. See `LP1358686 <https://bugs.launchpad.net/fuel/+bug/1358686>`_.

* All nodes now have increased memory in Virtual Box.
  See `LP1358345 <https://bugs.launchpad.net/fuel/+bug/1358345>`_.

* Fixed network with mask more than 24 can be configured.
  See `LP1358313 <https://bugs.launchpad.net/fuel/+bug/1358313>`_.

* NSX now has no conflicts with ML2 introduced changes.
  See `LP1358255 <https://bugs.launchpad.net/fuel/+bug/1358255>`_.

* Fuel master backup saves ssh keys without failures.
  See `LP1358168 <https://bugs.launchpad.net/fuel/+bug/1358168>`_.

* Deploy button is now disabled after rollback.
  See `LP1357463 <https://bugs.launchpad.net/fuel/+bug/1357463>`_.

* Dnsmasq logs appear in master node. See `LP1357408 <https://bugs.launchpad.net/fuel/+bug/1357408>`_.

* Sysctl name was fixed to perform successfull deployment with Zabbix.
  See `LP1357317 <https://bugs.launchpad.net/fuel/+bug/1357317>`_.

* Br-ex is not used in br-mappings configuration.
  See `LP1357298 <https://bugs.launchpad.net/fuel/+bug/1357298>`_.

* Cinder uses public network, but now volumes work.
  See `LP1357292 <https://bugs.launchpad.net/fuel/+bug/1357292>`_.

* Successful deployment is not failed by Astute.
  See `LP1356954 <https://bugs.launchpad.net/fuel/+bug/1356954>`_.

* 'Service supervisord status' reports correct status
  when supervisor is down. See `LP1356805 <https://bugs.launchpad.net/fuel/+bug/1356805>`_.

* NSX bits can be downloaded via HTTPS.
  See `LP1356352 <https://bugs.launchpad.net/fuel/+bug/1356352>`_.

* 'URL to NSX bits' parameter now results into correct processing.
  See `LP1356294 <https://bugs.launchpad.net/fuel/+bug/1356294>`_.

* OSTF tests' code now does not contain 'pass' statement.
  See `LP1355112 <https://bugs.launchpad.net/fuel/+bug/1355112>`_.

* TestVM is loaded to Glance on redeployment without failures.
  See `LP1354804 <https://bugs.launchpad.net/fuel/+bug/1354804>`_.

* Python-rabbit package is now provided for the connections cleanup script.
  See `LP1354562 <https://bugs.launchpad.net/fuel/+bug/1354562>`_.

* Nodes bond configuration is cleared in all cases.
  See `LP1354492 <https://bugs.launchpad.net/fuel/+bug/1354492>`_.

* Galera always synchronizes on the slaves.
  See `LP1354479 <https://bugs.launchpad.net/fuel/+bug/1354479>`_.

* Old version container no longer starts during Fuel update.
  See `LP1354465 <https://bugs.launchpad.net/fuel/+bug/1354465>`_.

* Problem with Cirros image code was fixed.
  See `LP1358140 <https://bugs.launchpad.net/fuel/+bug/1358140>`_.

* RFC syslog option is now included into compute node manifest.
  See `LP1354449 <https://bugs.launchpad.net/fuel/+bug/1354449>`_.

* 'Deploy' task no longer remains in DB if deployment failed to start.
  See `LP1354401 <https://bugs.launchpad.net/fuel/+bug/1354401>`_.

* Now patching for clusters is supported with information that changed
  with Fuel CLI. See `LP1354322 <https://bugs.launchpad.net/fuel/+bug/1354322>`_.

* Volumes have information on nodes, created via CLI.
  See `LP1354047 <https://bugs.launchpad.net/fuel/+bug/1354047>`_.

* Parameter for upgrading script was added to switch to a specific Fuel version.
  See `LP1354038 <https://bugs.launchpad.net/fuel/+bug/1354038>`_.

* RabbitMQ plugins work in HA mode without failures.
  See `LP1354026 <https://bugs.launchpad.net/fuel/+bug/1354026>`_.

* Puppet does not fail after upgrade in Keystone container.
  See `LP1353574 <https://bugs.launchpad.net/fuel/+bug/1353574>`_.

* Murano system tests go successfully on CentOS.
  See `LP1353454 <https://bugs.launchpad.net/fuel/+bug/1353454>`_.

* VMDK driver option is enabled in Fuel web UI.
  See `LP1353422 <https://bugs.launchpad.net/fuel/+bug/1353422>`_.

* 'Default network error' message was fixed to make the message clear.
  See `LP1353408 <https://bugs.launchpad.net/fuel/+bug/1353408>`_.

* When Cirros image is registered in Glance during vCenter deployment, no incorrect
  VMware adapter type error appears. See `LP1352898 <https://bugs.launchpad.net/fuel/+bug/1352898>`_.

* Rollback finishes without Puppet package version error.
  See `LP1352896 <https://bugs.launchpad.net/fuel/+bug/1352896>`_.

* When controller and Cinder are located on the same node
  and deployment type is 'vCenter with VMDK', deployment goes successfully.
  See `LP1352885 <https://bugs.launchpad.net/fuel/+bug/1352885>`_.

* Host system upgrader runs separately without failures.
  See `LP1352381 <https://bugs.launchpad.net/fuel/+bug/1352381>`_.

* Volumes are created successfully; there is no connecting to Ceph cluster error.
  See `LP1352335 <https://bugs.launchpad.net/fuel/+bug/1352335>`_.

* Fuel now contains complete instructions for performing HTTP and SSH access.
  See `LP1351937 <https://bugs.launchpad.net/fuel/+bug/1351937>`_.

* ISER can be configured in HA mode. See `LP1351934 <https://bugs.launchpad.net/fuel/+bug/1351934>`_.

* Mellanox check was fixed in Mellanox OFED light packages.
  See `LP1351909 <https://bugs.launchpad.net/fuel/+bug/1351909>`_.

* When deploying Fuel master, the hostname matches the domain name.
  See `LP1351293 <https://bugs.launchpad.net/fuel/+bug/1351293>`_.

* Ceph node can be added into environment for vCenter. See `LP1351288 <https://bugs.launchpad.net/fuel/+bug/1351288>`_.

* "Weight" parameter is not ignored in wizard configuration.
  See `LP1350938 <https://bugs.launchpad.net/fuel/+bug/1350938>`_.

* Refresh is called without failures at RabbitMQ server.
  See `LP1350853 <https://bugs.launchpad.net/fuel/+bug/1350853>`_.

* Missing log failure in HAProxy configuration was fixed.
  See `LP1350835 <https://bugs.launchpad.net/fuel/+bug/1350835>`_.

* In Fuel UI, update and rollback button is automatically disabled after
  performing the required action. See `LP1350721 <https://bugs.launchpad.net/fuel/+bug/1350721>`_.

* Galera now reassambles on Galera quorum loss.
  See `LP1350545 <https://bugs.launchpad.net/fuel/+bug/1350545>`_.

* Galera service was subscribed to wsrep.cnf changes.
  See `LP1350539 <https://bugs.launchpad.net/fuel/+bug/1350539>`_.

* Fuel master search domain includes not only the first entry.
  See `LP1350395 <https://bugs.launchpad.net/fuel/+bug/1350395>`_.

* After upgrade, Docker's port bindings are the same as at 5.1 ISO.
  See `LP1350385 <https://bugs.launchpad.net/fuel/+bug/1350385>`_.

* RabbitMQ queues are synchronized. See `LP1350344 <https://bugs.launchpad.net/fuel/+bug/1350344>`_.

* After deployment, Zabbix API returns no errors.
  See `LP1350323 <https://bugs.launchpad.net/fuel/+bug/1350323>`_.

* RabbitMQ manifests now have no two-minute sleep.
  See `LP1350031 <https://bugs.launchpad.net/fuel/+bug/1350031>`_.

* Puppet file for mcollective container was fixed.
  See `LP1349988 <https://bugs.launchpad.net/fuel/+bug/1349988>`_.

* After refresh, "iSER protocol for volumes (Cinder)" checkbox is disabled.
  See `LP1349903 <https://bugs.launchpad.net/fuel/+bug/1349903>`_.

* While upgrading for the second time, upgrade script does not restore old DB dump.
  See `LP1349833 <https://bugs.launchpad.net/fuel/+bug/1349833>`_.

* After the node was deleted from DB, it can be rediscovered.
  See `LP1349815 <https://bugs.launchpad.net/fuel/+bug/1349815>`_.

* Logs from discovered nodes are mentioned in logrotate configuration.
  See `LP1349809 <https://bugs.launchpad.net/fuel/+bug/1349809>`_.

* Fuel UI does not allow setting an empty password.
  See `LP1349734 <https://bugs.launchpad.net/fuel/+bug/1349734>`_.

* When running RPC deployment method, no error in Astute log appears.
  See `LP1349733 <https://bugs.launchpad.net/fuel/+bug/1349733>`_.

* mySQL syslog logs do not miss on the master node.
  See `LP1349601 <https://bugs.launchpad.net/fuel/+bug/11349601>`_.

* Nova-network OCF script now uses 'ocf-log' instead of 'echo' for reporting errors.
  See `LP1349504 <https://bugs.launchpad.net/fuel/+bug/1349504>`_.

* Nova-network OCF script successfully counts configuration lines in /etc/nova/nova.conf.
  See `LP1349501 <https://bugs.launchpad.net/fuel/+bug/1349501>`_.

* Nova-network OCF script correctly invokes 'iptables'.
  See `LP1349484 <https://bugs.launchpad.net/fuel/+bug/1349484>`_.

* Nova-network OCF script does not invoke ip' utility with -loops options.
  See `LP1349483 <https://bugs.launchpad.net/fuel/+bug/1349483>`_.

* Nova-network OCF script now properly detects 'use_ipv6' setting.
  See `LP1349432 <https://bugs.launchpad.net/fuel/+bug/1349432>`_.

* Mellanox eSwitchd loads without failures after reboot.
  See `LP1349404 <https://bugs.launchpad.net/fuel/+bug/1349404>`_.

* When choosing iSER in UI, iSER is correctly configured in the storage node.
  See `LP1349403 <https://bugs.launchpad.net/fuel/+bug/1349403>`_.

* Mellanox test VM does not miss OFED drivers.
  See `LP1349402 <https://bugs.launchpad.net/fuel/+bug/1349402>`_.

* Environment is deleted without errors after deployment.
  See `LP1349399 <https://bugs.launchpad.net/fuel/+bug/1349399>`_.

* 'Check stack autoscaling' OSTF test is skipped, if no image was imported.
  See `LP1349390 <https://bugs.launchpad.net/fuel/+bug/1349390>`_.

* Fuel upgrades to 5.1 without upgrade verification error.
  See `LP1349287 <https://bugs.launchpad.net/fuel/+bug/1349287>`_.

* Galera now has a declared xinetd service.
  See `LP1348863 <https://bugs.launchpad.net/fuel/+bug/1348863>`_.