Dictionary of terms used in this document
=========================================

Ceilometer
----------
Ceilometer collects measurements for monitoring and metering within OpenStack;
the framework can be expanded to collect measurements for other needs.
See the `Ceilometer wiki <https://wiki.openstack.org/wiki/Ceilometer>`_
for more information.

Fuel can optionally deploy Ceilometer on any supported environment.
See `Ceilometer deployment notes <http://docs.mirantis.com/fuel/fuel-4.0/user-guide.html#ceilometer-deployment-notes>`_
for more information.

Ceph
----
An open source storage platform
that provides unified object, block, and file storage.
For more information, see the
`Ceph documentation <http://ceph.com/docs/master/>`_.
Ceph is supported and promoted by
`Inktank <http://www.inktank.com>`_.

For information about deploying Ceph in Mirantis OpenStack,
see `Storage Architecture <http://docs.mirantis.com/fuel/fuel-4.0/reference-architecture.html#storage-architecture>`_.

Cinder
------
Cinder is the code name for the OpenStack Block Storage project.
Cinder was originally part of the Nova project
but is now an independent core OpenStack project.
For more information, see the
`Cinder developer documentation <http://docs.openstack.org/developer/cinder/>`_.

Cinder can be deployed on its own OpenStack storage node
(often called a "Cinder node")
or can share a Controller node.
For information about deploying Cinder in Mirantis OpenStack,
see `Storage Architecture <http://docs.mirantis.com/fuel/fuel-4.0/reference-architecture.html#storage-architecture>`_.

Corosync
--------
The Corosync Cluster Engine is a Group Communication System
with additional features for implementing high availability within applications.
See the `Corosync home page <http://corosync.github.io/corosync/>`_
for more information.
For a good discussion about Pacemaker and Corosync
and how they are related, see
`What is Pacemaker? <http://clusterlabs.org/doc/en-US/Pacemaker/1.1/html-single/Clusters_from_Scratch/#_what_is_pacemaker>`_.

Mirantis OpenStack uses Corosync with the Pacemaker cluster resource manager
as the communication and quorum service; see
`How HA with Pacemaker and Corosync Works <http://docs.mirantis.com/fuel/fuel-4.0/frequently-asked-questions.html#how-ha-with-pacemaker-and-corosync-works>`_
for technical details about this implementation;
the preceeding section of that documentation tells how to recover
when Corosync's networking protocol (Totem) times out.

DevStack
--------
An OpenStack package that can be installed and deployed on your laptop
or inside a VM on a cloud or other machine for evaluation purposes.
DevStack runs in a virtual machine so does not give the same performance
as OpenStack running on dedicated hardware
and it only runs a single node.
See the `DevStack web page <http://devstack.org/>`_
for installation instructions.

Fuel is a more powerful tool that supports a virtualized deployment
including multiple controllers and support for HA.
Fuel can also be used to deploy a bare-metal cloud
installed on bare metal and appropriate for a production environment.

Fencing
-------
Process of locking resources away from a node whose status is uncertain.
Ceph supports fencing but you must ensure
that no controllers host both the Ceph OSD and Ceph Mon roles.

Fuel Master Node
----------------
A server with the Mirantis Fuel application installed,
also commonly referred to as the Fuel server.
The Fuel Master node runs on its own server or VM
to deploy and manage OpenStack environments.
It assigns IP addresses to the OpenStack nodes,
performs PXE boot and initial configuration,
and provisions the nodes according to their roles in the environment.

Galera Cluster for MySQL
------------------------
Galera is a synchronous multi-master cluster
for the MySQL database.
Mirantis OpenStack uses MySQL/Galeria for HA deployments;
see the `FAQ <http://docs.mirantis.com/fuel/fuel-4.0/frequently-asked-questions.html#other-questions>`_
for more information.

Havana
------
Code name for the eighth release of the OpenStack software.
For more information, see the
`Havana web site <http://www.openstack.org/software/havana/>`_.
Mirantis OpenStack version 4.x and Fuel 4.x incorporate and support
the Havana code base
except for the following features:
The following improvements in Havana are not supported directly by Fuel 4.x
although they are included in Mirantis OpenStack 4.x:

* Nova Compute: Cells, Availability zones, Host aggregates
* Neutron (formerly Quantum): Load Balancer as a Service (LBaaS),
  Multiple L3 and DHCP agents per cloud
* Keystone: Multi-factor authentication, PKI authentication
* Swift: Regions, Adjustable replica count, Cross-project ACLs
* Cinder: Cinder-backup service, Support for Fibre Channel over Ethernet (FCoE),
  Support for linux-iscsi.org (LIO)
  as an Internet Small Computer System Interface (iSCSI) backend

Heat
----
Main project in the OpenStack Orchestration program.
Heat uses a template that humans can read and write
and that can be maintained under source code control.
See the `Heat wiki <https://wiki.openstack.org/wiki/Heat>`_
for more information.

Mirantis OpenStack 4.0 and later includes
integrates the Heat project.
Fuel automatically deploys Heat into each environment.
See `Heat Deployment Notes <http://docs.mirantis.com/fuel/fuel-4.0/user-guide.html#heat-deployment-notes>`_
for more information.

Hypervisor
----------
A hypervisor creates and runs virtual machines.
OpenStack runs a hypervisor as a component of the compute node.
You can select the KVM or QEMU hypervisor from the Fuel UI;
other hypervisors are available through
`Mirantis Services <http://www.mirantis.com/openstack-services>`_.
See the `HypervisorSupportMatrix <https://wiki.openstack.org/wiki/HypervisorSupportMatrix>`_
web page for information about the status of other hypervisors for OpenStack.

Ironic
------
Ironic is an API to manage and provision physical machines;
it is currently an incubated project that is forked from and will replace
the Nova "baremetal" driver used in the Grizzly and Havana releases.
See the `Ironic wiki page <https://wiki.openstack.org/wiki/Ironic>`_.

Mirantis OpenStack
------------------
Hardened OpenStack distribution plus additional services
for high availability deployed by Fuel.
Fuel deploys Mirantis OpenStack with an operating system
based on either the Ubuntu or CentOS Linux distro.

Murano
------
Project that enables OpenStack to run on a Windows virtual machine.
It supports Availability Zones, Disaster Recovery scenarios,
and uses native Microsoft Windows features to provide HA solutions.
See the `Murano wiki <https://wiki.openstack.org/wiki/Murano>`_.

Fuel can deploy a Dashboard, the Murano API,
the Conductor orchestration engine, and a Metadata Repository
on top of the Windows components that the customer
installs and deploys natively without using Fuel.
See `Murano Deployment Notes <http://docs.mirantis.com/fuel/fuel-4.0/user-guide.html#murano-deployment-notes>`_
for more information about deploying Murano with Fuel.

MySQL
------
The database most frequently used in OpenStack deployments.
The MySQL database runs on the controller node;
MySQL client software must be installed on other nodes
that access the MySQL database.

For HA deployments,
Mirantis OpenStack uses Pacemaker/Corosync
to provide redundancy and failover capabilities
for MySQL.
Mirantis OpenStack uses MySQL/Galera for database replication
in HA deployments that use the CentOS or Ubuntu kernel;
see `Preparing MySQL for Pacemaker high availability <http://docs.openstack.org/trunk/openstack-ops/content/security_groups.html>`_.

Native VLAN
-----------
An untagged VLAN on a tagged port.

Nailgun server
--------------
Nailgun is the configuration and management service
used as the backend for the Fuel UI.

Note that Nailgun in Fuel
is not in any way related to the Nailgun that provides
a JVM in which Java programs can be run without incurring
the standard JVM startup overhead.

Neutron (Quantum)
-----------------
OpenStack Core project to provide networking as a service
between interface devices such as vNICS
that are managed by other OpenStack services such as Nova.
See the `Neutron web page <https://wiki.openstack.org/wiki/Neutron>`_
for more information.

Mirantis OpenStack includes Neutron;
see `Neutron Deployment <http://docs.mirantis.com/fuel/fuel-4.0/pre-install-guide.html#neutron>`_
for a description of the recommended network configuration parameters
for using the Neutron service.

NIC (Network Interface Card)
----------------------------
This usually refers to the physical Ethernet port
and the hardware used for networking
although in a virtualized deployment,
it can also refer to the software interfaces
between virtual machines.
Configuring the NICS correctly is one of the more challenging tasks
in deploying OpenStack.
The following documents provide information:

* For a list of the types of networks used in OpenStack
  (Public, Storage, Administrative, and so forth), see
  `Network Configuration Options <http://docs.mirantis.com/fuel/fuel-4.0/pre-install-guide.html#network-configuration-options>`_

* For diagrams, detailed discussions, and instructions for deploying
  the different networking models, see
  `Network Deployment Models <http://docs.mirantis.com/fuel/fuel-4.0/pre-install-guide.html#network-deployment-models>`_,
  `Understanding and Configuring the Network <http://docs.mirantis.com/fuel/fuel-4.0/install-guide.html#understanding-and-configuring-the-network>`_, and
  `Fuel Deployment Schema <http://docs.mirantis.com/fuel/fuel-4.0/install-guide.html#fuel-deployment-schema>`_

* For information about calculating the hardware required for your deployment, see
  `Calculating Network <http://docs.mirantis.com/fuel/fuel-4.0/install-guide.html#calculating-network>`_.

* `Installing Fuel Master Node <http://docs.mirantis.com/fuel/fuel-4.0/install-guide.html#installing-fuel-master-node>`_
  includes instructions for changing network parameters
  during and after installation.

* `Advanced Network Configuration Using VSwitch <http://docs.mirantis.com/fuel/fuel-4.0/reference-architecture.html#advanced-network-configuration-using-open-vswitch>`_
  describes Open VSwitch and includes instructions for adjusting the network configuration
  by editing configuration files and using the command-line tools.

* `Network Architecture <http://docs.mirantis.com/fuel/fuel-4.0/reference-architecture.html#network-architecture>`_

Node
-----------
A server or VM that provides specific functionality
within an OpenStack environment.
For example, Fuel deploys Controller nodes, Compute nodes,
and Storage nodes.

Nova
----
OpenStack Core project used for compute nodes;
all major Nova components can be run on multiple servers
and use message queues for communication between components.
See the `Nova web page <http://docs.openstack.org/developer/nova/>`_
for more information.

Mirantis OpenStack includes the Nova-network deployment model
which offers the FlatDHCPManager and VLAN Manager options
for deploying private networks for tenants;
see `Nova-network Deployment Model <http://docs.mirantis.com/fuel/fuel-4.0/pre-install-guide.html#nova-network>`_
for more information about using Nova-network in Mirantis OpenStack.

The Baremetal driver used for provisioning in Nova
has recently been forked into its own project; see "Ironic".

Object Storage technology
-------------------------
Provides a fully distributed, API-accessible storage platform
that can be integraed directly into applications
or used for backup, archiving, and data retention.
This is not a traditional file system
but rather a distributed storage system for static data
such as virtual machine images, photo storage, email storage,
backups, and archives.
Objects and files are written to multiple disk drives
spread across different servers in the data center;
the OpenStack software ensures data replication and integrity
across the cluster.

OpenStack
---------
Open source software that can be used
to deliver a massively scalable cloud operating system
for private and public clouds.
For more information, see the
`OpenStack web page <http://www.openstack.org/>`_ and
`OpenStack documentation <http://docs.openstack.org/>`_.

The Mirantis OpenStack distribution packages
a stable version of the open source pieces
into an installable package that deploys an operating system
based on either Ubuntu or CentOS.
and adds Fuel to simplify the deployment and management tasks.

OVS (Open vSwitch)
------------------
Multilayer virtual switch that the Neutron networking model uses
to create a felxible network setup and to isolate tenants from each other on L2 and L3 layers.
You can do some basic configuration of OVS on the Fuel UI beginning with Fuel 4.1;
additional customization can be done
by editing configuration files and using the command-line tools; see
`Advanced Network Configuration Using VSwitch <http://docs.mirantis.com/fuel/fuel-4.0/reference-architecture.html#advanced-network-configuration-using-open-vswitch>`_.

Pacemaker
---------
Master control process for OpenStack High Availability deployments.
Pacemaker is part of the Corosync services and is not specific to OpenStack.

See:

*  `What is Pacemaker? <http://clusterlabs.org/doc/en-US/Pacemaker/1.1/html-single/Clusters_from_Scratch/#_what_is_pacemaker>`_
   for a good discussion about Pacemaker and Corosync and how they are related.
*  `The Pacemaker Cluster Stack <http://docs.openstack.org/high-availability-guide/content/ch-pacemaker.html>`_
   discusses how Pacemaker is used with OpenStack.
*  `Pacemaker web page <http://clusterlabs.org/doc/>`_
   contains more in-depth information about Pacemaker.

Fuel uses Pacemaker to implement its Multi-Node-HA deployment.

Puppet
------
Puppet modules bring scalable and reliable IT automation
to OpenStack cloud deployments.
See the `Puppet web page <http://puppetlabs.com/solutions/cloud-automation/compute/openstack>`_ for more details.

Fuel uses Puppet as the configuration management system
that compiles a set of instructions
for a configurable, reproducible, and sharable installation process.
In Fuel 4.0 and later, the Puppet modules and manifests are synchronized
between the master nodes and the managed nodes, then applied locally.
This solves the security signing, scalability, and performance issues
encountered on earlier releases where the Puppet Master Node ran on the Fuel Node Master.

Passing custom attributes can be helpful when you have some Puppet manifests that should be run
but are not supported by Fuel itself.  see
`Passing Custom Attributes from Fuel to Puppet <http://docs.mirantis.com/fuel/fuel-4.0/user-guide.html#passing-custom-attributes-from-fuel-to-puppet>`_.

QEMU
----
One of the hypervisors that can be selected from the Fuel UI.

Security groups
---------------
Sets of IP filter rules that are applied to an instance's networking.
Most projects provide a "default" security group
that is applied to instances that have no security group defined.
See the `Security groups web page <http://docs.openstack.org/trunk/openstack-ops/content/security_groups.html>`_
for more information.

Note that Savanna does does not provide a default security group.
See this `note in <https://review.openstack.org/#/c/71299/>`_
for information about defining a default security group for Savanna).

STP
---
Spanning Tree Protocol

Tagged port
-----------
802.1q frames from a switch to a server network card.

