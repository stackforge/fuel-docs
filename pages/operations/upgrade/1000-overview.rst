.. index:: Upgrade Overview

.. _Upg_Over:

Overview
--------

Upgrade of OpenStack installation with a minimal effect on end-user workloads
(i.e. virtual server instances and/or data storage) on the same set of hardware
is the essential feature for supporting the Mirantis OpenStack product beyond
a single major release.

The proposed solution to the problem is to install a new set of HA 6.0 Controllers
side-by-side with the old ones, replace 5.1.1 Controllers by redirecting all Compute nodes of
the 5.1.1 environment to 6.0 Controllers, and upgrade all Compute nodes in a rolling
fashion.

The installation and configuration procedures must be described step by step with
all the necessary details and recommendations in a single document. With this
document, any Mirantis engineer or customer should be able to upgrade their
OpenStack environment to version 6.0.

Upgrade Scenario
----------------

The proposed solution to the upgrades problem includes the following general steps
described below in more details:

* Hardware servers are added to the installation to serve as :ref:`CICs <cic-term>`
  for the upgraded environment.
* :ref:`Cloud Infrastructure Controllers <cic-term>` for Mirantis OpenStack of
  a new release are installed on those servers using a new version of Fuel, side-by-side
  with the original 5.1.1 environment.
* All OpenStack platform services are put into Maintenance Mode for the whole
  duration of the upgrade procedure to prevent user data loss and/or corruption.
* State databases of all upgradeable OpenStack components are copied to new
  controllers and are upgraded with the standard ‘database migration’ feature of OpenStack.
* Reconfigure Ceph cluster in such a way that Monitors on the new 6.0 CICs replace
  Monitors of the 5.1.1 environment, retaining the original IP addresses and configuration
  parameters.
* 6.0 CICs replace the original 5.1.1 ones and take over their Virtual IPs and
  individual IPs in Management and Public :ref:`networks
  <logical-networks-arch>`.
* Control plane services on Compute nodes in the 5.1.1 environment are upgraded to 6.0
  without affecting virtual server instances and workloads. After the upgrade, Compute
  service reconnects to 6.0 CICs with the same version of RPC.
* Compute nodes from 5.1.1 environment work with CICs from the 6.0 environment, creating a
  hybrid temporary OpenStack environment that is only used to upgrade Compute
  nodes one by one by re-assigning to the 6.0 environment and re-installing with the new
  version.
* Ceph OSD nodes from the 5.1.1 environment transparently switch to new Monitors
  without actual data moving in the Ceph cluster.
* User data stored on OSD nodes must be preserved through re-installation of nodes
  into a new release of operating system and OpenStack services, and OSD nodes must
  connect to Monitors without changing their original IDs and data set.

Every step requires a certain action from the user. Some of those actions are scripted
(especially applying patches to different components of Fuel orchestrator and
updates to databases), others have to be manual. In this chapter you will find
description of solutions to all scenario steps listed above in this section and
sequences of commands that will help you upgrade your environments.

Prerequisites and dependencies
------------------------------

The procedure of upgrading Mirantis OpenStack from 5.1.1 to 6.0 version has certain
prerequisites and dependencies. You need to verify if your installation of
Mirantis OpenStack meets these requirements.

Fuel installer
++++++++++++++

Mirantis OpenStack 5.1.1 environment must be deployed and managed by Fuel
installer to be upgradeable. If you installed your environment without
leveraging Fuel, or removed :ref:`Fuel Master node <fuel-master-node-term>`
from the installation after successful deployment, you will not be able to
upgrade your environments using these instructions.

The upgrade scenario deviates from the standard sequence used in Fuel installer to
deploy Mirantis OpenStack environment. These modifications to the behavior of the
installer are implemented as patches to the source code of certain components of
Fuel. Patches are applied to Fuel Master node as a part of Upgrade scenario. See the
sections below for the detailed description of which components are modified and why.

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

In this guide we assume that the user upgrades Fuel installer from version 5.1.1 to
6.0. Upgrade of Fuel installer is a standard feature of the system. Upgraded
Fuel retains limited ability to manage 5.1.1 environments, which is leveraged by
the environment upgrade solution.

Additional hardware
+++++++++++++++++++

The upgrade strategy requires installing 6.0 environment that will result in an
OpenStack cluster along with the original environment. For the purpose of this guide,
we suggest that you add 3 nodes to your infrastructure under
management of Fuel installer. Those 3 servers will be used as controllers for the
upgraded environment.

As CICs are usually run on different hardware than hypervisor hosts, it is
unlikely that you will be able to release some of Compute nodes from 5.1.1
environment to serve as CICs in 6.0 Seed environment. However, it is still an
option to consider. Releasing nodes from an existing environment is out of the 
scope of this guide.
