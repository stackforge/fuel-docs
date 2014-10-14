Cinder: Block Storage for Volumes
---------------------------------

Cinder serves block devices for the OpenStack environment.
You have two choices for the storage back-end:

* Cinder LVM (default):
  each volume is stored as a logical volume
  in an LVM volume group on one of your Cinder nodes.

* Ceph: each volume
  is stored as an object in the Ceph RADOS object storage system.

.. note::  If you are using :ref:`vcenter-term` as the hypervisor,
           you must use the **VMDK** driver
           to store your volumes in the vCenter datastore.

Factors to consider
when choosing between Cinder LVM and Ceph
for the Cinder storage backend include:

* Ceph provides a single shared pool of storage nodes
  as discussed above for image storage.

* Ceph provides object replication capabilities
  by storing Cinder volumes as Ceph RBD objects;
  each Ceph RBD object is stored as multiple RADOS objects.
  Ceph ensures that each replica of an object
  is stored on a different node.
  This means that your volumes are protected
  against hard drive and node failures
  or even the failure of the data center itself.

  The Ceph data replication rules (CRUSH map)
  can be customized separately for each object pool
  to modify the number of object replicas,
  add different types of failure domains, etc.

* LVM provides much less protection of your data than Ceph does.
  Even if you use RAID on each Cinder node,
  your data is only protected against a hard drive failure.
  If the Cinder node itself is lost,
  all volumes that were stored on that node are lost.

* Ceph consumes more disk space than LVM.
  LVM stores a single replica of the data
  whereas Ceph stores at least two copies of your data
  so that your actual raw storage capacity
  must be two to three times bigger than your data set.
  Beginning with the "Firefly" release of Ceph
  (supported by Mirantis OpenStack beginning with Release 5.1),
  you can manually implement erasure coding striping
  to reduce the data multiplication requirements of Ceph.

* Ceph provides multi-node striping and redundancy for block storage.

* If you combine Ceph RBD backends for Cinder and Glance,
  you gain another important advantage over Cinder LVM:
  copy-on-write cloning of Glance images into bootable Ceph volumes.

* Ceph supports `live migration
  <http://docs.openstack.org/admin-guide-cloud/content/section_live-migration-usage.html>`_
  of VMs with ephemeral drives
  whereas LVM only supports live migration of volume backed VMs.

If you use Cinder LVM,
you have the following configuation options:

- Let Fuel create a JBOD partition
  that spans all the storage drives in a node.

- You can join all drives into a RAID array before deployment
  and have the array appear to Fuel as a single block device.

When deploying Ceph,
Fuel partitions the Ceph storage nodes
so that most of the space is reserved for Ceph-OSD storage;
all other partitions for the node
consume a portion of the first drive.
To improve system performance,
you might configure one or two SSDs
and assign them the "Ceph General" role
on the :ref:`assign-roles-ug` screen.
See `Ceph Hardware Recommendations
<http://ceph.com/docs/master/start/hardware-recommendations/>`_
for details.
