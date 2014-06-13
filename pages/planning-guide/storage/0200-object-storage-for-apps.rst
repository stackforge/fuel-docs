

Object Storage for Applications
-------------------------------

The object storage systems supported by Mirantis OpenStack
can also be used by applications;
they are not limited to serving Glance.
Swift provides a REST API that can be
used by any application that needs to store data in an object store,
and is immediately available whenever you have Swift running.

:ref:`Ceph<ceph-term>` includes
the optional radosgw_ object gateway component
which allows access to objects in an :ref:`rados-term` object store
using REST interfaces compatible with Amazon S3 and Swift APIs.

.. _radosgw: http://ceph.com/docs/master/radosgw/

The Ceph RBD backend for Glance does not use the Swift API
and uses RADOS directly,
so it is possible to store Glance images in Ceph
and still use Swift as object store for applications.
This does not work the other way around:
when you choose to install the Ceph object gateway,
it replaces Swift as the provider of the Swift API,
so you cannot have both radosgw and
Swift in the same OpenStack environment.

