.. _upgrade_major_versions:

.. _upgrade_prerequisites:

Prerequisites
=============

There are three prerequisite steps that you need to go through
before running the actual upgrade:

#. Make sure your environment version is upgradeable. See :ref:`upgrade-table`.
#. Make sure your environment architecture is upgradeable (all items)
   must be checked:

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

#. Select the environment that complies with the prerequisites
   and assign its ID to the ``ORIG_ID`` variable:

 * On the Fuel Master node, issue the following command::

     fuel env

 * Select the environment ID from the list.
 * Assign the environment ID to the ``ORIG_ID`` variable::

     export ORIG_ID=<ENVIRONMENT_ID>

Prepare the Fuel Master node
============================

The upgrade preparation is automated with the script named ``octane``.
You need to download this script from RPM repository and install it
on your Fuel Master node.

**Download and install the script:**

#. Run the following command::

   octane upgrade-control ${ORIG_ID} ${SEED_ID}

#. Install the ``octane`` script using ``yum`` package manager::

    yum install -y fuel-octane

Alternatively, you can use the Git version control system to install
the script from the source code that resides in the upstream repository.

To install the script from the repository:

#. Install dependenecy packages using yum install::

     yum install -y git patch python-pip python-paramiko

#. Clone the fuel-octane repository::

     git clone https://git.openstack.org/openstack/fuel-octane -b stable/7.0

#. Change the current directory to ``fuel-octane``.

#. Install the upgrade script::

    cd fuel-octane && pip install -e ./

**Run the script**

On the Fuel Master node, issue the following command::

   octane prepare

Clone environment settings
==========================

You need to create a new Fuel 7.0 environment and copy the Network and
Settings parameters of the Fuel 6.x environment.

**To clone the environment settings:**

Issue the following command to clone the environment settings::

  octane upgrade-env ${ORIG_ID}

 where ORIG_ID is the ID of the environment that you assigned at the
 :ref:`upgrade_prerequisites` step.

Running the ``octane upgrade-env ${ORIG_ID}`` command will display the
ID of the new Fuel 7.0 environment.

Export this new ID into a variable::

  export SEED_ID=<ID>

 where <ID> is the new Fuel 7.0 environment ID.

Upgrade the Controller node
===========================

You need to deploy the Controller node with the following
necessary modifications:

#. Disable checking access to the default gateway in Public network.
#. Skip adding physical interfaces to Linux bridges.
#. Skip creation of the 'default' Fuel-defined networks in Neutron.
#. Change default gateway addresses to the address of the Fuel Master node.

**To upgrade the Controller node:**

Issue the following command to run the Controller node upgrade::

  ./octane upgrade-node ${SEED_ID} isolated <NODE-ID>

 where <NODE_ID> is the ID of the node that you can get by issuing
 the ``fuel nodes`` command.

Upgrade the databases
=====================

You need to put the environment in :ref:`Maintenance Mode <db-backup-ops>`,
and migrate the databases.

**To upgrade the databases:**

Run the following command to upgrade the state databases of
OpenStack services::

  octane upgrade-db ${ORIG_ID} ${SEED_ID}

Upgrade Ceph cluster
====================

To upgrad the Ceph cluster, you need to run an ``octane`` command
that will do the following:

#. Copy the configuration files, keyrings, and state directories
   from the original environment to the new one.
#. Restore the cluster identity using the Ceph management tools.

**To upgrade the Ceph cluster:**

Run the following command::

  octane upgrade-ceph ${ORIG_ID} ${SEED_ID}


Upgrade Control Plane
=====================

Now that you have cloned the environment settings, deployed the
Controller node in the new environment, upgraded the databases and
the Ceph cluster, you need to:

* Switch the services from the original environemt to the new one.
* Swap the Controller connections to the Management and External
  networks.

**To upgrade the Control Plane:**

Issue the following command::

  octane upgrade-control ${ORIG_ID} ${SEED_ID}

Upgrade hypervisor host
=======================

To upgrade the hypervisor host, you need to run an ``octane`` command
that will do the following:

#. Add the node to the new environment.
#. Provision the node.
#. Deploy the node.
#. Move the virtual machines to the node in the new environment
   using live migration.

**To upgrade the hypervisor host:**

Issue the following command::

  octane upgrade-node ${SEED_ID} ${NODE_ID}

Upgrade Ceph OSD node
=====================

Issue the following command to upgrade a Ceph OSD node::

  octane upgrade-node ${SEED_ID} ${NODE_ID}

This will do the following:

* Redeploy Ceph OSD nodes with the original dataset.

Complete the upgrade
====================

To complete the upgrade, you need to do the following:

* Revert the changes introduced in the source code by the ``octane``
  script.
* Delete the original environment.

**To revert the changes introduced by the script:**

Issue the following command::

  octane cleanup-fuel

To delete the original environment, issue the following command::

  fuel env --env $ORIG_ID --delete
