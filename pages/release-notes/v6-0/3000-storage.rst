
.. _storage-rn:

Storage technologies Issues
===========================

New Features and Resolved Issues in Mirantis OpenStack 6.0
----------------------------------------------------------
* Glance now can use vSphere Datastore as a backend. This provides
  a faster image copying process.
  See `vSphere as a Glance backend <https://blueprints.launchpad.net/fuel/+spec/vsphere-glance-backend>`_.

* When updating the environment from 5.0.x to 5.0.2,
  the Ceph nodes are now successfully updated.
  See `LP1363983 <https://bugs.launchpad.net/fuel/+bug/1363983>`_.

* Creating volume from image no longer performs full data copy even with Ceph backend.
  A regression was introduced into configuration of RBD backend for Cinder. In
  previous versions of Mirantis OpenStack, enabling RBD backend for both Cinder
  and Glance enabled zero-copy creation of a Cinder volume from a Glance image.
  See `LP1373096 <https://bugs.launchpad.net/bugs/1373096>`_.

Known Issues in Mirantis OpenStack 6.0
--------------------------------------

Ceilometer does not correctly poll Ceph as a back-end for Swift
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

When Ceph and the Rados Gateway is used for Swift,
Ceilometer does not poll Ceph
because the endpoints between Swift and Ceph are incompatible.
See `LP1352861 <https://bugs.launchpad.net/bugs/1352861>`_.
[in progress
]

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
[in progress]
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


