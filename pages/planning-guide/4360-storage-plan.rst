
.. _storage-plan:

Choosing the Storage Model
==========================

This section discusses considerations
for choosing the storage model for your OpenStack environment.
You need to consider two types:

- :ref:`Persistent storage<persistent-storage-term>`
  exists outside an instance.
- :ref:`Ephemeral storage<ephemeral-storage-term>`
  is allocated for an instance
  and is deleted when the instance is deleted. 

Fuel deploys two types of persistent storage:

- Glance, the image storage service,
  which can use either :ref:`swift-object-storage-term`
  or :ref:`ceph-term` as the storage backend
- Cinder, the block storage service,
  which can use either :ref:`lvm-term`
  or :ref:`ceph-term` as the storage backend

The Nova compute service manages ephemeral storage.
If you choose Ceph as the storage backend for Glance and Cinder,
Nova uses Ceph as the storage backend for ephemeral storage.

See:

- :ref:`storage-hardware-plan` for information about chosing
  the hardware to use for your storage objects
- `Storage Decisions <http://docs.openstack.org/trunk/openstack-ops/content/storage_decision.html>`_
  is an OpenStack community document
  that gives guidelines for choosing the storage model to use.

.. include:: /pages/planning-guide/storage/0100-storage-for-images.rst
.. include:: /pages/planning-guide/storage/0200-object-storage-for-apps.rst
.. include:: /pages/planning-guide/storage/0300-block-storage-for-volumes.rst

