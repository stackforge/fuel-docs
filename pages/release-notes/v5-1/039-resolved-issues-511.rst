

Issues Resolved in Mirantis OpenStack 5.1.1
===========================================

* Horizon and other services are now available if a controller fails
  See `LP1370510 <https://bugs.launchpad.net/fuel/+bug/1370510>`_.

* The **ceph-deploy prepare** command is performed successfully on HP Smart Array CCISS drives.
  The problem occured because HP Smart Array ISS drives had non-standard SCSI names in Linux.
  See `LP11381218 <https://bugs.launchpad.net/bugs/1381218>`_.

* When VMware vCenter is used
  as a hypervisor, metadata services stay available.
  See `LP1370165 <https://bugs.launchpad.net/fuel/+bug/1370165>`_.

* A CentOS environment now can be configured to run Zabbix.
  See `LP1368151 <https://bugs.launchpad.net/bugs/1368151>`_.

OpenStack bugs are fixed
------------------------

* Ceilometer connects to AMQP successfully after controller is shut down.
  See `LP1373569 <https://bugs.launchpad.net/bugs/1373569>`_.

* Novaclient package providing Nova CLI and Python API is updated to a version that supports
  Nova server groups. See `LP1382443 <https://bugs.launchpad.net/fuel/+bug/1382443>`_.

* Murano now does not change deployment status to "successful" when Heat stack failed.
  See `LP1383360 <https://bugs.launchpad.net/bugs/1383360>`_.

* The Oslo messaging service had a bug that affected MOS HA environments.
  The bug could make OpenStack unstable; the problem got worse as the load increased.
  A large number of broken AMQP connections
  caused Oslo-related errors appear in different logs.
  See `LP1371723 <https://bugs.launchpad.net/fuel/+bug/1371723>`_.

* `Something went wrong` exception is not displayed
  when two different users work with Murano dashboard.
  See `LP1383673 <https://bugs.launchpad.net/fuel/+bug/1383673>`_.

* RabbitMQ user for Murano is no longer lost when the Primary Controller
  in an HA cluster is shut down.
  See `LP1372483 <https://bugs.launchpad.net/fuel/+bug/1372483>`_.

* Nova resize no longer fails when a VM needs to be moved to
  another host. See `LP1385227 <https://bugs.launchpad.net/fuel/+bug/1385227>`_.

* Glance no longer fails to save large VM snapshots (greater than 300MB) to Swift.
  See `LP1373813 <https://bugs.launchpad.net/fuel/+bug/1373813>`_.

* Users now do not have to log into Horizon twice after a session times out
  This used to happen when both the Keystone token and
  the Horizon session expired at the same time.
  See `LP1353544 <https://bugs.launchpad.net/bugs/1353544>`_.


Volumes and disk space problems are resolved
--------------------------------------------

* Creating volume from image no longer performs full data copy
  when when Ceph RBD is used as the storage backend for Cinder and Glance.
  In Mirantis OpenStack 5.1, a regression was introduced into RBD backend
  configuration for Cinder that broke previously supported zero-copy creation
  of Cinder volumes from Glance images.
  See `LP1373096 <https://bugs.launchpad.net/bugs/1373096>`_.

* Controller failure no longer makes Cinder unable to manage some Ceph RBD backed volumes.
  See `LP1371328 <https://bugs.launchpad.net/fuel/+bug/1371328>`_.

* Image file injection in CentOS is fixed by restoring a missed dependency on libguestfs package.
  See `LP1367324 <https://bugs.launchpad.net/fuel/+bug/1367324>`_.

* Fixed multiple log rotation errors that could cause logs to fill use up all available disk space on a root partition.
  See `LP1376209 <https://bugs.launchpad.net/fuel/+bug/1376209>`_ and
  `LP1378327 <https://bugs.launchpad.net/fuel/+bug/1378327>`_.

* Node will no longer freeze waiting for user input in GRUB after a hard restart.
  system to boot. See `LP1356278 <https://bugs.launchpad.net/bugs/1356278>`_.

* VM instances that use ephermeral drives with Ceph RBD as the backend
  now can be evacuated using the **nova evacuate** command
  See `LP1367610 <https://bugs.launchpad.net/mos/+bug/1367610>`_.


Neutron and networking issues are resolved
------------------------------------------

* Neutron L3-agent starts interfaces successfully and does not hang.
  See `LP1310926 <https://bugs.launchpad.net/fuel/+bug/1310926>`_
  and `LP1361710 <https://bugs.launchpad.net/fuel/+bug/1361710>`_.

* Neutron metadata agent now uses RPC to communicate with Neutron server instead
  of the Neutron client; it also no longer fails after primary controller is shut down.
  See `LP1364348 <https://bugs.launchpad.net/fuel/+bug/1364348>`_ and
  `LP1371561 <https://bugs.launchpad.net/fuel/+bug/1371561>`_.

* Neutron qrouter now migrates after all interfaces
  are deleted at the primary controller.
  See `LP1371550 <https://bugs.launchpad.net/fuel/+bug/1371550>`_.

* Neutron API requests are now load balanced between all controllers.
  See `LP1276762 <https://bugs.launchpad.net/fuel/+bug/1276762>`_

* Ubuntu installer now waits longer for a network adapter
  to complete initialization before attempting to obtain an IP address using DHCP.
  See `LP1381266 <https://bugs.launchpad.net/bugs/1381266>`_.

Other resolved issues
---------------------

* Capacity CSV report in Horizon is no longer blocked by an
  "Authentication required" error message.
  See `LP1362615 <https://bugs.launchpad.net/fuel/+bug/1362615>`_.

* Restarting Rsyslogd no longer causes some OpenStack services to freeze
  and consume 100% CPU.
  See `LP1363102 <https://bugs.launchpad.net/fuel/+bug/1363102>`_.

* When setting osapi_compute_unique_server_name_scope to project or global,
  duplicate names in the appropriate scope now returns a BadRequest (400);
  previously,
  it returned a *ClientException (500)* with an unhelpful message.
  See `LP1377176 <https://bugs.launchpad.net/fuel/+bug/1377176>`_ and
  the upstream
  `LP1376936 <https://bugs.launchpad.net/fuel/+bug/1376936>`_.

* Booting multiple VM instances concurrently can no longer make Nova fail
  with a SecurityGroupExists exception.
  See `LP1361614 <https://bugs.launchpad.net/fuel/+bug/1361614>`_.

* A fix for the Shellshock vulnerability in Bash is included into this release.
  See `LP1373965 <https://bugs.launchpad.net/fuel/+bug/1373965>`_.

* If default **admin** name is changed to a custom name,
  the correct custom name is now reported for the tenant.
  See `LP1376515 <https://bugs.launchpad.net/bugs/1376515>`_.

* Deployment of an HA environment will no longer fail due to a premature execution
  of the **rabbitmqctl list-users** command.
  See `LP1377491 <https://bugs.launchpad.net/bugs/1377491>`_.

* The Ceilometer Swift agent no longer fails
  when the primary Controller node is shut down.
  See `LP1380800 <https://bugs.launchpad.net/bugs/1380800>`_
  and the upstream `LP1337715
  <https://bugs.launchpad.net/ceilometer/+bug/1337715>`_.

* The MongoDB role can now be successfully assigned to a node
  using :ref:`fuel CLI<cli_usage>`.
  See `LP1376831 <https://bugs.launchpad.net/bugs/1376831>`_.

* After :ref:`upgrading<upgrade-ug>` Fuel,
  the Rsync Docker container no longer uses old puppet manifests.
  See `LP1382531 <https://bugs.launchpad.net/bugs/1382531>`_.

* All packages are now updated on nodes after
  :ref:`upgrading<upgrade-ug>` Fuel.
  See `LP1364586 <https://bugs.launchpad.net/mos/+bug/1392261>`_.

