
.. _ceph-manifest-ops:

Accessing the Puppet manifest for Ceph
--------------------------------------

The **node** parameter defines the names
of the Ceph pools to pre-create.
By default, `volumes` and `images` are required
to set up the OpenStack hooks.
::

  node 'default' {
    ...
  }


The **class** section configures components
for all Ceph-OSD nodes in the environment:
::

  class { 'ceph::deploy':
      auth_supported   => 'cephx',
      osd_journal_size => '2048',
      osd_mkfs_type    => 'xfs',
  }

You can modify the authentication type,
Journal size (specified in KB),
and the filesystem architecture to use.
