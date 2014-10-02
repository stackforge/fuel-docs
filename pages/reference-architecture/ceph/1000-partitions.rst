
.. _ceph-partitions-arch:

Creating partitions for Ceph-OSD roles
--------------------------------------

The coding that controls how Fuel allocates all partitions,
including partitions for Ceph-OSD and Ceph Journals,
is in the *openstack.yaml* file
located in the */usr/lib/python2.6/site-packages/nailgun/fixtures* directory.

.. note:: You must run the **nailgun docker container** command
          in order to view this file on your deployed
          Fuel Master node.


