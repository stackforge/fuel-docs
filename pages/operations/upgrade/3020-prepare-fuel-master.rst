.. index:: Prep Fuel

.. _Upg_Prep:

Prepare Fuel Master
+++++++++++++++++++

Before you start the upgrade procedure, you must prepare your Fuel
installer. There are several changes to the default behavior and
configuration of installer that the upgrade functions depend on.
The configuration changes include installation of additional packages
and setting environment variables.

In this section we briefly describe which components are affected by
the change and why, and explain how to apply the patches correctly.
Explanations of specific patches and their purpose will be given below
in the sections dedicated to the steps that make use of those patches:

Install the Upgrade Script
^^^^^^^^^^^^^^^^^^^^^^^^^^

The upgrade logic is automated in the script named ``octane``.
You need to download and install this script from RPM repository
on your Fuel Master node.

Prepare environment variables
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

There are several variables that need to be set before you start
the upgrade procedure. They will be used throughout the whole process.
These variables include the ID and name of the environment picked
for the upgrade.

.. _upgrade-patch-commands:

Commands to Install the Upgrade Script
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Install the ``octane`` application using ``yum`` package manager:

::

    yum install -y fuel-octane

Alternatively, you can use the Git version control system to install the
script from the source code that resides in the upstream repository.

To install the script from the upstream repository:

1. Install dependenecy packages using ``yum install``:

::

    yum install -y git patch python-pip python-paramiko

2. Clone the ``fuel-octane`` repository:

::

    git clone https://git.openstack.org/stackforge/fuel-octane -b stable/7.0

3. Change current directory to ``fuel-octane``.

4. Install the upgrade script:

::

    cd fuel-octane && pip install -e ./
