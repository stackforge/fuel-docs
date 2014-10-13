
.. _swift-rn:

OpenStack Object Storage (Swift)
================================

See the OpenStack Release Notes about
`Swift in Juno
<https://wiki.openstack.org/wiki/ReleaseNotes/Juno#OpenStack_Object_Storage_.28Swift.29>`_.

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



Known Issues in Mirantis OpenStack 6.0
--------------------------------------

