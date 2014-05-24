

.. raw:: pdf

   PageBreak

.. _nodes-roles-plan:

Nodes and Roles
===============

Your OpenStack environment contains a set of
specialized nodes and roles;
see :ref:`nodes-roles-arch` for a description.
When planning your OpenStack deployment,
you must determine the proper mix of node types
and what roles will be installed on each.

All production environments should be deployed
for :ref:`high availability<ha-term>`
although you can deploy your environment
without the replicated servers required for high availability
and then add the replicated servers later.
But part of your Nodes and Roles planning
is to determine the level of HA you want to implement
and to plan for adequate hardware.

Some general guiding principles:

- When deploying a production-grade OpenStack environment,
  it is best to spread the roles (and, hence, the workload)
  over as many servers as possible
  in order to have a fully redundant,
  highly-available OpenStack environment
  and to avoid performance bottlenecks.
- For demonstration and study purposes,
  you can deploy OpenStack on VirtualBox;
  see :ref:`virtualbox-guide` for more information.
  This option has the lowest hardware requirements
- OpenStack can be deployed on smaller hardware configurations
  by combining multiple roles on the nodes
  and mapping multiple :ref:`logical-networks-arch`
  to a single physical NIC.

This section provides information to help you decide
how many nodes you need and which roles to assign to each.

The absolute minimum requirement for a highly-available OpenStack
deployment is to allocate 4 nodes:

- 3 controller nodes, combined with storage

- 1 compute node

If you want to run storage separately from the controllers, you can do
that as well by raising the bar to 9 nodes:

- 3 Controller nodes

- 3 Ceph OSD nodes

- 1 Cinder node

- 1 Compute node

.. note:: Placing Ceph OSD on Controllers is highly unadvisable.
          It can severely degrade controller performance.
          Use separate storage nodes if you have enough hardware.

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
