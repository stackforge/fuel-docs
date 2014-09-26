Object Storage for Applications
-------------------------------

The objects storage systems supported by Mirantis OpenStack
can also be used by applications
that need to store data in an object store.
Swift provides a REST API for Swift
as well as the `S3 API
<http://docs.openstack.org/grizzly/openstack-object-storage/admin/content/configuring-openstack-object-storage-with-s3_api.html>`_
that emulates the Amazon S3 API on top of Swift Object Storage.

Ceph includes the optional Ceph Object gateway component (radosgw_).
Each radosgw object is represented
as a sequence of fixed size stripes,
with each stripe stored in a separate RADOS object.
Applications can use radosgw
to access objects in the RADOS object store.

.. _radosgw: http://ceph.com/docs/master/radosgw/

The Ceph RBD backend for Glance
uses the Ceph Object Gateway
and does not directly use the Swift API,
so it is possible to store Glance images in Ceph
and still use Swift as the object store for applications.

Note that the radosgw implementation of the Swift API
omits some advanced operations;
applications that require these advanced operations
must call the Swift API directly.

Because the Ceph Object Gateway
replaces Swift as the provider of the Swift APIs,
it is not possible to have both radosgw and Swift
running in the same OpenStack environment.

