.. index:: Upgrade Overview

.. _Upg_Over:

Overview
--------

Upgrade of OpenStack installation with minimal effect on end-user workloads
(i.e. virtгal server instances and/or data storage) on the same set of hardware
is the essential feature for supporting Mirantis OpenStack product beyond single
major release.

Proposed solution to the problem is to install a new set of HA 6.0 CICs
side-by-side with old ones, replace 5.1 CICs by redirecting all compute nodes of
the 5.1 environment to 6.0 CICs, and upgrade all compute nodes in a rolling
fashion.

Installation and configuration procedures must be described step by step with
all necessary details and recommendations in a single document. By this
document, any Mirantis engineer or customer must be able to upgrade their
OpenStack environment to version 6.0.

Engineering team must design, develop and verify all steps of the upgrade
procedure. All results must be delivered as a single bundle that includes
documentation and source code.

Requirements
------------

This section sums requirements to the upgrade solution. Requirements are divided
into functional which describe what the solution must achieve, and
non-functional which define characteristics and impact of the solution.

Functional requirements
+++++++++++++++++++++++

Following requirements define functionality of the solution.
Procedure must upgrade MOS 5.1 to MOS 6.0.

* No in-place upgrade should be supported. Every host must be re-installed from
  scratch during the procedure.
* Only core OpenStack services must be upgraded in MVP, including Nova, Cinder,
  Neutron, Glance and Keystone.
* Upgrades of OpenStack services assume that their APIs will be made read-only for
  the period of upgrade procedure.

Non-functional requirements
+++++++++++++++++++++++++++

Following requirements define characteristics of the solution.

* Procedure must be documented, reproducible, repeatable and must be carried out
  without mandatory involvement of Mirantis personnel.
* Downtime of storage, network and compute resources due the upgrade procedure
  must be kept at minimum through leverage of live migration techniques where
  possible.

Upgrade solution must work on reference architectures that include following
components:

* High availability architecture (including Galera MySQL, HAProxy and
  Corosync/Pacemaker)
* Ubuntu operating system
* KVM hypervisor
* Neutron networking manager with OVS+VLAN plugin
* Cinder virtual block storage volumes
* Ceph shared storage for volumes and ephemeral data
* Ceph shared storage for images and object store

Upgrade solution must not require from it's users to provide more than 4
hardware servers in addition to servers existing in their environment.

Upgrade Scenario
----------------

The proposed solution to the upgrades problem includes following general steps
described below in more details:

* Hardware servers are added to installation to serve as CICs for upgraded
  environment.
* Cloud Infrastructure Controllers for Mirantis OpenStack of new release installed
  on those servers using new version of Fuel, side-by-side with the original 5.1
  environment.
* All OpenStack platform services are put into Maintenance Mode for the whole
  duration of upgrade procedure to prevent user data loss and/or corruption.
* State databases of all upgradeable OpenStack components are copied to new
  controllers and upgraded by standard ‘database migration’ feature of OpenStack.
* Reconfigure Ceph cluster in such a way that Monitors on new 6.0 CICs replace
  Monitors of 5.1 environment, retaining original IP addresses and configuration
  parameters, including FSID value.
* 6.0 CICs replace original 5.1 ones and take over their Virtual IPs and
  individual IPs in Management and Public networks.
* Control plane services on Compute nodes in 5.1 environment are upgraded to 6.0
  without affecting virtual server instances and workloads. After upgrade, Compute
  service reconnects to 6.0 CICs with the same version of RPC.
* Compute nodes from 5.1 environment work with CICs from 6.0 environment, creating
  hybrid temporary OpenStack environment that is only used to upgrade Compute
  nodes one by one by re-assigning to 6.0 environment and re-installing with new
  version.
* Ceph OSD nodes from 5.1 environment transpartently switch to new Monitors
  without actual data moving in the Ceph cluster.
* User data stored on OSD nodes must be preserved through re-installation of nodes
  into new release of operating system and OpenStack services, and OSD nodes must
  connect to Monitors without chaning their original IDs and data set.

Every step requires certain action from user. Some of those actions are scripted
(especially applying patches to different components of Fuel orchestrator and
updates to databases), others have to be manual. In this Guide you will find
description of solutions to all tasks listed above and sequences of commands
that will help you to upgrade your environments.

Prerequisites and dependencies
------------------------------

Procedure of upgrade of Mirantis OpenStack from 5.1 to 6.0 version has certain
prerequisites and dependencies. You need to verify if your installation of
Mirantis OpenStack meets these requirements.

Fuel installer
++++++++++++++

Mirantis OpenStack 5.1 environment must be deployed and managed by Fuel
installer to be upgradeable. If you installed your environment without
leveraging Fuel, or removed Fuel node from the installation after successful
deployment, you will not be able to upgrade your environments using this Guide.

Upgrade scenario deviates from standard sequence used in Fuel installer to
deploy Mirantis OpenStack environment. These modifications to behavior of the
installer are implemented as patches to source code of certain components of
Fuel. Patches are applied to Fuel master node as a part of Upgrade scenario. See
below for detailed description of which components are modified and why.

Architecture constraints
++++++++++++++++++++++++

Make sure that your MOS 5.1 environment meets the following architecture
constraints. Otherwise, this Guide will not work for you.

* High availability architecture (including Galera MySQL, HAProxy and
  Corosync/Pacemaker)
* Ubuntu 12.04 as an operating system
* Neutron networking manager with OVS+VLAN plugin
* Cinder virtual block storage volumes
* Ceph shared storage for volumes and ephemeral data
* Ceph shared storage for images and object store

Fuel upgrade to 6.0
+++++++++++++++++++

In this Guide, we assume that user upgrades Fuel installer from version 5.1 to
6.0. Upgrade of Fuel installer is a standard feature of the system. Upgraded
Fuel retains limited ability to manage 5.1 environments, which is leveraged by
environment upgrade solution.

Additional hardware
+++++++++++++++++++

Upgrade strategy requires installing 6.0 environment that will be resulting
OpenStack cluster along with the original environment. We suggest for the
purpose of this Guide that you add 3 nodes to your infrastructure under
management of Fuel installer. Those 3 servers will be added to 6.0 Seed
environment as CICs.

As CICs are usually run on different hardware than hypervisor hosts, it is
unlikely that you will be able to release some of Compute nodes from 5.1
environment to serve as CICs in 6.0 Seed environment. However, it is still an
option to consider. Releasing nodes from existing environment is out of scope of
this Guide.
