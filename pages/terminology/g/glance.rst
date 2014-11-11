.. _glance-term:

Glance
------
Glance is the OpenStack Image Storage project.
Glance provides a scaleable, RESTful API for VM images and metadata.

Fuel can deploy either of the following
as the storage backend for Glance:

 * :ref:`Swift<swift-object-storage-term>`, the standard
   OpenStack object storage component

 * :ref:`Ceph RBD<ceph-term>`,
   the distributed block device provided by the Ceph storage platform.

Glance can only be deployed on controller nodes in Fuel.

For more information, see the
`Glance developer documentation
<http://docs.openstack.org/developer/glance/>`_.
