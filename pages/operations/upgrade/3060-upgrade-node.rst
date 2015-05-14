.. index:: Upgrade Node

.. _Upg_Node:

Upgrade Node
++++++++++++

Node upgrade is essentially a reinstallation of operating system and OpenStack
platform services. We need to delete a node from 5.1.1 environment and assign
it to 6.1 Seed environment, then provision it and deploy OpenStack on it.

By default, Fuel installer erases all data from disks on the node, creates new
partitions structure, installs operating system and deploys OpenStack.

Depending on the roles the node has in the 5.1.1 environment, we might need to
make changes to the behavior. For example, to upgrade Ceph OSD node, we need to
make Fuel keep data on Ceph partitions of that node. To upgrade Compute nodes,
we need to use live migration to move users' VMs from it to other hypervisor
hosts. There are also several steps in the upgrade procedure that are common to
both supported roles ('compute' and 'ceph-osd'). This section describes these
common steps to upgrade a node and how to use the Upgrade Script to upgrade a
node with any of the supported roles.

Prepare Ceph OSD node to upgrade
________________________________

Preparations for the upgrade of Ceph OSD node include steps to minimize data
transfers inside the Ceph cluster during the upgrade. They also aim to ensure
that the data on OSD devices is kept intact.

From the impact standpoint, the most optimal solution is to minimize data
transfers over network during the upgrade of Ceph cluster. Ceph will normally
rebalance its data when OSD node is down. However, since the described
procedure preserves Ceph data on the node, rebalance must be turned off. We use
standard Ceph flag ``noout`` to disable the rebalance on a node outage.

Fuel installer has an agent on every node under its management. This agent,
known as MCollective agent, performs lifecycle management actions on the node.
When the node is being deleted from the original 5.1.1 environment, the agent
erases the first 10MB of data on all disks of the node. We need to disable the
erase for Ceph OSD devices. We developed a patch that, when applied on the
node, adds the corresponding block of logic to MCollective agent.

Prepare Compute node to upgrade
_______________________________

Compute node runs virtual machines in hypervisor processes. To satisfy the
requirement to minimize the downtime of virtual resources, we must ensure that
the VMs are moved from the node in preparation to reinstall. The move must be
done by the most seamless migration method available. This move is referred to
as **'evacuation'**.

Using Ceph shared storage for Nova instance's ephemeral disk allows to use
live migration of virtual instances. The sections below describe steps required
to live migrate all VMs from hypervisor host picked for upgrade.

To minimize impact of upgrade procedure on the end user workloads, we need to
migrate all VMs off hypervisor picked for upgrade and make sure that no new VMs
provisioned to that host. Scheduling to host can be ruled out by disabling
Compute service on that host. This does not affect ability to migrate VMs from
that host.

Reassign node to Seed environment
_________________________________

There is an extension to the Fuel API installed by ``octane prepare``
command that allows to move a node from an environment to another environment,
in our case, the Upgrade Seed. So the reassignment is a matter of a single call
to the Fuel API. It is implemented as a part of the Upgrade Script.

Note that with this extension reassigned node won't change its ID or host name.

Verify node upgrade
___________________

After successful installation you need to make sure that the node connected to
CICs properly, according to its roles. Ceph OSD node must be ``up`` in the OSD
tree. Compute node must be connected to Nova controller services. Below in the
list of commands you will find how to check these requirements.

Node Upgrade command
____________________

Run the following command to upgrade a node identified by the ``NODE_ID``
parameter:

::

    octane upgrade-node ${SEED_ID} ${NODE_ID}

You can upgrade more than one node at a time. Run the following command to
upgrade multiple nodes identified by ``NODE_ID1``, ``NODE_ID2`` and
``NODE_ID3`` parameters:

::

    octane upgrade-node ${SEED_ID} ${NODE_ID1} ${NODE_ID2} ${NODE_ID3}

.. note::

    Pay attention to replication factor of your Ceph cluster and don't upgrade
    more Ceph OSD nodes than value of the replication factor minus one.
