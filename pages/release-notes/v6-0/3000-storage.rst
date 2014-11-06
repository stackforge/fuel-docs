
.. _storage-rn:

Storage technologies Issues
===========================


New Features and Resolved Issues in Mirantis OpenStack 6.0
----------------------------------------------------------

* Ceph is now enabled as Nailgun plugin.
  Current Ceph implementation is moved into a separate plugin;
  custom role is provided to deploy Ceph on selected nodes.
  See
  `Ceph as Nailgun plugin <https://blueprints.launchpad.net/fuel/+spec/nailgun-ceph-plugin>_` blueprint.

* Glance can use vSphere Datastore as a backend. This provides
  a faster image copying process.
  See
  `vSphere as a Glance backend <https://blueprints.launchpad.net/fuel/+spec/vsphere-glance-backend>`_ blueprint.

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

* Ceph Monitor is now not installed on controllers if Ceph OSD was
  added to the cluster afterwards.
  See `LP1388798 <https://bugs.launchpad.net/bugs/1388798>`_.

* **Ceph-deploy OSD prepare** command goes successfully on HP Smart Array CCISS drives.
  See `LP1381218 <https://bugs.launchpad.net/bugs/1381218>`_.

* After successful deployment, but glance-api now is now broken.
  See `LP1374366 <https://bugs.launchpad.net/bugs/1374366>`_.

* When chosen, 'Ceph for volumes' option on Fuel UI wizard is saved without failures
  See `LP1384082 <https://bugs.launchpad.net/bugs/1384082>`_.


Known Issues in Mirantis OpenStack 6.0
--------------------------------------

Ceilometer does not correctly poll Ceph as a back-end for Swift
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

When Ceph and the Rados Gateway is used for Swift,
Ceilometer does not poll Ceph
because the endpoints between Swift and Ceph are incompatible.
See `LP1352861 <https://bugs.launchpad.net/bugs/1352861>`_.

Bulk operations are not supported for Swift using Ceph as a backend
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

When Swift is used with Ceph Rados GW enabled as the backend,
bulk operations are not supported.
See `LP1361036 <https://bugs.launchpad.net/bugs/1361036>`_.


Placing Ceph OSD on Controller nodes is not recommended
+++++++++++++++++++++++++++++++++++++++++++++++++++++++

Placing Ceph OSD on Controllers is highly unadvisable because it can severely
degrade controller's performance.
It is better to use separate storage nodes
if you have enough hardware.

Environment cannot be reset to use Cinder rather than Ceph
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

If you use Fuel to deploy a Mirantis OpenStack environment
that uses Ceph for volume, image, and ephemeral storage
then reset the environment to use Cinder rather than Ceph,
the controller node is unable to locate the HDD
and the environment cannot be redeployed.
See `LP1370006 <https://bugs.launchpad.net/fuel/+bug/1370006>`_.

Evacuate fails on Ceph backed volumes
+++++++++++++++++++++++++++++++++++++

VM instances that use ephermeral drives with Ceph RBD as the backend
cannot be evacuated using the **nova evacuate** command
because of an error in the instance rebuild logic.
To move such instances to another compute node,
use live migration.
To rebuild VM instances from a failed compute node,
use Cinder volume backed instances.
See `LP1367610 <https://bugs.launchpad.net/mos/+bug/1367610>`_
and the upstream `LP1249319 <https://bugs.launchpad.net/nova/+bug/1249319>`_.

Controller has unallocated space when Ceph is used as image backend
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

When using Ceph as the backend for Glance image storage,
unallocated space is left on the Controller.
See `LP1295717 <https://bugs.launchpad.net/bugs/1295717>`_.
This is being addressed as part of the
`volume manager refactoring <https://blueprints.launchpad.net/fuel/+spec/volume-manager-refactoring>`_
that is under development.

Hypervisor summary displays incorrect total storage for Ceph ephemeral storage
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

The Horizon Admin/Hypervisors Disk Usage field
shows an incorrect value when Ceph is used as the back end for ephemeral storage.
The value show in a sum of all Ceph storage seen on each storage node
instead of the actual amount of Ceph storage.
See `LP1359989 <https://bugs.launchpad.net/bugs/1359989>`_.

Other Ceph issues
+++++++++++++++++

* Do not recreate the RadosGW region map after initial deployment
  of the OpenStack environment;
  this may cause the map to be corrupted so that RadosGW cannot start.
  If this happens, you can repair the RadosGW region map
  with the following command sequence:
  ::

     radosgw-admin region-map update
     service ceph-radosgw start

  See `LP1287166 <https://bugs.launchpad.net/fuel/+bug/1287166>`_.

* RADOS Gateway has segmantation faults due to emply copy.
  See `LP1386369 <https://bugs.launchpad.net/fuel/+bug/1386369>`_.

* "No such device" error occurs when instance with Ceph volumes or images
  is launched. See `LP1385834 <https://bugs.launchpad.net/fuel/+bug/1385834>`_.

* Ceph OSD can not be stopped after installation procedure.
  See `LP1374160 <https://bugs.launchpad.net/fuel/+bug/1374160>`_.

* During deployment, **ceph-deploy --overwrite-config** fails
  with errors in Puppet log.
  See `LP1388749 <https://bugs.launchpad.net/fuel/+bug/1388749>`_.

* When Ceph is chosen for both Cinder and Glance, it
  copies the image to Controller (Glance) node and does not
  upload the image back to Cinder as a volume.
  See `LP1373096 <https://bugs.launchpad.net/bugs/1373096>`_.
