
.. _distributed-virtual-router-term:

Distributed Virtual Router (DVR)
--------------------------------

.. note:: Distributed Virtual Router (DVR) is available only with
   Neutron topology (GRE, VXLAN, VLAN configurations). Please see
   :ref:`Neutron Network Topologies <neutron-topologies-arch>`.

DVR Provides highly-available multi-host routing when using
:ref:`Neutron <neutron-term>`. It spreads the L3 agent functionality
to Compute nodes, distributing the load and eliminating single point
of failure. It implements the L3 routers across the Compute nodes, so
that tenants intra VM communication occurs without hitting the
Controller node. (East-West Routing).

Neutron DVR also implements the Floating IP namespace (one new
namespace for Floating IPs per external network) on every Compute
node where the VMs are located. In this case, the VMs with Floating
IPs can forward the traffic to the external network without reaching
the Controller node. (North-South Routing).

.. note:: The term **East-West** defines network traffic between VMs
   in different subnets. And the term **North-South** defines network
   traffic between a VM and Public network.

Neutron DVR provides the legacy SNAT (Source Network Address Translation)
behavior for the default SNAT for all private VMs. SNAT service is not
distributed, it is centralized and the service node hosts the service.