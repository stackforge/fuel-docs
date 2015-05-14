.. index:: Upgrade Solution

.. _Upg_Sol:

Solution Overview
-----------------

This section describes a solution that implements the upgrade strategy
outlined in the previous section. It gives a step by step script of the
procedure and explains every step of it. In the chapters that follow we
will give detailed scripts with exact commands to upgrade your cluster.

Hardware considerations
+++++++++++++++++++++++

For Mirantis OpenStack with :ref:`High Availability Reference Architecture
<controller-arch>` using at least 3 CICs is recommended. When you
install a 7.0 Seed environment in HA mode, you can start with only 1
Controller. This procedure assumes that the node for this Controller is
borrowed from the set of the Controllers in the original 6.1
environment.

Preparations and prerequisites
++++++++++++++++++++++++++++++

Before starting the upgrade itself, make sure that your system complies
to the :ref:`architecture constraints <architecture-constraints>`
listed above. You will also need to make some preparations to provide
prerequisites for the upgrade procedure. These preparations are
automated using the Upgrade Script named ``octane``.

Install the upgrade script on the Fuel Master node using ``yum``:

::

    yum install fuel-octane

Create 7.0 Seed environment
++++++++++++++++++++++++++++

Our concept of the upgrade involves installing a CIC of version 7.0
side-by-side with the cloud being upgraded. We leverage Fuel installer
for the task of deployment of nodes with 7.0 versions.

The way we create the upgraded environment is different from the way
the ordinary OpenStack cluster is installed by Fuel 7.0. This section
explains the specifics of the deployment of such a 'shadow' environment,
also referred to as Upgrade Seed environment in this section.

Clone configuration of 6.1 environment
________________________________________

The first step in the upgrade procedure is to install a new 7.0 Upgrade
Seed environment. The settings and attributes of the Seed environment
must match the settings of the original environment, with the changes
corresponding to the changes in the data model of Nailgun between
releases.

As part of the upgrade procedure automation, an extension to Nailgun
API was developed. This extension implements a resource
``/api/v1/cluster/<:id>/upgrade/clone`` which creates an Upgrade Seed
environment based on the settings of the original one
(identified by the ``id`` parameter).

A ``POST`` request to that resource must be sent to initiate the
upgrade procedure.

An extension to the Fuel client was developed that allows sending
the request from the CLI of the Fuel Master node.

Fuel client extension is installed in the
:ref:`preparation phase <upg_prep>` of the upgrade procedure.

Install 7.0 CIC
+++++++++++++++

When the Fuel Master node and Upgrade Seed environment are prepared,
you can start upgrading your 6.1 environment. First you need to pick
a Controller node in the original environment. Upgrade script will
move that node into the Upgrade Seed environment and reinstall it as
a primary controller in that environment.

The Fuel installer deploys the Cloud Controller in a Seed environment
with the following changes:

* 7.0 Controller will be isolated from the Management and Public
  networks on the data link layer (L2) to avoid conflicts with the
  Virtual IPs in the original 6.1 Controllers.

The nature of network isolation defines many aspects of the deployment
process. To understand how it could be implemented, we need to analyze
the configuration of the internal networking of Cloud Infrastructure
Controller.

Fuel creates virtual bridges that connect the host to networks with
different roles. Physical interfaces (e.g. ``eth1``) are added to those
bridges creating L2 connections to the corresponding networks.

On the other hand, L3 IP address is assigned to virtual bridge
to the network of a given type. A virtual bridge to connect to
Management network is called ``br-mgmt``, to Public network -
``br-ex``, and so on.

To install 7.0 Controller in isolation from these networks, the script
configures the deployment information for the node in a way that
physical interfaces are not added to certain virtual bridges when
OpenStack is being deployed.

This ensures that the Controller has no physical connection to Management
and Public network.

Using Fuel for isolated deployment
__________________________________

Fuel is responsible for the assignment of IP addresses to logical
interfaces in the Management, Public and other types of networks.
The environment cloning function in Nailgun API does copy the IP
ranges and Virtual IP addressses of the original cluster.

Fuel configures Linux bridges and interfaces during the deployment of an
environment. This configuration is managed by Puppet and is defined in
the deployment settings. You can modify these settings to disable
adding of certain physical interface to the bridge.

For deployment to succeed with the described schema, you need to ensure
that no network checks break the installation by disabling a check for
connectivity to the default gateway. Fuel installer expects the gateway
to be in the Public network, which is not directly accessible from our
isolated Controller.

The exact commands to create an isolated Upgrade Seed environment are
listed in the :ref:`Upgrade Script <upg_script>` chapter.

Initial state of Ceph cluster
_____________________________

According to the upgrade scenario, Ceph cluster must be installed in
a way that allows for replacing the original Monitors of the 6.1
environment with the new Monitors when 7.0 CICs take over. There is
a way to install a cluster without OSD nodes and thus rule out the
rebalance and data movement once the original OSD nodes start joining
the cluster. However, it requires that the upload of the test VM image
by Fuel is disabled before the deployment. We achieve this by
disabling the corresponding tasks in the deployment graph:
``upload_cirros`` and ``check_ceph_ready``.

Maintenance Mode
++++++++++++++++

During the installation of 7.0 Seed cloud the original 6.1 environment
continues to operate normally. Seed CIC do not interfere with the
original CICs and the latter could continue the operation through
the initial stages of the upgrade.

However, when it comes to the upgrade of state databases of
OpenStack services, you need to make sure that no changes are made
to the state data. Maintenance mode must be started before you download
data from the state database of 6.1 OpenStack environment.
Maintenance mode should last at least until the database upgrade is
finished and 7.0 CICs take over the environment.

Note that Maintenance mode implemented according to these instructions
does not impact operations of existing virtual server instances and
other resources. It only affects OpenStack API endpoints which are the
only way for the end user to change the state data of the cluster.

High Availability architecture of Mirantis OpenStack provides access to
all OpenStack APIs at a single VIP address via HAProxy load balancer.
You need to configure HAProxy server to return code ``HTTP 503`` on
all requests to the services listening on the Public VIP in 6.1
environment. This will not allow users to change the state of the
virtual resources in the original cloud which can be lost after the
data is downloaded from DB.

On 7.0 CIC, you must disable all OpenStack component services to make
sure that they do not write to the state database while it is being
upgraded. Otherwise, this might lead to data corruption and loss.

All the detailed commands used to put environments into Maintenance
mode are listed in the Upgrade Script chapter below.

Upgrade databases
+++++++++++++++++

Database upgrade is a standard procedure provided by OpenStack upstream
as a main upgrade feature. It allows converting data from state
databases of all OpenStack component services from a previous to a new
release version schema. It is necessary to fully preserve the status of
the virtual resources provided by the cloud through the upgrade
procedure.

The data is dumped from MySQL database on one of the CIC nodes in 6.1
environment. A text dump of the database is compressed and sent over
to CIC node in 7.0 environment.

After uploading the data to MySQL on 7.0 CIC, use standard OpenStack
methods to upgrade the database schema to the new release. Specific
commands that upgrade the schema for particular components of the
platform are listed in the Upgrade Script chapter below.

Configure Ceph Monitors
+++++++++++++++++++++++

Architecture constraints for the upgrade procedure define that in the
upgradeable configuration Ceph is used for all types of storage in the
OpenStack platform: ephemeral storage, permanent storage, object
storage and Glance image store. Ceph Monitors are essential for the
Ceph cluster and must be upgraded seamlessly and transparently.

By default, Fuel installer creates a new Ceph cluster in the 7.0 Seed
environment. You need to copy the configuration of the cluster from
6.1 environment to override the default configuration. This will
allow OSD nodes from 6.1 environment to switch to the new Monitors
when 7.0 CICs take over the control plane of the upgraded environment.

The Upgrade Script synchronizes the configuration of Ceph Monitors in
the 6.1 and 7.0 clusters during the upgrade procedure. 

Upgrad Control Plane
++++++++++++++++++++

This step is called 'Upgrade', as it concludes with a new CIC of
version 7.0 listening on the same set of IP addresses as the original
6.1 CICs. However, from the technical standpoint it is more of a
switch to a new version of control plane. 7.0 Controller takes over the
Virtual IP addresses of 6.1 environment, while the original CICs are
disconnected from all networks except Admin. The sections that follow
explain what happens and why at every stage of the upgrade process.

Start OpenStack services on 7.0 Controller
__________________________________________

As part of Maintenance mode, OpenStack component services were shut
down on 7.0 CIC before upgrading the database. These services include
Nova, Glance, Keystone, Neutron and Cinder. Now it is time to restore
them with a new data set created by the database migration procedure.
This operation basically reverts the shutdown operation described above.
It is automated in the Upgrade Script.

Note that Neutron restart involves creation of tenant networking
resources on CIC nodes where Neutron agents run. This process can
take longer than starting all other services, so check it carefully
before you proceed with the upgrade.

Delete ports on 6.1 Controllers
_________________________________

Before 7.0 CIC can take over the virtual network addresses in the
upgraded environment, you need to disconnect 6.1 CICs to release
those addresses. Based on the CICs networking schema described above,
to do that you need to delete patch ports from certain OVS bridges.

This procedure is automated by the upgrade script and executed as part
of the ``upgrade-cics`` subcommand.

Connect 7.0 Controller
______________________

After 6.1 CICs are disconnected from all networks in the environment,
7.0 CIC can take over their former VIP addresses. The take-over
procedure adds physical ports to the appropriate bridges and brings
the ports up.

Upgrade hypervisor host
+++++++++++++++++++++++

Hypervisor hosts provide their physical resources to run virtual
machines. Physical resources are managed by hypervisor software,
usually 'libvirt' and 'qemu-kvm' packages. With KVM hypervisor,
all virtualization tasks are handled by the Linux kernel. Open vSwitch
provides L2 network connectivity to virtual machines. All together,
kernel, hypervisor and OVS constitute a data plane of Compute service.

You can upgrade data-plane software on a hypervisor host (or Compute
node) by re-installing the operating system to a new version with Fuel
installer. However, the deployment process takes time and impacts the
virtual machines. To minimize the impact, leverage live migration to
move all virtual machines from the Compute node before you start
upgrading it. You can do that since Compute node's control plane is
upgraded to 7.0.

Nailgun API extension installed by the Upgrade Script allows to move
a node to the Upgrade Seed environment in runtime. It preserves the ID
of the node, its hostname and configurations of its disks and
interfaces.

When a node is added to the upgraded environment, the script provisions
the node. When the provisioning is finished, the script runs the
deployment of the node. As a result of the deployment, the node will
be added to the environment as a fully capable Mirantis
OpenStack 7.0 Compute node.

Upgrade of a single Compute node must be repeated for all the nodes
of 6.1 environment in a rolling fashion. VMs must be gradually moved
from the remaining 6.1 Compute nodes to the 7.0 ones with live
migration.

Upgrade Ceph OSD node
+++++++++++++++++++++

In a Ceph cluster all data is stored on OSD nodes. These nodes have one
or more storage devices (or disk partitions) dedicated to Ceph data and
run ceph-osd daemon that is responsible for I/O operations on Ceph data.

Upgrading OSD node via Fuel means that the node must be redeployed. Per
the requirement to minimize end-user impact and the move of data across
the OpenStack cluster being upgraded, we developed a procedure to
redeploy Ceph OSD nodes with the original data set. Although Fuel
by default erases all data from disks of the node it deploys, you can
patch and configure the installer to keep Ceph data on the devices
intact.

There are several stages of the deployment when the data is erased from
all disks in the Ceph OSD node. First, when you delete a Ceph node,
Nailgun agent on that node does the erasing on all non-removable disks
by writing 0s to the first 10MB of every disk. Then, at the provisioning
stage, Ubuntu installer creates partitions on disks and formats them
according to the disks configuration provided by Fuel orchestration
components.

As part of the upgrade procedure, we provide patches for the components
involved in volumes management that allow to keep data on certain
partitions or disks. These patches are applied automatically by the
Upgrade Script.

Disable rebalance
_________________

By default, Ceph initiates rebalance of data when OSD node goes down.
Rebalancing means that the data of replicas is moved between the
remaining nodes, which takes significant time and impacts end user's
virtual machines and workloads. We disable the rebalance and
recalculation of CRUSH maps when OSD node goes down. When a node is
reinstalled, OSD connects to Ceph cluster with the original data set.

Finalizing the upgrade
++++++++++++++++++++++

When all nodes are reassigned to the 7.0 environment and upgraded,
it is time to finalize the upgrade procedure with a few steps that allow
Fuel installer to manage with the upgraded environment just as with
vanilla 7.0 environment, installed from scratch:

* revert all patches applied to Fuel components;
* delete the original environment.
