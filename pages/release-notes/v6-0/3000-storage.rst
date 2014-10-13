
.. _storage-rn:

Storage technologies
====================

- `Swift Release Notes
  <https://wiki.openstack.org/wiki/ReleaseNotes/Juno#OpenStack_Object_Storage_.28Swift.29>`_

- `Glance in Juno
  <https://wiki.openstack.org/wiki/ReleaseNotes/Juno#OpenStack_Image_Service_.28Glance.29>`_

- `Cinder in Juno
  <https://wiki.openstack.org/wiki/ReleaseNotes/Juno#OpenStack_Block_Storage_.28Cinder.29>`_

- `Ceph V0.80.6 Firefly Release Notes
  <http://ceph.com/docs/master/release-notes/#v0-80-6-firefly>`_

New Features and Resolved Issues in Mirantis OpenStack 6.0
----------------------------------------------------------

Known Issues in Mirantis OpenStack 5.1
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

Ceph nodes are not updated
++++++++++++++++++++++++++

When updating the environment from 5.0.x to 5.0.2,
the Ceph nodes are not updated.
You can update the Ceph nodes manually.

- Update the environment to 5.0.2.

- Restart the monitors.

- Run the **ceph pg dump** command
  and check the output;
  if unclean pages are found,
  resolve these issues before updating the Ceph nodes.

- After all monitors are restarted,
  update the code on the OSD nodes one by one,
  restart the OSD service,
  and wait until all OSD nodes have rebuilt cleanly.

See `LP1363983 <https://bugs.launchpad.net/fuel/+bug/1363983>`_.

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
In order to be able to rebuild VM instances
from a failed compute node,
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

Creating volume from image performs full data copy even with Ceph backend
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

A regression was introduced into configuration of RBD backend for Cinder. In
previous versions of Mirantis OpenStack, enabling RBD backend for both Cinder
and Glance enabled zero-copy creation of a Cinder volume from a Glance image.

To re-enable this functionality in Mirantis OpenStack 5.1, add the following
line to */etc/cinder/cinder.conf*::

    glance_api_version=2

Then restart the *cinder-volume* service on all controller nodes.

See `LP1373096 <https://bugs.launchpad.net/bugs/1373096>`_.

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



