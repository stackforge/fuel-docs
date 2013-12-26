.. index:: Release Notes: Mirantis OpenStack 4.0

.. _RelNotes_4:


Release Notes for Mirantis OpenStack 4.0
========================================


Mirantis, Inc. is releasing Mirantis OpenStack version 4.0. This generally
available version of Mirantis OpenStack is based on the Havana release of
OpenStack and includes support for deploying Ceilometer and Heat.

These release notes supplement the product documentation and list
enhancements, resolved issues, and known issues in this version.


.. contents:: :local:
  :depth: 1
  :backlinks: none


The following table lists the released revisions of this documentation:

+--------------+----------------+------------------+
| Revision     | Date           | Description      |
+==============+================+==================+
| 4.0          | 27-Dec-2013    | Initial G.A.     |
+--------------+----------------+------------------+


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

* Mirantis reference architectures that we've tested and certified to ensure
  that your deployed clouds are scalable, reliable, and production quality.
* An open and flexible library that enables customers to make configuration
  changes that may be more advanced or focused than the default choices within
  Fuel. This library also empowers organizations to fold additional drivers or
  integrations into the deployed environment.

Mirantis OpenStack hardened packages
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
These packages include the core OpenStack projects, updated with each stable
release of OpenStack. Also included are:
* Packages to ensure High Availability.
* Any defect fixes reported by our customers that may not yet have been merged
  into the community source.
* Mirantis-driven premium OpenStack projects (for example, Savanna and Murano).
* Mirantis-certified partner plug-ins, drivers, and integrations.
Another benefit you get from Mirantis OpenStack, compared with some competitors,
is our broad support for operating systems, hypervisors, and deployment topologies.
We don’t restrict your choices to one OS or one hypervisor type. In addition, you
can choose the OpenStack roles you want on each available node.

Mirantis Support
^^^^^^^^^^^^^^^^
Further, Mirantis OpenStack offers a subscription to our world-class support
with defined service level agreements based on the severity of your issue.
For example, the premium support guarantees a one-hour response for severity 1 issues.

New Features in Mirantis OpenStack 4.0
--------------------------------------

Mirantis OpenStack hardened packages support the latest stable OpenStack Havana
maintenance release
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
^^^^^^^^^^^^^^^^^^^
The OpenStack core projects in the Mirantis OpenStack hardened packages
support the `OpenStack Havana 2013.2.1 <http://tracker.ceph.com/issues/5426>`_ release.
Fuel will deploy this version of OpenStack on CentOS or Ubuntu. For Red Hat Enterprise
Linux OpenStack Platform (RHEL-OSP), Fuel will deploy RHEL-OSP version 3.0,
which is based on Grizzly.

Ceilometer and Heat included in Mirantis OpenStack hardened packages
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The integrated Heat and Ceilometer projects are included in the Mirantis
OpenStack hardened packages. Heat is automatically deployed into each
environment. Ceilometer can optionally be deployed by Fuel on a
per-environment basis.

Murano has been updated
^^^^^^^^^^^^^^^^^^^^^^^
The Murano project now includes a metadata repository service used to
store deployment scenarios and support for Linux services. The demo image
has also been updated and now includes the Murano agent, which can be used to
test the cluster deployment with the Murano service.

Other Enhancements
------------------

Ceph storage support expanded (experimental)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The Nova (Compute) service in Mirantis OpenStack now supports VM instances
backed by ephemeral volumes stored in Ceph. With Glance, Cinder, and Nova
all supporting the Ceph RBD backend; OpenStack VM instances can now take
advantage of Ceph clustered storage capabilities through all of the steps
of their life cycle. Ephemeral volumes can be created as copy-on-write
clones of Glance images, recovered from Compute node failures thanks to
Ceph object replication, and shared among Compute nodes to enable a live
migration of VMs.

Due to a `known Ceph issue <https://wiki.openstack.org/wiki/ReleaseNotes/2013.2.1>`
that could lead to a `Ceph SEGV error while extracting cloned images from RBD
<https://bugs.launchpad.net/fuel/+bug/1260911>`_, there is a small possibility
that an ephemeral volume may become corrupted when using this feature. Due to
such a possibility, this feature is considered experimental and should only be
used for evaluation purposes. Use in production environments is not recommended.
Mirantis is working closely with Inktank to resolve this issue as soon as possible
and if a resolution is quickly found, a patch will be released to Mirantis
OpenStack 4.0.

Internationalization of the Fuel UI is now available (experimental)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The Fuel project has added a framework that enables partners and community
members to localize the Fuel UI by modifying the `translate.json
<https://github.com/stackforge/fuel-web/blob/master/nailgun/static/i18n/translation.json>`
file. A sample that translates the UI into zh-CN (Simplified Chinese) has been
created by a community partner, 99cloud, and can be found in the file.
The framework is currently experimental.

Added selective node deployment/provisioning
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
In earlier releases, the Fuel UI and CLI deployed the operating system
and OpenStack components in a single action activated by the “Deploy
Changes” button on the UI or the ``deploy`` command via CLI. In Mirantis
OpenStack 4.0, it is possible to deploy the operating system and OpenStack
components in separate actions. This option is not expected to be used
for typical deployments but may be useful in focused development or
testing scenarios like OpenStack scalability testing as part of the
`OpenStack Rally <https://wiki.openstack.org/wiki/Rally>` project.

Validation of user-supplied network settings has been improved
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Additional error checking has been added to the Fuel UI when entering
information into the network settings under the Network tab. A full
list of the limitations that are checked can be found on `OpenStack Etherpad
<https://etherpad.openstack.org/p/limitations-of-networking-configuration>`.

Performance of virtual machines
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The default value for the CPU governor on Compute nodes has been changed
to 'performance.' This change is expected to increase the overall speed
and responsiveness of virtual machines for almost all physical hardware.

Swift ring partition power is being dynamically calculated
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The default value for the Swift ring partition power is now being calculated
according to https://answers.launchpad.net/swift/+question/211929. This places
some restrictions on the maximum allowed number of devices in certain Swift
installations. If you want to increase the ability of your Swift installation to
be resized after the deployment, then you will need to set ``swift['resize_value']``
in the 'settings.yaml' file of your cluster using the Fuel CLI to the
corresponding value (which should be more than 2 in case you want to
extend your installation).

Issues Resolved in Mirantis OpenStack 4.0
-----------------------------------------

Deployment process limited by scalability and performance issues due to the
implementation of the Puppet server
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
To address multiple issues including certificate signing, scalability,
and performance issues, the Puppet Master server has been removed from
the Fuel Master Node. Puppet modules and manifests are now synchronized
between the master node and the managed nodes. The modules and manifests
are then applied locally.

Slow network connection occurs between nodes when using Neutron and GRE
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Previously, network performance occasionally was slower than expected between
nodes when using the Neutron with GRE segmentation as the network type on
CentOS. This issue was primarily caused by packet fragmentation. This has
been corrected in Mirantis OpenStack 4.0. Further detail can be found at
https://bugs.launchpad.net/fuel/+bug/1256289.

The deployment progress bars were not as accurate as desired
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
When deploying an environment (after the "Deploy Changes" button had been
pressed), the progress bars in the Nodes tab were not reflecting their
status as accurately as expected. The cluster deployment progress bar has
now been made more accurate and makes more precise estimates of deployment
time. More detail can be found at https://bugs.launchpad.net/fuel/+bug/1257342.

A loss of commits for Pacemaker change transactions could cause deployments to fail
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Occasionally, updates between commits of Pacemaker CIB change transactions
were lost which caused deployment failures. The order of service creation
has been modified to ensure that these commits are properly made. More detail
can be found at  https://bugs.launchpad.net/fuel/+bug/1259134.

Swap size for deployed nodes was not calculated correctly
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
In previous releases, the swap size of deployed nodes was not accurately
calculated. This issue has been corrected and swap sizes will now be calculated
correctly according to the recommended values and depending on the physical
memory size. More detail can be found at https://bugs.launchpad.net/fuel/+bug/1259486.

HP Smart Array controller partitions were not correctly detected
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
In previous releases, Fuel could not work as expected with HP Smart Array
controllers due to an inability to correctly detect partitions during
the bootstrap process. This issue has now been corrected, and Fuel will
now properly support use of HP Smart Array controllers. More detail can be
found at https://bugs.launchpad.net/fuel/+bug/1259276.

Disabled feature can_set_mount_point in horizon
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
This option allows you to choose the device name for the mounted volume.
Setting this parameter to "True" is `not supported by QEMU or KVM
<https://bugs.launchpad.net/nova/+bug/1075971>` and causes `Cinder to
show the wrong device names for attached volumes
<https://bugs.launchpad.net/nova/+bug/1217874>`.

No way to specify range of IP addresses in public network
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Previously, It was only possible to specify a subnet for a public network
on the Networks tab of the Fuel UI. Because of this limitation, it was
not possible to exclude certain IP addresses that were used by some other
environments not related to the Mirantis OpenStack environment. In this
release, it is now possible to set a flexible range for Fuel use, for
example 12.0.0.10 to 12.0.0.20.

Security groups do not function on Neutron-enabled installations
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Due to the wrong configuration of security groups on Compute hosts,
access to virtual machines was unrestricted. This has been corrected,
and security groups are now enabled by default for Neutron installation.
To access VMs, you are required to allow connectivity first via the
Nova API or Horizon.

Wrong default gateway for the external Neutron network
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The UI setting for the Neutron gateway was ignored in the previous release. It was
calculated automatically as the first network IP. In this release, this UI
setting works properly.

Documentation on enabling NIC Bonding through the Fuel CLI Library was incomplete
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
In previous releases, NIC Bonding could be enabled through the Fuel
CLI Library but was not fully covered in the public facing documentation.
The documentation on how to enable NIC Bonding has been made more
complete and thorough.

This documentation also includes a workaround for customers who do not
have the required minimum number of NIC interfaces for their choice of
network type. Please refer to the documentation section "Advanced Network
Configuration using Open VSwitch" for more information on the workaround.

Known Issues in Mirantis OpenStack 4.0
--------------------------------------

The Ceilometer section within Horizon is disabled by default
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The Ceilometer integration with Horizon in OpenStack Havana has several known
issues:
* The metering panel in Horizon requires the 'metadata_query' Ceilometer feature
  `that is not supported by Ceilometer with the MySQL driver
  <https://bugs.launchpad.net/horizon/+bug/1260528>`.
* `Deleting the statistics tables from the resource usage page
  <https://review.openstack.org/#/c/60317/>` caused the tables to interpret
  some of the stats incorrectly, and in some cases it was not possible to get
  certain statistics. The panels with these tables have been removed from the
  OpenStack Havana release.

Because of these conditions, Mirantis OpenStack disables the Ceilometer section
within Horizon by default. Mirantis recommends that the customers who want to
use Ceilometer with Mirantis OpenStack 4.0 use the CLI interface for Ceilometer
instead. Once these defects are addressed, Mirantis OpenStack will re-enable this
default in a future release.

The Murano project can only be deployed if Neutron is chosen as the network type
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
If during deployment you choose nova-network as the network type, the option
to install the Murano project will be greyed out. In this release, Murano will
only be formally supported when Neutron is chosen as the network type. This
change has been made due to a lack of customer demand for Murano support on
nova-network and to focus efforts on Neutron.

Issues with Neutron-enabled installations when using certain NIC models with VLANS
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Some network interface drives in kernels prior to 3.3 (RHEL, CentOS) are known
to have poor support for VLAN tagged packets moving through OpenVSwitch (OVS)
Bridges. Ubuntu is not affected by this issue. A workaround to this is to enable
VLAN Splinters in OVS. Deployments using Neutron VLANs or GRE (with VLAN tags on
the management, storage or public networks) may run into problems ranging from
poor performance, intermittent connectivity problems, one vlan but not others
working or total failure to pass traffic.

For CentOS, The Fuel UI Settings page now has the option to deploy with a VLAN
splinters workaround enabled in two separate modes--soft trunks and hard trunks.
The soft trunks mode will configure OVS to enable splinters and attempt to
automatically detect in-use VLANs. This will provide the least amount of
performance overhead but in some edge cases may result in the traffic’s not
being passed onto the OVS bridge. The hard trunks mode will also configure OVS
to enable splinters but will use an explicitly defined list of all VLANs across
all interfaces. This should prevent any edge cases like those in the soft mode
but will require creation of corresponding tags on all of the interfaces. This
will introduce additional performance overhead. In the hard trunks mode, it’s
recommended that you use fewer than 50 VLANs in the Neutron VLAN mode.

GRE-enabled Neutron installation run inter VM traffic through management network
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
In all Neutron GRE installations, a physical interface is used for both OpenStack
management traffic and VM-to-VM communications. This limitation is restricted to
UI only. It is possible to use other physical interfaces when configured via the
Fuel CLI.

File injection into VMs fails on CentOS
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
VM creation may fail, issuing the following error::

    ERROR: Error injecting data into image
    5e9f173d-aa6f-4153-a41a-8f59c651651e (Error mounting
    /var/lib/nova/instances/c0733320-0c11-48f9-863e-b7d54e8d0812/disk with
    libguestfs (command failed: LC_ALL=C '/usr/libexec/qemu-kvm' -nographic
    -help

    errno: No such file or directory

In this situation, Nova service will fail to inject files into VM instances.
This is due to a Nova/QEMU bug that may be related to an incorrect path, but
the details of the failure have not yet been determined.

Heat, Savanna, and Murano do not configure send logs to the remote syslog
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
At the time of this release, Heat, Savanna, and Murano services do not send
logs to the remote syslog. To handle any issues with these services,
attach the corresponding logs (/var/log/murano*|/var/log/heat*|/var/log/savanna*)
from all of the nodes to the corresponding support requests and bug reports.

Ceph RadosGW might not start on all controllers
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
In the HA mode, it’s possible for RadosGW services to fail to start on some
controller nodes during deployment (https://bugs.launchpad.net/fuel/+bug/1261966).
This can be fixed by manually starting the rados-gw service.

Health Check tests may fail in slow environments
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
If multiple environments are deployed, or if the environments are slow,
some tests may fail due to timeouts.  Once the load on the environment is
reduced, the tests can be run again successfully.

Support for OpenStack Havana
^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The following improvements in Havana are not currently supported directly by Fuel:

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

 - Cinder-backup service

 - Support for Fibre Channel over Ethernet (FCoE)

 - Support for linux-iscsi.org (LIO) as an Internet Small Computer System Interface
   (iSCSI) backend

These capabilities are being considered for future releases of Mirantis OpenStack.

In addition, support for the High Availability of Neutron (Quantum) on RHEL is not
available due to a limitation within the RHEL kernel. This issue has been addressed
in a later version of RHEL not yet supported by Mirantis OpenStack. This issue does
not affect the CentOS or Ubuntu distributions included in the Mirantis OpenStack
hardened packages.

No ability to add new controller nodes without redeployment
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
New Compute and Cinder nodes can be added to an existing OpenStack environment.
However, at the moment, this capability cannot be used to deploy additional
controller nodes in the High Availability mode.

Each network type choice requires a minimum number of interfaces
Depending on your choice of network type, Mirantis OpenStack requires a minimum
number of interfaces. The minimum requirements are as follows:

+--------------------------------+----------------------------------------------+
| Network type                   | Minimum interfaces and assignments           |
+================================+==============================================+
| Nova-network                   | One interface for all networks (Admin [PXE], |
|                                | Private, Storage, Management, Public)        |
+--------------------------------+----------------------------------------------+
| Neutron with GRE Segmentation  | Two interfaces                               |
|                                | * Admin (PXE)                                |
|                                | * Private, Storage, Management, Public       |
+--------------------------------+----------------------------------------------+
| Neutron with VLAN Segmentation | Three interfaces                             |
|                                | * Admin (PXE)                                |
|                                | * Private                                    |
|                                | * Storage, Management, Public                |
+--------------------------------+----------------------------------------------+

   NOTE: There is a workaround for these minimum requirements that can be
   applied for advanced users who are using only the Fuel CLI Library. Please
   refer to the documentation section “Advanced Network Configuration using
   Open VSwitch” for more information.

Other limitations
^^^^^^^^^^^^^^^^^
* The Fuel Master Node is installed with CentOS as the host OS. While Mirantis
  OpenStack nodes can be installed with Ubuntu or CentOS as the host OS and RHEL-OSP
  can be installed with RHEL as the host OS, the Fuel Master Node is only supported
  on CentOS.
* When using the Fuel UI, the floating VLAN and public networks must use the same
  L2 network and L3 Subnet. In the UI, these two networks are locked together and
  can only run via the same physical interface on the server. This is due to a
  limitation in Neutron.
* Deployments done through the Fuel UI create all of the networks on all servers
  even if they are not required by a specific role (for example, a Cinder node will
  have VLANs created and addresses obtained from the public network).
* Some of OpenStack’s services listen to all of the interfaces, a situation that may
  be detected and reported by third-party scanning tools not provided by Mirantis.
  Please discuss this issue with your security administrator if it is a concern for
  your organization.
* The provided scripts that enable Fuel to be automatically installed on VirtualBox
  will create separate host interfaces. If a user associates logical networks to
  different physical interfaces on different nodes, that will lead to network
  connectivity issues between OpenStack components. Please check to see if this has
  happened prior to deployment by clicking on the “Verify Networks” button on the
  Networks tab.
* When configuring disks on nodes where Ubuntu has been selected as the host OS, the
  Base System partition modifications will not be properly applied. The default Base
  System partition will be applied regardless of the user choice due to limitations
  in Ubuntu provisioning.
* The “Verify Networks” button on the Networks tab allows you to check the network
  connectivity between nodes both before deployment and on an installed environment.
  However, this verification is not available on the environments that have already
  been deployed with Neutron.

How to Obtain the Product
-------------------------

Mirantis OpenStack is distributed as a self-contained ISO or IMG that, once
downloaded, does not require Internet access to provision OpenStack nodes, if
you deploy it using the Mirantis OpenStack hardened packages. The ISO and IMG
files are available in the Mirantis OpenStack download section of the `Mirantis
Portal <http://software.mirantis.com>`_. Here, you will also find the Oracle
VirtualBox scripts to enable quick and easy deployment of a multi-node OpenStack
cloud for evaluation purposes.

Contacting Support
------------------

You can contact support online, through email, or by phone. Instructions on how
to use any of these contact options can be found through `Mirantis Service
Desk <https://mirantis.zendesk.com/home>`_.

**To learn more about how Mirantis can help your business, please visit www.mirantis.com.**
Mirantis, Fuel, the Mirantis logos and other Mirantis marks are trademarks or
registered trademarks of Mirantis, Inc. in the U.S. and/or certain other countries.
Red Hat Enterprise Linux is a registered trademark of Red Hat, Inc. Ubuntu is a
registered trademark of Canonical Ltd. VirtualBox is a registered trademark of
Oracle Corporation. All other registered trademarks or trademarks belong to their
respective companies. © 2013 Mirantis, Inc. All rights reserved.
