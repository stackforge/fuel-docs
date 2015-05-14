.. index:: Upgrade Controllers

.. _Upg_CICs:

Switch to 6.1 Control Plane
+++++++++++++++++++++++++++

This section describes how the Upgrade Script switches the control plane of the
OpenStack cloud being upgraded from version 5.1.1 to 6.1. Control plane of
OpenStack cloud consists of all services running on the Controllers and
OpenStack services on the Compute nodes: ``nova-compute`` and
``neutron-plugin-openvswitch-agent``.

To switch Controller services, the script transfers state data for those
services from original Controllers to 6.1 Seed Controllers and swaps the
Controllers connections to Management and External networks.

To switch Compute services, the Upgrade Script updates version of packages that
provide corresponding services.

Maintenance mode
________________

To prevent the loss of data in OpenStack state database, API interaction with
the environment must be disabled. This mode of operations is also known as
:ref:`Maintenance Mode <db-backup-ops>`

In maintenance mode, all services that write to DB are disabled. All
communications to the control plane of the cluster are also disabled. VMs and
other virtual resources must be able to continue to operate as usual.

.. note::

    The Maintenance Mode is automatically set up by the Upgrade Script as soon
    as you start upgrade of the state database. Make sure to carefully plan
    maintenance window for that time and inform your users in advance.

Database migration
__________________

Before databases could be upgraded, all OpenStack services on 6.1 Controller
must be stopped to prevent corruption of the metadata. The upgrade script uses
standard Ubuntu startup scripts from ``/etc/init.d`` on controllers to shut off
the services.

Databases are dumped in text format from MySQL server on 5.1.1 CIC, copied to
6.1 CIC and uploaded to upgraded MySQL server. Standard OpenStack tools allow
to upgrade the structure of databases saving the data itself via
sqlalchemy-powered DB migrations.

Run the following command to set up Maintenance Mode and immediately start
upgrading the state databases of OpenStack services:

::

    ./octane upgrade-db ${ORIG_ID} ${SEED_ID}

Upgrade Ceph cluster
____________________

To replace Ceph Monitors on the same IP addresses, the upgrade script must
preserve cluster's identity and auth parameters. It copies the configuration
files, keyrings and state dirs from 5.1.1 CICs to 6.1 CICs and uses Ceph
management tools to restore cluster identity.

Run the following command to replicate configuration of Ceph cluster:

::

    ./octane upgrade-ceph ${ORIG_ID} ${SEED_ID}

Upgrade CICs
____________

The following section describes procedure for replacing Controllers from
5.1.1 environment with Controllers from 6.1 environment and then upgrading the 
5.1.1 Controllers.

When DB upgrade is finished, all OpenStack services on 6.1 CIC are started
using Pacemaker and Upstart. Then the upgrade script disconnects 5.1.1 CICs
from Management and Public networks by removing patch ports between logical
interfaces to the respective networks and physical interfaces connected to the
network media. For example, if 5.1.1 CIC connected to Management network via
``eth1`` interface, configuration of the logical bridge will be as follows:

::

    ovs-vsctl show
    ...
    Bridge br-mgmt
        Port "br-mgmt--br-eth1"
            trunks: [0]
            Interface "br-mgmt--br-eth1"
                type: patch
                options: {peer="br-eth1--br-mgmt"}
        Port br-mgmt
            Interface br-mgmt
                type: internal
    Bridge "br-eth1"
        Port "eth1"
            Interface "eth1"
        Port "br-eth1--br-mgmt"
            trunks: [0]
            Interface "br-eth1--br-mgmt"
                type: patch
                options: {peer="br-mgmt--br-eth1"}
        Port "br-eth1"
            Interface "br-eth1"
                type: internal
    ...

Here the highlighted port is a patch port that script deletes to disconnect the
host from Management network.

On 6.1 CIC, the physical interface must be added to Linux bridge corresponding
to the Management network. This allows the Compute nodes to transparently
switch from old to upgraded control plane without need to reconfigure and
renumber every service.

Upgrade Compute node control plane
__________________________________

To ensure minimal impact on the end user resources, we leverage live migration
technique to move all virtual server instances from the node prior to upgrade.

Live migration is only possible between Compute services of similar version in
MOS 6.1. To solve this, we split control plane and data plane upgrades on the
Hypervisor node. First, upgrade OpenStack services running on all hypervisors
(i.e. nova-compute and neutron-l2-agent) using Ubuntu package manager. Update
of the configuration files is also required. This allows to use API of 6.1 CICs
to live migrate all VMs from a hypervisor node to other hosts and prepare it to
data plane upgrade.

The Upgrade Script will automatically update a version of Compute and
Networking services on all Compute nodes in the original 5.1.1 environment when
you execute the command listed above.

Commands to switch the Control Plane
____________________________________

Run the following command to switch from 5.1.1 to 6.1 Control Plane:

::

    ./octane upgrade-cics ${ORIG_ID} ${SEED_ID}

