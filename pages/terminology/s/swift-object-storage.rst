
.. _swift-object-storage-term:

Swift Object Storage
--------------------

Swift Object Storage provides
a multi-tenant, highly scalable and durable object storage system
that can store large amounts of unstructured data at low cost.
Fuel can deploy Swift as the storage backend for
the :ref:`Glance<glance-term>` image service.

Fuel deploys Swift on Controller nodes;
it does not provide a separate Swift role
that can be installed on other nodes.
Support for a separate Swift role is under consideration;
see the `Separate roles for Swift nodes
<https://blueprints.launchpad.net/fuel/+spec/swift-separate-role>`_
blueprint for more information.

Some key characteristics of Swift object storage are:

* Each object stored in Swift has its own URL
  and its own metadata.
* Each object is replicated in the cluster to provide redundancy;
  the number of replicas is set by the administrator.
  Each replica is located in as unique a location as possible.
* Libraries are provided for many programming languages;
  developers can use these libraries to access the data in Swift object stores
  or they can write directly to the RESTful API.
  See :ref:`object-storage-apps-plan`.

See:

- :ref:`glance-storage-plan` gives planning information,
  especially how to choose the most appropriate storage backend for Glance.

- `Swift documentation <http://swift.openstack.org/>`_

- `OpenStack Swift <https://swiftstack.com/openstack-swift/architecture/>`_
  by Joe Arnold and the SwiftStack team, published by O’Reilly,
  provides a good general introduction to the Swift architecture.


