
.. _net-topology-plan:

Choose Network Topology
=======================

OpenStack supports two network modes, which in turn support five topologies.
For architectural descriptions of the five topologies, see:

* :ref:`neutron-vlan-ovs-arch`
* :ref:`neutron-gre-ovs-arch`
* :ref:`neutron-nsx-arch`
* :ref:`nova-flatdhcp-arch`
* :ref:`nova-vlan-arch`

**Nova-network** is a simple legacy network manager.
It can operate with predefined Private IP spaces only.

* If you do not want to split your VMs into isolated groups (tenants),
  you can choose the **Nova-network with FlatDHCP topology**.
  In this case, you will have one big tenant for all VMs.

* If you want use multiple tenants
  and all of them contain approximately the same number of VMs,
  you can use the **Nova-network with VLANManager topology**.
  In this case, the number of the tenants is predefined
  and all the tenants have equal amount of Private IP space.
  You must decide about these two numbers
  (max number of tenants and Private IP space size)
  before starting deployment.
  Also, you must set up appropriate VLANs
  on your underlying network equipment.

**Neutron** is a modern and more complicated network manager.
It can not only separate tenants
but it decreases the requirements for the underlying network
(physical switches and topology)
and gives a great deal of flexibility
for manipulating Private IP spaces.
You can create Private IP spaces with different sizes
and manipulate them on the fly.

* The **Neutron with VLAN topology**,
  like Nova-network with VLANManager,
  requires a predefined maximum number of tenants value
  and underlying network equipment configuration.

* The **Neutron with GRE** topology
  does not restrict the maximum number of VLANs
  and you can spawn a very large number of tenants.
  But GRE encapsulation decreases the speed of communication between the VMs
  and increases the CPU utilization on the Compute and Controller nodes.
  So, if you do not need really fast interconnections between VMs,
  do not want to predetermine the maximum number of tenants,
  and do not want to configure your network equipment,
  you can choose the Neutron + GRE topology.

* The **Neutron with NSX** topology utilizes NSX network hypervisor as
  backend for Neutron.  User must install and conigure NSX before
  deploying the OpenStack environment that will be using it.
  As with GRE segmentation it does not restrict the maximum number of
  available VLANs.
  User is also required to obtain NSX specific packages and host them on
  a web server (usually it is Fuel master node) so that Puppet can
  download and install them on controllers and compute nodes during
  deployment stage.

Some other considerations when choosing a network topology:

- :ref:`ovs-term` and :ref:`bonding-term` can only be implemented on Neutron.
- VMWare vCenter can only be implemented on Nova-network.
- Neutron with NSX can only be implemented with KVM/QEMU hypervisor.
- Murano is supported only on Neutron.
