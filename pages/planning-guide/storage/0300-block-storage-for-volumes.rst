
.. _cinder-plan:

Block Storage for Volumes
-------------------------

When you configure Mirantis OpenStack
to use the default **LVM** backend for Cinder block devices,
Cinder stores each volume as a logical volume
in an LVM volume group on one of your Cinder nodes.

If you do not need your volumes to be resilient,
you can let Fuel create a JBOD partition
that spans all your storage drives in a node during deployment,
or you can join all drives into a RAID array before deployment,
and have the array appear to Fuel as a single block device.
Even if you use RAID in each Cinder node,
that only protects your data from a hard drive failure.
If the whole Cinder node is lost,
so are all volumes that were stored on that node.

Setting the Cinder backend to **Ceph RBD**
allows you to take advantage of Ceph's object replication capabilities
by storing Cinder volumes as objects in Ceph RADOS object storage system.
By default, Ceph simply ensures that every replica of an object
is stored on a different node.
The set of data replication rules (CRUSH map)
can be customized separately for each object pool
to change the number of object replicas,
add different types of failure domains, etc.
The amount of storage required to host your volumes
will be multiplied by the replication factor you configure for Ceph,
but your volumes will be protected from node
or even data center failure.

If you combine RBD backends for Cinder and Glance,
you gain another important advantage over Cinder LVM:
copy-on-write cloning of Glance images into bootable Ceph volumes.

