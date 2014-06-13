
.. _glance-arch:

Glance Image Service
--------------------

:ref:`Glance<glance-term>` is the OpenStack Image Service
that provides a scaleable, RESTful API for VM images and metadata.

Glance has the following components:

- glance-api -- accepts Image API calls for image discovery,
  image retrieval, and image storage

- glance-registry -- stores, processes and retrieves metadata about images

- database to store the image metadata; Fuel deploys MySQL for this purpose

- storage repository for the actual image files.
  Fuel deploys Glance in the OpenStack environment
  with one of these storage backends:

  - File system backend
  - :ref:`swift-object-storage-term`
  - :ref:`ceph-term`

- authentication using :ref:`keystone-term`

- replication services -- ensures consistency and availability
  through the cluster

- periodic processes including auditors, updaters, and reapers
  that run to support caching.

