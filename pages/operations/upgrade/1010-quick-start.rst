.. index:: Upgrade Environment Quick Start

.. _Upg_QuickStart:

Upgrade Environment Quick Start
-------------------------------

.. CAUTION::

    Only use this section as a reference. Read the detailed sections
    below to  understand the upgrade scenario before running any of
    the listed commands.

This section lists commands required to upgrade a 6.1 environment to
version 7.0 with brief comments. For the detailed description of what
each command does and why, see the following sections:

* :ref:`Detailed upgrade procedure<upg_sol>`
* :ref:`Detailed description of commands<upg_script>`

.. CAUTION::

    Do not run the following commands unless you understand exactly
    what you are doing. It can completely destroy your OpenStack
    environment. Please, read the detailed sections below carefully
    before you proceed with these commands.

*1. Install the Upgrade Script*

Run the following command on the Fuel Master node to download and
install the Upgrade Script in the system:

::

    yum install -y fuel-octane

Alternatively, you can install the script from Git repository. First,
install dependency packages:

::

    yum install -y git patch python-pip python-paramiko

Then use ``git`` command to clone the ``fuel-octane`` repository. You
need to specify branch ``stable/7.0`` as a default:

::

    git clone https://git.openstack.org/stackforge/fuel-octane -b stable/7.0

Finally, install the script as a Python package using ``pip`` command:

::

    cd fuel-octane && pip install -e ./

*2. Pick environment to upgrade*

Run the following command and pick an environment to upgrade from the
list:

::

    fuel2 env list

Note the ID of the environment and store it in a variable:

::

    export ORIG_ID=<ID>

*3. Create an Upgrade Seed environment*

Run the following command to create a new environment of version 7.0
and store its ID to a variable:

::

    SEED_ID=$(octane upgrade-env $ORIG_ID)

*4. Upgrade the first Controller*

Pick one of the Controllers in your environment by ID and remember
that ID:

::

    fuel node list --env ${ORIG_ID} | awk -F\| '$7~/controller/{print($0)}'

Use the ID of the Controller to upgrade it with the following command:

::

    octane upgrade-node --isolated $SEED_ID <ID>

*5. Upgrade State Database*

After the first Controller in the 7.0 environment is deployed and
ready, run the following command to upgrade the state databases
the of OpenStack services:

::

    octane upgrade-db $ORIG_ID $SEED_ID

*6. Upgrade Ceph cluster*

Run the following command to upgrade the Monitor node on the new
Controller with the state and configuration of the original Ceph
cluster:

::

   octane upgrade-ceph $ORIG_ID $SEED_ID

*7. Switch control plane to 7.0*

Run the following command to switch the OpenStack environment to the
7.0 control plane:

::

    octane upgrade-controlplane $ORIG_ID $SEED_ID

*8. Upgrade all Controllers*

Identify the remaining Controllers in the 6.1 environment by IDs
(ID1, ID2, etc):

::

    fuel node list --env ${ORIG_ID} | awk -F\| '$7~/controller/{print($0)}'

Run the following command to upgrade the remaining 6.1 Controllers
to version 7.0:

::

    octane upgrade-node $SEED_ID <ID1> <ID2>

*9. Upgrade Compute and Ceph OSD nodes*

Repeat the following command for every node in the 6.1 environment
identified by ID:

::

    octane upgrade-node $SEED_ID <ID>

*10. Delete the original 6.1 environment*

After verification of the upgraded 7.0 environment, delete the
original 6.1 environment with the following command:

::

    fuel env --env $ORIG_ID --delete
