
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
that manages one or more ESXi host clusters.
The vCenter driver makes management convenient
from both the OpenStack Dashboard (:ref:`horizon-term`)
and from vCenter,
where advanced vSphere features can be accessed.

This enables Nova-compute to deploy workloads on vSphere
and allows vSphere features such as vMotion workload migration,
vSphere High Availability, and Dynamic Resource Scheduling (DRS).
DRS is enabled
by architecting the driver to aggregate ESXi hosts in each cluster
to present one large hypervisor entity to the Nova scheduler.
This enables OpenStack to schedule to the granularity of clusters,
then call vSphere DRS to schedule
the individual ESXi host within the cluster.
The vCenter driver also interacts with
the OpenStack Image Service (Glance)
to copy :ref:`VMDK<vmdk-term>` (VMware virtual machine) images
from the back-end image store to a database cache
from which they can be quickly retrieved after they are loaded.

The vCenter driver requires the :ref:`nova-network-term` topology,
which means that :ref:`ovs-term` does not work with vCenter.

The Nova-compute service runs on a Controller node,
not on a separate Compute node.
This means that, in the Multi-node Deployment mode,
a user has a single Controller node
with both compute and network services running.

Unlike other hypervisor drivers
that require the Nova-compute service to be running
on the same node as the hypervisor itself,
the vCenter driver enables the Nova-compute service
to manage ESXi hypervisors remotely.
This means that you do not need a dedicated Compute node
to use the vCenter hypervisor;
instead, Fuel puts the Nova-compute service on a Controller node.

.. raw: pdf

   PageBreak

Multi-node HA Deployment with vSphere integration
-------------------------------------------------

.. image:: /_images/vcenter-reference-architecture.png
   :width: 50%

On a highly-available Controller cluster
(meaning that three or more Controller nodes are configured),
the Nova-compute and Nova-network services
can either run on the same or on different Controller nodes.
If some service fails, it is restarted by :ref:`pacemaker-term` several times;
if service fails to start or the whole Controller node fails,
service is started on one of the available Controllers.

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
if the target nodes have at least two NICs
and are connected to a Fuel Admin (PXE) network with `eth0` interfaces.

The Nova-network service must serve DHCP requests
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

.. _fuel-on-vsphere-arch:

Fuel running under vSphere
--------------------------

.. image:: /_images/vCenter/Fuel_in_vCenter_networking.png
   :width: 50%

For information about configuring your vSphere environment
so that you can install Fuel in it,
see :ref:`fuel-on-vsphere-plan`.



