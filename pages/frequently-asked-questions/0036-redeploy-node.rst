.. index:: HowTo: Redeploy a node from scratch

.. _Redeploy_node_from_scratch:

HowTo: Redeploy a node from scratch
------------------------------------

Compute and Cinder nodes can be redeployed in both multinode and multinode HA
configurations. However, controllers cannot be redeployed without completely
redeploying the environment. To do so, follow these steps:

1. Remove the node from your environment in the Fuel UI
2. Deploy Changes
3. Wait for the host to become available as an unallocated node
4. Add the node to the environment with the same role as before
5. Deploy Changes

