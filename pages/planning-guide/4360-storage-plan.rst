
.. _storage-plan:

Choosing the Persistent Storage Model
=====================================

Persistent storage is storage that exists outside an instance,
in contrast to :ref:`ephemeral storage<ephemeral-storage-term>`.

Fuel deploys two types of persistent storage:

- Glance, the image storage service,
  which can use either :ref:`swift-object-storage-term`
  or :ref:`ceph-term` as the storage backend
- Cinder, the block storage service,
  which can use either :ref:`lvm-term`
  or :ref:`ceph-term` as the storage backend

This section discusses considerations
for choosing the storage model for your OpenStack environment.

See:

- :ref:`storage-hardware-plan` for information about chosing
  the hardware to use for your storage objects
- `Storage Decisions <http://docs.openstack.org/trunk/openstack-ops/content/storage_decision.html>`_
  is an OpenStack community document
  that gives guidelines for choosing the storage model to use.

.. include:: /pages/planning-guide/storage/0100-object-store-for-images.rst
.. include:: /pages/planning-guide/storage/0200-object-storage-for-apps.rst
.. include:: /pages/planning-guide/storage/0300-block-storage-for-volumes.rst

