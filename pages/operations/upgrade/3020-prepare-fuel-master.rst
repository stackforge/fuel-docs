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
__________________________

The upgrade logic is automated in the script named ``octane``.
You need to download and install this script from RPM repository
on your Fuel Master node.

Prepare environment variables
_____________________________

There are several variables that need to be set before you start
the upgrade procedure. They will be used throughout the whole process.
These variables include the ID and name of the environment picked
for the upgrade.

.. _upgrade-patch-commands:

Commands To Prepare The Fuel Master Node
________________________________________

Install the ``octane`` application using ``yum`` package manager:

::

    yum install -y fuel-octane

The upgrade script prepares the Fuel Master node with a single command:

::

    octane prepare
