Glance: Storage for Images
--------------------------

.. _Object_Storage_for_Images:

Fuel configures an object store as the storage backend
for the Glance image service.
This provides data resilience for VM images;
multiple Glance instances running on controller nodes
can store and retrieve images from the same data set,
while the object store takes care of data protection and HA.

When you create your OpenStack environment,
you choose one of the following
as the storage backend for Glance:

 * `Swift object store <http://swift.openstack.org/>`_, the standard
   OpenStack object storage component

 * `Ceph RBD <http://ceph.com/docs/master/rbd/rbd-openstack/>`_, the
   distributed block device service based on RADOS, the object store
   component of the Ceph storage platform.

.. note:: Older versions of Fuel provided the Multi-Node deployment model
          that was used to deploy OpenStack environments
          that had a single Computer node
          and used the file system backend for Glance.
          This mode is still available in Fuel 5.1
          but is not recommended;
          instead, use the single-controller HA deployment mode
          that is managed using the same services
          as those that manage the full HA environment
          and can be scaled up to have multiple controllers
          and be highly available,
          and choose either Swift or Ceph as the Glance backend storage.

Factors to consider when choosing between
Swift and Ceph RBD for the storage backend
for the Glance image server include:

* Ceph provides a single shared pool of storage nodes
  that can handle all classes of persistent data
  required for OpenStack instances.
  Instead of having to copy OpenStack images and volumes
  to separate Glance, Cinder, and Nova storage pools,
  all three services can use copy-on-write clones of the original image.

* Ceph uses a single storage pool
  that runs on a single set of hard drives
  to serve as a backend for Glance, Cinder, and Nova.
  It is not necessary to have dedicated disks
  for object storage and block storage nodes.

* Ceph's copy-on-write facility allows you
  to move a system image
  and to start different VMs based on that image
  without any unnecessary data copy operations;
  this speeds up the time required to launch VMs from images.

* Ceph supports `live migration
  <http://docs.openstack.org/admin-guide-cloud/content/section_live-migration-usage.html>`_
  of running instances.

* Swift provides multi-site support.
  Ceph is unable to replicate data on a long-distance link
  which means you cannot replicate between multiple sites.

* Ceph is quite sensitive to clock drift.
  If your servers drift out of sync,
  your Ceph cluster breaks.
  When using Ceph, it is extremely important
  that you configure :ref:`NTP<ntp-ug>`
  or some other time synchronization facility for your environment.


