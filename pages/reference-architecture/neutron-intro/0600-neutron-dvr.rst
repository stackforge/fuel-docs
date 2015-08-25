
.. _neutron-dvr-ref-arch:

Neutron with DVR
----------------

Beginning with Fuel 7.0, you can enable Distributed Virtual Routers
in Neutron. The following diagram shows the implementation of network
with Distributed Virtual Router enabled:

.. image:: /_images/neutron_dvr_ref-arch.png

L3 routers are distributed across compute nodes when required by VMs.
This implies having external network access on each compute node.
Enhanced L3 agents are running on each and every compute node (this is
not a new agent, this is an updated version of the existing L3 agent).
Based on the configuration in the L3 `agent.ini` file, the enhanced L3
agent behaves in legacy (centralized router) mode or as a distributed
router mode.

Also the floating IP has a new namespace created on the specific
compute node where the VM is located (this is done by the L3 agent
itself). Each compute node has one new namespace for floating IP per
external network that is shared among the tenants. An external gateway
port is created on each compute node for the external traffic to flow
through. This port consumes additional IP address from external
network. The namespace with gateway port (and public IP) is created on
the compute node only in case there are VMs with floating IP residing
on this node.

Inter VM traffic between the tenant's subnets does not need to reach
the router in the controller node to get routed and is routed locally
from the compute node. This substantially increases performance. 

The Metadata agent is distributed as well and is hosted on all compute
nodes, and the Metadata Proxy is hosted on all the distributed routers.

This implementation is specific to ML2 with OVS driver. All three
types of segmentation are supported: GRE, VXLAN, VLAN.

**Limitations**

* No distributed SNAT
    Neutron Distributed Virtual Router provides the legacy SNAT behavior
    for the default SNAT for all private VMs. SNAT service is not
    distributed, it is centralized and the service node will host the
    service. Thus current DVR architecture is not fully fault-tolerant -
    outbound traffic for VMs without floating IPs is still going through
    one L3 agent node and is still prone to failures of a single node.

* Only with ML2-OVS/L2-pop
   DVR feature is supported only by ML2 plugin with OVS mechanism driver.
   If using tunnel segmentation (VXLAN, GRE), L2 population mechanism
   should be enabled as well (you can do this in the *Settings* tab of
   the Fuel web UI).

* OVS and kernel versions
   Proper operation of DVR requires OpenvSwitch 2.1 or newer, and VXLAN
   requires kernel 3.13 or newer.
