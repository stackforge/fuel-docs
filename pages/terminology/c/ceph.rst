
.. _ceph-term:

Ceph
----
An open source storage platform
that provides unified object, block, and file storage
based on the :ref:`rados-term` storage architecture.
OpenStack can use Ceph Rados Block Devices (RBD):

- as the storage backend
  for the :ref:`glance-term` image server
- as the storage backend for :ref:`cinder-term`.
- through the REST API provided by the :ref:`swift-object-storage-term`
  for applications that need to store data in an object store.
- as the storage backend for the Nova ephemeral storage.
- as the guest operating system disk for a virtual machine.
  By default, when you boot a virtual machine,
  its disk appears as a file on the filesystem of the :ref:`hypervisor-term`
  (usually under */var/lib/nova/instances/<uuid>*).
  Each virtual machine inside Ceph can be booted directly,
  which enables the live-migration process
  to easily perform maintenance operations.
  It is also useful when a VMs hypervisor dies;
  the virtual machine can be run somewhere else
  using `nova-evacuate`.

Ceph uses the :ref:`Rados<rados-term>` storage service.
Each object stored by the system is mapped into a placement group (PG),
which is a logical set of objects
that are replicated by the same set of devices.
Ceph Monitors create and maintain a cluster map
that maps these PGs to specific OSDs to define the cluster topology;
a copy of the cluster map is then distributed
to all OSDs and clients

The OpenStack Ceph cluster consists of:

- A small number of Ceph Mon (monitor) daemons
  that run on the OpenStack controller node.
- Two or more Ceph-OSD (Object Storage Device) nodes
  that store the actual data in :ref:`rados-term` format.
  Ideally, each of these runs on a dedicated node
  but they can be run on a Compute node.
- A Ceph Journal for each allocated Ceph-OSD node.
- :ref:`glance-term` serves as the Ceph client.

For more information, see:

- For information about choosing Ceph for Storage
  in your Mirantis OpenStack environment,
  see the *Planning Guide*.

- :ref:`ceph-arch`

- For more details about Ceph and RADOS,
  including capabilities you can configure manually
  after deploying your OpenStack environment with Fuel,
  see the `Ceph documentation <http://ceph.com/docs/master/>`_.
  Note that the OpenStack implementation of Ceph
  does not include CephFS or the cdph-mds metadata component
  that is used with CephFS.

