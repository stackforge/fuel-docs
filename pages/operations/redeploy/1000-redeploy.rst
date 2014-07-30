
.. _redeploy-compute-storage-ops:

Redeploy a Compute or Storage node
----------------------------------

Redeploying a :ref:`node<node-term>` refers to the process
of changing the roles that are assigned to it.
For example, you may have several nodes that run
both Compute and Storage roles
and you want to redeploy some of those nodes to be only Storage nodes
while others become only Compute nodes.

To redeploy a Compute or Storage node, follow these steps:

#. Remove the node from your environment in the Fuel UI

#. Deploy Changes

#. Wait for the host to become available as an unallocated node

#. Add the node to the environment with the same role as before

#. Deploy Changes

