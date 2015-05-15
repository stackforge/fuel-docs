
.. _net-topology-plan:

Choose Network Topology
=======================

Mirantis OpenStack supports two network modes,
which in turn support five topologies.
For architectural descriptions of the five topologies, see:

* :ref:`neutron-vlan-ovs-arch` (default)
* :ref:`neutron-gre-ovs-arch`
* :ref:`nova-flatdhcp-arch` (legacy networking)
* :ref:`nova-vlan-arch` (legacy networking)

**Nova-network** is a simple legacy network manager.
It can operate with predefined Private IP spaces only.

* If you do not want to split your VMs into isolated groups (tenants),
  you can choose the **Nova-network with FlatDHCP** topology.
  In this case, you will have one big network
  for all tenants and their VMs.

* The **Nova-network with VLANManager** topology
  is a form of provider network.
  This allows you to have multiple tenants,
  each of which supports approximately the same number of VMs
  and an equal amount of Private IP space.
  The maximum number of tenants
  and the private IP space size must be defined
  before you deploy your environment.
  You must also set up appropriate VLANs and gateways
  on your underlying network equipment.

**Neutron** is the reference network manager for OpenStack.
It separates tenants,
decreases the requirements for the underlying network
(physical switches and topology),
and gives a great deal of flexibility
for manipulating Private IP spaces.
You can create Private IP spaces with different sizes
and manipulate them on the fly.

* The **Neutron with VLAN** topology,
  like Nova-network with VLANManager,
  requires a predefined maximum number of tenants value
  and underlying network equipment configuration.

* The **Neutron with GRE** topology
  allows more flexibility in the maximum number of tenants
  (it supports up to 65535 tenants)
  and simplifies the network equipment configuration,
  but GRE encapsulation decreases the speed of communication between the VMs
  and increases the CPU utilization on the Compute and Controller nodes.

  Mirantis OpenStack 6.0 and later supports configuring
  multiple network domains per single OpenStack environment
  when using Neutron GRE.
  See :ref:`mcn-ops` for instructions;
  :ref:`mcn-arch` explains the internals.


Some other considerations when choosing a network topology:

- :ref:`ovs-term`, :ref:`bonding-term`, and :ref:`murano-term`
  can only be implemented on Neutron.
- VMware :ref:`vcenter-term` and :ref:`vsphere-term`
  can only be implemented on :ref:`Nova-network<nova-network-term>`.
- :ref:`bonding-term` is not supported for SR-IOV over
  the :ref:`mellanox-adapters` family.
- Mellanox :ref:`sr-iov-term` and :ref:`iser-term` are supported only when
  choosing Neutron with VLAN.

