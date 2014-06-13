.. _glance-term:

Glance
------
Glance is the OpenStack Image Service
that provides a scaleable, RESTful API for VM images and metadata.
Fuel always deploys Glance on controller nodes.

Glance has the following components:

- glance-api -- accepts Image API calls for image discovery,
  image retrieval, and image storage

- glance-registry -- stores, processes and retrieves metadata about images

- database to store the image metadata; Fuel deploys MySQL for this purpose

- storage repository for the actual image files.
  Fuel deploys Glance in the OpenStack environment
  with one of these storage backends:

  - File system backend
  - :ref:`swift-term`
  - :ref:`ceph-term`

  You choose the storage backend to use
  when you create your OpenStack environment
  on the :ref:`cinder-glance-backend-ug` screen;
  you can change your selection later on the
  :ref:`settings-storage-ug` screen.

- authentication using :ref:`keystone-term`

- replication services -- ensures consistency and availability
  through the cluster

- periodic processes including auditors, updaters, and reapers
  that run to support caching.

For more information, see:

- :ref:`storage-plan` for guidelines about
  selecting the storage backend for Glance
  when creating your Mirantis OpenStack environment.
- :ref:`cinder-glance-backend-ug`
  for information about setting the storage backend for Glance
  when creating your Mirantis OpenStack environment.
- `Glance developer documentation
  <http://docs.openstack.org/developer/glance/>`_.

