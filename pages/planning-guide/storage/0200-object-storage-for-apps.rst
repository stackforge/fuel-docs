Object Storage for Applications
-------------------------------

The object storage systems supported by Mirantis OpenStack
can also be used by applications
that need to store data in an object store.
Swift provides a native REST API
as well as the `S3 API compatibility layer
<http://docs.openstack.org/grizzly/openstack-object-storage/admin/content/configuring-openstack-object-storage-with-s3_api.html>`_
that emulates the Amazon S3 API on top of Swift Object Storage.

Ceph includes the optional Ceph Object Gateway component (radosgw_)
that applications can use to access RGW objects.

.. _radosgw: http://ceph.com/docs/master/radosgw/

Note that the radosgw implementation of the Swift API
does not implement all operations.

Ceph RBD uses RADOS directly
and does not use the Swift API,
so it is possible to store Glance images in Ceph
and still use Swift as the object store for applications.

Because the Ceph Object Gateway
replaces Swift as the provider of the Swift APIs,
it is not possible to have both radosgw and Swift
running in the same OpenStack environment.


