
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

Multi-node HA Deployment with vSphere integration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. image:: /_images/vcenter-reference-architecture.png
   :width: 50%


