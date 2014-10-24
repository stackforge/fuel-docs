

Issues Resolved in Mirantis OpenStack 5.1.1
===========================================

* Horizon and other services are now available if a controller fails
  See `LP1370510 <https://bugs.launchpad.net/fuel/+bug/1370510>`_.

* The **ceph-deploy prepare** command is performed successfully on HP Smart Array CCISS drives.
  The problem occured because HP Smart Array ISS drives had non-standard SCSI names in Linux.
  See `LP11381218 <https://bugs.launchpad.net/bugs/1381218>`_.

* When VMware vCenter is used
  as a hypervisor, metadata services stay available.
  See LP1370165 <https://bugs.launchpad.net/fuel/+bug/1370165>`_.

OpenStack bugs are fixed
------------------------

* Ceilometer connects to AMQP successfully after controller is shut down.
  See `LP1373569 <https://bugs.launchpad.net/bugs/1373569>`_.

* The Nova CLI and Python API to support Nova server groups are now introduced
  in 5.1.1. See `LP1382443 <https://bugs.launchpad.net/fuel/+bug/1382443>`_.

* Murano now does not change deployment status to "successful" when Heat stack failed.
  See `LP1383360 <https://bugs.launchpad.net/bugs/1383360>`_.

* Numerous reconnections no longer occur in different component logs.
  See `LP1371723 <https://bugs.launchpad.net/fuel/+bug/1371723>`_.

* **Something went wrong** exception is not displayed
  when two different users work with Murano dashboard.
  See `LP1383673 <https://bugs.launchpad.net/fuel/+bug/1383673>`_.

* Murano now uses the default RabbitMQ credentials,
  so RabbitMQ no longer loses Murano users
  when the Primary Controller in an HA cluster is shut down.
  See `LP1372483 <https://bugs.launchpad.net/fuel/+bug/1372483>`_.

* Nova resize no longer fails when a VM needs to be moved to
  another host. See `LP1385227 <https://bugs.launchpad.net/fuel/+bug/1385227>`_.

* Incorrect value problem in default Glance configuration file was resolved.
  See `LP1373813 <https://bugs.launchpad.net/fuel/+bug/1373813>`_.

* Packages now notify their services, so they can restart when package is updated.
  See `LP1362675 <https://bugs.launchpad.net/fuel/+bug/1362675>`_.

* Users now do not have to log into Horizon twice after a session times out
  This used to happen when both the Keystone token and
  the Horizon session expired at the same time.
  See `LP1353544 <https://bugs.launchpad.net/bugs/1353544>`_.

Volumes and disk space problems are resolved
--------------------------------------------

* Creating volume from image no longer performs full data copy with Ceph backend
  Previously, a regression was introduced into configuration of RBD backend for Cinder.In
  previous versions of Mirantis OpenStack, enabling RBD backend for both Cinder
  and Glance led to zero-copy creation of a Cinder volume from a Glance image.
  See `LP1373096 <https://bugs.launchpad.net/bugs/1373096>`_.

* If controller fails, all RBD backend Cinder volumes stay manageable.
  See `LP1371328 <https://bugs.launchpad.net/fuel/+bug/1371328>`_.

* Image file injection is fixed on CentOS; libguestfs dependency no longer misses.
  See `LP1367324 <https://bugs.launchpad.net/fuel/+bug/1367324>`_.

* Root partition now has enough free space left; MySQL no longer crashes.
  See `LP1376209 <https://bugs.launchpad.net/fuel/+bug/1376209>`_.

* Incorrect logrotate configuration was fixed; it caused the lack of free disk space on Master node.
  See `LP1378327 <https://bugs.launchpad.net/fuel/+bug/1378327>`_.

* Ceph node no longer freezes on the grub-step when choosing an operation
  system to boot. See `LP1356278 <https://bugs.launchpad.net/bugs/1356278>`_.

* VM instances that use ephermeral drives with Ceph RBD as the backend
  now can be evacuated using the **nova evacuate** command
  See `LP1367610 <https://bugs.launchpad.net/mos/+bug/1367610>`_.

* Ubuntu installer now checks that network adapter is initialized
  and no longer tries to get an IP address using DHCP
  if speed and some other parameters
  are not specified.
  See `LP1381266 <https://bugs.launchpad.net/bugs/1381266>`_.


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

* External network type is marked as *local* and removed from bridge mappings.
  See `LP1357298 <https://bugs.launchpad.net/fuel/+bug/1357298>`_.

* Neutron-API is now allowed to serve requests
  on all controllers together. See `LP1276762 <https://bugs.launchpad.net/fuel/+bug/1276762>`_

Other resolved issues
---------------------

* To upload CirrOS imaged on Ubuntu,
  **builtin** command is now used instead of **source**.
  See `LP1358140 <https://bugs.launchpad.net/fuel/+bug/1358140>`_.

* After successful deployment, "Authentication required" message
  is no longer displayed in the Capacity tab.
  See `LP1362615 <https://bugs.launchpad.net/fuel/+bug/1362615>`_.

* Nailgun's default_assignment handler is fixed.
  See `LP1374356 <https://bugs.launchpad.net/fuel/+bug/1374356>`_.

* Fuel ISO make system now uses upstream mirrors depending on the product version.
  See `LP1377125 <https://bugs.launchpad.net/fuel/+bug/1377125>`_.

* When running Puppet noop tests on fuel-library
  **could not find resource** error no longer occurs.
  See `LP1383765 <https://bugs.launchpad.net/fuel/+bug/1383765>`_.

* Rsyslogd restart does not cause different services to hang.
  See `LP1363102 <https://bugs.launchpad.net/fuel/+bug/1363102>`_.

* When setting osapi_compute_unique_server_name_scope to project or global,
  duplicate names in the appropriate scope now returns a BadRequest (400);
  previously,
  it returned a *ClientException (500)* with an unhelpful message.
  See `LP1377176 <https://bugs.launchpad.net/fuel/+bug/1377176>`_ and
  the upstream
  `LP1376936 <https://bugs.launchpad.net/fuel/+bug/1376936>`_.

* *resize_server* rally benchmark now does not fail if concurrency >= 3 and there is
  only one tenant.
  See `LP1361614 <https://bugs.launchpad.net/fuel/+bug/1361614>`_.

* A flaw in the bash functionality was fixed; this bash functionality evaluated specially
  formatted environment variables passed to it from another environment.
  See `LP1373965 <https://bugs.launchpad.net/fuel/+bug/1373965>`_.

* If default **admin** name is changed to any custom, tenant does not
  report a wrong name.
  See `LP1376515 <https://bugs.launchpad.net/bugs/1376515>`_.

* The *rabbitmqctl list-users* command now does not lead to deployment failure
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

