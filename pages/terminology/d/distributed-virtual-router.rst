
.. _distributed-virtual-router-term:

Distributed Virtual Router (DVR)
--------------------------------

Provides highly-available multi-host routing when using Neutron
(OpenStack Networking). Spreads the L3 agent functionality to compute
nodes, distributing the load and eliminating single point of failure.

It implements the L3 routers across the compute nodes, so that tenants
intra VM communication occurs without hitting the controller node.
(East-West Routing)

Neutron DVR also implements the floating IP namespace on every compute
node where the VMs are located. In this case, the VMs with floating
IPs can forward the traffic to the external network without reaching
the controller node. (North-South Routing)

Neutron DVR provides the legacy SNAT (Source Network Address Translation)
behavior for the default SNAT for all private VMs. SNAT service is not
distributed, it is centralized and the service node hosts the service.
