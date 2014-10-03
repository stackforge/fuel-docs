.. index:: Fuel build system


Fuel build system
=================

Fuel build system is based on make utility. To learn more about this utility, see `make manual <http://www.gnu.org/software/make/manual/make.html>`_.

The basic operating system for Fuel development is Ubuntu Linux.
Currently, Ubuntu 14.04 is supported.

When building Fuel ISO, follow these steps:

1. Check if git is installed. If not, then perform *apt-get install git* command.

2. Clone the **fuel-main** repository. It is the only one required to build Fuel ISO.

3. After cloning, enter the **fuel-main** directory.

4. Launch the **./prepare-build-env.sh** script. It is used to check whether all components for build procedure are present.

5. Perform the **make iso** command. If you want to change ISO build options, use the *make iso OPTION=VALUE* format.
See Build options section.



Fuel ISO modules
----------------

Fuel ISO consists of components; in terms of make utility they are called modules:

- repos - is used to download the source code from Nailgun, Astute, Fuel library and OSTF repos.

- mirror - contains CentOS, Ubuntu and Docker modules.

- puppet - checks already existing Puppet build versions when upgrading.

- packages - contains deb and RPM packages. Slave nodes may require either of them.

- OpenStack packages - RPM packages, necessary for deploying OpenStack.

- Docker - puts all containers into a single archive.

- Upgrade - helps to build data to perform upgrade.

- Virtualbox - ?

- Fuelweb_test - ?

- ISO - puts together all modules to make an ISO.

Build options
-------------

All build options are mentioned in the **config.mk** file.
You can provide options via command line, environment variables or put them directly into the **config.mk** file.

- TOP_DIR - base for calculation of other directories. Not used directly - ?

- BUILD_DIR - path for build objects.

- ARTS_DIR - path for build artifacts.

- LOCAL_MIRROR - path for local mirror.

- DEPS_DIR - path for artifacts from another releases (for upgrade tarball).

- PRODUCT_VERSION - version of master node and current release.

- ISO_NAME - name of ISO file without extension.

- UPGRADE_TARBALL_NAME - name of upgrade tarball without extension.

- OPENSTACK_PATCH_TARBALL_NAME - deprecated

- VBOX_SCRIPTS_NAME - name of zip file with Virtualbox scripts without extension.


The following variables can only be defined in the **config.mk** file:

- ISO_PATH - full path for the iso (overrides ISO_NAME).

- IMG_PATH - full path for the img (overrides ISO_NAME).

- UPGRADE_TARBALL_PATH - full path for upgrade tarball (overrides UPGRADE_TARBALL_NAME).

- VBOX_SCRIPTS_PATH - full path for Virtualbox scripts archive (overrides VBOX_SCRIPTS_NAME).

- NO_UI_OPTIMIZE - use uncompressed UI (for development).

Default network settings for master node
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- MASTER_IP

- MASTER_DNS

- MASTER_NETMASK

- MASTER_GW

Other options
~~~~~~~~~~~~~

- BUILD_PACKAGES - deprecated.

- BUILD_OPENSTACK_PACKAGES - list of openstack packages to be rebuilt from source.

- [repo]_REPO - remote source code repo

- [repo]_COMMIT - branch for checkout.

- [repo]_GERRIT_URL - gerrit repo.

- [repo]_GERRIT_COMMIT - list of extra commits from gerrit.

- [repo]_SPEC_REPO - repo for rpm/deb specs of OpenStack packages

- [repo]_SPEC_COMMIT - branch for checkout.

- [repo]_SPEC_GERRIT_URL - gerrit repo for OpenStack specs.

- [repo]_SPEC_GERRIT_COMMIT - list of extra commits from gerrit for specs.

repo is on of: FUELLIB, NAILGUN, ASTUTE, OSTF.

TBD: get list of openstack repos - ?

- USE_MIRROR - Use pre-built mirrors from Fuel infrastructure. The following mirrors can be used: ext, srt, msk, hrk or none.

- MIRROR_CENTOS - Download centos packages from a specific remote repo.

- MIRROR_UBUNTU - Download ubuntu packages from a specific remote repo.

- MIRROR_DOCKER - Download docker images from a specific remote url.

- MIRROR_FUEL - Download Fuel centos packages from this repo. Should be converted to external url.

- MIRROR_FUEL_UBUNTU - Download Fuel ubuntu packages from this repo. Should be converted to external url.

- YUM_REPOS - should be depricated.

- EXTRA_RPM_REPOS - extra repos with rpm packages. Each repo must be comma separated tuple with repo-name and repo-path. Repos must be separated by space.

- EXTRA_DEP_REPOS - extra repos with deb packages.  Each repo must consist of an url, dist and section parts. Repos must be separated by bar.

- FEATURE_GROUPS - Options for the iso. Combination of: mirantis (use mirantis logos and logic), experimental (allow experimental features on ui)

- DOCKER_PREBUILT - deprecated

- DOCKER_PREBUILT_SOURCE - deprecated

- PRODUCTION - deprecated

If you want to add more packages to the master node, update the **requirements-rpm.txt** and the **requirements-deb.txt** files.

