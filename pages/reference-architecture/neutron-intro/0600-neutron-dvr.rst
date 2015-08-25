
.. _neutron-dvr-ref-arch:

Neutron with DVR
----------------

You can enable Distributed Virtual Routers in Neutron. The following
diagram shows the implementation of network with Distributed Virtual
Router enabled:

.. image:: /_images/neutron_dvr_ref-arch.png

When a network configuration requires L3 routers, neutron-server
distributes the L3 routers across Compute nodes. To enable this
functionality, each Compute node must have an access to the Public
network. Enhanced L3 agents are running on each and every Compute node
(this is not a new agent, this is an updated version of the existing
L3 agent). The L3 agent can operate in legacy (centralized router) or
in distributed router mode.

When using Neutron DVR, the L3 agent on Compute node creates one
new namespace for Floating IPs per external network that is shared
among the tenants. It also creates an external gateway port inside
each namespace for the external traffic to flow through. This port
consumes additional IP address from the external network. Such
namespaces are created on the Compute node only in case there are
VMs with Floating IP residing on this node.

Inter VM traffic between the tenant's subnets does not need to reach
the router in the Controller node and is routed locally
from the Compute node. This helps to increase performance.

The Metadata agent is distributed as well and is hosted on all Compute
nodes, and the Metadata Proxy is hosted on all the distributed routers.

This implementation is specific to ML2 with OVS driver. All three
types of segmentation are supported: GRE, VXLAN, and VLAN.

.. note:: Neutron Distributed Virtual Router provides the legacy SNAT
   functionality for the default SNAT for all private VMs. SNAT
   service is not distributed, it is centralized and the service node
   hosts the service. Since the DVR architecture is not fully
   fault-tolerant, the outbound traffic for VMs without Floating IPs
   goes through one L3 agent node and is prone to failure of a single
   node.

**Requirements**

You can use Neutron with DVR if your environment meets the following
requirements:

* ML2-OVS/L2-pop
   DVR feature is supported only by ML2 plugin with OVS mechanism driver.
   If using tunnel segmentation (VXLAN, GRE), L2 population mechanism
   should be enabled as well (you can do this in the *Settings* tab of
   the Fuel web UI).

* OVS and kernel versions
   Proper operation of DVR requires OpenvSwitch 2.1 or newer, and VXLAN
   requires kernel 3.13 or newer.