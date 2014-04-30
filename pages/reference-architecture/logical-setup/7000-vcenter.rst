
.. _vcenter-arch:

VMware vCenter Integration
--------------------------

Fuel 5.0 and later can deploy a Mirantis OpenStack environment
that can boot and manage virtual machines in VMware vCenter.
This section provides technical details about how vCenter support
is implemented in Mirantis OpenStack.
See :ref:`vcenter-plan` for information about planning the deployment;
:ref:`vcenter-deploy` gives instructions for deploying
a Mirantis OpenStack environment
that is integrated with VMware vCenter.

VMware provides a vCenter driver for OpenStack.
This driver includes a vSphere driver for Nova Compute,
plus vSphere datastore drivers for :ref:`cinder-term` block storage
and Glance image storage.
The vCenter driver enables Nova Compute
to communicate with a vCenter server
that manages one or more ESXi host clusters.
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
This also enables OpenStack Cinder
to drive the VMware vSAN filesystem
and block storage associated with ESXi clusters.

The vCenter driver requires the :ref:`nova-network-term` topology,
which means that :ref:`ovs-term` does not work with vCenter.
However, VMware has also created an NSX plug-in for OpenStack Neutron
that offers best-in-class software-defined networking,
including features such as security groups,
that are not supported by Nova-network.
The NSX plug-in is derived from vCloud networking and security,
combined with the Nicira Virtualization Platform codebase.

