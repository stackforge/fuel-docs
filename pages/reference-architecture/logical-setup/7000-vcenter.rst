
.. _vcenter-arch:

VMware vSphere Integration
--------------------------

Fuel 5.0 and later can deploy a Mirantis OpenStack environment
that can boot and manage virtual machines in VMware vSphere.
This section provides technical details about how vCenter support
is implemented in Mirantis OpenStack.
See :ref:`vcenter-plan` for information about planning the deployment;
:ref:`vcenter-deploy` gives instructions for deploying
a Mirantis OpenStack environment
that is integrated with VMware vSphere.

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
by architecting the driver to aggregate ESXi hosts in each clster
to present one large hypervisor entitiy to the Nova scheduler,
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

The Nova-compute service is run not on a separete Compute node but on
a Controller node. This means in the Multi-node Deployment mode a user will
have a single Controller node with noth controller and compute services running.

Multi-node HA Deployment with vSphere integration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. image:: /_images/vcenter-reference-architecture.png
   :width: 50%

In the Multi-node HA Deployment mode the Nova-compute and Nova-network services
are working on one of the Controller nodes, internally called as Primary
Controller. Usually it's a top node from the nodes list in Web UI, and it's
a node with the lowest ID in Fuel CLI output. Due to some circumstances there is
no way now to move these services to another Controller node if the Primary
Controller node become offline. It means that all the other OpenStack services,
operates in HA mode, but the Nova-compute and Nova-network services aren't
protected from failure.

Example of network topology
~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. # The link to the image source:
.. # https://drive.google.com/file/d/0BxrQaxuQOwp3dG85ZXBuN2NiZVU/edit?usp=sharing
.. image:: /_images/vcenter-network-topology.png
   :width: 100%

This is an example of the default Fuel OpenStack network configuration which
a user whould have if Slave nodes have at least two NICs and are connected to
a Fuel Admin (PXE) network with `eth0` interfaces.

Because the Nova-Network service must serve DHCP requests and NAT translations
of the VMs' traffic the VMs on the ESXi nodes must be conneted directly to
the Fixed (Private) network. By default this network uses VLAN 103 in case of
Nova-Network Flat DHCP mode. So, a user can create a tagged Port Group on
the ESXi servers with VLAN 103 and connect a corresponded `vmnic` NICs to the
same switch where the OpenStack Controller nodes are connected to.

The vCenter management IP must be reached from the OpenStack Public network
by the Nova-compute service in order to connect to the vSphere API.
