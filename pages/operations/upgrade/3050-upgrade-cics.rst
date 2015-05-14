.. index:: Upgrade Controllers

.. _Upg_CICs:

Switch to 7.0 Control Plane
+++++++++++++++++++++++++++

To switch the Controller services, the script transfers state
data for those services from the original Controllers to 7.0
Seed Controllers and swaps the Controllers connections to the
Management and External networks.

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
7.0 Controller must be stopped to prevent corruption of the metadata.
The upgrade script uses standard Ubuntu startup scripts from
``/etc/init.d`` on controllers to shut off the services.

Databases are dumped in text format from MySQL server on 6.1 CIC,
copied to 7.0 CIC, and uploaded to the upgraded MySQL server. Standard
OpenStack tools allow to upgrade the structure of databases saving the
data itself via sqlalchemy-powered DB migrations.

Run the following command to set up Maintenance Mode and immediately
start upgrading the state databases of OpenStack services:

::

    octane upgrade-db ${ORIG_ID} ${SEED_ID}

Upgrade Ceph cluster
____________________

To replace Ceph Monitors on the same IP addresses, the upgrade script
must preserve the cluster's identity and auth parameters. It copies the
configuration files, keyrings and state dirs from 6.1 CICs to 7.0 CICs
and uses Ceph management tools to restore cluster identity.

Run the following command to replicate the configuration of the Ceph
cluster:

::

    octane upgrade-ceph ${ORIG_ID} ${SEED_ID}

Upgrade CICs
____________

The following section describes the procedure for replacing Controllers
from 6.1 environment with the Controllers from 7.0 environment
and then upgrading the 6.1 Controllers.

When the DB upgrade is finished, all OpenStack services on 7.0 CIC are
started using Pacemaker and Upstart. Then the upgrade script disconnects
the 6.1 CICs from the Management and Public networks by removing patch
ports between the logical interfaces to the respective networks and
physical interfaces connected to the network media.

On 7.0 CIC, the physical interface must be added to the Linux bridge
corresponding to the Management network. This allows the Compute nodes
to transparently switch from the old to the upgraded control plane
without the need to reconfigure and renumber every service.

Commands to switch the Control Plane
____________________________________

Run the following command to switch from 6.1 to 7.0 Control Plane:

::

    octane upgrade-control ${ORIG_ID} ${SEED_ID}

