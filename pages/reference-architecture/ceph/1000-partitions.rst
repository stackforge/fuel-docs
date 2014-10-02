
.. _ceph-partitions-arch:

Creating partitions for Ceph-OSD roles
--------------------------------------

The user defines the number of Ceph-OSD roles,
the disk partitioning for those roles,
and the minimal allowable Ceph-OSD roles
for the environment
when creating and configuring the OpenStack environment.

Fuel uses this information and handles other
other necessary configuration tasks
to .

- Creates partitions for Ceph-OSD nodes when nodes are provisioned.

  - Fuel discovers the nodes.

  - The nodes are booted into a bootstrap image.

  - The agent reports all information about each node,
    including its disk configuration.

  - Fuel displays this information in the UI
    so the user can allocate drives
    to the volume types that are required for a particular role.


- Each Ceph-OSD is paired with a Ceph Journal partition.
  Journaling improves the speed and consistency of I/O operations;
  see `Journal Config Reference
  <http://ceph.com/docs/giant/rados/configuration/journal-ref/>`_
  for more information.

  - Information about each allocated Ceph OSD role
    and its corresponding Ceph Journal
    is filed into Cobbler using the `ks_spaces` variable.

  - Cobbler runs a script during provisioning
    to create the necessary partitions
    and to set the authorization modules for the partition types.
    If you want to know more what Ceph expects,
    you need to study the ceph-disk source code.
    The GUIDs for the GPT partition types are:
    ::

      JOURNAL_UUID = ’45b0969e-9b03-4f30-b4c6-b4b80ceff106 ’
      OSD_UUID     = ’4fbd7e29-9d25-41b8-afd0-062c0ceff05d ’

- Fuel evenly distributes the Journal devices between OSDs
  so that the load between your SSD Journal devices is evenly distributed
  and the cluster performs optimally.

- Sets the correct GPT type GUIDs
  for all configured OSD and Journal partitions.
  Ceph provides udev automount rules
  that look for specific GPT partition GUIDS
  and automounts those as OSD devices and Journals.

- Optimizes the disk layout for multi-disk configurations
  by assigning all non-Ceph partitions to the first disk
  so that all other disks are dedicated to Ceph.

- Set up root SSH between Ceph nodes.
  Fuel generates SSH keys and distributes those between nodes
  so that all the nodes can communicate with other nodes.

- Populate basic Ceph settings.
  including Cephx authentication keys,
  replication factor, pool size,
  and networking.

- Configure the RADOS gateway to use the Inktank forked CGI
  using UUID authentication tokens
  and ensure that this does not conflict with Keystone.

- Patch Cinder and Nova to work properly with Ceph
  and to support Live Migration.


The coding that controls how Fuel allocates all partitions,
including partitions for Ceph-OSD and Ceph Journals,
is in the *openstack.yaml* file
located in the */usr/lib/python2.6/site-packages/nailgun/fixtures* directory.

.. note:: You must run the **nailgun docker container** command
          in order to view this file on your deployed
          Fuel Master node.



