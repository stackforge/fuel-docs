
.. _persistent-storage-term:

Persistent Storage
------------------

Persistent storage is storage that exists outside an instance,
in contrast to :ref:`ephemeral storage<ephemeral-storage-term>`.

Fuel deploys two types of persistent storage:

- :ref:`Glance<glance-term>`, for image storage,
  which can use either :ref:`swift-object-storage-term`
  or :ref:`ceph-term` as the storage backend
- :ref:`Cinder<cinder-term>`, for block storage,
  which can use either :ref:`lvm-term`
  or :ref:`ceph-term` as the storage backend


