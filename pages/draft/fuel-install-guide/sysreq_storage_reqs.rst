.. _sysreq_storge_reqs:

Storage requirements
~~~~~~~~~~~~~~~~~~~~

When planning storage, understand the difference between the two
types of storage that OpenStack uses: persistent and ephemeral.

The nova-compute service manages ephemeral storage that is used as temporary
storage for operating system of virtual machine instances. When you
delete an instance, nova-compute deletes the ephemeral storage as well.
If you do not select any additional storage options, the virtual machine
volumes will be stored on the local disks of the compute nodes, in the
virtual storage partition. However, if you enable Ceph RBD backend for
ephemeral volumes, nova-compute stores virtual machine volumes in Ceph.

Persistent storage is the storage that exists outside an instance, in contrast
to ephemeral storage.

Fuel deploys storage for two types of persistent data:

* Glance, for image data, which can use either Swift or Ceph RBD as a
  storage backend.
* Cinder, for block data, which can use either LVM or Ceph RBD as a
  storage backend.

.. seealso::

  - `Storage Decisions
    <http://docs.openstack.org/openstack-ops/content/storage_decision.html>`_
