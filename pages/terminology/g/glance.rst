.. _glance-term:

Glance
------
Glance is the OpenStack Image Service
that provides a scaleable, RESTful API for VM images and metadata.
Fuel deploys Glance in the OpenStack environment
with one of these storage backends:

- File system backend
- :ref:`swift-object-storage-term`
- :ref:`ceph-term`

Glance can only be deployed on controller nodes in Fuel.

For more information, see:

- :ref:`storage-plan` for guidelines about
  selecting the storage backend for Glance.
- :ref:`cinder-glance-backend-ug`
  for information about setting the storage backend for Glance
  when creating your Mirantis OpenStack environment.
- :ref:`glance-arch` for an architectural overview
  of how Fuel deploys Glance in a Mirantis OpenStack environment.
- `Glance developer documentation
  <http://docs.openstack.org/developer/glance/>`_.

