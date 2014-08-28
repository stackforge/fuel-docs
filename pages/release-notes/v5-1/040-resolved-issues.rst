Issues Resolved in Mirantis OpenStack 5.1 and 5.0.2
===================================================

This section lists the issues that are resolved
in both the 5.1 and 5.0.2 releases of Mirantis OpenStack.

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
  This is more reliable than the Python libpcap bindings.
  **tcpdump** also enables capture of both tagged and untagged traffic.

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

RabbitMQ management plug-in idempotency issues are resolved
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

- Second rsyslog server definition no longer breaks logs
  to master. See `LP1339659 <https://bugs.launchpad.net/bugs/1339659>`_.

- Logs are now rotated on bootstraped nodes.
  See `LP1364083 <https://bugs.launchpad.net/fuel/+bug/1364083>`_.

- Bootstrap node does not die after a week of inactivity.
  See `LP1321768 <https://bugs.launchpad.net/fuel/+bug/1321768>`_.

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
for backward compatibility.
See `LP1358738 <https://bugs.launchpad.net/bugs/1358738>`_.

Floating IPs are created only after Keystone is ready
-----------------------------------------------------

Floating IPs are now created only after the Keystone service is fully initialized.
This resolves problems that occurred in earlier releases
when a reload of the HAProxy service
sometimes caused HAProxy to return an empty response,
which prevented the nova-floating-range provider from authenticating with Nova.
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
making them unavailable on the public endpoint.
See `LP1353358 <https://bugs.launchpad.net/bugs/1353358>`_.

RabbitMQ autoheal partitions are now turned on
----------------------------------------------
RabbitMQ RabbitMQ now uses the built-in autoheal facility
to correctly manage cluster partitions.
See `LP1354319 <https://bugs.launchpad.net/bugs/1354319>`_.

MySQL backend check dependency is fixed
---------------------------------------

nova_floating_range is now limited to primary Controller node
-------------------------------------------------------------


All unmatched traffic is now dropped from iptables
--------------------------------------------------

iptables now allows GRE traffic
-------------------------------


IP forwarding for ns_IPaddr2 resources is now enabled
-----------------------------------------------------

IP forwarding for ns_IPaddr2 resources is now set up in base system.
Without this, HAProxy running in its own namespace
could not access the external world
if net.ipv4.ip_forward == 0 was set in host system.
See `LP1342073 <https://bugs.launchpad.net/bugs/1342073>`_.
and `LP1340968 <https://bugs.launchpad.net/bugs/1340968>`_.


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


Neutron database is now created when deploying HA clusters
----------------------------------------------------------

In earlier releases,
the Neutron db migration scripts
were ignored when an HA cluster was deployed.
This was because the migration scripts depended on the neutron-server package,
which is installed as a dependency for the OVS server package,
so Puppet did not generate the necessary event
to trigger the syncdb process.
The migration scripts are now installed properly without a Puppet workaround.

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
See `LP1363163 <https://bugs.launchpad.net/mos/+bug/1363163>`_.

Add hasrestart to some services
-------------------------------

Hasrestart makes Puppet use restart instead of stop
and start to manage a service and many init scripts
would behave better when restarted this way.

See `LP1364119 <https://bugs.launchpad.net/mos/+bug/1364119>`_.


Improvements for the vCenter integration
-----------------------------------------

* Deployment is completed successfully on environment with vCenter
  as hypervisor option when controller role is combined with Cinder.
  See `LP1352885 <https://bugs.launchpad.net/fuel/+bug/1352885>`_.

* Cirros image now works properly with vCenter.
  See `LP1362169 <https://bugs.launchpad.net/fuel/+bug/1362169>`_.

* When Cirros image is registered in Glance during vCenter deployment,
  *incorrect VMware adapter type* error no longer appears.
  See `LP1352898 <https://bugs.launchpad.net/fuel/+bug/1352898>`_.

* vCenter credentials are now required
  to deploy OpenStack with vCenter.
  See `LP1314613 <https://bugs.launchpad.net/fuel/+bug/1314613>`_.


Other resolved issues
---------------------


* Database settings have been moved
  from DEFAULT to the database section of the heat.conf file.
  The *_sql_connection* option is deprecated.
  See `LP1364026 <https://bugs.launchpad.net/mos/+bug/1364026>`_.

* Deleting a snapshot no longer causes its parent volume to be removed.
  See `LP1360173 <https://bugs.launchpad.net/fuel/+bug/1360173>`_.

* Nova services are up after deployment.
  See `LP1355749 <https://bugs.launchpad.net/fuel/+bug/1355749>`_.

* During rollback and/or patching, "neutron-db-manage-upgrade-head" no longer occurs.
  See `LP1365607 <https://bugs.launchpad.net/fuel/+bug/1365607>`_.

* User can retry patching of OpenStack environment, e.g. when updating from 5.0 to 5.0.2.
  See `LP1365464 <https://bugs.launchpad.net/fuel/+bug/1365464>`_.

* Secondary controllers are deployed using sequential logic for 5.0.x clusters.
  See `LP1364519 <https://bugs.launchpad.net/fuel/+bug/1364519>`_.

* Rollback now works on MongoDB nodes.
  See `LP1360289 <https://bugs.launchpad.net/fuel/+bug/1360289>`_.

* 'Fixed network CIDR' parameter now correctly calculates network size.
  See `LP1357350 <https://bugs.launchpad.net/fuel/+bug/1357350>`_.

* Murano dashboard updates successfully.
  See `LP1356921 <https://bugs.launchpad.net/fuel/+bug/1356921>`_.

* Waiting for HAProxy mysqld backend now relies on HAProxy service for mysqld.
  See `LP1356748 <https://bugs.launchpad.net/fuel/+bug/1356748>`_.

* Idempotancy issue was fixed for RabbitMQ management plugin.
  See `LP1355708 <https://bugs.launchpad.net/fuel/+bug/1355708>`_.

* Ubuntu no longer fails to obtain preseed when deploying many nodes.
  See `LP1355347 <https://bugs.launchpad.net/fuel/+bug/1355347>`_.

* Puppet no longer fails when updating Ceilometer node.
  See `LP1354494 <https://bugs.launchpad.net/fuel/+bug/1354494>`_.

* Heat CFN and Cloudwatch API services are deployed and configured in HAProxy.
  See `LP1353348 <https://bugs.launchpad.net/fuel/+bug/1353348>`_.

* When deploying, RabbitMQ no longer dies due to heartbeat issues.
  See `LP1346163 <https://bugs.launchpad.net/fuel/+bug/1346163>`_.

* During patching, Puppet's versioncmp behaves correctly.
  See `LP1342041 <https://bugs.launchpad.net/fuel/+bug/1342041>`_.

* Nova API does not hang when OpenStack is updated.
  See `LP1333292 <https://bugs.launchpad.net/fuel/+bug/1333292>`_.

* Runtime error no longer occurs in Puppet log.
  See `LP1328881 <https://bugs.launchpad.net/fuel/+bug/1328881>`_.

* CVE-2014-0150 and CVE-2014-2894 patches provided by Ubuntu were applied.
  See `LP1324927 <https://bugs.launchpad.net/fuel/+bug/1324927>`_.

* Dockerctl bugs were fixed.
  See `LP1324227 <https://bugs.launchpad.net/fuel/+bug/1324227>`_.

* Connection is no longer closed by remote host
  after stopping deployment at the end of provisioning.
  See `LP1319883 <https://bugs.launchpad.net/fuel/+bug/1319883>`_.

* Network verification successfully works on Neutron VLAN with VLAN tagging.
  See `LP1306705 <https://bugs.launchpad.net/fuel/+bug/1306705>`_.

* The `rsyslogd` restart no longer causes different services to hang.
  See `LP1363102 <https://bugs.launchpad.net/fuel/+bug/1363102>`_.

* Live migration does not fail due to XML error.
  See `LP1361228 <https://bugs.launchpad.net/fuel/+bug/1361228>`_.

* During patching, failed resources are now migrated from the node.
  See `LP1365635 <https://bugs.launchpad.net/fuel/+bug/1365635>`_.

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

In earlier releases, the Neutron metadata agent used the REST API
with the python-neutronclient to connect to the Neutron server.
See `LP1364348 <https://bugs.launchpad.net/fuel/+bug/1364348>`_.

Galera bugs were fixed
----------------------

* Galera sync switched to xtrabackup SST for HA deployments
  so it does not time out.
  See `LP1354479 <https://bugs.launchpad.net/fuel/+bug/1354479>`_.

* Galera now reassambles on Galera quorum loss.
  See `LP1350545 <https://bugs.launchpad.net/fuel/+bug/1350545>`_.

* Galera changes to config in Puppet manifests now correctly refresh MySQL service.
  See `LP1350539 <https://bugs.launchpad.net/fuel/+bug/1350539>`_.

* Galera now has a declared xinetd service.
  See `LP1348863 <https://bugs.launchpad.net/fuel/+bug/1348863>`_.

* While Galera node is in Sync or Donor state, many services are no longer down.
  See `LP1293680 <https://bugs.launchpad.net/fuel/+bug/1293680>`_.

Pacemaker and Corosync
------------------------

* Corosync network verification item is now available to configure.
  See `LP1360018 <https://bugs.launchpad.net/fuel/+bug/1360018>`_.

* Pacemaker now successfully assembles Galera cluster on Ubuntu.
  See `LP1347007 <https://bugs.launchpad.net/fuel/+bug/1347007>`_.

* Pacemaker service provider no longer has a race condition.
  See `LP1355816 <https://bugs.launchpad.net/fuel/+bug/1355816>`_.

Ceph can be used as a backend for ephemeral storage
-----------------------------------------------------

In previous releases,
a VM instance woud not start
if Ceph was used as the backend for the ephemeral storage.
This now works,
as long as the minimal required ephemeral drive size
is explicitly specified in the flavor that is assigned to this instance.
See `LP1360000 <https://bugs.launchpad.net/fuel/+bug/1360000>`_.

Fixes to Ceph deployment issues
-------------------------------

A number of Ceph deployment issues are resolved:

* Ceph module successfully sets pgp_num.
  See `LP1359321 <https://bugs.launchpad.net/fuel/+bug/1359321>`_.

* Volumes are created successfully;
  no error occurs when connecting to Ceph cluster.
  See `LP1352335 <https://bugs.launchpad.net/fuel/+bug/1352335>`_.

* Ceph volume now can be attached or created
  when different Cinder rbd_user and pool names are used.
  See `LP1324954 <https://bugs.launchpad.net/fuel/+bug/1324954>`_.

* If Ceph is used as a backend for Glance,
  image can now be stored in rbd.
  See `LP1319106 <https://bugs.launchpad.net/fuel/+bug/1319106>`_.

* Ceph deployment configuration has been fixed.
  See `LP1316524 <https://bugs.launchpad.net/fuel/+bug/1316524>`_.

* The OSD prepare step of Ceph deployment is now performed successfully.
  See `LP1296985 <https://bugs.launchpad.net/fuel/+bug/1296985>`_.


Other resolved issues
---------------------

* An extra RabbitMQ instance, used for message exchange between Murano and VMs,
  now starts and OS deployment finishes successfully.
  See `LP1360264 <https://bugs.launchpad.net/fuel/+bug/1360264>`_.

* After primary controller is rebooted, volumes are created without getting stuck
  in creating state. See `LP1355792 <https://bugs.launchpad.net/fuel/+bug/1355792>`_.

* Failed Murano deployment no longer reports as success.
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

* OSTF of Cinder nodes now work correctly after failover.
  See `LP1349760 <https://bugs.launchpad.net/fuel/+bug/1349760>`_.

* Live migration works with NFS shared storage.
  See `LP1346621 <https://bugs.launchpad.net/fuel/+bug/1346621>`_.

* After environment is updated, OS hosts resolve without errors.
  See `LP1366875 <https://bugs.launchpad.net/fuel/+bug/1366875>`_.

* After master node is upgraded from 5.0 to 5.1, no errors occur with 5.0
  environment. See `LP1365951 <https://bugs.launchpad.net/fuel/+bug/1365951>`_.

* Tokens stored in memcached are no longer cached. See
  `LP1364401 <https://bugs.launchpad.net/fuel/+bug/1364401>`_.

* During patching and rollback, Nailgun now sends versions of new and old
  environment. See `LP1364343 <https://bugs.launchpad.net/fuel/+bug/1364343>`_.

* Keystone container on Fuel Master now correctly runs syncdb after upgrade.
  See `LP1364087 <https://bugs.launchpad.net/fuel/+bug/1364087>`_.

* In Fuel CLI, options in help and examples for 'fuel task' now are correct.
  See `LP1364007 <https://bugs.launchpad.net/fuel/+bug/1364007>`_.

* Post-deployment no-quorum-policy is steadily updated.
  See `LP1363908 <https://bugs.launchpad.net/fuel/+bug/1363908>`_.

* Open vSwitch packages are now correctly installed on compute nodes.
  See `LP1363140 <https://bugs.launchpad.net/fuel/+bug/1363140>`_.

* Fuel Master 5.1 upgrade succeeds without Docker issues.
  See `LP1362685 <https://bugs.launchpad.net/fuel/+bug/1362685>`_.

* During upgrade, Keystone container has no 'db schema' error.
  See `LP1362139 <https://bugs.launchpad.net/fuel/+bug/1362139>`_.

* During HA cluster deployment, Neutron DB migrates successfully.
  See `LP1361541 <https://bugs.launchpad.net/fuel/+bug/1361541>`_.

* Upgrade can be run for the second time if an error occurred.
  See `LP1361284 <https://bugs.launchpad.net/fuel/+bug/1361284>`_.

* IP tables rules now have the tcp rule for logging.
  See `LP1360298 <https://bugs.launchpad.net/fuel/+bug/1360298>`_.

* After environment is deployed, no wrong disk space error appears.
  See `LP1360248 <https://bugs.launchpad.net/fuel/+bug/1360248>`_.

* When selected, experimental Fedora long-term support kernel 3.10 is correctly installed.
  See `LP1360044 <https://bugs.launchpad.net/fuel/+bug/1360044>`_.

* When Zabbix password is changed, Zabbix deploys without errors.
  See `LP1359773 <https://bugs.launchpad.net/fuel/+bug/1359773>`_.

* Fuel snapshot is created and network verification tests are performed
  successfully without 'socket closed' error.
  See `LP1358972 <https://bugs.launchpad.net/fuel/+bug/1358972>`_.

* Dockerctl purges stale iptables rules successfully.
  See `LP1358802 <https://bugs.launchpad.net/fuel/+bug/1358802>`_.

* If cluster redeployment fails, Fuel does not return 'success'.
  See `LP1358735 <https://bugs.launchpad.net/fuel/+bug/1358735>`_.

* Deploy button is now disabled after rollback.
  See `LP1357463 <https://bugs.launchpad.net/fuel/+bug/1357463>`_.

* Dnsmasq logs now appear in Cobbler logs directory. See `LP1357408 <https://bugs.launchpad.net/fuel/+bug/1357408>`_.

* Sysctl name was fixed to perform successfull deployment with Zabbix.
  See `LP1357317 <https://bugs.launchpad.net/fuel/+bug/1357317>`_.

* The br-ex bridge is not used in br-mappings configuration.
  See `LP1357298 <https://bugs.launchpad.net/fuel/+bug/1357298>`_.

* Cinder uses public network, but now volumes work.
  See `LP1357292 <https://bugs.launchpad.net/fuel/+bug/1357292>`_.

* Successful deployment is not marked as failed by Astute.
  See `LP1356954 <https://bugs.launchpad.net/fuel/+bug/1356954>`_.

* 'Service supervisord status' reports correct status
  when supervisor is down. See `LP1356805 <https://bugs.launchpad.net/fuel/+bug/1356805>`_.

* TestVM is loaded to Glance on redeployment without failures.
  See `LP1354804 <https://bugs.launchpad.net/fuel/+bug/1354804>`_.

* Python-rabbit package is now provided for the connections cleanup script.
  See `LP1354562 <https://bugs.launchpad.net/fuel/+bug/1354562>`_.

* Nodes bond configuration is cleared in all cases.
  See `LP1354492 <https://bugs.launchpad.net/fuel/+bug/1354492>`_.

* Problem with Cirros image code was fixed.
  See `LP1358140 <https://bugs.launchpad.net/fuel/+bug/1358140>`_.

* 'Deploy' task no longer remains in DB if deployment failed to start.
  See `LP1354401 <https://bugs.launchpad.net/fuel/+bug/1354401>`_.

* Volumes have information on nodes, created via CLI.
  See `LP1354047 <https://bugs.launchpad.net/fuel/+bug/1354047>`_.

* RabbitMQ plugins work in HA mode without failures.
  See `LP1354026 <https://bugs.launchpad.net/fuel/+bug/1354026>`_.

* Murano system tests now pass successfully on CentOS.
  See `LP1353454 <https://bugs.launchpad.net/fuel/+bug/1353454>`_.

* The :ref:`VMDK driver<vmdk-term>` option can now be enabled in
  Fuel web UI.
  See `LP1353422 <https://bugs.launchpad.net/fuel/+bug/1353422>`_.

* 'Default network error' message was fixed to make the message clear.
  See `LP1353408 <https://bugs.launchpad.net/fuel/+bug/1353408>`_.

* Rollback finishes without Puppet package version error.
  See `LP1352896 <https://bugs.launchpad.net/fuel/+bug/1352896>`_.

* Host system upgrader runs separately without failures.
  See `LP1352381 <https://bugs.launchpad.net/fuel/+bug/1352381>`_.

* Console login now displays default credentials and IP addresses
  of all physical interfaces.
  See `LP1351937 <https://bugs.launchpad.net/fuel/+bug/1351937>`_.

* The wizard configuration now correctly uses the `Weight` parameter.
  See `LP1350938 <https://bugs.launchpad.net/fuel/+bug/1350938>`_.

* Refresh is called without failures at RabbitMQ server.
  See `LP1350853 <https://bugs.launchpad.net/fuel/+bug/1350853>`_.

* Missing log failure in HAProxy configuration was fixed.
  See `LP1350835 <https://bugs.launchpad.net/fuel/+bug/1350835>`_.

* In Fuel UI, update and rollback button is automatically disabled after
  performing the required action. See `LP1350721 <https://bugs.launchpad.net/fuel/+bug/1350721>`_.

* Fuel Master search domain includes not only the first entry.
  See `LP1350395 <https://bugs.launchpad.net/fuel/+bug/1350395>`_.

* After upgrade, Docker's port bindings are the same as at 5.1 ISO.
  See `LP1350385 <https://bugs.launchpad.net/fuel/+bug/1350385>`_.

* RabbitMQ queues are synchronized. See `LP1350344 <https://bugs.launchpad.net/fuel/+bug/1350344>`_.

* After deployment, Zabbix API returns no errors.
  See `LP1350323 <https://bugs.launchpad.net/fuel/+bug/1350323>`_.

* RabbitMQ manifests now have no two-minute sleep.
  See `LP1350031 <https://bugs.launchpad.net/fuel/+bug/1350031>`_.

* After refresh, "iSER protocol for volumes (Cinder)" checkbox is disabled.
  See `LP1349903 <https://bugs.launchpad.net/fuel/+bug/1349903>`_.

* While upgrading for the second time, upgrade script does not restore old DB dump.
  See `LP1349833 <https://bugs.launchpad.net/fuel/+bug/1349833>`_.

* After the node was deleted from DB, it can be rediscovered.
  See `LP1349815 <https://bugs.launchpad.net/fuel/+bug/1349815>`_.

* Logs from discovered nodes are mentioned in logrotate configuration.
  See `LP1349809 <https://bugs.launchpad.net/fuel/+bug/1349809>`_.

* When running RPC deployment method, no error in Astute log appears.
  See `LP1349733 <https://bugs.launchpad.net/fuel/+bug/1349733>`_.

* MySQL log settings correctly send logs to Fuel Master now on Ubuntu.
  See `LP1349601 <https://bugs.launchpad.net/fuel/+bug/1349601>`_.

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

* Environment is deleted without errors after deployment.
  See `LP1349399 <https://bugs.launchpad.net/fuel/+bug/1349399>`_.

* Fuel upgrades to 5.1 without upgrade verification error.
  See `LP1349287 <https://bugs.launchpad.net/fuel/+bug/1349287>`_.

* Glance logs are available on the Fuel master node.
  See `LP1348837 <https://bugs.launchpad.net/fuel/+bug/1348837>`_.

* Running Fuel client now shows optional arguments.
  See `LP1348413 <https://bugs.launchpad.net/fuel/+bug/1348413>`_.

* When deployment is stopped, nodes do not stay in hung state.
  See `LP1348217 <https://bugs.launchpad.net/fuel/+bug/1348217>`_.

* OSTF now display correct check status.
  See `LP1348187 <https://bugs.launchpad.net/fuel/+bug/1348187>`_.

* If virtual management IP was moved to another node, HAProxy works without
  errors. See `LP1348181 <https://bugs.launchpad.net/fuel/+bug/1348181>`_.

* Node bootstrapping now works after rollback.
  See `LP1348166 <https://bugs.launchpad.net/fuel/+bug/1348166>`_.

* L23network does not lose package dependencies.
  See `LP1347671 <https://bugs.launchpad.net/fuel/+bug/1347671>`_.

* Pip now displays package versions without any custom parts.
  See `LP1347583 <https://bugs.launchpad.net/fuel/+bug/1347583>`_.

* Puppet generates settings.yaml file correctly.
  See `LP1346939 <https://bugs.launchpad.net/fuel/+bug/1346939>`_.

* During deployment, no errors occur with creating /var/lib/glance/node.
  See `LP1346894 <https://bugs.launchpad.net/fuel/+bug/1346894>`_.

* When primary controller node is offline, Sahara platform test works in HA mode.
  See `LP1346864 <https://bugs.launchpad.net/fuel/+bug/1346864>`_.

* Neutron HA deployment no longer shows errors in Puppet log.
  See `LP1346862 <https://bugs.launchpad.net/fuel/+bug/1346862>`_.

* Keystone now sends notifications via RabbitMQ.
  See `LP1346856 <https://bugs.launchpad.net/fuel/+bug/1346856>`_.

* Upgrade goes without 'failed to run services' error.
  See `LP1346839 <https://bugs.launchpad.net/fuel/+bug/1346839>`_.

* After controller reboot, RabbitMQ assembles without failures.
  See `LP1346540 <https://bugs.launchpad.net/fuel/+bug/1346540>`_.

* No pkg_resources error occurs during upgrade.
  See `LP1346366 <https://bugs.launchpad.net/fuel/+bug/1346366>`_.

* Health checker for Keystone does not fail.
  See `LP1346346 <https://bugs.launchpad.net/fuel/+bug/1346346>`_.

* When stopping openibd module on the controller of Ubuntu that is using iSER,
  no timeout error occurs. See `LP1346304 <https://bugs.launchpad.net/fuel/+bug/1346304>`_.

* Log rotation error does not occur with "duplicate log entry" result.
  See `LP1343285 <https://bugs.launchpad.net/fuel/+bug/1343285>`_.

* Radio group label is now hidden when restrictions are satisfied.
  See `LP1343160 <https://bugs.launchpad.net/fuel/+bug/1343160>`_.

* Puppet logs without enabled "Openstack debug" are more informative.
  See `LP1343136 <https://bugs.launchpad.net/fuel/+bug/1343136>`_.

* Ubuntu installs packages without "some index files failed to download" error.
  See `LP1342951 <https://bugs.launchpad.net/fuel/+bug/1342951>`_.

* Networks Verification on 5.0 cluster with 5.1 master node can be run.
  See `LP1342814 <https://bugs.launchpad.net/fuel/+bug/1342814>`_.

* Upgrade script now does not fail with upgrade verification error.
  See `LP1342723 <https://bugs.launchpad.net/fuel/+bug/1342723>`_.

* Diagnostic snapshot now contains HAproxy configuration.
  See `LP1342172 <https://bugs.launchpad.net/fuel/+bug/1342172>`_.

* Controller deployment goes successfully on HA without "mysql show status" error.
  See `LP1342128 <https://bugs.launchpad.net/fuel/+bug/1342128>`_.

* Upgrade script now creates a new dump of DB during the second run.
  See `LP1342112 <https://bugs.launchpad.net/fuel/+bug/1342112>`_.

* Ubuntu local mirror building is now is now optimized with parallel
  downloads.
  See `LP1341566 <https://bugs.launchpad.net/fuel/+bug/1341566>`_.

* Long labels bug for text inputs on Settings tab was fixed.
  See `LP1333580 <https://bugs.launchpad.net/fuel/+bug/1333580>`_.

* Ntpdate on master node now tries to synchronize time after networking is configured.
  See `LP1333464 <https://bugs.launchpad.net/fuel/+bug/1333464>`_.

* Custom overcommit ratio can be set.
  See `LP1333436 <https://bugs.launchpad.net/fuel/+bug/1333436>`_.

* Dhcrelay was fixed to update Cobbler internal IP address.
  See `LP1333362 <https://bugs.launchpad.net/fuel/+bug/1333362>`_.

* If RBD ephemeral is used,  statistics from computes is updated.
  See `LP1332660 <https://bugs.launchpad.net/fuel/+bug/1332660>`_.

* Remote logs are available now and appear after successful cluster deployment.
  See `LP1332517 <https://bugs.launchpad.net/fuel/+bug/1332517>`_.

* Problem with long comments in openstack.yaml was fixed.
  See `LP1332078 <https://bugs.launchpad.net/fuel/+bug/1332078>`_.

* Nodes' yaml configuration now can be changed via CLI.
  See `LP1331883 <https://bugs.launchpad.net/fuel/+bug/1331883>`_.

* When changing PXE network via bootstrap_admin_node, iptables rules bug
  no longer occurs. See `LP1331807 <https://bugs.launchpad.net/fuel/+bug/1331807>`_.

* Centos-versions.yaml and ubuntu-versions.yaml files were generated in /etc/puppet/manifests.
  See `LP1331552 <https://bugs.launchpad.net/fuel/+bug/1331552>`_.

* Errors in mysqld_safe.log for controller for HA mode were fixed.
  See `LP1331488 <https://bugs.launchpad.net/fuel/+bug/1331488>`_.

* "Typical stack actions: create, update, delete, show details, etc." test now
  works steadily. See `LP1331472 <https://bugs.launchpad.net/fuel/+bug/1331472>`_.

* Fuel UI now has a combo box for making downgrade.
  See `LP1331464 <https://bugs.launchpad.net/fuel/+bug/1331464>`_.

* Dropdown list for "Settings" tab was added into web UI.
  See `LP1330967 <https://bugs.launchpad.net/fuel/+bug/1330967>`_.

* Deleting environments with many nodes now reboots nodes into
  bootstrap reliably.
  See `LP1330938 <https://bugs.launchpad.net/fuel/+bug/1330938>`_.

* OpenStack updated is now supported with CLI.
  See `LP1330910 <https://bugs.launchpad.net/fuel/+bug/1330910>`_.

* "Check stack autoscaling" test passes successfully.
  See `LP1330877 <https://bugs.launchpad.net/fuel/+bug/1330877>`_.

* "Cannot remove role that has not been granted" error was fixed.
  See `LP1330875 <https://bugs.launchpad.net/fuel/+bug/1330875>`_.

* Enabling debug mode in Horizon does not result into failure.
  See `LP1330825 <https://bugs.launchpad.net/fuel/+bug/1330825>`_.

* Local Puppet log was added to Shotgun snapshot.
  See `LP1330516 <https://bugs.launchpad.net/fuel/+bug/1330516>`_.

* Provisioning does not fail due to Cobbler race conditions.
  See `LP1328873 <https://bugs.launchpad.net/fuel/+bug/1328873>`_.

* Database downgrade for Nailgun is performed without failures.
  See `LP1328831 <https://bugs.launchpad.net/fuel/+bug/1328831>`_.

* Fuel Key is not loaded on cluster list page, if message about registration was closed.
  See `LP1328487 <https://bugs.launchpad.net/fuel/+bug/1328487>`_.

* Open vSwitch agent no more fails with bridges longer than 11 chars.
  See `LP1328288 <https://bugs.launchpad.net/fuel/+bug/1328288>`_.

* Nailgun now does not hang Fuel.
  See `LP1328200 <https://bugs.launchpad.net/fuel/+bug/1328200>`_.

* 'NodeBondInterface' object has 'ip_addr' attribute.
  See `LP1328163 <https://bugs.launchpad.net/fuel/+bug/1328163>`_.

* Support of fuse-sshfs on master node was added.
  See `LP1327994 <https://bugs.launchpad.net/fuel/+bug/1327994>`_.

* Puppet no longer generates wrong dnsmasq.upstream in Cobbler container.
  See `LP1327799 <https://bugs.launchpad.net/fuel/+bug/1327799>`_.

* OpenStack engine now corretly checks releases for uniqueness.
  See `LP1327198 <https://bugs.launchpad.net/fuel/+bug/1327198>`_.

* Docker0 interface bug was fixed for PXE.
  See `LP1327009 <https://bugs.launchpad.net/fuel/+bug/1327009>`_.

* Journal partition bug was fixed.
  See `LP1326146 <https://bugs.launchpad.net/fuel/+bug/1326146>`_.

* Offline nodes now can be deleted.
  See `LP1326116 <https://bugs.launchpad.net/fuel/+bug/1326116>`_.

* "Stevedore.extension" error no longer occurs.
  See `LP1325519 <https://bugs.launchpad.net/fuel/+bug/1325519>`_.

* UI is not cached between FUel versions.
  See `LP1325012 <https://bugs.launchpad.net/fuel/+bug/1325012>`_.

* Production-oriented configuration parameters were set for Nova and Neutron.
  See `LP1324914 <https://bugs.launchpad.net/fuel/+bug/1324914>`_.

* Cluster is successfully deployed without " could not start service" error.
  See `LP1324859 <https://bugs.launchpad.net/fuel/+bug/1324859>`_.

* Cobbler does not fail to edit profile kernel option.
  See `LP1324200 <https://bugs.launchpad.net/fuel/+bug/1324200>`_.

* Dhcrelay can start after master node reboot.
  See `LP1324152 <https://bugs.launchpad.net/fuel/+bug/1324152>`_.

* 10gig interface now can get an IP address from DHCP.
  See `LP1324093 <https://bugs.launchpad.net/fuel/+bug/1324093>`_.

* Settings dependency tracking was moved from settings_tab.js to Settings model.
  See `LP1323749 <https://bugs.launchpad.net/fuel/+bug/1323749>`_.

* At the first attempt, instance console can connect.
  See `LP1323705 <https://bugs.launchpad.net/fuel/+bug/1323705>`_.

* To unify approach, merge_array function was replaced with concat.
  See `LP1323597 <https://bugs.launchpad.net/fuel/+bug/1323597>`_.

* Fuel menu bug with selecting astute.yaml for update was fixed.
  See `LP1323369 <https://bugs.launchpad.net/fuel/+bug/1323369>`_.

* Virtualbox script bow performs DNS upstream setup properly.
  See `LP1323365 <https://bugs.launchpad.net/fuel/+bug/1323365>`_.

* If scheme was changed, /manage.py dropdb works without failures.
  See `LP1323350 <https://bugs.launchpad.net/fuel/+bug/1323350>`_.

* Building ruby21-nailgun-mcagent is now enabled when building ISO.
  See `LP1323305 <https://bugs.launchpad.net/fuel/+bug/1323305>`_.

* Rsync Puppet modules partial failure does not result into stopping deployment.
  See `LP1322577 <https://bugs.launchpad.net/fuel/+bug/1322577>`_.

* Provisioning can be immediately stopped.
  See `LP1322573 <https://bugs.launchpad.net/fuel/+bug/1322573>`_.

* Ubuntu on master node does not fail to be installed.
  See `LP1322557 <https://bugs.launchpad.net/fuel/+bug/1322573>`_.

* Unsupported hardware message bug was fixed.
  See `LP1322502 <https://bugs.launchpad.net/fuel/+bug/1322502>`_.

* OpenStack cluster does not stop working after failover of primary controller.
  See `LP1322259 <https://bugs.launchpad.net/fuel/+bug/1322259>`_.

* "MultipleAgentFoundByTypeHost" error was fixed.
  See `LP1322228 <https://bugs.launchpad.net/fuel/+bug/1322228>`_.

* Neutron unsupported operand type bug no longer occurs.
  See `LP1322221 <https://bugs.launchpad.net/fuel/+bug/1322221>`_.

* After HA FlatDHCP deployment, redundant interfaces do not appear in controller node.
  See `LP1322208 <https://bugs.launchpad.net/fuel/+bug/1322208>`_.

* Stdlib was updated. See `LP1322107 <https://bugs.launchpad.net/fuel/+bug/1322107>`_.

* During Active Directory deployment, Message ID is not missing in execution result.
  See `LP1322078 <https://bugs.launchpad.net/fuel/+bug/1322078>`_.

* If upstream mirror was broken, ISO build behavior stays correct.
  See `LP1321947 <https://bugs.launchpad.net/fuel/+bug/1321947>`_.

* HA deployment of Nova no longer fails on the primary controller.
  See `LP1321662 <https://bugs.launchpad.net/fuel/+bug/1321662>`_.

* Sahara image with tags is successfully imported into Glance.
  See `LP1320245 <https://bugs.launchpad.net/fuel/+bug/1321662>`_.

* AMQP nodes were shuffled in OpenStack configuration.
  See `LP1320184 <https://bugs.launchpad.net/fuel/+bug/1320184>`_.

* Order of locked tables is now checked.
  See `LP1319668 <https://bugs.launchpad.net/fuel/+bug/1319668>`_.

* AMQP channel no longer has errors in Orchestrator logs.
  See `LP1319451 <https://bugs.launchpad.net/fuel/+bug/1319451>`_.

* Debian installer now splits long log messages into shorter ones and then
  sends them to a standard logger.
  See `LP1318747 <https://bugs.launchpad.net/fuel/+bug/1318747>`_.

* "Maximum mount count reached, running e2fsck is recommended' error was fixed.
  See `LP1318646 <https://bugs.launchpad.net/fuel/+bug/1318646>`_.

* Fuel client no longer fails to specify Neutron segmentation type.
  See `LP1317702 <https://bugs.launchpad.net/fuel/+bug/1317702>`_.

* Dhcpchecker now always receives messages from DHCP relay.
  See `LP1317525 <https://bugs.launchpad.net/fuel/+bug/1317525>`_.

* Nodes do not fail to reboot for HA environment.
  See `LP1316761 <https://bugs.launchpad.net/fuel/+bug/1316761>`_.

* Filesystem of provisioned node is not destroyed, if  stop provision is called when node was reboot with installed OS.
  See `LP1316583 <https://bugs.launchpad.net/fuel/+bug/1316583>`_.

* Wrong data no longer appears in astute.yaml after Fuel menu was called.
  See `LP1314224 <https://bugs.launchpad.net/fuel/+bug/1314224>`_.

* Shotgun now is independent from PostgreSQL client.
  See `LP1313628 <https://bugs.launchpad.net/fuel/+bug/1313628>`_.

* Fuel menu was updated to write to /etc/fuel/astute.yaml.
  See `LP1313288 <https://bugs.launchpad.net/fuel/+bug/1313288>`_.

* When editing a field on Network tab with visible network verification result, focus is not lost.
  See `LP1312741 <https://bugs.launchpad.net/fuel/+bug/1312741>`_.

* Notification tests were added for Ceilometer.
  See `LP1312175 <https://bugs.launchpad.net/fuel/+bug/1312175>`_.

* Public_vip is now recovered if failover happens 2 times.
  See `LP1311749 <https://bugs.launchpad.net/fuel/+bug/1311749>`_.

* After deployment is started or finished, random redirect to node list no
  longer occurs. See `LP1309552 <https://bugs.launchpad.net/fuel/+bug/1309552>`_.

* Validation was added to Nailgun to ensure single disk usage for root partition.
  See `LP1308592 <https://bugs.launchpad.net/fuel/+bug/1308592>`_.

* After being disabled on UI, vlan_splinters data no longer has a staled state.
  See `LP1308492 <https://bugs.launchpad.net/fuel/+bug/1308492>`_.

* CirrOS provided with Fuel now supports disk resize.
  See `LP1306717 <https://bugs.launchpad.net/fuel/+bug/1306717>`_.

* Swift Ringbuilder rebalance works without failures.
  See `LP1305826 <https://bugs.launchpad.net/fuel/+bug/1305826>`_.

* When new node is discovered, "Invalid MAC is specified" warning no longer appears.
  See `LP1305017 <https://bugs.launchpad.net/fuel/+bug/1305017>`_.

* Interfaces now can be updated. See `LP1304469 <https://bugs.launchpad.net/fuel/+bug/1304469>`_.

* Presentation of 'agent' logs with level 'warning' no longer hangs.
  See `LP1303675 <https://bugs.launchpad.net/fuel/+bug/1303675>`_.

* During deployment, time on nodes with master node is now synchronized.
  See `LP1297293 <https://bugs.launchpad.net/fuel/+bug/1297293>`_.

* Verification network validation bug was fixed.
  See `LP1297232 <https://bugs.launchpad.net/fuel/+bug/1297232>`_.

* Error pop-ups problem no longer occurs.
  See `LP1297158 <https://bugs.launchpad.net/fuel/+bug/1297158>`_.

* Cluster changes attribute now contain information about interfaces changes.
  See `LP1291854 <https://bugs.launchpad.net/fuel/+bug/1291854>`_.

* Network verifier reports its logs to syslog without failures.
  See `LP1291663 <https://bugs.launchpad.net/fuel/+bug/1291663>`_.

* By defaulta stack traces are now captured by syslog.
  See `LP1289659 <https://bugs.launchpad.net/fuel/+bug/1289659>`_.

* In HA mode, Nova-compute is up after destroying primary controller.
  See `LP1289200 <https://bugs.launchpad.net/fuel/+bug/1289200>`_.

* In HA mode, Murano tests no longer fail with "110 Connection timed out" error.
  See `LP1288828 <https://bugs.launchpad.net/fuel/+bug/1288828>`_.

* 'Deploy Changes' dialog window now has information about changes in 'Configure Interfaces'.
  See `LP1288229 <https://bugs.launchpad.net/fuel/+bug/1288229>`_.

* Murano-dashboard logging was moved to syslog.
  See `LP1285024 <https://bugs.launchpad.net/fuel/+bug/1285024>`_.

* All logs from OpenStack services are now collected by syslog.
  See `LP1284867 <https://bugs.launchpad.net/fuel/+bug/1284867>`_.

* Fuel no longer loses nodes.
  See `LP1282568 <https://bugs.launchpad.net/fuel/+bug/1282568>`_.

* If a new compute node is added, Puppet is not run on all controllers.
  See `LP1280318 <https://bugs.launchpad.net/fuel/+bug/1280318>`_.

* Now the administrator's token data /etc/keystone/keystone.conf is used in q-agent-cleanup.py.
  See `LP1275652 <https://bugs.launchpad.net/fuel/+bug/1275652>`_.

* Nova rate limits were increased.
  See `LP1272839 <https://bugs.launchpad.net/fuel/+bug/1272839>`_.

* Public IP addresses are no longer assigned to nodes which do not require them.
  See `LP1272349 <https://bugs.launchpad.net/fuel/+bug/1272349>`_.

* When node configuration is changed, log levels are displayed correctly.
  See `LP1264122 <https://bugs.launchpad.net/fuel/+bug/1264122>`_.

* Nova logging was fixed.
  See `LP1262294 <https://bugs.launchpad.net/fuel/+bug/1262294>`_.

* After deployment, error in Neutron server log does not occur.
  See `LP1261330 <https://bugs.launchpad.net/fuel/+bug/1261330>`_.

* Bootstrap now sees Brocade NICs.
  See `LP1260492 <https://bugs.launchpad.net/fuel/+bug/1260492>`_.

* Floating network is detached from physical one.
  See `LP1260051 <https://bugs.launchpad.net/fuel/+bug/1260051>`_.

* Defined replication factor value was changed.
  See `LP1251651 <https://bugs.launchpad.net/fuel/+bug/1251651>`_.

* Memcaches are synchronized in HA mode.
  See `LP1251190 <https://bugs.launchpad.net/fuel/+bug/1251190>`_.

* After clicking 'Download report' in the Capacity tab, "authentication required" error
  no longer occurs. See `LP1362615 <https://bugs.launchpad.net/fuel/+bug/1362615>`_.

* Murano, Sahara and Heat are now deployed with usernames,
  inluding @example.com email address.
  See `LP1362173 <https://bugs.launchpad.net/fuel/+bug/1362173>`_.

* HA deployment no longer fails with *invalid address* error.
  See `LP1361707 <https://bugs.launchpad.net/fuel/+bug/1361707>`_.

* *Test_autoscaling* Heat test has no failures.
  See `LP1361629 <https://bugs.launchpad.net/fuel/+bug/1361629>`_.

* Dependency error was fixed for Ubuntu.
  See `LP1360476 <https://bugs.launchpad.net/fuel/+bug/1360476>`_.

* After each cluster reset, volumes configuration is now rebuilt
  to prevent disks identifiers change.
  See `LP1359070 <https://bugs.launchpad.net/fuel/+bug/1359070>`_.

* RFC syslog option no longer misses for compute node manifest.
  See `LP1354449 <https://bugs.launchpad.net/fuel/+bug/1354449>`_.

* Separate *openstack-patching.yaml* file is used for upgrading tarball.
  See `LP1353369 <https://bugs.launchpad.net/fuel/+bug/1353369>`_.

* In a specific version requirement is stated for the package,
  that version is installed instead of stated for a given package.
  See `LP1348658 <https://bugs.launchpad.net/fuel/+bug/1348658>`_.

* When calling Fuel client, *--help* is successfully printed.
  See `LP1348395 <https://bugs.launchpad.net/fuel/+bug/1348395>`_.

* Ability to tune important Neutron parameters before deployment was enabled.
  See `LP1348149 <https://bugs.launchpad.net/fuel/+bug/1348149>`_.

* Network verification on 5.0 cluster with 5.1 master node can be run.
  See `LP1342814 <https://bugs.launchpad.net/fuel/+bug/1342814>`_.

* Heat template updates without failures.
  See `LP1348195 <https://bugs.launchpad.net/fuel/+bug/1348195>`_.

* The previously used algorithm was fixed for methods that could be found on several
  inheritance paths. See `LP1343394 <https://bugs.launchpad.net/fuel/+bug/1343394>`_.

* When deleting environment, Heat stack also gets removed.
  See `LP1343383 <https://bugs.launchpad.net/fuel/+bug/1343383>`_.

* After the deployment, Murano Engine creates VMs with an assigned keypair;
  the user now can perform a login procedure to these VMs.
  See `LP1343378 <https://bugs.launchpad.net/fuel/+bug/1343378>`_.

* Neutron metadata agent now performs filtration
  and does not depend on the amount of networks.
  See `LP1342313 <https://bugs.launchpad.net/fuel/+bug/1342313>`_.

* The `heat-manage db_sync` no longer crashes dut MySQL error.
  See `LP1342072 <https://bugs.launchpad.net/fuel/+bug/1342072>`_.

* The syslog logging is not affected by /dev/log race conditions.
  See `LP1342068 <https://bugs.launchpad.net/fuel/+bug/1342068>`_.

* Both cluster and volumes are removed in enrivonment, deployed with Cinder.
  See `LP1341650 <https://bugs.launchpad.net/fuel/+bug/1341650>`_.

* *URI too long* error was fixed in Neutron security group rule list.
  See `LP1340743 <https://bugs.launchpad.net/fuel/+bug/1340743>`_.

* OpenStack Nova Compute starts successfully when using QEMU 2.0 on CentOS.
  See `LP1338913 <https://bugs.launchpad.net/fuel/+bug/1338913>`_.

* Horizon backport was fixed for updating disabled security group quotas.
  See `LP1338663 <https://bugs.launchpad.net/fuel/+bug/1338663>`_.

* When Neutron is deployed with Open vSwitch plugin,
  OVS agent now starts with full ML2 configuration file.
  See `LP1335869 <https://bugs.launchpad.net/fuel/+bug/1335869>`_.

* Nova compute starts successfully without Ceph and Nova problems.
  See `LP1335628 <https://bugs.launchpad.net/fuel/+bug/1335628>`_.

* Ceilometer API is now working much faster.
  See `LP1330951 <https://bugs.launchpad.net/fuel/+bug/1330951>`_.

* Optional parameters are added to create backing methods so that a backing VM can
  be created without a
  disk or with a specific adapter type.
  See `LP1284284 <https://bugs.launchpad.net/fuel/+bug/1284284>`_.

* Metadata services are now available when using vCenter.
  See `LP1370165 <https://bugs.launchpad.net/fuel/+bug/1370165>`_.
