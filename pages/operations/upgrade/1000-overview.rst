.. index:: Upgrade Overview

.. _Upg_Over:

Overview
--------

Upgrade of OpenStack installation with minimal effect on end-user workloads
(i.e. virtual server instances and/or data storage) on the same set of hardware
is the essential feature for supporting Mirantis OpenStack product beyond single
major release.

Proposed solution to the problem is to install a new set of HA 6.0 Controllers
side-by-side with old ones, replace 5.1.1 Controllers by redirecting all compute nodes of
the 5.1.1 environment to 6.0 Controllers, and upgrade all compute nodes in a rolling
fashion.

Installation and configuration procedures must be described step by step with
all necessary details and recommendations in a single document. By this
document, any Mirantis engineer or customer must be able to upgrade their
OpenStack environment to version 6.0.

Requirements
------------

This section sums requirements to the upgrade solution. Requirements are divided
into functional which describe what the solution must achieve, and
non-functional which define characteristics and impact of the solution.

Functional requirements
+++++++++++++++++++++++

These requirements define functional aspect of the solution. The proposed
procedure must upgrade an environment running Mirantis OpenStack from 5.1.1 to
6.0 release and meet the following criteria:

* No in-place upgrade should be supported. Every host must be re-installed from
  scratch during the procedure.
* Only core OpenStack services must be upgraded, including :ref:`Nova <nova-term>`,
  :ref:`Cinder <cinder-term>`, :ref:`Neutron <neutron-term>`, :ref:`Glance
  <glance-term>` and :ref:`Keystone <keystone-term>`.
* Upgrades of OpenStack services assume that their APIs will be made read-only for
  the period of upgrade procedure.

Non-functional requirements
+++++++++++++++++++++++++++

The following requirements define characteristics of the solution.

* Procedure must be reproducible and repeatable in 'copy-paste' fashion and 
  carried out without mandatory involvement of Mirantis personnel.
* Downtime of storage, network and compute resources due the upgrade procedure
  must be kept at minimum through leverage of live migration techniques where
  possible.
* Upgrade solution must work on reference architectures that include the following
  components:

    * High availability architecture (including :ref:`Galera MySQL
      <galera-cluster-term>`, :ref:`HAProxy <haproxy-term>` and
      :ref:`Corosync/Pacemaker <corosync-term`)
    * Ubuntu operating system
    * :ref:`KVM hypervisor <kvm-term>`
    * Neutron networking manager with :ref:`OVS <ovs-term>` + :ref:`VLAN 
      <vlan-term>` plugin
    * :ref:`Cinder <cinder-term>` virtual block storage volumes
    * :ref:`Ceph <ceph-term>` shared storage for volumes and ephemeral data
    * :ref:`Ceph <ceph-term>` shared storage for images and object store

* Upgrade solution must not require from users to provide more than 4
  hardware servers in addition to servers already existing in their environment.

Upgrade Scenario
----------------

The proposed solution to the upgrades problem includes the following general steps
described below in more details:

* Hardware servers are added to installation to serve as :ref:`CICs<cic-term>`
  for upgraded environment.
* :ref:`Cloud Infrastructure Controllers<cic-term>` for Mirantis OpenStack of
  new release installed on those servers using new version of Fuel, side-by-side
  with the original 5.1.1 environment.
* All OpenStack platform services are put into Maintenance Mode for the whole
  duration of upgrade procedure to prevent user data loss and/or corruption.
* State databases of all upgradeable OpenStack components are copied to new
  controllers and upgraded by standard ‘database migration’ feature of OpenStack.
* Reconfigure Ceph cluster in such a way that Monitors on new 6.0 CICs replace
  Monitors of 5.1.1 environment, retaining original IP addresses and configuration
  parameters, including :ref:`FSID
  <http://ceph.com/docs/master/install/manual-deployment/#monitor-bootstrapping>` value.
* 6.0 CICs replace original 5.1.1 ones and take over their Virtual IPs and
  individual IPs in Management and Public :ref:`networks
  <logical-networks-arch>`.
* Control plane services on Compute nodes in 5.1.1 environment are upgraded to 6.0
  without affecting virtual server instances and workloads. After upgrade, Compute
  service reconnects to 6.0 CICs with the same version of RPC.
* Compute nodes from 5.1.1 environment work with CICs from 6.0 environment, creating
  hybrid temporary OpenStack environment that is only used to upgrade Compute
  nodes one by one by re-assigning to 6.0 environment and re-installing with new
  version.
* Ceph OSD nodes from 5.1.1 environment transpartently switch to new Monitors
  without actual data moving in the Ceph cluster.
* User data stored on OSD nodes must be preserved through re-installation of nodes
  into new release of operating system and OpenStack services, and OSD nodes must
  connect to Monitors without chaning their original IDs and data set.

Every step requires certain action from user. Some of those actions are scripted
(especially applying patches to different components of Fuel orchestrator and
updates to databases), others have to be manual. In this chapter you will find
description of solutions to all scenario steps listed above in this section and
sequences of commands that will help you to upgrade your environments.

Prerequisites and dependencies
------------------------------

Procedure of upgrade of Mirantis OpenStack from 5.1.1 to 6.0 version has certain
prerequisites and dependencies. You need to verify if your installation of
Mirantis OpenStack meets these requirements.

Fuel installer
++++++++++++++

Mirantis OpenStack 5.1.1 environment must be deployed and managed by Fuel
installer to be upgradeable. If you installed your environment without
leveraging Fuel, or removed :ref:`Fuel Master node <fuel-master-node-term>`
from the installation after successful deployment, you will not be able to
upgrade your environments using these instructions.

Upgrade scenario deviates from the standard sequence used in Fuel installer to
deploy Mirantis OpenStack environment. These modifications to behavior of the
installer are implemented as patches to source code of certain components of
Fuel. Patches are applied to Fuel master node as a part of Upgrade scenario. See
sections below for detailed description of which components are modified and why.

.. _architecture-constraints:

Architecture constraints
++++++++++++++++++++++++

Make sure that your MOS 5.1.1 environment meets the following architecture
constraints. Otherwise, these instructions will not work for you:

+----------------------------------------------------+------------------+
| Constraint                                         | Check if comply  |
+====================================================+==================+
| High availability architecture                     |                  |
+----------------------------------------------------+------------------+
| Ubuntu 12.04 as an operating system                |                  |
+----------------------------------------------------+------------------+
| Neutron networking manager with OVS+VLAN plugin    |                  |
+----------------------------------------------------+------------------+
| Cinder virtual block storage volumes               |                  |
+----------------------------------------------------+------------------+
| Ceph shared storage for volumes and ephemeral data |                  |
+----------------------------------------------------+------------------+
| Ceph shared storage for images and objeсt store    |                  |
+----------------------------------------------------+------------------+

Fuel upgrade to 6.0
+++++++++++++++++++

In this Guide, we assume that user upgrades Fuel installer from version 5.1.1 to
6.0. Upgrade of Fuel installer is a standard feature of the system. Upgraded
Fuel retains limited ability to manage 5.1.1 environments, which is leveraged by
environment upgrade solution.

Additional hardware
+++++++++++++++++++

Upgrade strategy requires installing 6.0 environment that will be resulting
OpenStack cluster along with the original environment. We suggest for the
purpose of this Guide that you add 3 nodes to your infrastructure under
management of Fuel installer. Those 3 servers will be used as controllers for
upgraded environment.

As CICs are usually run on different hardware than hypervisor hosts, it is
unlikely that you will be able to release some of Compute nodes from 5.1.1
environment to serve as CICs in 6.0 Seed environment. However, it is still an
option to consider. Releasing nodes from existing environment is out of scope of
this Guide.
