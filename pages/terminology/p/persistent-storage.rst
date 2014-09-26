
.. _persistent-storage-term:

Persistent Storage
------------------

Persistent storage is storage that exists outside an instance,
in contrast to :ref:`ephemeral storage<ephemeral-storage-term>`.

Fuel deploys storage for two types of persistent data:

- :ref:`Glance<glance-term>`, for image data,
  which can use either :ref:`Swift<swift-object-storage-term>`
  or :ref:`Ceph RBD<ceph-term>` as the storage backend
- :ref:`Cinder<cinder-term>`, for block data,
  which can use either :ref:`LVM<lvm-term>`
  or :ref:`Ceph RBD<ceph-term>` as the storage backend


