Storage for Images
------------------

.. _Object_Storage_for_Images:

Fuel can configure one of these storage backends for the Glance image
service:

 * File system backend,

 * `Swift object store <http://swift.openstack.org/>`_, the standard
   OpenStack object storage component,

 * `Ceph RBD <http://ceph.com/docs/master/rbd/rbd-openstack/>`_, the
   distributed block device service based on RADOS, the object store
   component of the Ceph storage platform.

By default, Glance stores virtual machine images using the **file
system** backend. With it, you can use any of the shared file systems
supported by Glance. Fuel will default to this option in a simple non-HA
deployment with a local file system on a single controller node.

For a production HA environment where you want data resilience for VM
images, the best practice is to use an object store as the backend for
Glance. That way, multiple Glance instances running on controller nodes
can store and retrieve images from the same data set, while the object
store takes care of data protection and HA.

In HA deployment mode, Fuel will default to using **Swift** as the
storage backend for Glance instead of the file system backend. In both
HA and non-HA multi-node configurations, Fuel will also offer you the
option to use Ceph as storage backend.

The primary advantage of using **Ceph RBD** for images is the ability to
unify different classes of data into a single shared pool of storage
nodes that can handle all classes of data important for OpenStack.
Instead of having to copy OS images and volumes between separate Glance,
Cinder, and Nova storage pools, you can have all three services use
copy-on-write clones of the original image. In addition to better
utilization of storage capacity, copy-on-write also significantly speeds
up launching VMs from images.

To make the most out of the copy-on-write capability of the Ceph
backend, you should only use images in **raw** format. Images in other
formats such as qcow2 have to be converted to raw format first and
cannot be cloned without conversion.

As of this writing, the vanilla OpenStack Icehouse release places several
important limitations on the copy-on-write capability of the Ceph
backend:

 * You must create an RBD backed bootable volume from a raw image for
   copy-on-write and live migrations to work.

 * Launching an instance directly from an image results in a full copy on
   the compute node instead of a copy-on-write clone in Ceph.

 * Ephemeral drives are stored in local files on compute nodes instead
   of Ceph, preventing live migration of instances with ephemeral
   drives.

These limitations are removed in
the Mirantis OpenStack distribution starting with release 4.0.

