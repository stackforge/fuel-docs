Object Storage for Applications
-------------------------------

The objects storage systems supported by Mirantis OpenStack
can also be used by applications
that need to store data in an object store.
Swift provides a REST API that
is immediately available whenever you have Swift running.

Ceph includes the optional radosgw_ object gateway component
which allows applications to access objects in the RADOS object store
using REST interfaces that are compatible with Amazon S3 and Swift APIs.

.. _radosgw: http://ceph.com/docs/master/radosgw/

The Ceph RBD backend for Glance does not use the Swift API
but uses RADOS directly,
so it is possible to store Glance images in Ceph
and still use Swift as object store for applications.
Note that some minor bits of the Swift APIs
may not be completely supported in Ceph
because the Rados gateway is an implementation of Swift
but not Swift itself.

Note that the Ceph object gateway
replaces Swift as the provider of the Swift APIs
so it is not possible to have both radosgw and Swift
running in the same OpenStack environment.

