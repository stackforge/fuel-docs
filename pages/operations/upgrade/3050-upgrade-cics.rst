.. index:: Upgrade Controllers

.. _Upg_CICs:

Switch to 6.1 Control Plane
+++++++++++++++++++++++++++

This section describes how the Upgrade Script switches the control
plane of the OpenStack cloud being upgraded from version 5.1.1
to 6.1. The control plane of OpenStack cloud consists of all services
running on the Controllers and OpenStack services on the Compute nodes:
``nova-compute`` and ``neutron-plugin-openvswitch-agent``.

To switch the Controller services, the script transfers state
data for those services from the original Controllers to 6.1
Seed Controllers and swaps the Controllers connections to the
Management and External networks.

To switch the Compute services, the Upgrade Script updates the
version of the packages that provide corresponding services.

Maintenance mode
________________

To prevent the loss of data in OpenStack state database, API
interaction with the environment must be disabled. This mode
of operations is also known as :ref:`Maintenance Mode <db-backup-ops>`.

In maintenance mode, all services that write to DB are disabled. All
communications to the control plane of the cluster are also disabled.
VMs and other virtual resources must be able to continue to operate as
usual.

.. note::

    The Maintenance Mode is automatically set up by the Upgrade Script
    as soon as you start the upgrade of the state database. Make sure
    to carefully plan the maintenance window for that time and inform
    your users in advance.

Database migration
__________________

Before the databases could be upgraded, all OpenStack services on
6.1 Controller must be stopped to prevent corruption of the metadata.
The upgrade script uses standard Ubuntu startup scripts from
``/etc/init.d`` on controllers to shut off the services.

Databases are dumped in text format from MySQL server on 5.1.1 CIC,
copied to 6.1 CIC, and uploaded to the upgraded MySQL server. Standard
OpenStack tools allow to upgrade the structure of databases saving the
data itself via sqlalchemy-powered DB migrations.

Run the following command to set up Maintenance Mode and immediately
start upgrading the state databases of OpenStack services:

::

    ./octane upgrade-db ${ORIG_ID} ${SEED_ID}

Upgrade Ceph cluster
____________________

To replace Ceph Monitors on the same IP addresses, the upgrade script
must preserve the cluster's identity and auth parameters. It copies the
configuration files, keyrings and state dirs from 5.1.1 CICs to 6.1 CICs
and uses Ceph management tools to restore cluster identity.

Run the following command to replicate the configuration of the Ceph
cluster:

::

    ./octane upgrade-ceph ${ORIG_ID} ${SEED_ID}

Upgrade CICs
____________

The following section describes the procedure for replacing Controllers
from 5.1.1 environment with the Controllers from 6.1 environment
and then upgrading the 5.1.1 Controllers.

When the DB upgrade is finished, all OpenStack services on 6.1 CIC are
started using Pacemaker and Upstart. Then the upgrade script disconnects
the 5.1.1 CICs from the Management and Public networks by removing patch
ports between the logical interfaces to the respective networks and
physical interfaces connected to the network media. For example, if 5.1.1
CIC connected to the Management network via ``eth1`` interface, the
configuration of the logical bridge will be as follows:

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

Here the highlighted port is a patch port that the script deletes
to disconnect the host from the Management network.

On 6.1 CIC, the physical interface must be added to the Linux bridge
corresponding to the Management network. This allows the Compute nodes
to transparently switch from the old to the upgraded control plane
without the need to reconfigure and renumber every service.

Upgrade Compute node control plane
__________________________________

To ensure the minimal impact on the end user resources, we leverage
the live migration technique to move all virtual server instances
from the node prior to the upgrade.

Live migration is only possible between Compute services of similar
version in Mirantis OpenStack 6.1. To solve this, we split the
control plane and data plane upgrades on the Hypervisor node.
First, upgrade the OpenStack services running on all hypervisors
(i.e. nova-compute and neutron-l2-agent) using Ubuntu package manager.
An update of the configuration files is also required. This allows using
API of 6.1 CICs to live migrate all VMs from a hypervisor node to other
hosts and prepare it for the data plane upgrade.

The Upgrade Script will automatically update the version of Compute and
Networking services on all Compute nodes in the original 5.1.1
environment when you execute the command listed above.

Commands to switch the Control Plane
____________________________________

Run the following command to switch from 5.1.1 to 6.1 Control Plane:

::

    ./octane upgrade-cics ${ORIG_ID} ${SEED_ID}

