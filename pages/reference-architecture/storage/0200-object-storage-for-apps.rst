Object Storage for Applications
-------------------------------

The objects storage systems supported by Mirantis OpenStack don't have
to be limited to serving Glance. Swift provides a REST API that can be
used by any application that needs to store data in an object store, and
is immediately available whenever you have Swift running.

Ceph includes the optional radosgw_ object gateway component which
allows to access objects in RADOS object store using REST interfaces
compatible with Amazon S3 and Swift APIs.

.. _radosgw: http://ceph.com/docs/master/radosgw/

Ceph RBD backend for Glance doesn't use Swift API and uses RADOS
directly, so it is possible to store Glance images in Ceph and still use
Swift as object store for applications. This does not work the other way
around: when you choose to install the Ceph object gateway, it replaces
Swift as the provider of Swift API, so you can't have both radosgw and
Swift in the same OpenStack environment.
