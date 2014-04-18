
.. _storage-nodes-and-roles-term:

Storage nodes and roles
-----------------------

OpenStack requires block and object storage to be provisioned.
Fuel provides the following storage options:

* Cinder LVM provides persistent block storage
  to virtual machines over the iSCSI protocol

* Swift object stores can be used by Glance
  to store VM images and snapshots.
  It may also be used directly by applications.

* Ceph combines object and block storage
  and can replace either one or both of the above.

You can configure your environment to use
either dedicated Storage Nodes
or to run the Storage Role on the Compute Nodes.
