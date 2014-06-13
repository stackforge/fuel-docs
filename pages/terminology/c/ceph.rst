.. _ceph-term:

Ceph
----
An open source storage platform
that provides unified object, block, and file storage
based on the `rados-term` storage architecture.
OpenStack uses Ceph RBD as:

- as the storage backend
  for the :ref:`glance-term` image server
- as the storage backend for :ref:`cinder-term`.
- through the REST API provided by the :ref:`swift-object-storage-term`
  for applications that need to store data in an object store.

See:

- For information about choosing Ceph for Storage
  in your Mirantis OpenStack environment,
  see :ref:`storage-plan`

- For architectural information
  about deploying Ceph in Mirantis OpenStack,
  see :ref:`Storage-Architecture-arch`.

- `Ceph documentation <http://ceph.com/docs/master/>`_.
  Note that the OpenStack implementation of Ceph
  does not include CephFS or the cdph-mds metadata component
  that is used with CephFS.

