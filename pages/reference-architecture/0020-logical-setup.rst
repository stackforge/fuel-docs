.. raw:: pdf

   PageBreak

.. index:: Reference Architectures: HA Logical Setup, HA Logical Setup 

HA Logical Setup 
================

.. contents :local:

An OpenStack Multi-node HA environment involves three types of nodes:
controller nodes, compute nodes, and storage nodes.

Controller Nodes
----------------

The first order of business in achieving high availability (HA) is
redundancy, so the first step is to provide multiple controller nodes.

As you may recall, the database uses Galera to achieve HA, and Galera is
a quorum-based system. That means that you should have at least 3
controller nodes.

.. image:: /_images/logical-diagram-controller.*
  :width: 80%
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

Depending on the :ref:`storage options <Storage_Architecture>` you
select for your environment, you may have Ceph, Cinder, and Swift
services running on your storage nodes.

Ceph_ implements its own HA, all you need is enough controller nodes
running Ceph Monitor service to `form a quorum
<http://ceph.com/docs/master/rados/troubleshooting/troubleshooting-mon/>`_,
and enough Ceph OSD nodes to satisfy the `object replication factor
<http://ceph.com/docs/master/rados/operations/pools/>`_.

note:: Plan Ceph OSD and MON roles for your deployment carefully, make sure
both roles will not reside on the same controller nodes, in
case you have enabled the fencing policy.

.. _Ceph: http://ceph.com/docs/master/architecture/

.. image:: /_images/ceph_nodes.*
  :width: 80%
  :align: center

Swift API relies on the same HAProxy setup with VIP on controller nodes
as the other REST APIs. If don't expect too much data traffic in Swift,
you can also deploy Swift Storage and Proxy services on controller
nodes. For a larger production environment you'll need dedicated nodes:
two for Swift Proxy and at least three for Swift Storage.

Whether or not you'd want separate Swift nodes depends primarily on how
much data you expect to keep there. A simple test is to fully populate
your Swift object store with data and then fail one controller node. If
replication of the degraded Swift objects between the remaining nodes
controller generates enough network traffic, CPU load, or disk I/O to
impact performance of other OpenStack services running on the same
nodes, you should separate Swift from controllers.

.. image:: /_images/logical-diagram-storage.*
  :width: 80%
  :align: center

If you select Cinder LVM as the block storage backend for Cinder
volumes, you should have at least one Cinder LVM node. Unlike Swift and
Ceph, Cinder LVM doesn't implement data redundancy across nodes: if a
Cinder node is lost, volumes stored on that node cannot be recovered
from the data stored on other Cinder nodes. If you need your block
storage to be resilient, use Ceph for volumes.

Configuring Fencing/STONITH
---------------------------

It is recommended to use fencing for your controller nodes.
Generally, STONITH based fencing is used to shoot the failed nodes down.
There are three options you may chose to configure the fencing policy
for your HA deployment: disabled (default), reboot and power off.
Reboot policy will force the failed controllers to reboot, and power off
will make them to shut down.

note:: You should use IPMI devices **and** APC/PDU devices as well to
ensure the fencing will be truly reliable.
