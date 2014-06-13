Storage Nodes
-------------

Depending on the :ref:`storage options <storage-plan>` you
select for your environment, you may have
:ref:`ceph-term`, :ref:`cinder-term`,
and :ref:`Swift<swift-term>`
services running on your storage nodes.

Ceph implements its own HA;
all you need is enough controller nodes
running the Ceph Monitor service to `form a quorum
<http://ceph.com/docs/master/rados/troubleshooting/troubleshooting-mon/>`_,
and enough Ceph OSD nodes to satisfy the `object replication factor
<http://ceph.com/docs/master/rados/operations/pools/>`_.

.. _Ceph: http://ceph.com/docs/master/architecture/

.. image:: /_images/ceph_nodes.*
  :width: 80%
  :align: center

The Swift API relies on the same HAProxy setup,
with VIP on the controller nodes and the other REST APIs.
If don't expect too much data traffic in Swift,
you can also deploy Swift Storage and Proxy services on controller
nodes. For a larger production environment you'll need dedicated nodes:
two for Swift Proxy and at least three for Swift Storage.

Whether or not to deploy separate Swift nodes
depends primarily on how much data you expect to keep there
and how much disk space is available on the node.
A simple test is to fully populate your Swift object store with data
and then fail one controller node.
If replication of the degraded Swift objects
between the remaining nodes
controller generates enough network traffic, CPU load, or disk I/O to
impact performance of other OpenStack services running on the same
nodes, you should separate Swift from controllers.

.. image:: /_images/logical-diagram-storage.*
  :width: 40%
  :align: center

If you select Cinder LVM as the block storage backend for Cinder
volumes, you should have at least one Cinder LVM node. Unlike Swift and
Ceph, Cinder LVM doesn't implement data redundancy across nodes: if a
Cinder node is lost, volumes stored on that node cannot be recovered
from the data stored on other Cinder nodes. If you need your block
storage to be resilient, use Ceph for volumes.

