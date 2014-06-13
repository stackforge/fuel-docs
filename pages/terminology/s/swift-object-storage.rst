
.. _swift-object-storage-term:

Swift Object Storage
--------------------

Swift Object Storage provides
a multi-tenant, highly scalable and durable object storage system
that can store large amounts of unstructured data at low cost.
Some key characteristics of Swift object storage are:

* Each object stored in Swift has its own URL
  and its own metadata
* Each object is replicated times in the cluster to provide redundancy;
  the number of replicas is set by the administrator.
  Each replica is located in as unique a location as possible.
* Libraries are provided for many programming languages;
  developers can use these libraries to access the data in Swift object stores
  or they can write directly to the RESTful API
* New nodes can be added to the cluster
  and failed nodes can be replaced without downtime.

Fuel can deploy Swift on either a dedicated server storage node
or as a role on a compute node.

See:

- :ref:`storage-plan` for recommendations about when to use Swift
  in your Mirantis OpenStack environment.

- `Swift object store <http://swift.openstack.org/>`_
   OpenStack object storage component,

- `Introducing OpenStack Swift'
  <https://swiftstack.com/openstack-swift/architecture/>`_
  for a good general introduction to Swift.
