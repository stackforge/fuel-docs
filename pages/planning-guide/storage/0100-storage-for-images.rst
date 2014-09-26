Glance: Storage for Images
--------------------------

.. _glance-storage-plan:

Fuel configures a storage backend for the Glance image service.
This provides data resilience for VM images;
multiple Glance instances running on controller nodes
can store and retrieve images from the same data set,
while the object store takes care of data protection and HA.

When you create your OpenStack environment,
you :ref:`choose<cinder-glance-backend-ug>`
one of the following storage backends for Glance:

 * `Swift object store <http://swift.openstack.org/>`_, the standard
   OpenStack object storage component

 * `Ceph RBD <http://ceph.com/docs/master/rbd/rbd-openstack/>`_,
   the distributed block device provided by the Ceph storage platform.

.. note:: Older versions of Fuel provided the Multi-Node deployment mode
          that was used to deploy OpenStack environments
          that had a single Computer node
          and used the file system backend for Glance.
          This mode is still available in Fuel 5.1
          but is deprecated;
          instead, use HA deployment mode with a single controller
          that is managed using the same services
          as those that manage the full HA environment
          and can be scaled up to have multiple controllers
          and be highly available,
          and choose either Swift or Ceph as the Glance backend storage.

Factors to consider when choosing between
Swift and Ceph RBD for the storage backend
for the Glance image server include:

* Ceph provides a single shared pool of storage nodes
  that can handle all classes of persistent and ephemeral data
  that is required for OpenStack instances.

* When using Ceph, a single set of hard drives
  can serve as a backend for Glance, Cinder, and Nova.
  Otherwise, you must have have dedicated disks
  for image storage, block storage, and ephemeral disks.

* Ceph's copy-on-write facility allows you
  to move a system image
  and to start different VMs based on that image
  without any unnecessary data copy operations;
  this speeds up the time required to launch VMs from images.
  Otherwise, OpenStack images and volumes
  must be copied to separate Glance, Cinder, and Nova storage pools.

* `Live migration
  <http://docs.openstack.org/admin-guide-cloud/content/section_live-migration-usage.html>`_
  of running instances is supported
  for all storage options.
  Note that live migration of Ceph backed VMS
  requires that Ceph RBD is selected for ephemeral volumes
  as well as Glance and Cinder.
  

* Swift provides multi-site support.
  Ceph is unable to replicate RBD block device data
  on a long-distance link
  which means you cannot replicate between multiple sites.
  Starting with Ceph 0.80 "Firefly"
  (integrated into Mirantis OpenStack 5.1),
  Ceph RGW (Rados Gateway)
  supports multi-site replication of object data
  but this support is more limited than that of Swift
  and does not apply to Glance.

* Ceph cannot tolerate clock drift greater than 50ms.
  If your servers drift out of sync,
  your Ceph cluster breaks.
  When using Ceph, it is extremely important
  that you configure :ref:`NTP<ntp-ug>`
  or some other time synchronization facility for your environment.


