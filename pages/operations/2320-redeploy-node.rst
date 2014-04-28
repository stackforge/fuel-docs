.. index:: HowTo: Redeploy a node from scratch

.. _Redeploy_node_from_scratch:

HowTo: Redeploy a node from scratch
------------------------------------

Compute and Storage nodes can be redeployed
in environments that use HA and environments that do not.
Note that Controller nodes cannot be redeployed
without completely redeploying the environment.

To deploy a Compute or Storage node, follow these steps:

1. Remove the node from your environment in the Fuel UI
2. Deploy Changes
3. Wait for the host to become available as an unallocated node
4. Add the node to the environment with the same role as before
5. Deploy Changes

