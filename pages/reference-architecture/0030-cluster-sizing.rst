.. raw:: pdf

   PageBreak

.. index:: Cluster Sizing

Cluster Sizing
==============

This reference architecture is well suited for production-grade
OpenStack deployments on a medium and large scale when you can afford
allocating several servers for your OpenStack controller nodes in
order to build a fully redundant and highly available environment.

The absolute minimum requirement for a highly-available OpenStack
deployment is to allocate 4 nodes:

- 3 controller nodes, combined with storage

- 1 compute node

.. image:: /_images/deployment-ha-compact.*
  :width: 80%
  :align: center

If you want to run storage separately from the controllers, you can do that as 
well by raising the bar to 9 nodes:

- 3 Controller nodes

- 3 Storage nodes

- 2 Swift Proxy nodes

- 1 Compute node

.. image:: /_images/deployment-ha-full.*
  :width: 80%
  :align: center

Of course, you are free to choose how to deploy OpenStack based on the
amount of available hardware and on your goals (such as whether you
want a compute-oriented or storage-oriented environment).

For a typical OpenStack compute deployment, you can use this table as
high-level guidance to determine the number of controllers, compute,
and storage nodes you should have:

+----------+-----------+--------+-----------------------+
|# of Nodes|Controllers|Computes|Storages               |
+==========+===========+========+=======================+
|4-10      |  3        |   1-7  |3 (on controllers)     |
+----------+-----------+--------+-----------------------+
|11-40     |  3        |   3-32 |3+ (swift) + 2 (proxy) |
+----------+-----------+--------+-----------------------+
|41-100    |  4        |  29-88 |6+ (swift) + 2 (proxy) |
+----------+-----------+--------+-----------------------+
|>100      |  5        |   >84  |9+ (swift) + 2 (proxy) |
+----------+-----------+--------+-----------------------+
