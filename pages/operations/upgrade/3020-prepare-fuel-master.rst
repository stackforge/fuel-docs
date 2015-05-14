.. index:: Prep Fuel

.. _Upg_Prep:

Prepare Fuel Master
-------------------

Before you start the upgrade procedure, you must prepare your Fuel installer.
There are several changes to default behavior and configuration of installer
that upgrade functions depend on. Configuration changes include installation of
additional packages and setting environment variables.

Modifications to default behavior are implemented as patches and applied to
multiple components of Fuel.

In this section we briefly describe which components are affected by the change
and why and explain how to apply patches correctly. Explanations of specific
patches and their purpose will be given below in sections dedicated to steps
that make use of those patches:

* :ref:`Patch to Astute<upgrade-patch-astute>`
* :ref:`Patch to Nailgun<upgrade-patch-nailgun>`
* :ref:`Patch to Cobbler snippet<upgrade-patch-cobbler>`
* :ref:`Patch to Fuel Library modules<upgrade-patch-fuel-lib>`

See instructions how to apply patches in section :ref:`Commands To Prepare The
Fuel Master Node<upgrade-patch-commands>`.

Install packages
++++++++++++++++

Changes to Fuel installer configuration include installation of additional
packages. These packages are present in standard Fuel repository, but not
installed by default. Utils provided by these packages are used by upgrade
functions on different stages of the process. Upgrade procedure requires the
following packages installed on the Fuel Master node:

* `pssh`
* `patch`
* `postgresql.x86_64`

Download helper scripts
+++++++++++++++++++++++

Some parts of the upgrade logic are implemented as helper scripts. You need to
download those scripts (from GIT repository) and copy over to your Fuel Master.
Clone helper scripts repository to any Linux workstation connected to Internet
and to Fuel master node.

.. note::

    Note that might you need to install ``git`` version control system first.
    Exact details of how to install ``git`` depend on your opertating system and
    favorite package manager.

.. _upgrade-patch-astute:

Patch to Astute
+++++++++++++++

Installation of Ceph cluster in Fuel requires OSD nodes, as Astute
post-deployment checks include upload of test image to Glance store. However, it
is possible to patch Astute orchestrator to skip the task and avoid error in
deployment of Seed environment. With this patch, 6.0 environment will initially
only require a single CIC with one Ceph Monitor on it. Other CICs could be added
in process of upgrade.

.. _upgrade-patch-nailgun:

Patch to Nailgun
++++++++++++++++

This patch will allow Nailgun to handle parameter of a disk metadata that
identifies it as used for Ceph OSD device. This parameter is passed to Cobbler
and used to disable erase and formatting of the device.

.. _upgrade-patch-cobbler:

Patch to Cobbler
++++++++++++++++

This patch will allow Cobbler to identify disks and partitions used for Ceph OSD
devices and preserve data on those partitions through the installation process.
It modifies ``pmanager.py`` module.

.. _upgrade-patch-fuel-lib:

Patches to Fuel Library
+++++++++++++++++++++++

When installing CIC, Puppet uses Fuel Library of modules to configure services
and devices on the node. This includes initialization of disks that are used for
Ceph OSD. To preserve data, we need to change module to skip initialization of
particular disk depending on metadata parameters. The first patch to Fuel
Library adds handling for 'keep' parameter in disk metadata.

During CIC installation procedure, logical bridges for Public and Management
networks are created between provisioning of operating system and deployment of
OpenStack services. To ensure that these bridges are not modified during
deployment, we need to change ``l23network`` Puppet module in Fuel library. This
patch must make Puppet ignore existing bridges.

Finally, we need to disable creation of test networks by Fuel. Unfortunately,
it's impossible to do by pure Puppet configuration, so we need to modify the
manifest to allow empty ``predefined_nets`` list.

Prepare environment variables
+++++++++++++++++++++++++++++

There are several variables that needs to be set before you start upgrade
procedure. They will be used throughout the whole process. These variables
include ID and name of environment picked for upgrade.

.. _upgrade-patch-commands:

Commands To Prepare The Fuel Master Node
++++++++++++++++++++++++++++++++++++++++

In this paragraph, we provide commands that prepare the Fuel Master node to
upgrade an environment.

Install packages
________________

Use ``yum install`` command to install required packages onto Fuel Master node:

::

    yum install pssh patch postgresql.x86_64

Install Upgrade helper scripts
______________________________

Download helper scripts to use with these instructions. Clone repository with helper
scripts to any Linux workstation connected to Internet and to the Fuel
Master node. Use following command to clone repository:

::

    git clone ssh://gerrit.mirantis.com:29418/labs/upgrade

.. note::

    You might need to install GIT version control system first. Use your package
    manager to do that. For example, on Ubuntu, run ``apt-get install git`` as
    'root' user. On CentOS or Fedora, use ``yum install git`` command.

Copy ``upgrade/octane`` directory to the Fuel Master node. Replace ``FUEL_IP``
with actual IP address or host name of the Fuel Master node and run the
following command:

::

    scp -r upgrade/octane root@${FUEL_IP}:/root

Apply patch to Astute
_____________________

Disable post-deployment task ``UploadCirrosImage`` in Astute to allow deployment of
6.0 environment without Ceph OSD node. Run the following command to comment out
the task in Astute source code inside the Docker container running the
application:

::

    dockerctl shell astute sed -i '94s/^/#/' \
        /usr/lib64/ruby/gems/2.1.0/gems/astute-6.0.0/lib/astute/deploy_actions.rb

Restart Astute orchestrator with ``supervisorctl`` command:

::

    dockerctl shell astute supervisorctl restart astute

Apply patch to Cobbler
______________________

Use helper script to apply patch to Cobbler source code and restart the service
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

Run the following commands to ensure that existing bridges are not modified during
deployment:

::

    sed -ie 's%skip_existing = false%skip_existing = true%' \
        /etc/puppet/2014.2-6.0/modules/l23network/manifests/l2/bridge.pp
    sed -ie 's%defaultto(false)%defaultto(true)%' \
        /etc/puppet/2014.2-6.0/modules/l23network/lib/puppet/type/l2_ovs_bridge.rb

Run the command below to disable creation of pre-defined networks by Puppet.
This is necessary, as pre-defined network might conflict with networks imported
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

First, you need to set ``ORIG_ID`` value to the ID number of environment you want to
upgrade. You can look up environment ID using :ref:`Fuel CLI<cli_usage>` command,
in the first column of output table.

::

    fuel env

Now set ``ORIG_ID`` to the ID of environment picked for upgrade, for example:

::

    export ORIG_ID=1

Set ``ENV_NAME`` variable to a name of environment picked for upgrade:

::

    export ENV_NAME="$(fuel env --env $ORIG_ID | grep "^$ORIG_ID" \
        | cut -d \| -f 3 | tr -d ' ')"

