.. _ceph-term:

Ceph
----
An open source storage platform
that provides unified object, block, and file storage.
For more information, see the
`Ceph documentation <http://ceph.com/docs/master/>`_.
Ceph is supported and promoted by
`Inktank <http://www.inktank.com>`_.

Ceph OSD (Object Storage Daemon) is the actual storage daemon;
for optimal performance, it should run on a dedicated storage node.
Ceph Mon (Monitor) is the lightweight daemon that handles communications
with external applications and the clients.
These two daemons should never run on the same server,
especially in a performance environment,
because of performance concerns.
For non-production environments,
you can locate Ceph OSD as a Storage role on a Compute node.

For information about deploying Ceph in Mirantis OpenStack,
see :ref:`Storage-Architecture-arch`.

