

Issues Resolved in Mirantis OpenStack 5.1.1
===========================================

* Horizon and other services are now available if a controller fails
   [in progress]
   See `LP1370510 <https://bugs.launchpad.net/fuel/+bug/1370510>`_.

* Ceph-deploy prepare command is performed successfully on HP Smart Array CCISS drives.
  The problem occured because HP Smart Array ISS drives had non-standard SCSI names in Linux.
  See `LP11381218 <https://bugs.launchpad.net/bugs/1381218>`_.

* When VMware vCenter is used
  as a hypervisor, then metadata services stay available.
  See LP1370165 <https://bugs.launchpad.net/fuel/+bug/1370165>`_.

RabbitMQ issues were resolved
-----------------------------

* *rabbitmqctl list-users* command now does not lead to deployment failure
  See `LP1377491 <https://bugs.launchpad.net/bugs/1377491>`_.

* RabbitMQ no longer loses Murano users when controller is offline.
  See `LP1372483 <https://bugs.launchpad.net/bugs/1372483>`_.


Ubuntu installer problem was fixed
----------------------------------
Previously, Ubuntu installed did not check that network adapter is not initialized
and tried to get an IP address using DHCP even if speed and some other parameters
were not specified.
See `LP1381266 <https://bugs.launchpad.net/bugs/1381266>`_.

OpenStack bugs were fixed
-------------------------

* Ceilometer connects to AMQP successfully after controller is shut down.
  See `LP1373569 <https://bugs.launchpad.net/bugs/1373569>`_.

* The Nova CLI and Python API to support Nova server groups are now introduced
  in 5.1.1. See `LP1382443 <https://bugs.launchpad.net/fuel/+bug/1382443>`_.

Volumes
-------

* Creating volume from image no longer performs full data copy with Ceph backend
  Previously, a regression was introduced into configuration of RBD backend for Cinder.In
  previous versions of Mirantis OpenStack, enabling RBD backend for both Cinder
  and Glance led to zero-copy creation of a Cinder volume from a Glance image.
  See `LP1373096 <https://bugs.launchpad.net/bugs/1373096>`_.

* If controller fails, all RBD backend Cinder volumes stay manageable.
  See `LP1371328 <https://bugs.launchpad.net/fuel/+bug/1371328>`_.

* Image file injection is fixed on CentOS; libguestfs dependency no longer misses.
  See `LP1367324 <https://bugs.launchpad.net/fuel/+bug/1367324>`_.

Neutron and networking issues were resolved
-------------------------------------------

* Neutron L3-agent starts interfaces successfully.
  See `LP1310926 <https://bugs.launchpad.net/fuel/+bug/1310926>`_.

* Neutron L3-agent no longer hangs.
  See `LP1361710 <https://bugs.launchpad.net/fuel/+bug/1361710>`_.

* Neutron metadata agent now uses RPC to communicate with Neutron server instead
  of the Neutron client. This reduces Keystone load, helps to avoid
  possible authentication failures and accelerates the work of Metadata
  agent itself. See `LP1364348 <https://bugs.launchpad.net/fuel/+bug/1364348>`_.

* Neutron metadata agent no longer fails after primary controller is shut down.
  See `LP1371561 <https://bugs.launchpad.net/fuel/+bug/1371561>`_.

* Neutron qrouter now migrates after all interfaces
  are deleted at the primary controller.
  See `LP1371550 <https://bugs.launchpad.net/fuel/+bug/1371550>`_.

Log rotation problem was fixed
------------------------------

Previously, root partition had no free disk space left due to log rotation;
for instance, this problem could cause MySQL crash.
See `LP1376209 <https://bugs.launchpad.net/fuel/+bug/1376209>`_.
Incorrect logrotate configuration also used to lead to lack of free disk space on Master node.
See `LP1378327 <https://bugs.launchpad.net/fuel/+bug/1378327>`_.

* When running Puppet noop tests on fuel-library 'master'
  'could not find resouce' error no longer occurs
  See `LP1383765 <https://bugs.launchpad.net/fuel/+bug/1383765>`_.

* Numerous reconnections no longer occur in different component logs.
  See `LP1371723 <https://bugs.launchpad.net/fuel/+bug/1371723>`_.

* Rsyslogd restart does not cause different services to hang.
  See `LP1363102 <https://bugs.launchpad.net/fuel/+bug/1363102>`_.

* When setting osapi_compute_unique_server_name_scope to project or global,
  duplicate names in the appropriate scope now returns a BadRequest (400) ; previously,
  it returned a ClientException (500) with an unhelpful message.
  See `LP1377176 <https://bugs.launchpad.net/fuel/+bug/1377176>`_ and the upstream
  `LP1376936 <https://bugs.launchpad.net/fuel/+bug/1376936>`_.

* Backport modal file upload fix for Horizon to 5.x branches
  See `LP1383335 <https://bugs.launchpad.net/fuel/+bug/1383335>`_.

* Exception ‘Something went wrong!’ no longer occurs
  when two different users work with Murano dashboard.
  See `LP1383673 <https://bugs.launchpad.net/fuel/+bug/1383673>`_.

* Rally benchmark NovaServers.resize_server is failing if concurrency >= 3 and only 1 tenant.
  See `LP1361614 <https://bugs.launchpad.net/fuel/+bug/1361614>`_.

* A flaw in the bash functionality was fixed; this bash functionality evaluated specially
  formatted environment variables passed to it from another environment.
  This feature could be used to override or bypass restrictions to the environment to
  execute shell commands before restrictions have been applied.
  See `LP1373965 <https://bugs.launchpad.net/fuel/+bug/1373965>`_.


