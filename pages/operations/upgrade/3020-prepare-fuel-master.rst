.. index:: Prep Fuel

.. _Upg_Prep:

Prepare Fuel Master
-------------------

Before you start the upgrade procedure, you must prepare your Fuel installer.
There are several changes to the default behavior and configuration of installer
that the upgrade functions depend on. Configuration changes include installation of
additional packages and setting environment variables.

Modifications to the default behavior are implemented as patches and are applied to
multiple components of Fuel.

In this section we briefly describe which components are affected by the change
and why and explain how to apply the patches correctly. Explanations of specific
patches and their purpose will be given below in the sections dedicated to the steps
that make use of those patches:

* :ref:`Patch to Astute<upgrade-patch-astute>`
* :ref:`Patch to Nailgun<upgrade-patch-nailgun>`
* :ref:`Patch to Cobbler snippet<upgrade-patch-cobbler>`
* :ref:`Patch to Fuel Library modules<upgrade-patch-fuel-lib>`

See the instructions on how to apply the patches in section :ref:`Commands To Prepare The
Fuel Master Node<upgrade-patch-commands>`.

Install packages
++++++++++++++++

Changes to the Fuel installer configuration include installation of additional
packages. These packages are present in the standard Fuel repository, but not
installed by default. Utils provided by these packages are used by upgrade
functions on different stages of the process. The upgrade procedure requires the
following packages installed on the Fuel Master node:

* `pssh`
* `patch`
* `postgresql.x86_64`

Download helper scripts
+++++++++++++++++++++++

Some parts of the upgrade logic are implemented as helper scripts. You need to
download those scripts (from GIT repository) and copy over to your Fuel Master.
Clone the helper scripts repository to any Linux workstation connected to the Internet
and to Fuel Master node.

.. note::

    Note that you may need to install ``git`` version control system first.
    The exact details of how to install ``git`` depend on your operating system and
    favorite package manager.

.. _upgrade-patch-astute:

Patch to Astute
+++++++++++++++

Installation of Ceph cluster in Fuel requires OSD nodes, as Astute
post-deployment checks include upload of test image to Glance store. However, it
is possible to patch Astute orchestrator to skip the task and avoid error in the
deployment of Seed environment. With this patch, 6.0 environment will initially
only require a single CIC with one Ceph Monitor on it. Other CICs could be added
in the process of the upgrade.

.. _upgrade-patch-nailgun:

Patch to Nailgun
++++++++++++++++

This patch will allow Nailgun to handle the parameter of a disk metadata that
identifies it as used for Ceph OSD device. This parameter is passed to Cobbler
and is used to disable the erasing and formatting of the device.

.. _upgrade-patch-cobbler:

Patch to Cobbler
++++++++++++++++

This patch will allow Cobbler to identify disks and partitions used for Ceph OSD
devices and preserve data on those partitions through the installation process.
It modifies the ``pmanager.py`` module.

.. _upgrade-patch-fuel-lib:

Patches to Fuel Library
+++++++++++++++++++++++

When installing CIC, Puppet uses Fuel Library of modules to configure the services
and devices on the node. This includes initialization of disks that are used for
Ceph OSD. To preserve data, we need to change the module to skip the initialization of
a particular disk depending on the metadata parameters. The first patch to Fuel
Library adds handling for the 'keep' parameter in disk metadata.

During CIC installation procedure, logical bridges for Public and Management
networks are created between provisioning of the operating system and deployment of
OpenStack services. To ensure that these bridges are not modified during the
deployment, we need to change the ``l23network`` Puppet module in Fuel library. This
patch must make Puppet ignore the existing bridges.

Finally, we need to disable creation of test networks by Fuel. Unfortunately,
it's impossible to do so with pure Puppet configuration, so we need to modify the
manifest to allow an empty ``predefined_nets`` list.

Prepare environment variables
+++++++++++++++++++++++++++++

There are several variables that need to be set before you start the upgrade
procedure. They will be used throughout the whole process. These variables
include ID and name of the environment picked for the upgrade.

.. _upgrade-patch-commands:

Commands To Prepare The Fuel Master Node
++++++++++++++++++++++++++++++++++++++++

In this paragraph, we provide commands that prepare the Fuel Master node to
upgrade an environment.

Install packages
________________

Use the ``yum install`` command to install required packages onto Fuel Master node:

::

    yum install pssh patch postgresql.x86_64

Install Upgrade helper scripts
______________________________

Download helper scripts to use with these instructions. Clone the repository with helper
scripts to any Linux workstation connected to the Internet and to the Fuel
Master node. Use the following command to clone the repository:

::

    git clone ssh://gerrit.mirantis.com:29418/labs/upgrade

.. note::

    You might need to install GIT version control system first. Use your package
    manager to do that. For example, on Ubuntu, run ``apt-get install git`` as the
    'root' user. On CentOS or Fedora, use the ``yum install git`` command.

Copy the ``upgrade/octane`` directory to the Fuel Master node. Replace ``FUEL_IP``
with actual IP address or host name of the Fuel Master node and run the
following command:

::

    scp -r upgrade/octane root@${FUEL_IP}:/root

Apply patch to Astute
_____________________

Disable the post-deployment task ``UploadCirrosImage`` in Astute to allow the deployment of
6.0 environment without Ceph OSD node. Run the following command to comment out
the task in Astute source code inside the Docker container running the
application:

::

    dockerctl shell astute sed -i '94s/^/#/' \
        /usr/lib64/ruby/gems/2.1.0/gems/astute-6.0.0/lib/astute/deploy_actions.rb

Restart Astute orchestrator with the ``supervisorctl`` command:

::

    dockerctl shell astute supervisorctl restart astute

Apply patch to Cobbler
______________________

Use helper script to apply the patch to the Cobbler source code and restart the service
daemon:

::

    pushd /root/octane/patches/pman/
    ./update.sh
    popd

Apply patch to Fuel Library
___________________________

Run the following commands to patch manifests that deploy Ceph cluster. These
patches allow you to keep OSD data through re-installation of Ceph OSD node:

::

    pushd /root/octane/patches/puppet/
    ./update.sh
    popd

Run the following commands to ensure that the existing bridges are not modified during
the deployment:

::

    sed -ie 's%skip_existing = false%skip_existing = true%' \
        /etc/puppet/2014.2-6.0/modules/l23network/manifests/l2/bridge.pp
    sed -ie 's%defaultto(false)%defaultto(true)%' \
        /etc/puppet/2014.2-6.0/modules/l23network/lib/puppet/type/l2_ovs_bridge.rb

Run the command below to disable the creation of pre-defined networks by Puppet.
This is necessary, as pre-defined networks might conflict with the networks imported
from 5.1.1 cloud:

::

    pushd /root/octane/patches
    patch -Np1 --dry-run --silent \
        /etc/puppet/2014.2-6.0/modules/openstack/manifests/controller.pp \
        ./controller.pp.patch 2>/dev/null &&
    patch -Np1 \
        /etc/puppet/2014.2-6.0/modules/openstack/manifests/controller.pp \
        ./controller.pp.patch
    popd

Set environment variables
_________________________

First, you need to set the ``ORIG_ID`` value to the ID number of the environment you want to
upgrade. You can look up the environment ID using :ref:`Fuel CLI<cli_usage>` command,
in the first column of the output table.

::

    fuel env

Now set ``ORIG_ID`` to the ID of the environment picked for the upgrade, for example:

::

    export ORIG_ID=1

Set the ``ENV_NAME`` variable to the name of the environment picked for the upgrade:

::

    export ENV_NAME="$(fuel env --env $ORIG_ID | grep "^$ORIG_ID" \
        | cut -d \| -f 3 | tr -d ' ')"

