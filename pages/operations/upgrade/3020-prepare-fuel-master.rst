.. index:: Prep Fuel

.. _Upg_Prep:

Prepare Fuel Master
+++++++++++++++++++

Before you start the upgrade procedure, you must prepare your Fuel installer.
There are several changes to the default behavior and configuration of
installer that the upgrade functions depend on. Configuration changes include
installation of additional packages and setting environment variables.

Modifications to the default behavior are implemented as patches and are
applied to multiple components of Fuel.

In this section we briefly describe which components are affected by the change
and why and explain how to apply the patches correctly. Explanations of
specific patches and their purpose will be given below in the sections
dedicated to the steps that make use of those patches:

* :ref:`Patch to Nailgun<upgrade-patch-nailgun>`
* :ref:`Patch to Cobbler snippet<upgrade-patch-cobbler>`
* :ref:`Patch to Fuel Library modules<upgrade-patch-fuel-lib>`

See the instructions on how to apply the patches in section :ref:`Commands To
Prepare The Fuel Master Node<upgrade-patch-commands>`.

Install the Upgrade Script
__________________________

The upgrade logic is automated in a script named ``octane``. You need to
download and install this script from RPM repository on your Fuel Master.

Install packages
________________

Changes to the Fuel installer configuration include installation of additional
packages. These packages are present in the standard Fuel repository, but not
installed by default. Utils provided by these packages are used by upgrade
functions on different stages of the process. The upgrade procedure requires
the following packages installed on the Fuel Master node:

* `pssh`
* `patch`
* `postgresql.x86_64`

.. _upgrade-patch-nailgun:

Patch to Nailgun
________________

This patch will allow Nailgun to handle the parameter of a disk metadata that
identifies it as used for Ceph OSD device. This parameter is passed to Cobbler
and is used to disable the erasing and formatting of the device.

.. _upgrade-patch-cobbler:

Patch to Cobbler
________________

This patch will allow Cobbler to identify disks and partitions used for Ceph
OSD devices and preserve data on those partitions through the installation
process. It modifies the ``pmanager.py`` module.

.. _upgrade-patch-fuel-lib:

Patches to Fuel Library
_______________________

When installing CIC, Puppet uses Fuel Library of modules to configure the 
services and devices on the node. This includes initialization of disks that
are used for Ceph OSD. To preserve data, we need to change the module to skip
the initialization of a particular disk depending on the metadata parameters.
The first patch to Fuel Library adds handling for the 'keep' parameter in disk
metadata.

We also need to disable creation of test networks by Fuel. Unfortunately,
it's impossible to do so with pure Puppet configuration, so we need to modify
the manifest to allow an empty ``predefined_nets`` list.

Prepare environment variables
_____________________________

There are several variables that need to be set before you start the upgrade
procedure. They will be used throughout the whole process. These variables
include ID and name of the environment picked for the upgrade.

.. _upgrade-patch-commands:

Commands To Prepare The Fuel Master Node
________________________________________

To download the script, you first need to install ``git`` version control system
onto the Fuel Master node:

::

    yum install -y git

Once you have ``git`` installed, clone the repository with the script and libs
into the current directory:

::

    git clone -b stable/6.1 https://github.com/Mirantis/octane.git

Now change to the directory that contains executable files including ``octane``
script itself:

::

    cd octane/octane/bin

Upgrade script prepares the Fuel Master node with a single command:

::

    ./octane prepare
