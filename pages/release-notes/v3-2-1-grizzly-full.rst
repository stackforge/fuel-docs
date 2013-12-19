.. index:: Release Notes: Fuel 3.2.1

.. _RelNotes_3.2.1:


Release Notes for Mirantis OpenStack version 3.2.1
==================================================


Mirantis, Inc. is releasing version 3.2.1 of Mirantis OpenStack. This version 
is a maintenance release to Mirantis OpenStack 3.2 and contains defect fixes 
and several resolutions for issues initially reported against version 3.2 or 
previous releases. You do not need to install version 3.2 prior to installing 
3.2.1 because the 3.2.1 release includes version 3.2.

These release notes supplement the product documentation and list enhancements, 
resolved issues, and known issues in this version. 

.. contents:: :local:
  :depth: 1
  :backlinks: none


What is Mirantis OpenStack?
---------------------------

Mirantis OpenStack is made up of three components:

* Fuel for OpenStack
* Mirantis OpenStack hardened packages
* Mirantis Support

Fuel for OpenStack
^^^^^^^^^^^^^^^^^^
Fuel is a lifecycle management application that deploys multiple OpenStack 
clouds from a single interface and then enables you to manage those clouds post 
deployment. You can add nodes, remove nodes, or even remove clouds, restoring 
those resources to the available resources pool. Fuel also eases the 
complexities of network and storage configurations through a simple-to-use 
graphical user experience. Baked into Fuel are:

* Mirantis reference architectures that we’ve tested and certified to ensure that your deployed clouds are scalable, reliable, and production quality. 
* An open and flexible library that enables customers to make configuration changes that may be more advanced or focused than the default choices within Fuel. This library also empowers organizations to fold additional drivers or integrations into the deployed environment.

Mirantis OpenStack hardened packages
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
These packages include the core OpenStack projects, updated with each stable 
release of OpenStack. Also included are: 

* Packages to ensure High Availability.
* Any defect fixes reported by our customers that may not yet have been merged into the community source.
* Mirantis-driven premium OpenStack projects (for example, Savanna and Murano).
* Mirantis-certified partner plug-ins, drivers, and integrations.

Another benefit you get from Mirantis OpenStack compared with some competitors 
is our broad support for operating systems, hypervisors, and deployment 
topologies. We don’t restrict your choices to one OS or one hypervisor type. In 
addition, you can choose the OpenStack roles you want on each available node.

Mirantis Support
^^^^^^^^^^^^^^^^
Further, Mirantis OpenStack offers a subscription to our world-class support 
with defined service level agreements based on the severity of your issue. For 
example, the premium support guarantees a one-hour response for severity 1 
issues.

New Features in Mirantis OpenStack 3.2.x
----------------------------------------

Following is a list of features that are new in version 3.2.x:

* Expanded choice of Ubuntu, CentOS, or Red Hat Enterprise Linux as the host operating system
* Mirantis OpenStack hardened packages synchronized with the latest stable OpenStack Grizzly maintenance release
* A guided deployment wizard to simplify the environment configuration
* Ability to combine multiple roles onto a single node for hardware consolidation
* Inclusion of Inktank’s Ceph software-defined storage system in the hardened packages and the ability to deploy Ceph via Fuel
* Neutron (Quantum) as a deployment choice from the Fuel UI
* Inclusion of OpenStack Savanna and Murano projects in the hardened packages and the ability to deploy them via Fuel
* A published API in Fuel for Create, Read, Update and Delete (CRUD) operations
* New High Availability tests added to OpenStack Health Check
* Ability to register Fuel from within the UI
* A new extended configuration menu available during the Fuel Master Node install, enabling you to change the network settings
* Pre-deployment check for conflicting DHCP servers on the network
* Expansion of log management to include OpenStack configuration files
* Reporting of node usage and assigned roles
* Increased security with dynamic and unique SSH keys for VM migration

Expanded choice of Ubuntu, CentOS, or Red Hat Enterprise Linux as the host operating system
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Fuel 3.2 has added support for deploying the Mirantis OpenStack hardened 
packages on Ubuntu 12.04 as the host operating system for the OpenStack nodes. 
The Ubuntu 12.04 operating system is included in the ISO for Mirantis 
OpenStack, so you can select Ubuntu from the Releases window and deploy 
without requiring Internet access or downloading additional software. This 
expands your choices for deployment to Centos with Mirantis OpenStack 
hardened packages, Red Hat Enterprise Linux with Red Hat OpenStack, or 
Ubuntu with Mirantis OpenStack hardened packages. 

Mirantis OpenStack hardened packages synchronized with the latest stable OpenStack Grizzly maintenance release
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The OpenStack core projects in the Mirantis OpenStack hardened packages have been 
synchronized with the `OpenStack Grizzly 2013.1.4 bug fix update <https://wiki.openstack.org/wiki/ReleaseNotes/2013.1.4>`_.  Fuel 3.2.x will deploy 
this 2013.1.4 version of Grizzly when deploying an OpenStack environment on CentOS 
or Ubuntu. For Red Hat Enterprise Linux OpenStack Platform (RHEL-OSP), Fuel will 
deploy RHEL-OSP version 3.0.

A guided deployment wizard to simplify environmental configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
New in Fuel 3.2 is a guided deployment wizard that will walk you through the major 
decisions regarding your desired OpenStack configuration prior to deployment. This 
wizard will enable you to select:

* The operating system and distribution combination.
* Reference architecture.
* Hypervisor.
* Networking service.
* Storage backend for Cinder.
* Storage backend for Glance.
* Installation of Savanna premium project (Hadoop for OpenStack).
* Installation of Murano premium project (Application Catalog for OpenStack).

You can review and change your decisions about the hypervisor, network, storage 
backends, and premium project installation in the Settings tab prior to 
deployment.

   NOTE: If you wish to change your choices of the OS, distribution, network 
   service, or reference architecture, you will need to delete your proposed 
   environment and restart the wizard.  

Ability to combine multiple roles onto a single node for hardware consolidation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
To provide additional flexibility and options during the deployment of your 
OpenStack environment, Fuel 3.2 now enables certain roles to be combined 
together onto a single node. For example, Cinder could previously only be 
deployed as a standalone node from the Fuel UI. Now, Cinder can be combined 
with a Controller or Compute node, or Ceph can be combined with a Controller 
or Compute node.

To make this process even easier, we’ve added the ability to assign the same 
roles to multiple nodes in a single operation. Just select the unallocated 
nodes that will share a common role, choose the role, and then apply. You can 
also group nodes by similar hardware types, allowing you to select in a single 
click all of the nodes of a particular hardware configuration for a role 
assignment.

You can review the nodes and the roles assigned to those nodes by grouping 
them in a similar manner -- either by roles or by hardware configuration.

In addition to the role assignment, you can also configure the network 
interfaces or modify the disk configuration for a set of nodes from the 
Fuel UI. Once you’ve selected one or more allocated nodes, the "Configure 
Disks" and "Configure Interfaces" buttons will become active if the nodes 
you’ve selected share a similar disk configuration or the number and type 
of network interfaces.

Inclusion of Inktank’s Ceph software-defined storage system in the hardened packages and the ability to deploy Ceph via Fuel
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The Mirantis OpenStack hardened packages now include Inktank’s Ceph 
software-defined storage system. Ceph can be used either as an object storage 
option for Glance or as a block storage option for Cinder. As you define an 
OpenStack environment through the Fuel UI, you may choose to use Ceph for 
one, both, or neither of these functions. In addition, you may choose where 
to install the Ceph roles--either as a standalone node or combined with a 
Controller or Compute node.

Neutron (Quantum) as a deployment choice from the Fuel UI
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Fuel’s previous versions enabled deploying Neutron (Quantum) through the Fuel 
CLI Library. Fuel 3.2 now enables you to deploy Neutron as an OpenStack 
network component from the UI. The deployment wizard allows Neutron to be 
configured to use the Generic Routing Encapsulation (GRE) segmentation or 
VLAN segmentation. Additional settings can be configured through the Network 
settings tab prior to deploying the OpenStack environment.

Inclusion of OpenStack Savanna and Murano projects in the hardened packages and the ability to deploy them via Fuel
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Savanna and Murano are related OpenStack projects initially led by Mirantis. 
Savanna enables on-demand provisioning of Hadoop clusters that can run on top 
of OpenStack. Savanna includes support for many different distributions of 
Hadoop including Hortonworks, Cloudera, and even Intel. This empowers Big 
Data solutions to take full advantage of the elastic nature of OpenStack. 
Savanna is currently a project that’s in incubation, but we’re confident 
that it will become a full project in OpenStack in a future release of 
OpenStack.

Murano enables Windows-based services to be deployed on top of OpenStack. 
These datacenter services include Active Directory, IIS, Microsoft SQL, 
and ASP.NET. Thanks to Murano, companies can provide developers or end 
users with Windows-based services that they either depend on or need to 
use as a tool for transitioning from legacy dependencies to open source 
or other offerings.

Both of these projects are now included in the Mirantis OpenStack packages 
and can be configured for deployment on top of OpenStack through Fuel. 
The initial configuration may be performed through the Fuel UI. Because 
Savanna and Murano are also integrated into Horizon, further configuration 
may be done natively from the OpenStack Dashboard.

In addition to the ability to deploy Savanna or Murano, new tests have been 
added to the OpenStack Health Check to confirm the successful deployment 
and operational readiness of Savanna and Murano.

A published API in Fuel for create, read, update, and delete (CRUD) operations
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The API originally created between the Fuel UI and Fuel CLI Library is now 
public and available in Fuel 3.2. This RESTful API enables auxiliary 
applications to activate standard create, read, update, and delete (CRUD) 
operations to manage your cloud infrastructure through Fuel. Using Fuel, 
you could, for example, create a cloud on demand, remove a cloud that was 
no longer needed, or add and remove nodes from an existing cloud. This 
could be done either from a self-service portal or by your cloud 
operations staff. In addition to cloud deployment operations, you can also 
run health checks on demand or collect log information for troubleshooting. 
Details on commands that can be executed through the API can be found in the 
`extended documentation <http://docs.mirantis.com/fuel-dev/develop/api_doc.html>`_.

New High Availability tests added to the OpenStack Health Check
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
To confirm that a highly available deployment is configured properly and 
running as expected, an additional test module is available as part of the 
OpenStack Health Check within Fuel. This group of tests can be run 
separately or along with the other post-deployment health checks and can be 
activated via the API for an automated High Availability confirmation.

Ability to register Fuel from within the UI
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
To ensure that self-evaluating customers get the support they need when they 
need it, the Support window of the Fuel UI now contains an option that 
enables users to register Fuel once it has been installed. This 
registration activates a 30-day complimentary basic subscription support, 
enabling evaluation customers to contact Mirantis’ world-class support via 
the `Mirantis support portal <https://mirantis.zendesk.com/home>`_ with 
questions or issues. 

A new extended configuration menu available during the Fuel Master Node install, enabling you to change the network settings
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Advanced customers deploying the Fuel Master Node into their own network 
setups with unique network parameters may need to specify a broader set of 
network settings (for example, interfaces to use for PXE booting, IP 
address ranges, network masks, and so on). Incorrect settings could result 
in permanent problems that are not easily corrected later. To ensure that 
these critical parameters are set appropriately for the Fuel Master Node, a 
fully featured configuration menu is now available during the Fuel Master 
Node installation. 

To access this advanced menu, you may choose to press any key when prompted 
during the first boot of the Fuel Master Node. If you don’t press the key, 
the installation will continue automatically and apply the default parameter 
values. If activated, the advanced menu allows you to configure the managed 
network, network interfaces, DNS settings, and access to the operating system 
through a shell login. The installation continues after you save the 
parameters. 

Pre-deployment check for conflicting DHCP servers in network
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
To ensure your network is configured properly, the "Verify Networks" option in 
the *Networks* tab has been enhanced to check for conflicting DHCP servers. 
Since the Fuel Master Node acts as a DHCP and a PXE Boot Server for available 
nodes, a conflict would cause the deployment to fail.

Expansion of log management to include OpenStack configuration files
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Fuel now optionally collects the OpenStack configuration files when the logs 
from remote nodes are collected onto the Fuel Master Node. This feature is 
activated by choosing the "OpenStack debug logging" option from the 
*Settings* tab. If selected, the additional files will be downloaded when you 
initiate this collection from the "Diagnostic Snapshot" button located on the 
Support screen of the Fuel UI.

Reporting of node usage and assigned roles
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
To better manage your resources and assist with capacity planning, Fuel now 
tracks your node usage across all of your deployed clouds and makes that 
information available in a single report. This report can be launched from 
the Fuel UI or accessed as a CSV-formatted file on the Fuel Master Node. The 
report indicates the following:

* The environment names of the deployed clouds
* The node count for each cloud
* The total number of deployed nodes across all clouds
* The total number of discovered, unallocated nodes
* The number of nodes for each (combined) role configuration

Increased security with dynamic and unique SSH keys for VM Migration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
In the previous versions of Fuel, SSH keys were hard-coded and non-unique 
for services using SSH as a communication protocol for VM migration and 
MySQL replication. In Mirantis OpenStack 3.2, unique SSH keys are generated 
per managed environment when that environment is deployed.

Additional improvements in Mirantis OpenStack 3.2.1
---------------------------------------------------

Public IP ranges can now be set in Neutron network manager
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The ability to set up an explicit list of public IP addresses allows users 
to incorporate an OpenStack cloud into an existing network segment.

Issues Resolved First in Mirantis OpenStack 3.2
-----------------------------------------------

Fuel doesn't work when the configured DHCP interface is not eth0
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
In the previous releases, the Fuel Master Node was configured by default 
to use the eth0 interface for DHCP, and it was not easy to change this 
setting. The interface for DHCP can now be configured during the Fuel 
Master Node installation by utilizing the new extended configuration menu 
during the Fuel Master Node install for network settings.

OpenStack nodes won't boot if the boot order of the disks has changed
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Previously, after the deployment of an OpenStack node, if the boot order 
of the disks had been changed, the node would not have booted properly. 
This issue has been corrected in Mirantis OpenStack 3.2. 

Glance cache is not properly cleaned up after the deployment
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The cache for Glance is located at */var/lib/glance/image-cache* by default. 
In the simple deployment mode, Fuel creates a special Logical Volume Manager 
(LVM) for */var/lib/glance*, to serve as a place for images 
(*/var/lib/glance/images*) and *image-cache*. Previously, this area was not 
cleaned up after the deployment, so the initial image size would take twice 
the required amount of space. 

In the case of High Availability situations, Swift is used for storage but 
the cache is still in */var/lib/glance/image-cache*. In this case, the LVM 
is not installed (because Swift is used instead) so the image cache is 
written to the root partition. Since the root partition is very small, it 
fills up quickly. In Mirantis OpenStack 3.2, these storage areas are 
properly cleaned up.

KVM or QEMU hypervisors crashed due to the incorrect disk cache mode
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
If the parameter cache had not been set to “none” in *libvirt.xml*, the 
hypervisors would have crashed when launched on a Compute node. To correct 
this issue, the parameter *disk_cachemodes* is now set to "file=writethrough" 
in *nova.conf*, which protects the hypervisor from crashing in this scenario.

Namespaces support in CentOS
^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Previously, deployments using CentOS as the host operating system did not 
have default support for network namespaces. In this release, CentOS 
deployments have network namespaces support built in through upstream 
fixes to the Linux kernel, which were contributed by Mirantis. This 
built-in support allows greater flexibility with Neutron configurations 
for tenant networks.

Issues Resolved in Mirantis OpenStack 3.2.1
-------------------------------------------

The following is a list of customer-facing issues resolved in Mirantis 
OpenStack 3.2.1. Click `here <https://launchpad.net/fuel/+milestone/3.2.1>`_ 
to get the full list of issues publicly reported against the the 3.2.1 version.

* OpenStack Health Checks can now be launched from the Fuel CLI
* Fuel uses Nova security groups even when deployed with Neutron/Quantum
* Wrong IP address assigned to nodes
* Health check platform tests have been fixed
* Red Hat deployment times out registering to an RHN Satellite Server
* High CPU load on Fuel Master node due to ``'mcollective_broadcast'`` exchange absence
* HA sustainability fixes
* Nova-compute service can't restart if at least one active instance exists on the Compute node
* Ubuntu NIC naming inconsistent with discovered interface names
* Ceph did not work with dedicated journal drives
* Horizon static files were missing on the second and subsequent controllers in HA mode
* Incorrect calculation of Glance cache size
* Untagged public network by default
* Ability to set external source of NTP synchronization for Fuel Master
* Provisioning issues on particular RAID controllers (such as Dell R620)
* Compute nodes do not have default gateway after the deployment

OpenStack Health Checks can now be launched from the Fuel CLI
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
In previous releases, the OpenStack Health Check tests could be launched from 
the Fuel UI or API. In Mirantis OpenStack 3.2.1, these tests can now be 
launched from the Fuel CLI as well. This enables the user to run sanity checks 
for a deployed environment from the command line.

Fuel uses Nova security groups even when deployed with Neutron/Quantum
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
In cases when Neutron was enabled, Nova used the Nova firewall provider 
instead of the Neutron security group provider. This issue is now resolved 
and Nova properly uses the Neutron security group provider.

Wrong IP address assigned to nodes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Due to Puppet’s threading operations using Nginx as a HTTP frontend, in 
some cases nodes were assigned wrong IP addresses. This bug was fixed by 
applying stricter logic to the Puppet functions parsing the data from the 
Puppet master.

Health Check platform tests have been fixed
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Mirantis OpenStack Health Check Platform tests were introduced in Mirantis 
OpenStack 3.2. They ensure that the platform-level services operate correctly 
after an OpenStack environment is deployed. Heat, Savanna, and Murano services 
are verified by platform tests. However, due to a bug, the tests occasionally 
did not work properly. The issue has been fixed in Mirantis OpenStack 3.2.1 
and the tests now work consistently.

Red Hat deployments time out while registering to an RHN Satellite Server
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Launchpad bug: https://bugs.launchpad.net/fuel/+bug/1257285

In cases where the DNS resolution would work but no Internet access to an RHN 
Satellite Server existed, a Red Hat deployment timed out while performing the 
satellite registration. This used to restrict an entire deployment from moving 
forward. Now, if connectivity fails, the error is logged, but the deployment 
proceeds.

High CPU load on the Fuel Master node due to ``'mcollective_broadcast'`` exchange absence
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Launchpad bug: https://bugs.launchpad.net/fuel/+bug/1252269

The master node installation previously would fail to create mcollective AMQP 
exchanges due to a race condition between the RabbitMQ service start and the 
exchange creation command immediately following. This issue has been fixed in 
Mirantis OpenStack 3.2.1.

HA sustainability fixes
^^^^^^^^^^^^^^^^^^^^^^^
Launchpad bugs: 
https://bugs.launchpad.net/fuel/+bug/1249426 
https://bugs.launchpad.net/fuel/+bug/1253099 

Several race conditions have been fixed in the HA mode for the Pacemaker 
services, which were introduced by incorrectly coding the Corosync Puppet 
libraries and the corresponding parts of services manifests, including 
“Illegal seek” and “Execution expired” errors. These race conditions have now 
been corrected.

Nova-compute service can't restart if at least one active instance exists on the Compute node
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Restarts of the nova-compute services failed in Neutron-enabled configurations 
due to the wrong file access rights for the Neutron rootwrap directory. This 
required additional steps to be done to make Compute nodes work after restarting 
the nova-compute services or rebooting the Compute node. This condition has 
been addressed and the nova-compute service can now restart even if an active 
instance exists on the Compute node.

Ubuntu NIC naming inconsistent with the discovered interface names
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Interface names were previously inconsistent due to the differences between the 
bootstrap image and Ubuntu kernels. These inconsistencies caused a failure in 
the deployment process. Explicit udev rules have been implemented so that 
provisioning may consistently identify interface names.

Ceph did not work with dedicated journal drives
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Previously, Ceph had been unable to work with dedicated journal drives. This 
issue has been fixed by moving the partitioning of Ceph drives to the 
provisioning stage.

Static files for Horizon were missing on the second and subsequent controllers in the HA mode
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
In the previous releases, the required static files for Horizon were not 
properly provisioned on the second and subsequent controllers when deployed 
in a High Availability reference architecture.  The Horizon static files are 
now explicitly generated on secondary controllers during deployment.

Incorrect calculation of Glance’s cache size
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The cache size for Glance was incorrectly limited during the deployment in 
previous releases.  Glance’s cache size is now set to 10% of /var/lib/glance 
disk capacity, but not below 5 GB.

Untagged public network by default
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The default settings for new clusters now use untagged networks by default. 
It allows to simplify access to VirtualBox installations.

Ability to set external sources of NTP synchronization for the Fuel Master
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
During the Fuel Master node installation, you can use the extended configuration 
menu to configure custom NTP upstream servers, which is useful for data centers 
without direct Internet access.

Provisioning issues on particular RAID controllers (such as Dell R620)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Some RAID controllers advertise underlying block devices with a size of zero, 
which were previously counted as real disks and erroneously were used for node 
provisioning. These zero-size block devices are now ignored during node 
provisioning.

Compute nodes do not have default gateway after the deployment
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
In some instances, Fuel did not properly set the default gateway for the Compute 
nodes. This issue has been fixed by setting up a correct interface activation 
order during the deployment phase.

Known Limitations in Mirantis OpenStack 3.2.x
---------------------------------------------

Support for OpenStack Grizzly
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The following improvements in Grizzly are not currently supported directly by 
Fuel:

* Nova Compute

 - Cells 

 - Availability zones

 - Host aggregates

* Neutron (formerly Quantum)

 - Load Balancer as a Service (LBaaS)

 - Multiple L3 and DHCP agents per cloud

* Keystone

 - Multi-factor authentication

 - PKI authentication

* Swift

 - Regions

 - Adjustable replica count

 - Cross-project ACLs

* Cinder

 - Support for Fibre Channel over Ethernet (FCoE)

 - Support for linux-iscsi.org (LIO) as an Internet Small Computer System Interface (iSCSI) backend

* Ceilometer

* Heat

These capabilities are being considered for the future releases of Mirantis OpenStack.

In addition, support for the High Availability of Neutron (Quantum) on RHEL 
is not available due to a limitation within the RHEL kernel. This issue is 
expected to be addressed by a patch to RHEL in late 2013. This issue does 
not affect the CentOS or Ubuntu distributions included in the Mirantis 
OpenStack hardened packages. 

Ability to add new nodes without redeployment
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
New compute and Cinder nodes can now be added to an existing OpenStack 
environment. However, at the moment, this capability cannot be used to 
deploy additional controller nodes in the High Availability mode.

Other limitations
^^^^^^^^^^^^^^^^^
* The Fuel Master Node is installed with CentOS as the host OS. While OpenStack nodes can be installed with Ubuntu, RHEL, or CentOS as the host OS, the Fuel Master Node is only supported on CentOS.
* When using the Fuel UI, the floating VLAN and public networks must use the same L2 network and L3 Subnet. In the UI, these two networks are locked together and can only run via the same physical interface on the server. This is due to a limitation in Neutron.
* Deployments done through the Fuel UI create all of the networks on all servers even if they are not required by a specific role (for example, a Cinder node will have VLANs created and addresses obtained from the public network).
* Some of OpenStack’s services listen to all of the interfaces, a situation that may be detected and reported by third-party scanning tools not provided by Mirantis. Please discuss this issue with your security administrator if it is a concern for your organization.
* Murano requires additional, manual configuration of the Samba share for the deployment of different Windows-based services such as IIS, ASP.NET, and SQL services because we can’t provide the applications packages under commercial licenses.
* The provided scripts that enable Fuel to be automatically installed on VirtualBox will create separate host interfaces. If a user associates logical networks to different physical interfaces on different nodes, that will lead to network connectivity issues between OpenStack components. Please check to see if this has happened prior to deployment by clicking on the *Verify Networks* button on the *Networks* tab.
* When configuring disks on nodes where Ubuntu has been selected as the host OS, the Base System partition is limited to the first disk and must be smaller or equal to the size of the first disk due to Ubuntu provisioning limitations.
* The *Verify Networks* button on the *Networks* tab allows you to check the network connectivity between nodes both before deployment and on an installed environment. However, this verification is not available on the environments deployed with Neutron.

Known Issues in Mirantis OpenStack 3.2.x
----------------------------------------

A node’s second role occasionally is not applied
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ 
Launchpad bug: https://bugs.launchpad.net/fuel/+bug/1256244 

In some cases, the installation of several roles on the deployed node 
completes with a READY status on all of the nodes, but the second role is 
not applied on some nodes. In this case, Puppet should be run again on the 
failed nodes by issuing ``'puppet agent -t'`` command. Otherwise, you can 
redeploy the whole cluster by deleting and deploying it again.

Issues with Neutron-enabled installations when using certain NIC models
Some drivers for legacy and virtual Ethernet adapters--for example, e1000, 
r8139 or vmxnet--may not work with Open vSwitch Neutron-enabled CentOS/RHEL 
installations. A workaround for this issue is is to use the VLAN splinters 
Open vSwitch flag, which can be enabled in the UI by checking the *VLAN 
splinters* checkbox on the *Settings* tab in your environment. However, this 
option introduces performance issues and is not recommended to be used with 
more than 256 VLANs for the Quantum VLAN mode.

Poor network performance in Neutron-enabled configurations for virtio-enabled VMs on CentOS and RHEL
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Currently, there is a regression introduced by the backporting of the Open 
vSwitch networking code into the CentOS/RHEL kernel, which affects the 
performance of virtual machines using the paravirtualized VirtIO network 
adapters. A known workaround is to disable Generic and TCP Segmentation Offload 
on the VMs by issuing the following commands::

  ethtool -K <iface_name> gso off
  ethtool -K <iface_name> tso off

File injection into VMs fails on CentOS
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
VM creation may fail, issuing the following error::

    ERROR: Error injecting data into image 
    5e9f173d-aa6f-4153-a41a-8f59c651651e (Error mounting 
    /var/lib/nova/instances/c0733320-0c11-48f9-863e-b7d54e8d0812/disk with 
    libguestfs (command failed: LC_ALL=C '/usr/libexec/qemu-kvm' -nographic 
    -help

    errno: No such file or directory

In this situation, nova service will fail to inject files into VM instances. 
This is due to a nova/qemu bug that may be related to an incorrect path, but 
the details of the failure have not yet been determined.

Launch instance test in Health Check sometimes fails in HA mode
Rarely, if an instance is launched from Horizon or Nova API, it launches 
correctly but the Health Check framework reports that it has failed to launch.

How to Obtain the Product
-------------------------

Mirantis OpenStack is distributed as a self-contained ISO that, once downloaded, 
does not require Internet access to provision OpenStack nodes, if you deploy it 
using the Mirantis OpenStack hardened packages. This ISO is available in the 
Mirantis OpenStack download section of the `Mirantis 
Portal <http://software.mirantis.com>`_. Here you will also find the Oracle 
VirtualBox scripts to enable quick and easy deployment of a multi-node 
OpenStack cloud for evaluation purposes.

Contacting Support
------------------

You can contact support online, through email, or by phone. Instructions on how 
to use any of these contact options can be found through `Mirantis Service 
Desk <https://mirantis.zendesk.com/home>`_.

To learn more about how Mirantis can help your business, please visit 
www.mirantis.com.
Mirantis, Fuel, the Mirantis logos and other Mirantis marks are trademarks or 
registered trademarks of Mirantis, Inc. in the U.S. and/or certain other 
countries. Red Hat Enterprise Linux is a registered trademark of Red Hat, Inc. 
Ubuntu is a registered trademark of Canonical Ltd. VirtualBox is a registered 
trademark of Oracle Corporation. All other registered trademarks or trademarks 
belong to their respective companies. © 2013 Mirantis, Inc. All rights reserved.
