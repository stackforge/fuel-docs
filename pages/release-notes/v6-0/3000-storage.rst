
.. _storage-rn:

Storage technologies Issues
===========================


New Features and Resolved Issues in Mirantis OpenStack 6.0
----------------------------------------------------------

* Glance can use vSphere Datastore as a backend.
  This provides
  a faster image copying process.
  See `vSphere as a Glance backend <https://blueprints.launchpad.net/fuel/+spec/vsphere-glance-backend>`_ blueprint.

* When updating the environment,
  the Ceph nodes are now successfully updated.
  See `LP1363983 <https://bugs.launchpad.net/fuel/+bug/1363983>`_.

* Creating a volume from an image no longer performs
  full data copy even with Ceph backend.
  A regression was introduced
  into the configuration of RBD backend for Cinder.
  In previous versions of Mirantis OpenStack,
  enabling RBD backend for both Cinder and Glance
  enabled zero-copy creation of a Cinder volume from a Glance image.
  See `LP1373096 <https://bugs.launchpad.net/bugs/1373096>`_.

*  Ceph monitor will be installed on controllers,
   if *ceph-osd* was added to cluster after controllers were deployed.
   Nevertheless, if you want to reconfigure Glance, Cinder or
   nova to use Ceph as backend, you can do it only manually.
   See `LP1388798 <https://bugs.launchpad.net/bugs/1388798>`_.

* **Ceph-deploy OSD prepare** command completes successfully on HP Smart Array CCISS drives.
  See `LP1381218 <https://bugs.launchpad.net/bugs/1381218>`_.

* Swift replicator service no longer has an upstart error
  on Ubuntu.
  See `LP1381018 <https://bugs.launchpad.net/bugs/1381018>`_.

* When Ceph RadosGW is used to provide Swift API,
  Ceilometer now successfully polls Ceph.
  See `LP1352861 <https://bugs.launchpad.net/bugs/1352861>`_.

* Nova can evacuate instances with Ceph backed ephemeral drives.
  See `LP1367610 <https://bugs.launchpad.net/mos/+bug/1367610>`_
  and the upstream `LP1249319 <https://bugs.launchpad.net/nova/+bug/1249319>`_.

* Ceph RadosGW no longer crashes when copying an empty object.
  See `LP1386369 <https://bugs.launchpad.net/fuel/+bug/1386369>`_.

* Creating volume from image no longer performs full data copy when when Ceph
  RBD is used as the storage backend for Cinder and Glance. In Mirantis
  OpenStack 5.1, a regression was introduced into RBD backend configuration for
  Cinder that broke previously supported zero-copy creation of Cinder volumes
  from Glance images.
  See `LP1373096 <https://bugs.launchpad.net/bugs/1373096>`_.

Known Issues in Mirantis OpenStack 6.0
--------------------------------------

Placing Ceph OSD on Controller nodes is not recommended
+++++++++++++++++++++++++++++++++++++++++++++++++++++++

Placing Ceph OSD on Controllers is not recommended because it can severely
degrade controller's performance.
It is better to use separate storage nodes
if you have enough hardware.

Environment cannot be reset to use Cinder rather than Ceph
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

If you use Fuel to deploy a Mirantis OpenStack environment
that uses Ceph for volume, image, and ephemeral storage and
then reset the environment to use Cinder rather than Ceph,
the controller node is unable to locate the HDD
and the environment cannot be redeployed.
See `LP1370006 <https://bugs.launchpad.net/fuel/+bug/1370006>`_.

Controller has unallocated space when Ceph is used as image backend
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

When using Ceph as the backend for Glance image storage,
unallocated space is left on the Controller.
See `LP1295717 <https://bugs.launchpad.net/bugs/1295717>`_.
This is being addressed as part of the
`volume manager refactoring <https://blueprints.launchpad.net/fuel/+spec/volume-manager-refactoring>`_
that is under development.

Disk configuration spontaneously changes to default
++++++++++++++++++++++++++++++++++++++++++++++++++++

If you change disk configuration at the already deployed Cinder node,
this specific configuration will become a default one in the database.
This happens, because Nailgun discovers the attached
Cinder volume as a new sdX device.
The problem can also occur at Ceph nodes.
This issue does not affect performance.
See `LP1400387 <https://bugs.launchpad.net/bugs/1400387>`_.

Other Ceph issues
+++++++++++++++++

* A Ceph OSD node can not be stopped with the
  **stop ceph-osd id=xx** command on Ubuntu immediately after deployment.
  After the node is rebooted, **stop ceph-osd** command works as expected.
  Applying `Patch 135338 <https://review.openstack.org/135338>`_ prevents this
  problem.
  See `LP1374160 <https://bugs.launchpad.net/bugs/1374160>`_.
