
.. _vcenter-arch:

VMware vSphere Integration
==========================

This section provides technical details about how vCenter support
is implemented in Mirantis OpenStack.

- See :ref:`vcenter-plan` for information about planning the deployment;
- :ref:`vcenter-deploy` gives instructions for creating and deploying
  a Mirantis OpenStack environment that is integrated with VMware vSphere.

VMware provides a vCenter driver for OpenStack.
This driver enables the Nova-compute service
to communicate with a VMware vCenter server
that manages one or more ESX host clusters.
The vCenter driver makes management convenient
from both the OpenStack Dashboard (:ref:`horizon-term`)
and from vCenter,
where advanced vSphere features can be accessed.

This enables Nova Compute to deploy workloads on vSphere
and allows vSphere features such as vMotion workload migration,
vSphere High Availability, and Dynamic Resource Scheduling (DRS).
DRS is enabled
by architecting the driver to aggregate ESXi hosts in each cluster
to present one large hypervisor entity to the Nova scheduler,
thus enabling OpenStack to schedule to the granularity of clusters,
then call vSphere DRS to schedule
the individual ESXi host within the cluster.
The vCenter driver also interacts with
the OpenStack Image Service (Glance)
to copy VMDK (VMware virtual machine) images
from the back-end image store to a database cache
from which they can be quickly retrieved after they are loaded.

The vCenter driver requires the :ref:`nova-network-term` topology,
which means that :ref:`ovs-term` does not work with vCenter.

The Nova Compute service runs on a Controller node,
not on a separate Compute node.
This means that, in the Multi-node Deployment mode,
a user has a single Controller node
with both controller and compute services running.

Unlike other hypervisor drivers
that require the Nova Compute service to be running
on the same node as the hypervisor itself,
the vCenter driver enables the Nova Compute service
to manage ESXi hypervisors remotely.
This means that you do not need a dedicated Compute node
to use the vCenter hypervisor;
instead, Fuel puts the Nova Compute service on a Controller node.

.. raw: pdf

   PageBreak

Multi-node HA Deployment with vSphere integration
-------------------------------------------------

.. image:: /_images/vcenter-reference-architecture.png
   :width: 50%

In the Multi-node HA Deployment mode,
the Nova Compute and Nova Network services run on a Controller node
that is called the "Primary Controller".
This is the first node in the Fuel database,
which usually makes it the top node in the "Nodes" list in the Web UI
and the node with the lowest ID in Fuel CLI output.
These services cannot be moved to another Controller node
if the Primary Controller node goes offline.
This means that,
while all the other OpenStack services operate in HA mode,
the Nova Compute and Nova Network services are not protected from failure.
See `LP1312653 <https://bugs.launchpad.net/fuel/+bug/1312653>`_.

.. raw: pdf

   PageBreak

Example of network topology
---------------------------

.. # The link to the image source:
.. # https://drive.google.com/file/d/0BxrQaxuQOwp3dG85ZXBuN2NiZVU/edit?usp=sharing
.. image:: /_images/vcenter-network-topology.png
   :width: 100%

This is an example of the default Fuel OpenStack network configuration
that a user should have
if the Slave nodes have at least two NICs
and are connected to a Fuel Admin (PXE) network with `eth0` interfaces.

The Nova-Network service must serve DHCP requests
and NAT translations of the VMs' traffic,
so the VMs on the ESXi nodes
must be connected directly to the Fixed (Private) network.
By default, this network uses VLAN 103
for the Nova-Network Flat DHCP topology.
So, a user can create a tagged Port Group on the ESXi servers with VLAN 103
and connect the corresponding `vmnic` NIC to the same switch
as the OpenStack Controller nodes.

The Nova Compute service must be able to reach
the vCenter management IP from the OpenStack Public network
in order to connect to the vSphere API.
