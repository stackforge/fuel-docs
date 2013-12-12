.. raw:: pdf

   PageBreak

.. index:: Reference Architectures: HA Logical Setup, HA Logical Setup 

HA Logical Setup 
================

.. contents :local:

An OpenStack Multi-node HA environment involves, at a minimum, three types of 
nodes: controller nodes, compute nodes, and storage nodes.

Controller Nodes
----------------

The first order of business in achieving high availability (HA) is
redundancy, so the first step is to provide multiple controller nodes.
You must keep in mind, however, that the database uses Galera to
achieve HA, and Galera is a quorum-based system. That means that you must provide 
at least 3 controller nodes.

.. image:: /_images/logical-diagram-controller.*
  :width: 100%
  :align: center

Every OpenStack controller runs HAProxy, which manages a single External
Virtual IP (VIP) for all controller nodes and provides HTTP and TCP load 
balancing of requests going to OpenStack API services, RabbitMQ, and MySQL.

When an end user accesses the OpenStack cloud using Horizon or makes a
request to the REST API for services such as nova-api, glance-api,
keystone-api, quantum-api, nova-scheduler, MySQL or RabbitMQ, the
request goes to the live controller node currently holding the External VIP,
and the connection gets terminated by HAProxy. When the next request
comes in, HAProxy handles it, and may send it to the original
controller or another in the environment, depending on load conditions.

Each of the services housed on the controller nodes has its own
mechanism for achieving HA:

* nova-api, glance-api, keystone-api, quantum-api and nova-scheduler are 
  stateless services that do not require any special attention besides load 
  balancing.
* Horizon, as a typical web application, requires sticky sessions to be enabled 
  at the load balancer.
* RabbitMQ provides active/active high availability using mirrored queues.
* MySQL high availability is achieved through Galera active/active multi-master 
  deployment and Pacemaker.
* Quantum agents are managed by Pacemaker.
* Ceph monitors implement their own quorum based HA mechanism and
  require time synchronization between all nodes. Clock drift higher
  than 50ms may break the quorum or even crash the Ceph service.

Compute Nodes
-------------

OpenStack compute nodes are, in many ways, the foundation of your
environment; they are the servers on which your users will create their
Virtual Machines (VMs) and host their applications. Compute nodes need
to talk to controller nodes and reach out to essential services such
as RabbitMQ and MySQL. They use the same approach that provides
redundancy to the end-users of Horizon and REST APIs, reaching out to
controller nodes using the VIP and going through HAProxy.

.. image:: /_images/logical-diagram-compute.*
  :width: 80%
  :align: center

Storage Nodes
-------------

In this OpenStack environment reference architecture, shared storage acts
as a backend for Glance, so that multiple Glance instances running on
controller nodes can store images and retrieve images from it. To
achieve this, you are going to deploy Swift. This enables you to use
it not only for storing VM images, but also for any other objects such
as user files.

.. image:: /_images/logical-diagram-storage.*
  :width: 80%
  :align: center
