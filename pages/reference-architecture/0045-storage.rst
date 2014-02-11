.. index:: Storage architecture, Object storage, Cinder, Swift, Glance, Ceph

.. _Storage_Architecture:

Storage Architecture
====================

Object Storage for Images
-------------------------

.. _Object_Storage_for_Images:

Fuel can configure one of these storage backends for the Glance image
service:

 * File system backend

 * `Swift object store <http://swift.openstack.org/>`_, the standard
   OpenStack object storage component

 * `Ceph RBD <http://ceph.com/docs/master/rbd/rbd-openstack/>`_, the
   distributed block device service based on RADOS, the object store
   component of the Ceph storage platform

 * `Cinder LVM <https://wiki.openstack.org/wiki/Cinder>`_, the
   infrastructure for managing volumes in OpenStack

By default, Glance stores virtual machine images
using the **file system** backend.
With it, you can use any of the shared file systems supported by Glance.
Fuel defaults to this option in a simple non-HA deployment
with a local file system on a single controller node.

For a production HA environment where you want data resilience for VM images,
the best practice is to use an object store as the backend for Glance.
That way, multiple Glance instances running on controller nodes
can store and retrieve images from the same data set,
while the object store takes care of data protection and HA.

In HA deployment mode, Fuel defaults to using **Swift**
as the storage backend for Glance instead of the file system backend.
In both HA and non-HA multi-node configurations,
Fuel also offers you the option to use Ceph as the storage backend.

Ceph
----

The Nova (Compute) service in Mirantis OpenStack now supports
VM instances backed by ephemeral volumes stored in Ceph.
With Glance, Cinder, and Nova all supporting the Ceph RBD backend,
OpenStack VM instances can take advantage of Ceph clustered storage capabilitiesthrough all of the steps of their life cycle.
Ephemeral volumes can be created as copy-on-write clones of Glance Images,
recovered from compute node failure thanks to Ceph object replication,
and hared among Compute nodes to enable live migration of VMs.

**Ceph RBD** can unify different classes of data
into a single shared pool of storage nodes
that can handle all classes of data important for OpenStack.
Instead of having to copy OS images and volumes
between separate Glance, Cinder, and Nova storage pools,
all three services can use copy-on-write clones of the original image.
In addition to better utilization of storage capacity,
copy-on-write also significantly speeds up launching VMs from images.

To make the most out of the copy-on-write capability of the Ceph backend,
you should only use images in **raw** format.
Images in other formats such as qcow2
must be converted to raw format first and cannot be cloned without conversion.

The vanilla OpenStack Havana release places several important limitations
on the copy-on-write capability of the Ceph backend.
The Mirantis OpenStack 4.0 distribution includes fixes for these issues
that have not yet been incorporated into the main OpenStack Havana tree:

 * You must create an RBD backed bootable volume from a raw image for
   copy-on-write and live migrations to work.

 * Launching an instance directly from an image results in a full copy on
   the compute node instead of a copy-on-write clone in Ceph.

 * Ephemeral drives are stored in local files on compute nodes instead of Ceph,
   preventing live migration of instances with ephemenral drives.

 * Non-raw images are not converted to raw automatically when creating a
   bootable volume: if you do not convert the image yourself,
   you will end up with a clone of a qcow2 image that is not bootable.

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

Block Storage for Volumes
-------------------------

When you configure Mirantis OpenStack to use the default **LVM** backend
for Cinder block devices, Cinder will store each volume as a logical
volume in an LVM volume group on one of your Cinder nodes.

If you don't need your volumes to be resilient, you can let Fuel create
a JBOD partition spanning all your storage drives in a node during
deployment, or you can join all drives into a RAID array before
deployment, and have the array appear to Fuel as a single block device.
Even if you use RAID in each Cinder node, that only protects your data
from a hard drive failure. If the whole Cinder node is lost, so are all
volumes that were stored on that node.

Setting Cinder backend to **Ceph RBD** allows to take advantage of
Ceph's object replication capabilities by storing Cinder volumes as
objects in Ceph RADOS object storage system. By default, Ceph simply
ensures that every replica of an object is stored on a different node.
The set of data replication rules (CRUSH map) can be customized
separately for each object pool to change the number of object replicas,
add different types of failure domains, etc. The amount of storage
required to host your volumes will be multiplied by the replication
factor you configure for Ceph, but your volumes will be protected from
node or even data center failure.

If you combine RBD backends for Cinder and Glance, you gain another
important advantage over Cinder LVM: copy-on-write cloning of Glance
images into bootable Ceph volumes.
