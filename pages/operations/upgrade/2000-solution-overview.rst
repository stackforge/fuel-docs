.. index:: Upgrade Solution

.. _Upg_Sol:

Solution Overview
-----------------

This section describes a solution that implements the upgrade strategy outlined
in the previous section. It gives a step by step script of the procedure and
explains every step of it. In the chapters that follow we will give detailed
scripts with exact commands to upgrade your cluster.

Hardware considerations
+++++++++++++++++++++++

For Mirantis OpenStack with :ref:`High Availability Reference Architecture
<controller-arch>` using at least 3 CICs is recommended. When you install 6.1
Seed environment in HA mode, you can start with only 1 Controller. This
procedure assumes that the node for this Controller is borrowed from the set of
Controllers in the original 5.1.1 environment.

Preparations and prerequisites
++++++++++++++++++++++++++++++

Before starting the upgrade itself, make sure that your system complies to the
:ref:`architecture constraints <architecture-constraints>` listed above. You
will also need to make some preparations to provide prerequisites for the
upgrade procedure. These preparations are automated using the Upgrade Script,
named ``octane``.

They include installation of certain packages onto the Fuel Master node and
patching of the source code of Fuel components to modify Fuel installer
behavior in a way desirable for the upgrade.

The upgrade procedure requires the following packages to be installed on Fuel
Master node:

* `PSSH <https://code.google.com/p/parallel-ssh/>`_ – provides ability to run
  shell commands in parallel on multiple hosts.
* ``patch`` – provides ability to consistently modify the source code of
  components of Fuel installer.
* ``python-pip`` - installer for Python packages, used to install extensions to
  Nailgun and Fuel client.

A description of modifications to Fuel components is given below in the
sections dedicated to the corresponding steps of the upgrade which require
alternate behavior.

Create 6.1 Seed environment
++++++++++++++++++++++++++++

Our concept of upgrade involves installing a CIC of version 6.1 side-by-side
with the cloud being upgraded. We leverage Fuel installer for the task of
deployment of nodes with 6.1 versions.

The way we create upgraded environment is different from the way the ordinary
OpenStack cluster installed by Fuel 6.1. This section explains specifics of
deployment of such a 'shadow' environment, also referred as Upgrade Seed
environment in this section.

Clone configuration of 5.1.1 environment
________________________________________

The first step in the upgrade procedure is to install a new 6.1 Upgrade
Seed environment. Settings and attributes of the Seed environment must match
the settings of the original environment, with changes corresponding to changes
in the data model of Nailgun between releases.

As a part of the upgrade procedure automation, an extension to Nailgun API was
developed. This extension implements a resource
``/api/v1/cluster/<:id>/upgrade/clone`` which creates an Upgrade Seed
environment based on settings of the original one (identified by the ``id``
parameter).

A ``POST`` request to that resource must be sent to initiate the upgrade
procedure.

An extension to the Fuel client was developed that allows to send the request
from the CLI of the Fuel Master node.

Both Nailgun and Fuel client extensions are installed in the :ref:`preparation
phase <upg_prep>` of the upgrade procedure.

Install 6.1 CIC
+++++++++++++++

When the Fuel Master node and Upgrade Seed environment are prepared, you can
start upgrading your 5.1.1 environment. First you need to pick a Controller
node in the original environment. Automation scripts for the upgrade procedure
will move that node into the Upgrade Seed environment and reinstall it as a
primary controller in that environment.

Cloud Controller in a Seed environment is deployed by Fuel installer. There
are several restrictions on the deployment process and the final state of the
installed CIC due to the upgrade requirements.

* 6.1 Controller must have the same IP address as the Controller in the
  original environment that was picked for upgrade.

* 6.1 Controller must be isolated from Management and Public networks on the
  data link layer (L2) to avoid IP conflicts with 5.1.1 Controllers and
  clustering glitches with corosync and Galera in the 5.1.1 environment.

The nature of network isolation defines many aspects of the deployment process.
To understand how it could be implemented, we need to analyze the configuration
of the internal networking of Cloud Infrastructure Controller.

Fuel creates virtual bridges that connect the host to networks with different
roles. Physical interfaces (e.g. ``eth1``) are added to those bridges creating
L2 connections to the corresponding networks.

On the other hand, L3 IP address is assigned to virtual bridge
to the network of a given type. A virtual bridge to connect to Management
network is called ``br-mgmt``, to Public network - ``br-ex``, and so on.

To install 6.1 Controller in isolation from those networks, the script
configures the deployment information for the node in a way that physical
interfaces are not added to certain virtual bridges when OpenStack is being
deployed.

This ensures that CIC has no physical connection to Management and Public
network.

Using Fuel for isolated deployment
__________________________________

Fuel is responsible for the assignment of IP addresses to logical interfaces in
Management, Public and other types of networks. The environment cloning
procedure does copy IP ranges environment settings for you. Specific address
allocations can be done through editing deployment information for nodes.

Fuel configures Linux bridges and interfaces during the deployment of an
environment. This configuration is managed by Puppet and is defined in the
deployment settings. You can modify these settings to disable adding of
certain physical interface to the bridge.

For deployment to succeed with the described schema, you need to ensure that no
network checks break the installation by disabling a check for connectivity to
the default gateway. Fuel installer expects the gateway to be in the Public
network, which is not directly accessible from our isolated Controller. Exact
commands to disable the check are listed in the :ref:`Upgrade Script
<upg_script>` chapter.

Initial state of Ceph cluster
_____________________________

By default, Fuel installer creates a number of resources in the installed cloud,
used to verify the deployment. Among those resources, Fuel uploads a test VM
image to Glance store. Uploading an image requires that Glance store is fully
operational at the time of the upload. If Ceph is used to store Glance images
(as per the Architecture constraints section above) then it must have an OSD
node to be able to store data.

According to upgrade scenario, Ceph cluster must be installed in a way that
allows for replacing the original Monitors of 5.1.1 environment with the new
Monitors when 6.1 CICs take over. There is a way to install a cluster without
OSD nodes and thus rule out the rebalance and data movement once the original
OSD nodes start joining the cluster. However, it requires that the upload of
test VM image by Fuel is disabled before the deployment. We achieve it by
disabling corresponding tasks in the deployment graph: ``upload_cirros`` and
``check_ceph_ready``.

Maintenance Mode
++++++++++++++++

During the installation of 6.1 Seed cloud the original 5.1.1 environment
continues to operate normally. Seed CIC don't interfere with the original CICs
and the latter could continue the operation through the initial stages of
upgrade.

However, when it comes to the upgrade of state databases of OpenStack services,
you need to make sure that no changes are made to the state data. Disabling all
means for users to modify the state data is a Maintenance mode of the operation
of OpenStack cluster. Maintenance mode must be started before you download data
from the state database of 5.1.1 OpenStack environment. Maintenance mode should
last at least until the database upgrade is finished and 6.1 CICs take over the
environment.

Note that Maintenance mode implemented according to these instructions does not
impact operations of existing virtual server instances and other resources. It
only affects OpenStack API endpoints which are the only way for the end user to
change the state data of the cluster.

High availability architecture of Mirantis OpenStack provides access to all
OpenStack APIs at a single VIP address via HAProxy load balancer. You need to
configure HAProxy server to return code ``HTTP 503`` on all requests to services
listening on the Public VIP in 5.1.1 environment. This will not allow users to
change the state of virtual resources in the original cloud which can be lost
after the data downloaded from DB.

On 6.1 CIC, you must disable all OpenStack component services to make sure that
they don't write to the state database while it is being upgraded. Otherwise,
this might lead to data corruption and loss.

All the detailed commands used to put environments into Maintenance mode are
listed in the Upgrade Script chapter below.

Upgrade databases
+++++++++++++++++

Database upgrade is a standard procedure provided by OpenStack upstream as a
main upgrade feature. It allows to convert data from state databases of all
OpenStack component services from a previous to a new release version schema.
It is necessary to fully preserve the status of the virtual resources provided
by the cloud through the upgrade procedure.

Data is dumped from MySQL database on one of the CIC nodes in 5.1.1
environment. Text dump of the database is compressed and sent over to CIC node
in 6.1 environment.

After uploading data to MySQL on 6.1 CIC, use standard OpenStack methods to
upgrade the database schema to the new release. Specific commands that upgrade
schema for particular components of the platform are listed in the Upgrade
Script chapter below.

Configure Ceph Monitors
+++++++++++++++++++++++

Architecture constraints for the upgrade procedure define that in the
upgradeable configuration Ceph is used for all types of storage in the
OpenStack platform: ephemeral storage, permanent storage, object storage and
Glance image store. Ceph Monitors are essential for the Ceph cluster and must
be upgraded seamlessly and transparently.

By default, Fuel installer creates new Ceph cluster in 6.1 Seed environment.
You need to copy the configuration of the cluster from 5.1.1 environment to
override the default configuration. This will allow OSD nodes from 5.1.1
environment to switch to the new Monitors when 6.1 CICs take over the control
plane of the upgraded environment.

The Upgrade Script synchronizes configuration of Ceph Monitors in the 5.1.1 and
6.1 clusters during the upgrad procedure. 

Upgrade CICs
++++++++++++

This step is called 'Upgrade', as it concludes with a new CIC of version 6.1
listening on the same set of IP addresses as the original 5.1.1 CICs. However,
from the technical standpoint it is more a switch than an upgrade. 6.1
Controller takes over the Virtual IP addresses of 5.1.1 environment, while the
original CICs are disconnected from all networks except Admin. The sections
that follow explain what happens and why at every stage of the upgrade process.

Start OpenStack services on 6.1 Controller
__________________________________________

As a part of Maintenance mode, OpenStack component services were shut down on
6.1 CIC before upgrading the database. Those services include Nova, Glance,
Keystone, Neutron and Cinder. Now it is time to restore them with a new data
set created by the database migration procedure. This operation basically
reverts the shutdown operation described above. It is automated in the Upgrade
Script.

Note that Neutron restart involves creation of tenant networking resources
on CIC nodes where Neutron agents run. This process can take longer than
starting all other services, so check it carefully before you proceed with the
upgrade..

Delete ports on 5.1.1 Controllers
_________________________________

Before 6.1 CIC can take over the virtual network addresses in the upgraded
environment, you need to disconnect 5.1.1 CICs to release those addresses.
Based on the CICs networking schema described above, to do that you need to
delete patch ports from certain OVS bridges.

This procedure is automated by upgrade script and executed as a part of
``upgrade-cics`` subcommand.

Reconnect 6.1 Controller
________________________

After 5.1.1 CICs are disconnected from all networks in the environment, 6.1 CIC
can take over their former VIP addresses. The take-over procedure adds physical
ports to appropriate bridges and brings the ports up.

Update 'nova-compute' package on 5.1.1 Compute nodes
____________________________________________________

One of the main non-functional requirements to the upgrade procedure is to
minimize the impact of the upgrade on the virtual resources, in the first
place, virtual servers. The impact includes downtime of the virtual machine
itself, up to the interruption of the virtualization process (i.e. qemu-kvm
process) and network disconnection time due to the upgrade of the networking
data and/or control plane software.

Downtime of virtualization process occurs when a VM is shut down due to reboot
of hypervisor host as a part of an upgrade of operating system. To avoid this,
you could leverage live migration over the shared storage (Ceph). However, live
migration between 2014.1 and 2014.2 versions of OpenStack is explicitly
disabled by patch `<https://review.openstack.org/#/c/91722/>`_.

This issue can be resolved by upgrading the 'nova-compute' package to 2014.2
release without upgrading data-plane software, i.e. hypervisor kernel and
operating system packages. Upgrade of Nova Compute involves an upgrade of its
dependencies, including Neutron L2 agent. After the upgrade, the services are
restarted and reconnected to new 6.1 CIC.

Note that the in-place upgrade of control plane services does not impact
workloads, but the restart of Neutron L2 agent disrupts network connectivity of
VMs for a relatively short period of time. This disruption can be minimized by
adding the 'soft restart' capability to Neutron L2 OVS agent, which reloads the
agent without resetting OVS settings managed by it.

Installation of new versions of OpenStack packages without re-installing the
whole operating system leaves the hypervisor host in the 'unclear' state from
the standpoint of the Mirantis OpenStack versioning system. This is acceptable
for a short period of time while rolling an upgrade of hypervisor hosts in
going.

Upgrade hypervisor host
+++++++++++++++++++++++

Hypervisor hosts provide their physical resources to run virtual machines.
Physical resources are managed by hypervisor software, usually 'libvirt' and
'qemu-kvm' packages. With KVM hypervisor, all virtualization tasks are handled
by the Linux kernel. Open vSwitch provides L2 network connectivity to virtual
machines. All together, kernel, hypervisor and OVS constitute a data plane of
Compute service.

You can upgrade data-plane software on a hypervisor host (or Compute node) by
re-installing operating system to the new version with Fuel installer. However,
the deployment process takes time and impacts virtual machines. To minimize the
impact, leverage live migration to move all virtual machines from the Compute
node before you start upgrading it. You can do that since Compute node's
control plane is upgraded to 6.1.

Nailgun API extension installed by the Upgrade Script allows to move a node to
the Upgrade Seed environment in runtime. It preserves the ID of the node, its
hostname and configurations of its disks and interfaces.

When a node is added to the upgraded environment, script provisions the node.
When the provisioning finished, script run the deployment of the node. As a
result of the deployment, the node will be added to the environment as a fully
capable MOS 6.1 Compute node.

Upgrade of a single Compute node must be repeated for all the nodes of 5.1.1
environment in a rolling fashion. VMs must be gradually moved from the
remaining 5.1.1 Compute nodes to the 6.1 ones with live migration.

Upgrade Ceph OSD node
+++++++++++++++++++++

In a Ceph cluster all data is stored on OSD nodes. These nodes have 1 or more
storage devices (or disk partitions) dedicated to Ceph data and run ceph-osd
daemon that is responsible for I/O operations on Ceph data.

Upgrading OSD node via Fuel means that the node must be redeployed. Per
requirement to minimize end-user impact and the move of data across the
OpenStack cluster being upgraded, we developed a procedure to redeploy Ceph OSD
nodes with the original data set. Although Fuel by default erases all data from
disks of the node it deploys, you can patch and configure the installer to keep
Ceph data on the devices intact.

There are several stages of the deployment when data is erased from all disks
in the Ceph OSD node. First, when you delete Ceph node, Nailgun agent on that
node does the erasing on all non-removable disks by writing 0s to the first
10MB of every disk. Then, at the provisioning stage, Ubuntu installer creates
partitions on disks and formats them according to the disks configuration
provided by Fuel orchestration components.

As a part of the upgrade procedure, we provide patches for components involved
in volumes management that allow to keep data on certain partitions or
disks. These patches are applied automatically by the Upgrade Script.

Disable rebalance
_________________

By default, Ceph initiates rebalance of data when OSD node goes down.
Rebalancing means that the data of replicas is moved between the remaining
nodes, which takes significant time and impacts end user's virtual machines and
workloads. We disable the rebalance and recalculation of CRUSH maps when OSD
node goes down. When a node is reinstalled, OSD connects to Ceph cluster with
the original data set.

Finalizing the upgrade
++++++++++++++++++++++

When all nodes are reassigned to 6.1 environment and upgraded, it is time to
finalize the upgrade procedure with a few steps that allow Fuel installer to
manage with the upgraded environment just as with vanilla 6.1 environment,
installed from scratch:

* revert all patches applied to Fuel components;
* delete the original environment.
