.. index:: Upgrade Overview

.. _Upg_Over:

Overview
--------

Upgrading an OpenStack installation with minimal effect on the end-user
workloads (i.e. virtual server instances and/or data storage) on the
same set of hardware is an essential feature for supporting the
Mirantis OpenStack product beyond a single major release.

The proposed solution is to install a High Availability (HA) 7.0
Controller side-by-side with the old ones, replace the 6.1
Controllers by redirecting all Compute nodes of the 6.1 environment
to 7.0 Controllers, and upgrade all Compute nodes in a rolling fashion.

This scenario assumes zero additional hardware servers are added to the
environment. The upgrade uses one of the 6.1 Controllers to install
an initial Controller in the 7.0 environment. It does not break the
original environment, as there are two controllers remaining in it.

Upgrade Scenario
++++++++++++++++

The proposed solution includes the following general steps described
below in more details:

* OpenStack environment of version 7.0 is created using Fuel API with
  the settings and network configurations matching the configuration of
  the original 6.1 environment.
* One of the :ref:`Cloud Infrastructure Controllers <cic-term>` (CICs)
  in the original 6.1 environment is deleted and moved to the
  6.1 environment. It is then installed in that environment as
  a primary controller side-by-side with the original 6.1 environment.
* All OpenStack platform services are put into :ref:`Maintenance Mode
  <db-backup-ops>` for the whole duration of the upgrade procedure to
  prevent user data loss and/or corruption.
* Copy the state databases of all the upgradeable OpenStack components
  to the new Controller and upgrade these wuth the standard
  ‘database migration’ feature of OpenStack.
* Reconfigure the Ceph cluster in such a way that the Monitors on the
  new 7.0 CICs replace the Monitors of the 6.1 environment, retaining
  the original IP addresses and configuration parameters.
* The 7.0 CIC is connected to the Management and External networks,
  while the original 6.1 ones are disconnected. The 7.0 CIC takes
  over Virtual IPs in the Management and Public :ref:`networks <logical-networks-arch>`.
* Control plane services on the Compute nodes in the 6.1 environment
  are upgraded to 7.0 without affecting the virtual server instances
  and workloads. After the upgrade, the Compute service reconnects to
  7.0 CICs.
* Compute nodes from the 6.1 environment work with the CICs from the
  7.0 environment, forming a temporary hybrid OpenStack environment
  that is only used to upgrade the Compute nodes one by one by
  re-assigning them to the 7.0 environment and re-installing with
  the new version.
* Ceph OSD nodes from the 6.1 environment transparently switch to
  the new Monitors without the actual data moving in the Ceph cluster.
* User data stored on OSD nodes must be preserved through
  re-installation of the nodes into a new release of the operating
  system and OpenStack services, and OSD nodes must connect to the
  Monitors without changing their original IDs and data set.

Every step requires certain actions. All of these actions are scripted
as subcommands to the upgrade script called 'octane'.

Prerequisites and dependencies
++++++++++++++++++++++++++++++

The procedure of upgrading Mirantis OpenStack from 6.1 to 7.0 version
has certain prerequisites and dependencies. You need to verify if your
installation of Mirantis OpenStack meets these requirements.

Fuel installer
______________

Mirantis OpenStack 6.1 environment must be deployed and managed by
Fuel installer to be upgradeable. If you installed your environment
without leveraging Fuel, or removed the :ref:`Fuel Master node <fuel-master-node-term>`
from the installation after a successful deployment, you will not be
able to upgrade your environments using these instructions.

The upgrade scenario deviates from the standard sequence used in Fuel
installer to deploy Mirantis OpenStack environment. These modifications
to the behavior of the installer are implemented as modifications to the
:ref:`deployment tasks <0010-tasks-schema>` and extensions to certain
components of Fuel. Patches are applied to the Fuel Master node as part
of 'preparation' phase of the Upgrade scenario. See the sections below
for the detailed description of which components are modified and why.

.. _architecture-constraints:

Architecture constraints
________________________

Make sure that your Mirantis OpenStack 6.1 environment meets
the following architecture constraints. Otherwise, these instructions
will not work for you:

+----------------------------------------------------+------------------+
| Constraint                                         | Check if comply  |
+====================================================+==================+
| High Availability architecture                     |                  |
+----------------------------------------------------+------------------+
| Ubuntu 14.04 as an operating system                |                  |
+----------------------------------------------------+------------------+
| Neutron networking manager with OVS+VLAN plugin    |                  |
+----------------------------------------------------+------------------+
| Cinder virtual block storage volumes               |                  |
+----------------------------------------------------+------------------+
| Ceph shared storage for volumes and ephemeral data |                  |
+----------------------------------------------------+------------------+
| Ceph shared storage for images and objeсt store    |                  |
+----------------------------------------------------+------------------+

Fuel upgrade to 7.0
___________________

In this guide we assume that the user upgrades Fuel installer from
version 6.1 to 7.0. The upgrade of Fuel installer is a standard
feature of the system. Upgraded Fuel retains the ability to manage
6.1 environments, which is leveraged by the environment upgrade solution.

Additional hardware
___________________

The upgrade strategy requires installing 7.0 environment that will
result in an OpenStack cluster along with the original environment.
One of the Controller nodes from the original 6.1 environment will
be deleted, added to the new 7.0 environment, and reinstalled. This
allows performing an upgrade with no additional hardware.

.. note::

    The trade-off for using one of the existing controllers as a
    primary upgraded controller is that the 7.0 environment will
    not be highly available for some time during the maintenance
    window dedicated to the upgrade. Once the remaining controllers
    are moved from the 6.1 environment and reinstalled into the 7.0
    environment, its High Availability is restored.
