.. index:: Upgrade Environment Quick Start

.. _Upg_QuickStart:

Upgrade Environment Quick Start
-------------------------------

.. CAUTION::

    Only use this section as a reference. Read the detailed sections
    below to  understand the upgrade scenario before running any of
    the listed commands.

This section lists commands required to upgrade a 5.1.1 environment to
version 6.1 with brief comments. For the detailed description of what
each command does and why, see the following sections:

* :ref:`Detailed upgrade procedure<upg_sol>`
* :ref:`Detailed description of commands<upg_script>`

.. CAUTION::

    Do not run the following commands unless you understand exactly
    what you are doing. It can completely destroy your OpenStack
    environment. Please, read the detailed sections below carefully
    before you proceed with these commands.

Install the Upgrade Script
++++++++++++++++++++++++++

Run the following command on the Fuel Master node to download and
install the Upgrade Script in the system:

::

    yum install -y git
    git clone -b stable/6.1 https://github.com/Mirantis/octane.git
    cd octane/octane/bin && ./octane prepare

Pick environment to upgrade
+++++++++++++++++++++++++++

Run the following command and pick an environment to upgrade from the
list:

::

    fuel2 env list

Note the ID of the environment and store it in a variable:

::

    export ORIG_ID=<ID>

Create an Upgrade Seed environment
++++++++++++++++++++++++++++++++++

Run the following command to create a new environment of version 6.1
and store its ID to a variable:

::

    SEED_ID=$(./octane upgrade-env $ORIG_ID)

Upgrade the first Controller
++++++++++++++++++++++++++++

Pick one of the Controllers in your environment by ID and remember
that ID:

::

    fuel node list --env ${ORIG_ID} | awk -F\| '$7~/controller/{print($0)}'

Use the ID of the Controller to upgrade it with the following command:

::

    ./octane upgrade-node $SEED_ID isolated <ID>

Upgrade State Database
++++++++++++++++++++++

After the first Controller in the 6.1 environment is deployed and
ready, run the following command to upgrade the state databases
the of OpenStack services:

::

    ./octane upgrade-db $ORIG_ID $SEED_ID

Upgrade Ceph cluster
++++++++++++++++++++

Run the following command to upgrade the Monitor node on the new
Controller with the state and configuration of the original Ceph
cluster:

::

   ./octane upgrade-ceph $ORIG_ID $SEED_ID

Switch control plane to 6.1
+++++++++++++++++++++++++++

Run the following command to switch the OpenStack environment to the
6.1 control plane:

::

    ./octane upgrade-cics $ORIG_ID $SEED_ID

Upgrade all Controllers
+++++++++++++++++++++++

Identify the remaining Controllers in the 5.1.1 environment by IDs
(ID1, ID2, etc):

::

    fuel node list --env ${ORIG_ID} | awk -F\| '$7~/controller/{print($0)}'

Run the following command to upgrade the remaining 5.1.1 Controllers
to version 6.1:

::

    ./octane upgrade-node $SEED_ID <ID1> <ID2>

Upgrade Compute and Ceph OSD nodes
++++++++++++++++++++++++++++++++++

Repeat the following command for every node in the 5.1.1 environment
identified by ID:

::

    ./octane upgrade-node $SEED_ID <ID>

Clean up the Fuel Master node
+++++++++++++++++++++++++++++

When no nodes remain in the 5.1.1 environment, run the following
command to restore the original state of the 6.1 Fuel Master node:

::

    ./octane cleanup-fuel

Delete the original 5.1.1 environment
+++++++++++++++++++++++++++++++++++++

After verification of the upgraded 6.1 environment, delete the
original 5.1.1 environment with the following command:

::

    fuel env --env $ORIG_ID --delete
