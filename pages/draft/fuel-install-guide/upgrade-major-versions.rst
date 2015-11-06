.. _upgrade_prerequisites:

Prerequisites
~~~~~~~~~~~~~

There are the following prerequisite steps that you need to go through
before running the actual upgrade:

#. Verify if your environment version is upgradeable. See :ref:`upgrade-table`.
#. Verify that your environment meets all following prerequisites:

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
   | Ceph shared storage for images and objeсt storage  |                  |
   +----------------------------------------------------+------------------+

#. Select the environment that complies with the above prerequisites
   and assign its ID to the ``ORIG_ID`` variable:

 #. On the Fuel Master node, type::

     fuel env

 #. Select the environment ID from the list.
 #. Assign the environment ID to the ``ORIG_ID`` variable::

     export ORIG_ID=<ENVIRONMENT_ID>

#. Upgrade the Fuel Master node. See :ref:`upgrade_fuel_master`.

#. Proceed to :ref:`upgrade_prepare_master`.

.. note:: During the upgrade, virtual machines and other resources
          might experience temporary network disconnects. Schedule
          the upgrade during a maintenance window.

.. _upgrade_prepare_master:

Prepare the Fuel Master node
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The upgrade preparation is automated with the script named ``octane``.
You need to download this script from the RPM repository and install it
on your Fuel Master node.

**To download and install the script:**

#. Install the ``octane`` script using ``yum`` package manager::

    yum install -y fuel-octane

Alternatively, you can use the Git version control system to install
the script from the source code that resides in the upstream repository.

**To install the script from the repository:**

#. Log in to the Fuel Master node CLI.
#. Install dependenecy packages using ``yum install``::

     yum install -y git patch python-pip python-paramiko

#. Clone the ``fuel-octane`` repository::

     git clone https://git.openstack.org/openstack/fuel-octane -b stable/7.0

#. Change the current directory to ``fuel-octane``.

#. Install the upgrade script::

    cd fuel-octane && pip install -e ./

Clone environment settings
~~~~~~~~~~~~~~~~~~~~~~~~~~

You need to create a new Fuel 7.0 environment and copy the network and
settings parameters to the new environment.

**To clone the environment settings:**

#. Clone the environment settings by typing::

     octane upgrade-env ${ORIG_ID}

 where ORIG_ID is the ID of the environment that you assigned at the
 :ref:`upgrade_prerequisites` step.

#. Running the ``octane upgrade-env ${ORIG_ID}`` command will display
   the ID of the new Fuel 7.0 environment.

#. Export this new ID into a variable::

     export SEED_ID=<ID>

   where <ID> is the new Fuel 7.0 environment ID.

Upgrade the Controller node
~~~~~~~~~~~~~~~~~~~~~~~~~~~

You must deploy the Controller node with the following modifications:

#. Disable checking access to the default gateway in Public network.
#. Skip adding physical interfaces to Linux bridges.
#. Skip creation of the 'default' Fuel-defined networks in Neutron.
#. Change default gateway addresses to the address of the Fuel Master node.

**To upgrade the Controller node:**

#. To run the Controller node upgrade, type::

    octane upgrade-node ${SEED_ID} --isolated <NODE-ID>

   where <NODE_ID> is the ID of the node that you can get by issuing
   the ``fuel nodes`` command.

Upgrade the databases
~~~~~~~~~~~~~~~~~~~~~

To upgrade the databases, put the environment :ref:`Maintenance Mode <db-backup-ops>`.

**To upgrade the databases:**

#. Upgrade the state databases of the OpenStack services by typing::

   octane upgrade-db ${ORIG_ID} ${SEED_ID}

Upgrade Ceph cluster
~~~~~~~~~~~~~~~~~~~~

To upgrade the Ceph cluster, you need to run the ``octane`` command
that will complete the following:

#. Copy the configuration files, keyrings, and state directories
   from the original environment to the new one.
#. Restore the cluster identity using the Ceph management tools.

**To upgrade the Ceph cluster:**

#. Run the following command::

    octane upgrade-ceph ${ORIG_ID} ${SEED_ID}

Upgrade Control Plane
~~~~~~~~~~~~~~~~~~~~~

Before upgrading the Control plane, verify that you have completed the following tasks:

 - Clone the environment settings
 - Deployed the Controller node in the new environment
 - Upgraded the databases
 - Upgraded the Ceph cluster

**To upgrade the Control Plane:**

Run the following command::

  octane upgrade-control ${ORIG_ID} ${SEED_ID}

This command switches the services from the original environment to the new one and swaps the Controller connections to the Management and External networks.

Upgrade hypervisor host
~~~~~~~~~~~~~~~~~~~~~~~

To upgrade the hypervisor host, you need to run the ``octane`` command
that will complete the following tasks:

#. Add the node to the new environment.
#. Provision the node.
#. Deploy the node.
#. Move the virtual machines to the node in the new environment
   using live migration.

**To upgrade the hypervisor host:**

#. Log in to the Fuel Master node.
#. Type::

     octane upgrade-node ${SEED_ID} ${NODE_ID}

Upgrade Ceph OSD node
~~~~~~~~~~~~~~~~~~~~~

#. Log in to the Fuel Master node.
#. Type::

     octane upgrade-node ${SEED_ID} ${NODE_ID}

This command redeploys the Ceph OSD nodes with the original dataset.

Complete the upgrade
~~~~~~~~~~~~~~~~~~~~

To complete the upgrade, you must delete the original environment.

**To delete the original environment:**

.. warning::

    The following operation may cause data loss if your upgrade
    operation was not completed successfully. Proceed with caution.

#. Log in to the Fuel Master node.
#. Type::

     fuel env --env $ORIG_ID --delete
