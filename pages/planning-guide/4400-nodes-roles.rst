

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
When you create your OpenStack environment,
you will :ref:`assign a role or roles<assign-roles-ug>`
to each node server.

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
  see :ref:`Running Fuel on VirtualBox<virtualbox>` for more information.
  This option has the lowest hardware requirements
- OpenStack can be deployed on smaller hardware configurations
  by combining multiple roles on the nodes
  and mapping multiple :ref:`logical-networks-arch`
  to a single physical NIC.
- Many :ref:`plugins<plug-in-term>` require specific roles;
  be sure to check the requirements of any plugins you plan to use
  when allocating nodes and roles.
- When looking to maximize performance,
  carefully choose your hardware components
  and make sure that the performance features of the selected hardware
  are supported and enabled.
  For an example of what tight integration
  of hardware and software can do for you,
  see :ref:`mellanox-adapters`.

This section provides information to help you decide
how many nodes you need and which roles to assign to each.

The absolute minimum requirement for a highly-available OpenStack
deployment is to allocate 4 nodes:

- 3 :ref:`Controller nodes<controller-node-term>`,
  combined with :ref:`Storage<storage-nodes-and-roles-term>`

- 1 :ref:`Compute node<compute-nodes-term>`

In production environments, it is highly recommended to separate storage nodes
from controllers. This helps avoid resource contention, isolates failure
domains, and allows to optimize hardware configurations for specific workloads.
To achieve that, you will need a minimum of 5 nodes when using Swift and Cinder
storage backends, or 7 nodes for a fully redundant :ref:`Ceph<ceph-term>`
storage cluster:

- 3 Controller nodes

- 1 Cinder node or 3 Ceph OSD nodes

- 1 Compute node

.. note:: You do not need Cinder storage nodes if you are using
          Ceph RBD as storage backend for Cinder volumes.

.. note:: You do not need Compute nodes if you are using
          vCenter as the hypervisor.

Of course, you are free to choose how to deploy OpenStack based on the
amount of available hardware and on your goals (such as whether you
want a compute-oriented or storage-oriented environment).

