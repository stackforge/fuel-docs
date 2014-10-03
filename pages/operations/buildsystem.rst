.. index:: Fuel build system


Fuel build system
=================

To build Fuel components such as ISO or upgrade tarball one can
use `fuel-main repository <https://github.com/stackforge/fuel-main.git>`_.
This repository contains a set of GNU Make build scripts.
And that is all one needs to be able to build Fuel.

Quick start
===========

Make sure your OS is one of the following
* Ubuntu 12.04
* Ubuntu 14.04
Otherwise it is likely build process will fail.

It is also necessary to have git installed in
your system. To figure out whether it is use the command

::

   which git

Then you need to clone fuel-main git repository
somewhere you are going to do your hacking.

::

   mkdir ~/fuel
   cd ~/fuel
   git clone https://github.com/stackforge/fuel-main.git
   cd fuel-main

At the moment you are ready to take a look what are the
components of Fuel build system. First of all there is a
shell script which allows one to automatically prepare a
build environment. Just take a look at **prepare-build-env.sh**
This script checks whether necessary packages are
installed and installs them if they are not. Just run this script

::

   ./prepare-build-env.sh

and please sit back and relax while **prepare-build-env.sh**
installs Fuel build evironment on your computer.

Ok, if it succeded, you can try to build Fuel ISO

::

   make iso

You also can get a list of some of the available make
targets running the command

::

   make help

Inside of fuel-main
===================

Our next step is to go through the fuel-main directory
structure. Fuel build processes are quite complicated,
so to make the fuel-main code easily maintainable it is
split into a bunch of files and directories. Those files
and directories contain independent (or at least almost independent)
pieces of Fuel build system. Let's follow the list

* **Makefile** - This is a main make file which includes all other make modules.
* **config.mk** - This file contains a set parameters which allow one
  to customize a build process, e.g. configure build paths, choose
  one of available upstream mirrors, choose source code repositories and branches,
  customize some of built-in default Fuel settings, customize ISO name, etc.
* **rules.mk** - Here are some often used macroses are defined.
* **repos.mk** - Fuel consists of several components such as web interface,
  puppet modules, orchestration components, testing components.
  Source code of all those components is split into multiple git
  repositories. This directory contains make scripts to download
  necessary source code from a variery of repositories (frankly, just 4).
* **sandbox.mk** - For building some of Fuel components we need to have
  special kind of chroot evironment. For example, for building RPM packages,
  CentOS images we use CentOS chroot environement. This file contains
  shell script definitions for creating and destroying such
  chroot environments.
* **mirror** - Fuel is a tool which allows one to deploy Openstack
  over one of two operating systems CentOS and Ubuntu.
  One can deploy their cluster even if Internet connection
  is unavailable. It is possible because Fuel provides
  fully functional CentOS and Ubuntu mirrors on a master node.
  This directory contains the code which is used to download
  all necessary packages from upstream mirrors and build new
  ones which are to be copied on Fuel ISO.
* **puppet** - This directory contains the code which is used
  to pack Fuel puppet modules into a tarball which then
  is put on Fuel ISO.
* **packages** - All Fuel components are distributed as DEB
  and RPM packages. This directory contains DEB and RPM
  specs as well as make code for building those pacakges.
  Those packages are to be included in Fuel DEB and RPM mirrors.
  And then those packages are supposed to be available
  to install them on Fuel master and slave nodes.
* **bootstrap** - One of the main features of Fuel is
  auto-discovering of nodes which are available for Openstack deployment.
  Nodes in a data center are supposed to boot via PXE from
  Fuel master node with so called **bootstrap** kernel and
  miniroot (a.k.a initrd or initramfs). Bootstrap is CentOS
  based in-memory OS which does not install anything on a hard
  drive but provides a discovery agent which gathers information
  about node's hardware and publishes it on a master node.
  This fuel-main directory contains a make script intended
  to build that CentOS based miniroot image.
* **image** - Fuel provides two options of the way of installing
  OS on target nodes in a cluster. One option is so called
  "Classic" way which means using standard OS installers
  (anaconda for CentOS and debian-installer for Ubuntu).
  Second is so called "Image" based way which it turn means
  copying pre-built CentOS or Ubuntu image on a hard drive on
  a slave node. This directory contains make scripts for
  building CentOS and Ubuntu images using Fuel mirrors
  which are supposed to have been built using scripts in
  the **mirror** directory.
* **docker** - Most of services on Fuel master node are run inside
  Docker containers. There plenty of advantages to use a container
  based model. For example, it allows to simplify significantly
  the process of master node upgrade. This fuel-main directory
  contains make scripts intended to build docker containers which
  are to be deployed on a master node.
* **upgrade** - As already mentioned above Fuel master node
  can be upgraded from one version to another. Fuel ISO allows
  one to install Fuel master node on a bare server while
  Fuel upgrade tarball allows one to upgrade an existing master node.
  This directory contains make scripts for building Fuel upgrade tarball.
* **iso** - The easiest way to use Fuel is to download Fuel ISO
  image and install CentOS based operating system on a bare
  hardware using this ISO. This directory contains make scripts
  for building Fuel ISO.

Fuel-main also contains a set of directories which are not directly
related to Fuel build processes. Those directories are

* **virtualbox** - This directory contains a set of shell scripts
  which allow one to easily deploy Fuel demo lab using virualbox.
  Those scripts work fine both on Linux and on MacOS.
* **utils** - It is just a set of utilities used for maintaining Fuel components.
* **fuelweb_test** and **fuelweb_ui_test** - These directories contain
  the code of Fuel system tests.


Build targets
=============

* **all** This target is for building all Fuel artifacts.
  Currently it is just an alias for **iso** target.
* **bootstrap** This target is for building in-memory bootstrap
  image which is used for auto-discovering.
* **mirror** This target is for building local mirrors. Local mirrors are
  the copies of CentOS and Ubuntu mirrors which are to be placed into Fuel ISO.
  Those mirrors contain all necessary packages including those which are listed in
  requirements-*.txt files which their dependencies as well as those which
  are Fuel packages. Packages listed in requirements-*.txt files are downloaded
  from upstream mirrors while Fuel packages are build from source code.
* **iso** This target is for building Fuel ISO. If successfull,
  ISO is to be put into build/artifacts.
* **img** This target is for building Fuel flash stick image.
  This image is to be binary copied to a flash stick and then that
  stick is supposed to be used as a bootable device. This stick image
  contains Fuel ISO as well as some auxiliary boot files.
* **upgrade** ????
* **clean** This target removes build directory.
* **deep_clean** This target removes build directory and local mirror. If you
  remove local mirror then next time you build ISO build job is going to
  download all necessary packages again. So it is much faster when keeping
  local mirror.


Customizing build process
=========================

There are plenty of variables in make files. Some of them are to be thought
of as build parameters. They are defined in **config.mk**. Let's take a look at
the following list.

* **TOP_DIR** This variable by default is current directory. All other build
  directories are relative to this path.
* **BUILD_DIR** This is where all files used during build process are placed.
  By default it is **$(TOP_DIR)/build**
* **ARTS_DIR** This is where build artifacts such as ISO and IMG files
  are supposed to be put. By default it is **$(BUILD_DIR)/artifacts**
* **LOCAL_MIRROR** This is where local CentOS and Ubuntu mirrors
  are to be placed. By default it is **$(TOP_DIR)/local_mirror**
* **DEPS_DIR** Some of build targets are supposed to depend on artifacts
  of previous build jobs. So, this directory is where those artifacts are
  supposed to be placed before build starts. By default it is **$(TOP_DIR)/deps**
* **ISO_NAME** This is a name of Fuel ISO without file extension.
  E.g. if **ISO_NAME** = **MY_CUSTOM_NAME** then Fuel ISO file will
  be placed into **$(MY_CUSTOM_NAME).iso**.
* **ISO_PATH** Alternatively one can define Fuel ISO full path instead of defining
  just ISO name. By default it is **$(ARTS_DIR)/$(ISO_NAME).iso**.
* **UPGRADE_TARBALL_NAME** This variable defines the name of upgrade tarball.
  Upgrade file will be named **$(UPGRADE_TARBALL_NAME).tar**.
* **UPGRADE_TARBALL_PATH** Alternatively one can define full upgrade tarball path.
  By default it is **$(ARTS_DIR)/$(UPGRADE_TARBALL_NAME).tar**.
* **VBOX_SCRIPTS_NAME** This variables defines the name of the archive which
  contains Virtualbox scripts. This archive will be placed into **$(VBOX_SCRIPTS_NAME).zip**
* **VBOX_SCRIPTS_PATH** Again one can define full path for
  Virtualbox scripts archive. By default **$(ARTS_DIR)/$(VBOX_SCRIPTS_NAME).zip**

Fuel ISO contains some default settings for a master node. One can customize those
settings using the following variables

* **MASTER_IP** This is master node IP address. Default is 10.20.0.2.
* **MASTER_NETMASK** This is master node IP netmask. Default is 255.255.255.0.
* **MASTER_GW** This is master node default gateway. Default is 10.20.0.1.
* **MASTER_DNS** This is where upstream DNS for a master node is located.
  Master node DNS will redirect there all dns requests which it is not able to resolve itself.
  By default it is 10.20.0.1.

These settings can be customized during master node installing.

#TODO - insert screenshot.

Build cases
===========




Other options
-------------

- BUILD_PACKAGES - deprecated.

- BUILD_OPENSTACK_PACKAGES - list of openstack packages to be rebuilt from source.

- [repo]_REPO - remote source code repo. URL or git repository can be specified for each of the Fuel components. Hereineafter repo is one of the following: FUELLIB, NAILGUN, ASTUTE, OSTF.

- [repo]_COMMIT - source branch for each of the Fuel components to build.

- [repo]_GERRIT_URL - gerrit repo.

- [repo]_GERRIT_COMMIT - list of extra commits from gerrit.

- [repo]_SPEC_REPO - repo for rpm/deb specs of OpenStack packages

- [repo]_SPEC_COMMIT - branch for checkout.

- [repo]_SPEC_GERRIT_URL - gerrit repo for OpenStack specs.

- [repo]_SPEC_GERRIT_COMMIT - list of extra commits from gerrit for specs.


TBD: get list of openstack repos - ?


- USE_MIRROR - Use pre-built mirrors from Fuel infrastructure.
  The following mirrors can be used:  ext (external mirror, available from outside of
  Mirantis network), srt (Saratov), msk (Moscow), hrk (Kharkov) or none (reserved for building
  local mirrors, i.e. this case CentOS and Ubuntu packages will be fetched from upstream mirrors, so
  that it will make the build process much slower).It is recommended to choose a mirror that is geographically closest to the build
  server to speed up the ISO build process.

- MIRROR_CENTOS - Download centos packages from a specific remote repo.

- MIRROR_UBUNTU - Download ubuntu packages from a specific remote repo.

- MIRROR_DOCKER - Download docker images from a specific remote url.

- MIRROR_FUEL - Download Fuel centos packages from this repo. Should be converted to external url.

- MIRROR_FUEL_UBUNTU - Download Fuel ubuntu packages from this repo. Should be converted to external url.

- YUM_REPOS - should be depricated.


- EXTRA_RPM_REPOS - extra repos with rpm packages. Each repo must be comma separated tuple with repo-name and repo-path.
  Repos must be separated by space, e.g.
  *qemu2,http://osci-obs.vm.mirantis.net:82/centos-fuel-5.1-stable-15943/centos/ libvirt,http://osci-obs.vm.mirantis.net:82/centos-fuel-5.1-stable-17019/centos/*.


- EXTRA_DEP_REPOS - extra repos with deb packages.  Each repo must consist of an url, dist and section parts.
  Repos must be separated by bar, e.g.
  *http://fuel-repository.mirantis.com/repos/ubuntu-fuel-5.1-stable-15955/ubuntu /|http://fuel-repository.mirantis.com/repos/ubuntu-fuel-5.1-stable-15953/ubuntu/*.


- FEATURE_GROUPS - Options for the iso. Combination of: mirantis (use mirantis logos and logic), experimental (allow experimental features on ui)

If you want to add more packages to the master node, update the **requirements-rpm.txt** and the **requirements-deb.txt** files.
