.. index:: Upgrade Solution

.. _Upg_Sol:

Solution Overview
-----------------

This section describes a solution that implements the upgrade strategy outlined
in the previous section. It gives a step by step script of the procedure and explains
every step of it. In the chapters that follow we will give detailed scripts
with exact commands to upgrade your cluster.

Hardware considerations
-----------------------

For Mirantis OpenStack with :ref:`High Availability Reference Architecture
<controller-arch>` using at least 3 CICs is recommended. When you install 6.0 Seed
environment in HA mode, you need 3 additional nodes to serve as CICs in that
environment. Ideally, you will need as many additional nodes as there are CICs
in 5.1.1 environment targeted for the upgrade.

Additional servers must be connected to the networks in the same way as 5.1.1 CICs, i.e.
you must preserve the mapping of physical interfaces to network types (Admin,
Management, Public, Private and Storage). Similar wiring ensures that the
configuration parameters for the new nodes and the 6.0 environment can be automatically
cloned directly from the original 5.1.1 environment. Otherwise, you will need to
configure the 6.0 CICs manually.

Preparations and prerequisites
------------------------------

Before starting the upgrade itself, make sure that your system complies to the
:ref:`architecture constraints <architecture-constraints>` listed above. You
will also need to make some preparations to provide prerequisites for the upgrade
procedure. These preparations include installation of certain packages onto Fuel
Master node and patching of the source code of Fuel components to modify Fuel
installer behavior in a way desirable for the upgrade.

The upgrade procedure requires the following packages to be installed on Fuel Master
node:

* `PSSH <https://code.google.com/p/parallel-ssh/>`_ – provides ability to run
  shell commands in parallel on multiple hosts.
* `PostgreSQL client <http://www.postgresql.org/docs/9.3/static/reference-client.html>`_ – required
  for operations on Nailgun database.
* patch – provides ability to consistently modify the source code of components
  of Fuel installer.

A description of modifications to Fuel components is given below in the sections
dedicated to the corresponding steps of the upgrade which require alternate behavior.

Install 6.0 Seed environment
----------------------------

Our concept of upgrade involves installing a set of CICs of version 6.0
side-by-side with the cloud being upgraded. We leverage Fuel installer for the
task of deployment of 6.0 CICs. Fuel treats 6.0 CICs as belonging to a separate
environment. However, that environment is created in a slightly different way
than the ordinary OpenStack cluster installed by Fuel 6.0. This section explains
specifics of deployment of such a 'shadow' environment, also referred as Seed
environment in this section.

Clone configuration of 5.1.1 environment
++++++++++++++++++++++++++++++++++++++++

The first step of the upgrade procedure is to install a new 6.0 Mirantis OpenStack
Seed environment. The Seed environment must have exactly the same settings as the
original 5.1.1 environment targeted for the upgrade. However, as the configuration format
changes between releases, it is not enough to just copy the settings. For certain
parameters we need to make a translation. The goal of the translation is to make
sure the parameter names and values are modified to preserve the configuration
and behavior of OpenStack components through the upgrade. For example, in Fuel 5.1.1 the
parameter ``'segmentation_type'`` that defines a type of network segmentation (VLAN
or GRE) is stored in dict ``'networking_parameters'``, which belongs to a global
settings dictionary.

::

    {
        ...,
        'networking_parameters': {
            'segmentation_type': 'vlan',
            ...
        },
        ...
    }

However, in Fuel 6.0 network segmentation type is defined by the element
``'net_segment_type'`` in the global dictionary of environment settings.

::

    {
        ...,
        'net_segment_type': 'vlan',
        ...
    }

It means that to preserve the segmentation of network in Seed environment we
need to remove the configuration parameter ``'segmentation_type'`` from API call that
creates an environment, and add the ``'net_segment_type'`` parameter instead. There are
multiple translations of this kind between the 5.1.1 and 6.0 versions of Fuel installer. We
created a Python helper module ``octane/helpers/cluster.py`` to handle all
modifications to the environment settings between releases.

There are two groups of settings in Fuel: editable and generated: 

* **Editable settings** can be managed via Fuel API and are defined by the user.
  They define the architecture of OpenStack cloud and other parameters of individual 
  components.
* **Generated settings** are not accessible via API. As the name suggests, generated
  settings are produced by Fuel upon creation of environment and are directly written
  to Fuel database. The generated settings include system credentials for OpenStack
  services, i.e. passwords for authenticating services to each other and to the
  database.

Not only editable settings must be cloned to create a Seed environment, but
generated settings as well: it is required to ensure that Compute nodes from
5.1.1 environment work with 6.0 CICs. During the upgrade, editable parameters
are set via Fuel API. The generated parameters are copied from 5.1.1 to the 6.0
environment record in Nailgun database and override the generated settings created
for the new 6.0 environment.

Install 6.0 CICs
++++++++++++++++

Cloud Controllers in a Seed environment are deployed by Fuel installer. There
are several restrictions on the deployment process and the final state of the installed
CICs due to the upgrade requirements.

First, CICs in 6.0 Seed environment must be able to take over the IP addresses
of the original controllers. However, Fuel does not allow different environments to
utilize the same ranges of IP addresses. Thus, we need to modify the deployment
information of the Seed environment to work around this limitation and assign
the already used individual and virtual IPs to 6.0 CICs.

Second, until the moment when 6.0 CICs takes over the IP addresses of the original 5.1.1
CICs, the former must not cause IP conflicts in the networks they are connected
to (i.e. Management and Public network of the original MOS 5.1.1 cloud).

The solution to these two problems is isolating CICs in 6.0 shadow environment
from 5.1.1 until 6.0 CICs are ready to replace the previous ones. While isolated, 6.0
CICs must talk to each other for Fuel installer to work successfully.

The nature of network isolation defines many aspects of the deployment process.
To understand how it could be implemented, we need to analyze the configuration
of the internal networking of Cloud Infrastructure Controller.

Fuel creates virtual switches (Open vSwitch) that connect the host to networks of all
kinds, including Management, Public, Private and even Admin. Physical interface
(e.g. 'eth1') is connected to the port of a 'physical' virtual switch (e.g. 'br-eth1')
which creates an L2 connection to the network of a given type.

On the other hand, L3 IP address is assigned to a port of 'logical' virtual
switch for the network of a given type. A logical switch to connect to Management
network is called ``br-mgmt``, to Public network - ``br-ex``, and to Private network
- ``br-prv``.

Physical and logical bridges are connected by a pair of ports which are called
'patch ports'. Every patch port has its counterpart in another virtual switch.
A counterpart port name is defined by a 'peer' parameter of the port. For example,
the configurations of peer patch ports that connect virtual switches 'br-mgmt' and
'br-eth1' are highlighted in snippet below.

::

    Bridge br-mgmt
        Port br-mgmt
            Interface br-mgmt
                type: internal
        Port "br-mgmt--br-eth1"
            trunks: [0]
            Interface "br-mgmt--br-eth1"
                type: patch
                options: {peer="br-eth1--br-mgmt"}
    Bridge "br-eth1"
        Port "eth1"
            Interface "eth1"
        Port "br-eth1"
            Interface "br-eth1"
                type: internal
        Port "br-eth1--br-mgmt"
            trunks: [0]
            Interface "br-eth1--br-mgmt"
                type: patch
                options: {peer="br-mgmt--br-eth1"}

If 5.1.1 CIC and 6.0 CIC have similar IP addresses on respective logical
interfaces and are connected to the same L2 network, it will cause IP conflicts and
disrupt connectivity on that network. On the other hand, 6.0 CICs must be able
to communicate to each other via their logical interfaces. To avoid the conflicts
and provide connectivity, we must isolate 6.0 CICs from 5.1.1 CICs.

Isolation is implemented by two actions. First, we must configure Fuel so it
doesn't create patch ports to connect logical and physical bridges on 6.0 CIC
nodes when deploying OpenStack. Second, we need to create GRE tunnel connections
between 6.0 CICs via Admin network. The diagram below illustrates what this type of
network isolation looks like for Management network after CICs deployment is
finished. It must be the same both for Public and Private networks.

.. image:: /_images/upgrade/network_isolation.png

The absence of patch port ensures that CIC has no physical connection to
Management (or other type) network. GRE tunnel provides connectivity between
controllers in 6.0 environment. Virtual GRE circuits connect logical bridges on
all 6.0 CICs.

Using Fuel for isolated deployment
++++++++++++++++++++++++++++++++++

To deploy 6.0 CICs in isolation, we need to change the networking configuration
Fuel deploys by default. This change should allow us to achieve the following
goals:

* Assign IP addresses to 6.0 CICs so they have the same addresses as respective
  5.1.1 CICs.
* Create GRE tunnels between logical interfaces of 6.0 CICs before the start of a
  deployment operation on those CICs.
* Don't create patch ports to connect logical bridges to the physical interfaces of
  6.0 CICs during a subsequent deployment operation on those CICs.

Fuel is responsible for the assignment of IP addresses to logical interfaces in
Management, Public and other types of networks. The environment cloning
procedure does copy IP ranges environment settings for you. Specific address
allocations can be done through editing deployment information for nodes.

Fuel configures OVS switches and ports during the deployment of an environment. This
configuration is managed by Puppet and is defined in the deployment settings. You
can modify these settings to disable creation of certain ports, for example,
patch ports between OVS bridges.

Fuel installer is unable to configure GRE ports in Open vSwitches at the moment.
Hence, you need to configure the isolation manually after the operating system is
installed but before Fuel starts execution of Puppet manifests. It is possible
due to the feature of Fuel installer that allows to separate provisioning (i.e.
configuring disks and the installation of operating system) and deployment
(installation and configuration of system parameters and OpenStack components).
After provisioning, you need to create GRE ports in OVS switches manually. There
are detailed instructions on how to configure GRE ports for OVS in the detailed
script section below.

For deployment to succeed with the described schema, you need to ensure that no
network checks break the installation by disabling a check for connectivity to
the default gateway. Fuel installer expects the gateway to be in Public network,
which is not directly accessible from our isolated deployment. Exact commands to
disable the check are listed in the Upgrade Script chapter.

Initial state of Ceph cluster
+++++++++++++++++++++++++++++

By default, Fuel installer creates a number of resources in the installed cloud,
used to verify the deployment. Among those resources, Fuel uploads a test VM
image to Glance store. Uploading an image requires that Glance store is fully
operational at the time of the upload. If Ceph is used to store Glance images (as
per the Architecture constraints section above) then it must have an OSD node to be
able to store data.

According to upgrade scenario, Ceph cluster must be installed in a way that
allows for replacing the original Monitors of 5.1.1 environment with the new Monitors
when 6.0 CICs take over. There is a way to install a cluster without OSD nodes
and thus rule out the rebalance and data movement once the original OSD nodes start
joining the cluster. However, it requires that the upload of test VM image by Fuel
is disabled before the deployment. We developed a patch for the Astute orchestrator
component of Fuel installer that disables this operation. With this patch, Fuel
can install 6.0 Seed environment without new OSD nodes. See the detailed transcript
of the upgrade procedure for details.

Maintenance Mode
----------------

During the installation of 6.0 Seed cloud the original 5.1.1 environment continues
to operate normally. Seed CICs don't interfere with the original CICs and the
latter could continue the operation through the initial stages of upgrade.

However, when it comes to the upgrade of state databases of OpenStack services, you
need to make sure that no changes are made to the state data. Disabling all
means for users to modify the state data is a Maintenance mode of the operation of
OpenStack cluster. Maintenance mode must be started before you download data
from the state database of 5.1.1 OpenStack environment. Maintenance mode should last
at least until the database upgrade is finished and 6.0 CICs take over the
environment.

Note that Maintenance mode implemented according to these instructions does not
impact operations of existing virtual server instances and other resources. It
only affects OpenStack API endpoints which are the only way for the end user to
change the state data of the cluster.

High availability architecture of Mirantis OpenStack provides access to all
OpenStack APIs at a single VIP address via HAProxy load balancer. You need to
configure HAProxy server to return code ``HTTP 503`` on all requests to services
listening on the Public VIP in 5.1.1 environment. This will not allow users to
change the state of virtual resources in the original cloud which can be lost after
the data downloaded from DB.

On 6.0 CICs, you must disable all OpenStack component services to make sure that
they don't write to the state database while it is being upgraded. Otherwise, this
might lead to data corruption and loss.

All the detailed commands used to put environments into Maintenance mode are listed
in the Upgrade Script chapter below.

Upgrade databases
-----------------

Database upgrade is a standard procedure provided by OpenStack upstream as a
main upgrade feature. It allows to convert data from state databases of all
OpenStack component services from a previous to a new release version schema. It is
necessary to fully preserve the status of the virtual resources provided by the cloud
through the upgrade procedure.

Data is dumped from MySQL database on one of the CIC nodes in 5.1.1 environment.
Text dump of the database is compressed and sent over to CIC node in 6.0
environment.

It is important to note that Mirantis OpenStack in High Availability mode runs 3
MySQL servers in a cluster under the management of Galera Synchronous Replication.
All write operations are executed through a single CIC, usually a 'primary'
controller. Primary controller is a special role recognized by Fuel installer.
This controller serves as an initial node in multiple clusters created in
Mirantis OpenStack environment for high availability purposes, including
Pacemaker cluster and Galera cluster.

It is essential that the operation of uploading data to MySQL in 6.0 environment was
executed on the primary controller. We also recommend that you disable Galera
replication to one of the secondary/ordinary controllers before uploading the
dump of data. Otherwise, uploading the dump will cause race system lock on
secondary servers when trying to drop the database before recreating it with the new
scheme, and the upload will hang indefinitely. After the migration of database, you must
restore Galera replication.

After uploading data to MySQL on 6.0 CIC, use standard OpenStack methods to
upgrade the database schema to the new release. Specific commands that upgrade
schema for particular components of the platform are listed in the Upgrade Script
chapter below.

Configure Ceph Monitors
-----------------------

Architecture constraints for the upgrade procedure define that in the upgradeable
configuration Ceph is used for all types of storage in the OpenStack platform:
ephemeral storage, permanent storage, object storage and Glance image store.
Ceph Monitors are essential for the Ceph cluster and must be upgraded seamlessly
and transparently.

By default, Fuel installer creates new Ceph cluster in 6.0 Seed environment. You
need to copy the configuration of the cluster from 5.1.1 environment to override
the default configuration. This will allow OSD nodes from 5.1.1 environment to switch
to the new Monitors when 6.0 CICs take over the control plane of the upgraded
environment.

Specific commands to copy and update Ceph Monitors configuration are listed
below in the Upgrade Script chapter.

Upgrade CICs
------------

This step is called 'Upgrade', as it concludes with a new set of CICs of version
6.0 listening on the same set of IP addresses as the original 5.1.1 CICs. However,
from the technical standpoint it is more a replacement than an upgrade. 6.0 CICs
take over the IP addresses of 5.1.1 CICs, while the original CICs are disconnected
from all networks except Admin. The sections that follow explain what happens and why
at every stage of the replacement/upgrade process.

Start OpenStack services on 6.0 CICs
++++++++++++++++++++++++++++++++++++

As a part of Maintenance mode, OpenStack component services were shut down on
6.0 CICs before upgrading the database. Those services include Nova, Glance,
Keystone, Neutron and Cinder. Now it is time to restore them with a new data set
created by the database migration procedure. This operation basically reverts
the shutdown operation described above. The exact commands required to start all
services are listed in the Upgrade Script chapter.

Note that Neutron restart involves creation of Private networking infrastructure
on CIC nodes where Neutron agents run. This process can take longer than
starting all other services, so check it carefully before you proceed with
the upgrade.

Delete ports on 5.1.1 CICs
++++++++++++++++++++++++++

Before 6.0 CICs can take over the network addresses in the target upgrade environment,
you need to disconnect 5.1.1 CICs to release those addresses. Based on the CICs
networking schema described above, to do that you need to delete patch ports
from certain OVS bridges.

To disconnect from Management network, you must delete patch port from bridge
``br-mgmt``. To disconnect from Public network, delete patch port from bridge
``br-ex``, and so on. A complete list of commands that delete all necessary ports
from 5.1.1 CICs is in the Upgrade Script chapter below.

Reconnect 6.0 CICs
++++++++++++++++++

After 5.1.1 CICs are disconnected from all networks in the environment, 6.0 CICs
can take over their former IP addresses, including VIP and individual addresses
of controllers. The take-over procedure has two steps. First, GRE ports are deleted
from OVS bridges on 6.0 CIC nodes. Immediately after that, new patch ports are
created to connect logical ports to the physical network segment. You need to use
original deployment information for the 6.0 Seed environment to properly match
logical and physical ports.

Update 'nova-compute' package on 5.1.1 Compute nodes
----------------------------------------------------

One of the main non-functional requirements to the upgrade procedure is to minimize
the impact of the upgrade on the virtual resources, in the first place, virtual servers.
The impact includes downtime of the virtual machine itself, up to the interruption of
the virtualization process (i.e. qemu-kvm process) and network disconnection time
due to the upgrade of the networking data and/or control plane software.

Downtime of virtualization process occurs when a VM is shut down due to reboot of
hypervisor host as a part of an upgrade of operating system. To avoid this, you
could leverage live migration over the shared storage (Ceph). However, live
migration between 2014.1 and 2014.2 versions of OpenStack is explicitly disabled
by patch `<https://review.openstack.org/#/c/91722/>`_.

This issue can be resolved by upgrading the 'nova-compute' package to 2014.2 release
without upgrading data-plane software, i.e. hypervisor kernel and operating
system packages. Upgrade of Nova Compute involves an upgrade of its dependencies,
including Neutron L2 agent. After the upgrade, the services are restarted and
reconnected to new 6.0 CICs.

Note that the in-place upgrade of control plane services does not impact workloads,
but the restart of Neutron L2 agent disrupts network connectivity of VMs for a
relatively short period of time. This disruption can be minimized by adding the
'soft restart' capability to Neutron L2 OVS agent, which reloads the agent
without resetting OVS settings managed by it.

Installation of new versions of OpenStack packages without re-installing the
whole operating system leaves the hypervisor host in the 'unclear' state from the
standpoint of the Mirantis OpenStack versioning system. This is acceptable for a
short period of time while rolling an upgrade of hypervisor hosts in going.

Upgrade hypervisor host
-----------------------

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
node before you start upgrading it. You can do that since Compute node's control
plane is upgraded to 6.0.

The redeployment process itself is straightforward. You need to save the
disks/interfaces configuration of the node to ensure that the partitions with Ceph
data (if any) will be preserved through the upgrade and network connections will
go through the right interfaces. Then you must remove the node picked for the upgrade
from the original 5.1.1 environment and add it to 6.0 Seed environment. It is
important to set the same roles for the node in 6.0 environment as it had in the
5.1.1 environment.

When a node is added to the upgraded environment, you have to upload the stored node
disks and interfaces settings and provision the node. When the provisioning
finished, update the IP addresses in the deployment settings, upload them and run
the deployment of the node. As a result of the deployment, the node will be added to the
environment as a fully capable MOS 6.0 Compute node.

Upgrade of a single Compute node must be repeated for all the nodes of 5.1.1 environment in
a rolling fashion. VMs must be gradually moved from the remaining 5.1.1 Compute nodes
to the 6.0 ones with live migration.

Upgrade Ceph OSD node
---------------------

In a Ceph cluster all data is stored on OSD nodes. These nodes have 1 or more
storage devices (or disk partitions) dedicated to Ceph data and run ceph-osd
daemon that is responsible for I/O operations on Ceph data.

Upgrading OSD node via Fuel means that the node must be redeployed. Per
requirement to minimize end-user impact and the move of data across the OpenStack
cluster being upgraded, we developed a procedure to redeploy Ceph OSD nodes with
the original data set. Although Fuel by default erases all data from disks of
the node it deploys, you can patch and configure the installer to keep Ceph data
on the devices intact.

There are several stages of the deployment when data is erased from all disks in
the Ceph OSD node. First, when you delete Ceph node, Nailgun agent on that node
does the erasing on all non-removable disks by writing 0s to the first 10MB of every disk.
Then, at the provisioning stage, Ubuntu installer creates partitions on disks and
formats them according to the disks configuration provided by Fuel orchestration
components.

As a part of the upgrade procedure, we provide patches for components involved in
volumes management that allow to keep data on the specified partitions or devices.
Detailed description of those patches and how to apply them is in the
Upgrade Script section below.

Disable rebalance
+++++++++++++++++

By default, Ceph initiates rebalance of data when OSD node goes down.
Rebalancing means that the data of replicas is moved between the remaining nodes, which
takes significant time and impacts end user's virtual machines and workloads. We
disable the rebalance and recalculation of CRUSH maps when OSD node goes down. When a
node is reinstalled, OSD connects to Ceph cluster with the original data set.

Finalizing the upgrade
----------------------

When all nodes are reassigned to 6.0 environment and upgraded, it is time to
finalize the upgrade procedure with a few steps that allow Fuel installer to
manage with the upgraded environment just as with vanilla 6.0 environment, installed
from scratch:

* revert all patches applied to Fuel components;
* delete the original environment to extract the last ceph-osd node;
* make permanent changes to the addresses of the environment (CICs and VIPs) in Nailgun
  DB.

