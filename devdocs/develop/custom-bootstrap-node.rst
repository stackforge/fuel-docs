.. _custom-bootstrap-node:

Bootstrap node
==============

The Fuel bootstrap nodes can be based on the CentOS or Ubuntu
distributions and are respectively called CentOS or Ubuntu bootstrap
nodes. In previous versions of Fuel, the Fuel bootstrap nodes
were based exclusively on CentOS. However, since Fuel 7.0, you can
select from the two bootstraps. Initially, the Ubuntu bootstrap was
introduced as an experimental feature. In current version, the Ubuntu
bootstrap feature is fully supported.

Ubuntu bootstrap
----------------

This section describes how to build and use the Ubuntu bootstrap.

.. note::

 The CentOS bootstrap located in the
 ``/var/www/nailgun/bootstrap`` folder,
 The Ubuntu bootstrap is located in the
 ``/var/www/nailgun/bootstraps/active`` folder.
 The bootstrap location can be changed in the future releases.

To modify a bootsrtap, use one of the following options:

* Create a custom image for bootstrap to replace the default one.

* Modify the copy of original bootstrap image manually
  and activate it. 

Let's take a look at every approach in more details.

.. warning:: Altering the active bootstrap image is quite risky.
  Please create a backup copy of the active bootstrap image,
  make your changes on a copy of the active bootstrap and activate
  the altered image later. 
  You can always create new custom bootstrap if something goes wrong
  and activate the new bootstrap.


Creating a custom bootstrap node
++++++++++++++++++++++++++++++++

You can create a new Ubuntu bootstrap using the
:command:`fuel-bootsrtap` command.
To create and activate a new Ubuntu bootstrap:

#. Build a new bootstrap image as a ``.tar`` archive.

#. Import the configured image from the archive.

#. Activate the new image.

.. note:: The commands for creating the Ubuntu bootstrap
   vary for different versions of Fuel.

To build the new bootstrap image:

#. Type the command: 
   
   .. code-block:: console

      fuel-bootstrap build

   **System response:**
   
   .. code-block:: console

    Try to build image with data:
    bootstrap:
     container: {format: tar.gz, meta_file: metadata.yaml}
     extend_kopts: biosdevname=0 net.ifnames=1 debug ignore_loglevel log_buf_len=10M
       print_fatal_signals=1 LOGLEVEL=8
     extra_files: [/usr/share/fuel_bootstrap_cli/files/trusty]
     label: 93f117b9-65b7-41fa-ade2-52002989dda1
     modules:
     - {mask: kernel, name: kernel, uri: 'http://127.0.0.1:8080/bootstraps/93f117b9-65b7-41fa-ade2-52002989dda1/vmlinuz'}
     - {compress_format: xz, mask: initrd, name: initrd, uri: 'http://127.0.0.1:8080/bootstraps/93f117b9-65b7-41fa-ade2-52002989dda1/initrd.img'}
     - &id001 {compress_format: xz, container: raw, format: ext4, mask: rootfs, name: rootfs,
       uri: 'http://127.0.0.1:8080/bootstraps/93f117b9-65b7-41fa-ade2-52002989dda1/root.squashfs'}
     post_script_file: null
     root_ssh_authorized_file: /root/.ssh/id_rsa.pub
     uuid: 93f117b9-65b7-41fa-ade2-52002989dda1

    ...

    Build process is in progress. Usually it takes 15-20 minutes. It depends on your Internet connection and hardware performance.
    --- Building bootstrap image (do_mkbootstrap) ---
    *** Preparing image space ***
    Installing BASE operating system into image
    Starting new HTTP connection (1): 127.0.0.1
    Starting new HTTP connection (1): mirror.fuel-infra.org
    Starting new HTTP connection (1): mirror.fuel-infra.org
    Starting new HTTP connection (1): mirror.fuel-infra.org
    Building initramfs
    Building squashfs
    squashfs_image clean-up
    Creating archive: /tmp/93f117b9-65b7-41fa-ade2-52002989dda1.tar.gz
    --- Building bootstrap image END (do_mkbootstrap) ---
    Cleanup chroot
    Bootstrap image 93f117b9-65b7-41fa-ade2-52002989dda1 has been built: /tmp/93f117b9-65b7-41fa-ade2-52002989dda1.tar.gz


   A new bootstrap image has been successfully built.
   By default, Fuel places the new bootstrap image into the
   ``/tmp`` folder. For example,
   ``/tmp/93f117b9-65b7-41fa-ade2-52002989dda1.tar.gz``.

#. Import the bootstrap image:

   .. code-block:: console

      fuel-bootstrap import /tmp/93f117b9-65b7-41fa-ade2-52002989dda1.tar.gz

   **System response:**

   .. code-block:: console

     fuel-bootstrap import /tmp/93f117b9-65b7-41fa-ade2-52002989dda1.tar.gz

     Try extract /tmp/93f117b9-65b7-41fa-ade2-52002989dda1.tar.gz to /tmp/tmpaLrxol
     Bootstrap image 93f117b9-65b7-41fa-ade2-52002989dda1 has been imported.

#. Activate the bootstrap image:

   .. code-block:: console

      fuel-bootstrap activate 93f117b9-65b7-41fa-ade2-52002989dda1

   **System response:**

   .. code-block:: console

    Starting new HTTP connection (1): 10.20.0.2
    Starting new HTTP connection (1): 10.20.0.2
    Starting new HTTP connection (1): 10.20.0.2
    Starting new HTTP connection (1): 10.20.0.2
    Bootstrap image 93f117b9-65b7-41fa-ade2-52002989dda1 has been activated.

.. note::

   If you use Fuel 7.0, create and activate a custom Ubuntu
   bootstrap image using the following commands:

   .. code-block:: console

      fuel-bootstrap-image
      fuel-bootstrap-image-set ubuntu

See also:

   * **Fuel Installation Guide**

Modifying initramfs image manually for the bootstrap node
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++

The ``fuel-bootstrap`` utility builds Ubuntu bootstrap. The bootstrap is 
split into two files: ``initrd.img`` and ``root.squashfs``.
Fuel downloads and unpacks the ``intrd.img`` file as a temporary
file system during the PXE boot.
The image makes initialization and downloads the ``root.squashfs`` image.
After that, the ``root.squashfs`` is unpacked. The mount point of the file
system is switched to ``root.squasfs``.

There is a possibility to add a package into a bootstrap
"on the fly" using the following command:

.. code-block:: console

   fuel-bootstrap build --package <package-name>

The command adds the package into both images: ``initrd.img`` and
the ``root.squashfs``.

You can add an arbitrary files and folders into
``root.squasfs`` (but not to ``initrd.img``) using
the following command:

.. code-block:: console

  fuel-bootstrap build --extra-dir <root-path>

There are tasks that require editing a bootstrap manually.
For example, adding kernel module binaries into ``initramfs`` and ``root.squashfs``.

To edit the ``initramfs`` (``initrd.img``) image, unpack the image, modify, and pack it back.
The ``initramfs`` image is a compressed ``cpio`` archive.

.. warning:: The ``initrd.img`` and ``root.squashfs`` location may vary
  for different Fuel versions.

.. warning:: Install ``squashfs-tools`` prior to working
 with the ``root.squashfs`` image.

To change the ``initramfs`` image (``initrd.img``) and ``root.squashfs``, follow the steps below.

#. Unpack ``initrd.img`` and ``root.squashfs``:

   #. Create a folder for modifying bootstrap and copy the ``initramfs``
      and ``root.squashfs`` images into it:

      .. code-block:: console

         mkdir /tmp/initrd-orig
         cp /var/www/nailgun/bootstraps/active_bootstrap/initrd.img /tmp/initrd-orig/
         cp /var/www/nailgun/bootstraps/active_bootstrap/root.squashfs /tmp/initrd-orig/

   #. Unpack ``initramfs``.

      #. Uncompress the ``initrd.img`` file:

         .. code-block:: console

            cd /tmp/initrd-orig/
            mv initrd.img initrd.img.xz
            xz -d initrd.img.xz

      #. Unpack the ``cpio`` archive to the ``initramfs`` folder:

         .. code-block:: console

            mkdir initramfs
            cd initramfs
            cpio -i < ../initrd.img

   #. Unpack the ``root.squashfs`` image into the ``squashfs-root`` folder:

      .. code-block:: console

         cd /tmp/initrd-orig/
         unsquashfs root.squashfs

   #. See the RAM content that you will have in the bootstrap:

      .. code-block:: console

         ls -l /tmp/initrd-orig/initramfs
         ls -l /tmp/initrd-orig/squashfs-root

#. Modify ``initrd.img`` and ``root.squashfs``

   .. warning::

      To add or update a new kernel module, use the :command:`depmod` command.
      It will update the ``modules.alias`` and ``modules.dep`` files informing
      the kernel about the new module.

   .. note::

      There is `a safe way to update kernel modules`_ for Ubuntu, when
      the new module is installed into the ``/lib/modules/<version>/updates`` folder.
      The previous kernel module is still kept in the system, but hidden by
      the new module. When something goes wrong with the new module it can be
      easily removed from the ``/update`` folder and the older version of module
      will be returned back.

      .. _`a safe way to update kernel modules`: http://www.linuxvox.com/2009/10/update-kernel-modules-the-smart-and-safe-way/

   #. Modify it as you need. For example, copy new kernel module ``aacraid``
      into the ``initrd`` corresponding kernel folder:

      .. code-block:: console

         mkdir -p /tmp/initrd-orig/initramfs/lib/modules/3.13.0-77-generic/updates
         cp aacraid.ko /tmp/initrd-orig/initramfs/lib/modules/3.13.0-77-generic/updates

   #. Modify the ``squashfs-root`` by copying the new kernel module ``aacraid``
      into the specified folder (kernel version may be different in your case):

      .. code-block:: console

         mkdir -p /tmp/initrd-orig/squashfs-root/lib/modules/3.13.0-77-generic/updates
         cp aacraid.ko /tmp/initrd-orig/squashfs-root/lib/modules/3.13.0-77-generic/updates

   #. Run :command:`depmod` to update information about kernel modules on ``initrd`` and ``root.squashfs``:

      .. code-block::  console

         depmod -a -b /tmp/initrd-orig/initramfs/ -F /tmp/initrd-orig/squashfs-root/boot/System.map-3.13.0-77-generic 3.13.0-77-generic
         depmod -a -b /tmp/initrd-orig/squashfs-root/ -F /tmp/initrd-orig/squashfs-root/boot/System.map-3.13.0-77-generic 3.13.0-77-generic

      See :command:`depmod` command parameters:

      .. code-block:: console

         depmod -a -b <base dir> -F <System.map location> <kernel version>

      **System response**

      .. code-block:: console

         ====  =================================================================
          -a     Rebuild information for all modules
          -b     Base folder, If your modules are not currently in the (normal)
                 directory /lib/modules/version. In our case it were the folders
                 where initramfs and root.squasfs
          -F     location of the System.map produced when the kernel was built
         ====  =================================================================

      .. note::

         It is important to pass a correct kernel version to the :command:`depmod` command
         at the end of the parameters. Otherwise, the version of the current kernel on
         the Fuel master node will be used.

         The following files will be modified in the ``initramfs`` and ``squashfs-root``
         folders after running the :command:`depmod` command:

         * ``lib/modules/3.13.0-77-generic/modules.alias``
         * ``lib/modules/3.13.0-77-generic/modules.alias.bin``
         * ``lib/modules/3.13.0-77-generic/modules.dep``
         * ``lib/modules/3.13.0-77-generic/modules.dep.bin``
         * ``lib/modules/3.13.0-77-generic/modules.symbols.bin``

      To get more information on how to:

      * Pass options to a module
      * Start ``dependent`` modules
      * Start ``black-list`` modules

      see the ``modprobe.d`` man page.

#. Pack the ``initramfs`` and ``squashfs-root``

   #. Pack the ``initramfs`` back to ``initfamfs.img.new`` image:

      .. code-block:: console

          cd /tmp/initrd-orig/initramfs
          find . | cpio --quiet -o -H newc | xz --check=crc32 > ../initrd.img.new

   #. Pack the ``squashfs`` to the ``root.squashfs.new``

      .. warning::

         ``squashfs`` utilities (``mksquashfs``) installed on a user's machine or
         the Fuel Master node can be incompatible with ``squashfs`` code in the bootstrap
         kernel. To verify the generated ``squashfs image`` is compatible with the
         bootstrap kernel, use ``mksquashfs`` utility installed in ``squashfs-root``.
         A simple way to do that is using bind mounts:

      .. code-block:: console

            cd /tmp/initrd-orig
            mkdir -p /tmp/initrd-orig/squashfs-root/mnt/dst
            mkdir -p /tmp/initrd-orig/dst
            mount --bind dst squashfs-root/mnt/dst
            chroot squashfs-root mksquashfs / /mnt/dst/root.squashfs.new -comp xz -noappend -e /mnt/dst
            # clean up
            umount squashfs-root/mnt/dst

      The output of the mksquashfs command should be as follows:

      .. code-block:: console

            mksquashfs squashfs-root root.squashfs.new -comp xz

              quashfs squashfs-root root.squashfs.new -comp xz
              Parallel mksquashfs: Using 2 processors
              Creating 4.0 filesystem on root.squashfs.new, block size 131072.
              [================================================\] 105857/105857 100%

              Exportable Squashfs 4.0 filesystem, xz compressed, data block size 131072
         	compressed data, compressed metadata, compressed fragments, compressed xattrs
         	duplicates are removed
              Filesystem size 598514.76 Kbytes (584.49 Mbytes)
         	47.89% of uncompressed filesystem size (1249842.98 Kbytes)
              Inode table size 933186 bytes (911.31 Kbytes)
         	23.04% of uncompressed inode table size (4050950 bytes)
              Directory table size 1904568 bytes (1859.93 Kbytes)
         	48.93% of uncompressed directory table size (3892589 bytes)
              Number of duplicate files found 7780
              Number of inodes 121770
              Number of files 106698
              Number of fragments 4627
              Number of symbolic links  6388
              Number of device nodes 81
              Number of fifo nodes 0
              Number of socket nodes 0
              Number of directories 8603
              Number of ids (unique uids + gids) 18
              Number of uids 4
         	root (0)
         	unknown (102)
         	unknown (100)
         	unknown (101)
              Number of gids 17
         	root (0)
         	unknown (44)
         	unknown (29)
         	tty (5)
         	man (15)
         	disk (6)
         	unknown (42)
         	unknown (102)
         	unknown (43)
         	unknown (103)
         	mem (8)
         	unknown (106)
         	ftp (50)
         	unknown (101)
         	unknown (105)
         	adm (4)
         	unknown (104)

   #. Copy new files and update the current bootstrap

      .. code-block:: console

          cp dst/root.squashfs.new initrd.img.new /var/www/nailgun/bootstraps/active_bootstrap/
          cd /var/www/nailgun/bootstraps/active_bootstrap/
          mv initrd.img initrd.img.orig
          mv root.squashfs root.squashfs.orig
          cp initrd.img.new initrd.img
          cp root.squashfs.new root.squashfs
          cobbler sync

   #. Clean up. Remove ``/tmp/initrd-orig`` temporary folder:

      .. code-block:: console

         rm -Rf /tmp/initrd-orig

.. _chroot:

Creating Ubuntu chroot on the Fuel Master node
----------------------------------------------

.. note:: There is an alternative way of creating a ``chroot`` folder on the
   Fuel Master node. You can download prebuilt `VM images`_ for Ubuntu and
   run it with your favorite hypervisor. You can also use an IBP Ubuntu image
   which is built to your Fuel Master node.

.. _`VM images`: http://uec-images.ubuntu.com/trusty/current

This section describes how to create a chroot with Ubuntu on the Fuel Master
node and provides the implementation script.

Creating a ``chroot`` folder on Ubuntu can be useful for:

* Rebuilding kernel modules for Ubuntu
* Creating DKMS DEB packages from sources
* Building kernel modules binaries for a given kernel version with DKMS

The script below creates ``chroot`` on the Fuel Master node using a prebuilt
Ubuntu cloud image **trusty-server-cloudimg-amd64-root.tar.gz** that is
downloaded from the `VM images`_ site. The name of the image and the link
are kept in the ``UBUNTU_IMAGE`` and ``PREBUILT_IMAGE_LINK`` variables
respectively.

.. note:: Before you copy and run the script, modify the ``UBUNTU_IMAGE``,
  ``PREBUILT_IMAGE_LINK``, ``DISTRO_RELEASE``, ``KERNEL_FLAVOR``, or
  ``MIRROR_DISTRO`` variables if required.

The script completes the following steps:

#. Creates ``chroot`` in the ``/tmp`` folder with the *ubuntu-chroot.XXXXX*
   template name (where *XXXXX* is substituted with digits and characters,
   for example, ``/tmp/ubuntu-chroot.Yusk8G``).
#. Mounts the ``/proc`` filesystem and creates a ``/dev`` folder with links to
   ``/proc`` into the ``chroot`` folder.
#. Prepares a configuration for the ``apt`` package manager.
#. Downloads and installs an additional set of packages, listed in the
   ``UBUNTU_PKGS`` variable, to ``chroot``. The packages are required to build
   DKMS and deal with the DEB packages. These packages are: ``linux-headers``,
   ``dkms``, ``build-essential``, and ``debhelper``.

.. note:: The Fuel Master node should have access to the Internet to download
   a required DEB package from the Ubuntu repository.

   Unmount the ``chroot/proc`` file system and delete ``chroot``
   when you do not need it anymore.

.. code-block:: console

 #!/bin/bash

 # Define the kernel flavor and path to the link to a prebuild image.
 [ -z "$KERNEL_FLAVOR"  ] && KERNEL_FLAVOR="-generic-lts-trusty"
 [ -z "$DISTRO_RELEASE" ] && DISTRO_RELEASE="trusty"
 [ -z "$UBUNTU_IMAGE"   ] && UBUNTU_IMAGE="trusty-server-cloudimg-amd64-root.tar.gz"
 [ -z "$PREBUILT_IMAGE_LINK" ] && \
 PREBUILT_IMAGE_LINK="http://uec-images.ubuntu.com/${DISTRO_RELEASE}/current"

 UBUNTU_PKGS="linux-headers${KERNEL_FLAVOR} linux-firmware dkms build-essential debhelper"

 # Create a temporary directory (ubuntu-chroot) using the command:
 # [ -z "$root_dir"  ] &&
 root_dir=$(mktemp -d --tmpdir ubuntu-chroot.XXXXX)
 chmod 755 ${root_dir}

 # Download a prebuilt image and un-tar it.
 # Check if it has been downloaded already.
 if [ ! -e "$UBUNTU_IMAGE" ]; then
  # download
  wget ${PREBUILT_IMAGE_LINK}/${UBUNTU_IMAGE}
 fi
 tar -xzvf "${UBUNTU_IMAGE}" -C ${root_dir}

 # Install required packages and resolve dependencies.
 chroot $root_dir  env \
              LC_ALL=C \
              DEBIAN_FRONTEND=noninteractive \
              DEBCONF_NONINTERACTIVE_SEEN=true \
              TMPDIR=/tmp \
              TMP=/tmp \
              PATH=$PATH:/sbin:/bin \
              apt-get update

 chroot $root_dir  env \
              LC_ALL=C \
              DEBIAN_FRONTEND=noninteractive \
              DEBCONF_NONINTERACTIVE_SEEN=true \
              TMPDIR=/tmp \
              TMP=/tmp \
              PATH=$PATH:/sbin:/bin \
              apt-get install --force-yes --yes $UBUNTU_PKGS

 echo "Don't forget to delete $root_dir at the end"


Adding DKMS kernel modules into bootstrap (Ubuntu)
--------------------------------------------------

The key strength of `Dynamic Kernel Module Support (DKMS) <https://help.ubuntu.com//community/DKMS>`_
is the ability to rebuild the required kernel module for a different version of
kernels. But there is a drawback of installing DKMS kernel modules into
bootstrap. DKMS builds a module during installation, that queries the
installation of additional packages like ``linux-headers`` and a tool-chain
building. It unnecessarily oversizes the bootstrap. The DKMS package actually
should be installed into an IBP (image-based provisioning) image, which will
be deployed on nodes and be re-built during the kernel updates.

.. note::
   You can add kernel modules on bootstrap by making the
   kernel module binaries in a form of a DEB package and by installing the
   package on bootstrap like other packages.

DKMS provides an ability to build a DEB package and a disk driver archive
on the fly from sources.

Ubuntu packages can be built on the Fuel Master node in ``chroot`` with Ubuntu
deployed in ``chroot``. For details, see :ref:`chroot`.

**To create a DKMS package in the ``.deb`` format:**

#. Copy the required module sources to a folder with the corresponding name
   located in ``/usr/src`` of ``chroot``.
#. Create a ``dkms.conf`` configuration file in the ``/usr/src`` directory.
#. Optimize the ``dkms.conf`` file as described in the
   :ref:`dkms_example` section.

.. note::
   If you already have a DKMS package built with sources and want to simply
   export the kernel module binaries to DEB format, install the existing
   DKMS package into the ``chroot`` folder (and skip the
   :ref:`Creating DKMS <create_dkms>` chapter).

.. _create_dkms:

Creating a DKMS package from sources
++++++++++++++++++++++++++++++++++++

Before creating a ``DKMS`` package from sources, verify that you have
completed the following steps:

#. Create the :ref:`chroot folder <chroot>`.
#. Install the following packages to the ``chroot`` folder: ``DKMS``,
   ``build-essential``, and ``debhelper``.

Once you complete the steps above, create a DKMS package from sources:

#. Create a folder for a required kernel module in the *<module name>-<version>*
   format in the ``/usr/src`` directory located in ``chroot``.
   For example, if the module name is i40e and module version is 1.3.47,
   create a ``/usr/src/i40e-1.3.47`` folder in ``chroot``.

#. Copy the sources into the created folder.

#. Create and modify a ``dkms.conf`` file in the
   ``<chroot folder>/usr/src/<module>-<version>/`` directory.

Example of a minimal dkms.conf file
***********************************

Below is an example of a minimal
`dkms.conf <http://linux.dell.com/dkms/dkms-for-developers.pdf>`_ file:

.. code-block:: console

  PACKAGE_NAME="$module_name-dkms"
  PACKAGE_VERSION="$module_version"
  BUILT_MODULE_NAME="$module_name"
  DEST_MODULE_LOCATION="/updates"

The parameters in the minimal ``dkms.conf`` file are obligatory but not
sufficient to build a module. Therefore, proceed with adding additional
parameters to the ``dkms.conf`` file to make it operational. See the
:ref:`dkms_example` section for details.

.. _dkms_example:

Example of an improved dkms.conf file
*************************************

To make your ``dkms.conf`` file operational, add and configure the following
fields: ``MAKE``, ``CLEAN``, and ``BUILD_MODULE_LOCATION``. There are also internal
variables in DKMS that you can use in ``dkms.conf``, for example,
``$kernelver``. For details, see `DKMS Manual page <http://linux.dell.com/dkms/manpage.html>`_.

The table below lists the fields that we use in our example to optimize the
``dkms.conf`` file:

  ======================= ===================================================
  PACKAGE_NAME            The DKMS package name.
  PACKAGE_VERSION         The DKMS package version.
  BUILT_MODULE_NAME       The binary kernel module name to be installed.
  DEST_MODULE_LOCATION    The install location of the binary kernel module.
  MAKE                    The :command:`make` command to build the kernel
                          module bounded to the kernel version, sources, and
                          so on.
  BUILD_KERNEL            The kernel version for which the module should be
                          build. Use an internal variable ``$kernelver`` here.
  CLEAN                   The ``clean`` directive to clean up after the module
                          build.
  BUILT_MODULE_LOCATION   The location of the sources in the DKMS tree.
  REMAKE_INITRD           Whether the ``initrd`` will be rebuilt or not when
                          the module is installed.
  ======================= ===================================================

For the i40e module that is used in our example, the following configuration
is applied:

.. code-block:: console

  PACKAGE_NAME="i40e-dkms"
  PACKAGE_VERSION="1.3.47"
  BUILT_MODULE_NAME="i40e"
  DEST_MODULE_LOCATION="/updates"
  MAKE="make -C src/ KERNELDIR=/lib/modules/\${kernelver}/build"
  BUILD_KERNEL="\${kernelver}"
  CLEAN="make -C src/ clean"
  BUILT_MODULE_LOCATION="src/"
  REMAKE_INITRD="yes"

.. note::
   The path that is set in the configuration file is bound to the DKMS tree.
   For example,  ``DEST_MODULE_LOCATION="/updates"`` actually means
   ``/lib/modules/$kernelver/updates``.

   We recommend that you install new modules in the ``/updates`` directory for a
   `safe update <http://www.linuxvox.com/2009/10/update-kernel-modules-the-smart-and-safe-way>`_
   of the kernel modules.

Exporting DKMS package and kernel binaries
******************************************

When ``dkms.conf`` is ready, you can build the binaries in ``chroot`` and
export the ``DKMS`` package with kernel module binaries to the ``.deb`` format.

Use the DKMS commands to add and build a DKMS module for a particular kernel
version.

When the build is done, run the following commands to create a DEB package
and a disk-driver ``.tar`` archive in ``chroot``:

.. code-block:: console

   mkdeb
   mkdriverdisk

See details in the bash script below.

The script builds a DKMS package in ``chroot``. The output is a disk-driver
archive containing the module binaries built against the kernel installed in
the ``chroot`` .

The second produced package is a DKMS module. The output is placed into the
``/tmp/dkms-deb`` folder:

.. code-block:: console

 $ ls /tmp/dkms-deb/
 i40e-1.3.47-ubuntu-dd.tar  i40e-dkms_1.3.47_all.deb

.. code-block:: console

 The script requires following parameters to be provided:
 $1 - ``chroot`` folder with Ubuntu has been deployed
 $2 - module name
 $3 - module version
 $4 - path to the folder where is sources of the kernel module

.. warning::
   The script unmounts the ``/proc`` file system from ``chroot`` and
   finally deletes ``chroot`` made by the first script. Run the script with
   the root privileges.

.. code-block:: console

 #!/bin/bash
 # Check passed parameters, expectations are following:
 # $1 - chroot folder with Ubuntu has been deployed
 # $2 - module name
 # $3 - module version
 # $4 - path to the folder where is sources of the kernel module

 if [ $# != 4 ] ;
 then
   echo "ERR: Passed wrong number of parameters, the expectation are following"
   echo " $1 - chroot folder with Ubuntu has been deployed"
   echo " $2 - module name"
   echo " $3 - module version"
   echo " $4 - path to the folder where is sources of the module"
   echo "$0 <chroot_dir> <module-name> <module-version> <path-to-src>"
   exit 1;
 else
    root_dir=$1 # chroot folder
    module_name=$2
    module_version=$3
    module_src_dir=$4
 fi
 if [ ! -d "$root_dir" ]  ||  [ ! -d "$module_src_dir" ] ;
 then
     echo "ERR: The $root_dir or $module_src_dir was not found";
     exit 1;
 fi

 output_dir="/tmp/dkms-deb"

 # Create the folder ${root_dir}/usr/src/${module-name}-${module-version}
 mkdir -p "${root_dir}/usr/src/${module_name}-${module_version}"
 chmod 755 "${root_dir}/usr/src/${module_name}-${module_version}"

 # Copy sources into the folder
 cp -R "$module_src_dir"/* \
     ${root_dir}/usr/src/${module_name}-${module_version}

 # Create the dkms.conf package
 cat > "${root_dir}/usr/src/${module_name}-${module_version}/dkms.conf" <<-EOF
 MAKE="make -C src/ KERNELDIR=/lib/modules/\${kernelver}/build"
 BUILD_KERNEL="\${kernelver}"
 CLEAN="make -C src/ clean"
 BUILT_MODULE_NAME="$module_name"
 BUILT_MODULE_LOCATION="src/"
 DEST_MODULE_LOCATION="/updates"
 PACKAGE_NAME="$module_name-dkms"
 PACKAGE_VERSION="$module_version"
 REMAKE_INITRD="yes"
 EOF

 # Deduce the kernel version
 KERNELDIR=$(ls -d ${root_dir}/lib/modules/*)
 kv="${KERNELDIR##*/}"

 # Build the binaries by DKMS
 # Add the dkms
 chroot $root_dir  env \
                 LC_ALL=C \
                 DEBIAN_FRONTEND=noninteractive \
                 DEBCONF_NONINTERACTIVE_SEEN=true \
                 TMPDIR=/tmp \
                 TMP=/tmp \
                 PATH=$PATH:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin \
                 BUILD_KERNEL=${kv} \
                 dkms add -m "${module_name}"/"${module_version}" -k ${kv}

 # Build the kernel module by dkms
 chroot $root_dir  env \
                 LC_ALL=C \
                 DEBIAN_FRONTEND=noninteractive \
                 DEBCONF_NONINTERACTIVE_SEEN=true \
                 TMPDIR=/tmp \
                 TMP=/tmp \
                 PATH=$PATH:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin \
                 BUILD_KERNEL=${kv} \
                 dkms build -m "${module_name}"/"${module_version}" -k ${kv}

 # Create the deb-dkms package
 chroot $root_dir  env \
                 LC_ALL=C \
                 DEBIAN_FRONTEND=noninteractive \
                 DEBCONF_NONINTERACTIVE_SEEN=true \
                 TMPDIR=/tmp \
                 TMP=/tmp \
                 PATH=$PATH:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin \
                 BUILD_KERNEL=${kernelver} \
                 dkms mkdeb -m "${module_name}"/"${module_version}" -k ${kv}

 # Create the disk-driver archive with
 # module binaries in deb package ready to install on bootstrap
 chroot $root_dir  env \
                 LC_ALL=C \
                 DEBIAN_FRONTEND=noninteractive \
                 DEBCONF_NONINTERACTIVE_SEEN=true \
                 TMPDIR=/tmp \
                 TMP=/tmp \
                 BUILD_KERNEL=${kv} \
                 PATH=$PATH:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin \
                 dkms mkdriverdisk -m "${module_name}"/"${module_version}" \
                         -k ${kv} -d ubuntu --media tar

 # Create /tmp/dkms-deb folder and copy the created deb file into it
 if [ ! -d "${output_dir}" ];
    then
    mkdir -p ${output_dir}
 fi
 # Copy the built deb dkms package into the folder
 # and driver disk tar archive.i
 # The archive contains the binary module as a deb package for given kernel version
 #
 cp ${root_dir}/var/lib/dkms/${module_name}/${module_version}/deb/*.deb ${output_dir}
 cp ${root_dir}/var/lib/dkms/${module_name}/${module_version}/driver_disk/*.tar ${output_dir}

 # Don't forget to umount ${root_dir}/proc and remove ${root_dir}
 umount ${root_dir}/proc
 rm -Rf ${root_dir}

Extracting kernel module binaries
*********************************

The ``/tmp/dkms-deb`` folder contains a built DKMS DEB package. You can
install it into IBP. The ``DEB`` package with the kernel module binaries
built for a given kernel version is archived in the disk-driver archive.

Unpack the ``.tar`` file and copy the ``.deb`` file into the repository.
For example, if the archive is ``i40e-1.3.47-ubuntu-dd.tar`` and the i40e
module was built for kernel 3.13.0-77-generic, the output should be the
following:

.. code-block:: console

 tar -xvf i40e-1.3.47-ubuntu-dd.tar
 ./
 ./ubuntu-drivers/
 ./ubuntu-drivers/3.13.0/
 ./ubuntu-drivers/3.13.0/i40e_1.3.47-3.13.0-77-generic_x86_64.deb
 ...

The ``i40e_1.3.47-3.13.0-77-generic_x86_64.deb`` package contains the kernel
module binaries for kernel 3.13.0-77-generic that you install on the
bootstrap with the kernel.

.. warning::
   Updating the new kernel for Ubuntu requires rebuilding the DKMS package
   against a new kernel in order to get the module binaries package.

Known Issues
************

Not all the kernel module sources can be compiled by DKMS.

DKMS builds the given drivers sources against different kernels versions.
The ABI (kernel functions) may be changed among different kernels, and
the compilation of a module can potentially fail when calling
non-existing of expired functions.

The example below shows an attempt to build a module taken from one kernel
version against the other kernel version:

.. code-block:: console

  # dkms build -m be2net/10.4u

  Kernel preparation unnecessary for this kernel.  Skipping...

  Building module:
  make clean
  make: *** No rule to make target `clean'.  Stop.
  (bad exit status: 2)
  { make KERNELRELEASE=3.13.0-77-generic -C /lib/modules/3.13.0-77-generic/build SUBDIRS=/var/lib/dkms/be2net/10.4u/build modules; } >> /var/lib/dkms/be2net/10.4u/build/make.log 2>&1
  (bad exit status: 2)
  ERROR (dkms apport): binary package for be2net: 10.4u not found
  Error! Bad return status for module build on kernel: 3.13.0-77-generic (x86_64)
  Consult /var/lib/dkms/be2net/10.4u/build/make.log for more information.

The ``make.log`` file contains errors that some functions or structures
have not been declared or declared implicitly:

.. code-block:: console

  # cat /var/lib/dkms/be2net/10.4u/build/make.log
  DKMS make.log for be2net-10.4u for kernel 3.13.0-77-generic (x86_64)

  make: Entering directory `/usr/src/linux-headers-3.13.0-77-generic'
  CC [M]  /var/lib/dkms/be2net/10.4u/build/be_main.o
  /var/lib/dkms/be2net/10.4u/build/be_main.c: In function ‘be_mac_addr_set’:
  /var/lib/dkms/be2net/10.4u/build/be_main.c:315:2: error: implicit declaration of function ‘ether_addr_copy’ [-Werror=implicit-function-declaration]
  ether_addr_copy(netdev->dev_addr, addr->sa_data);
  ^
  /var/lib/dkms/be2net/10.4u/build/be_main.c: In function ‘be_get_tx_vlan_tag’:
  /var/lib/dkms/be2net/10.4u/build/be_main.c:727:2: error: implicit declaration of function ‘skb_vlan_tag_get’ [-Werror=implicit-function-declaration]
  vlan_tag = skb_vlan_tag_get(skb);
  ^
  /var/lib/dkms/be2net/10.4u/build/be_main.c: In function ‘be_get_wrb_params_from_skb’:
  /var/lib/dkms/be2net/10.4u/build/be_main.c:789:2: error: implicit declaration of function ‘skb_vlan_tag_present’ [-Werror=implicit-function-declaration]
  if (skb_vlan_tag_present(skb)) {
  ^
  /var/lib/dkms/be2net/10.4u/build/be_main.c: In function ‘be_insert_vlan_in_pkt’:
  /var/lib/dkms/be2net/10.4u/build/be_main.c:1001:3: error: implicit declaration of function ‘vlan_insert_tag_set_proto’ [-Werror=implicit-function-declaration]
   skb = vlan_insert_tag_set_proto(skb, htons(ETH_P_8021Q),
   ^
  /var/lib/dkms/be2net/10.4u/build/be_main.c:1001:7: warning: assignment makes pointer from integer without a cast [enabled by default]
   skb = vlan_insert_tag_set_proto(skb, htons(ETH_P_8021Q),
       ^
  /var/lib/dkms/be2net/10.4u/build/be_main.c:1011:7: warning: assignment makes pointer from integer without a cast [enabled by default]
   skb = vlan_insert_tag_set_proto(skb, htons(ETH_P_8021Q),
       ^
  /var/lib/dkms/be2net/10.4u/build/be_main.c: In function ‘be_xmit_workarounds’:
  /var/lib/dkms/be2net/10.4u/build/be_main.c:1132:3: error: implicit declaration of function ‘skb_put_padto’ [-Werror=implicit-function-declaration]
   if (skb_put_padto(skb, 36))
   ^
  /var/lib/dkms/be2net/10.4u/build/be_main.c: In function ‘be_xmit’:
  /var/lib/dkms/be2net/10.4u/build/be_main.c:1299:19: error: ‘struct sk_buff’ has no member named ‘xmit_more’
  bool flush = !skb->xmit_more;

To make the kernel module sources compatible with different kernels, the
sources should contain the wrappers, which are re-declaring changed functions
depending on the kernel version. This work should be done by driver developers.

The example below shows the ``compat.h`` file wrapper:

.. code-block:: console

 /*
 * This file is part of the Linux NIC driver for Emulex networking products.
 *
 * Copyright (C) 2005-2015 Emulex. All rights reserved.
 *
 * EMULEX and SLI are trademarks of Emulex.
 * www.emulex.com
 * linux-drivers@emulex.com
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of version 2 of the GNU General Public License as
 * published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful.
 * ALL EXPRESS OR IMPLIED CONDITIONS, REPRESENTATIONS AND WARRANTIES,
 * INCLUDING ANY IMPLIED WARRANTY OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE, OR NON-INFRINGEMENT, ARE DISCLAIMED, EXCEPT TO THE
 * EXTENT THAT SUCH DISCLAIMERS ARE HELD TO BE LEGALLY INVALID.
 * See the GNU General Public License for more details, a copy of which
 * can be found in the file COPYING included with this package
 */

 #ifndef BE_COMPAT_H
 #define BE_COMPAT_H

 #ifdef RHEL_RELEASE_CODE
 #define RHEL
 #endif

 #ifndef RHEL_RELEASE_CODE
 #define RHEL_RELEASE_CODE 0
 #endif

 #ifndef RHEL_RELEASE_VERSION
 #define RHEL_RELEASE_VERSION(a,b) (((a) << 8) + (b))
 #endif

 #ifndef NETIF_F_HW_VLAN_CTAG_DEFINED
 #define NETIF_F_HW_VLAN_CTAG_TX         NETIF_F_HW_VLAN_TX
 #define NETIF_F_HW_VLAN_CTAG_RX         NETIF_F_HW_VLAN_RX
 #define NETIF_F_HW_VLAN_CTAG_FILTER     NETIF_F_HW_VLAN_FILTER
 #endif

 /*************************** NAPI backport ********************************/
 #if LINUX_VERSION_CODE < KERNEL_VERSION(2, 6, 27)

 /* RHEL 5.4+ has a half baked napi_struct implementation.
 * Bypass it and use simulated NAPI using multiple netdev structs
 */
 #ifdef RHEL
 typedef struct napi_struct        rhel_napi;
 #endif

 #define netif_napi_add           netif_napi_add_compat
 #define netif_napi_del           netif_napi_del_compat
 #define napi_gro_frags(napi)     napi_gro_frags((rhel_napi*) napi)
 #define napi_get_frags(napi)     napi_get_frags((rhel_napi*) napi)
 #define vlan_gro_frags(napi, g, v)    vlan_gro_frags((rhel_napi*) napi, g, v);
 #define napi_schedule(napi)      netif_rx_schedule((napi)->dev)
 #define napi_enable(napi)        netif_poll_enable((napi)->dev)
 #define napi_disable(napi)       netif_poll_disable((napi)->dev)
 #define napi_complete(napi)      napi_gro_flush((rhel_napi *)napi); \
                   netif_rx_complete(napi->dev)
 #define napi_schedule_prep(napi)    netif_rx_schedule_prep((napi)->dev)
 #define __napi_schedule(napi)        __netif_rx_schedule((napi)->dev)

 #define napi_struct           napi_struct_compat

 struct napi_struct_compat {
 #ifdef RHEL
    rhel_napi napi;    /* must be the first member */
 #endif
    struct net_device *dev;
    int (*poll) (struct napi_struct *napi, int budget);
 };

 extern void netif_napi_del_compat(struct napi_struct *napi);
 extern void netif_napi_add_compat(struct net_device *, struct napi_struct *,
               int (*poll) (struct napi_struct *, int), int);
 #endif /*********************** NAPI backport *****************************/

CentOS bootstrap
----------------

This section describes creating a custom CentOS bootstrap image.

.. note::

   Since the Fuel 8.0 version, CentOS bootstrap is depricated and not
   recommended for using.

Creating and injecting the initrd_update into bootstrap
+++++++++++++++++++++++++++++++++++++++++++++++++++++++

A typical use case for creating initrd_update looks as follows:
a great number of proprietary drivers for equipment cannot be
shipped with GA Fuel ISO due to legal issues
and should be installed by users themselves.

That means, you can add (or inject) the required issues (drivers,
scripts etc.) during Fuel ISO
installation procedure.

Injection workflow consists of several stages:

#. Prepare the injected initramfs image with the required kernel modules (for CentOS).
#. Modify bootstrap (CentOS)

**Prepare injected initramfs image for CentOS**

The injected initramfs image should contain
the files what are going to be put on (or let's say injected into)
the original initramfs on the bootstrap in addition to
the deployed (original) RAM file system.

The injected initramfs image should have the following structure:

::

    /
    /lib/modules/<kernel-version>/kernel/<path-to-the-driver>/<module.ko>
    /etc/modprobe.d/<module>.conf

Let's put all required files into the folder called *dd-src* and create the image.
For example, we need the 2.6.32-504 (CentOs 6.6) kernel:

#. Create the working folder dd-src:

   ::

       mkdir dd-src

#. Put the kernel modules into:

   ::

      mkdir -p ./dd-src/lib/modules/2.6.32-504.1.3.el6.x86_64/kernel/drivers/scsi
      cp hpvsa.ko ./dd-src/lib/modules/2.6.32-504.1.3.el6.x86_64/kernel/drivers/scsi


#. Put the *<module-name>.conf* file with the modprobe command into
   the *etc/modprobe.d/* folder:

   ::

      mkdir -p ./dd-src/etc/modprobe.d/
      echo modprobe hpvsa > ./dd-src/etc/modprobe.d/hpvsa.conf
      chmod +x ./dd-src/etc/modprobe.d/hpvsa.conf


   There is the second (deprecated) way:
   create the */etc/rc.modules* executable file and list the command to probe with the module name.
   Do not use */etc/rc.local* file for this purpose,
   because it is too late for init hardware:

   ::

      mkdir ./dd-src/etc
      echo modprobe hpvsa > ./dd-src/etc/rc.modules
      chmod +x ./dd-src/etc/rc.modules




#. Create the dd-src.tar.gz file for coping to the Fuel Master node:

   ::

      tar -czvf dd-src.tar.gz ./dd-src

   The *dd-src.tar.gz* file can now be copied to the Fuel Master node.


**Adding initrd_update image to the bootstrap**

.. note:: Currently, the bootstrap is based on CentOS (kernel and modules).


Let's assume that the Fuel Master node has been deployed:

#. Connect to the Fuel Master node:

   ::

       ssh root@<your-Fuel-Master-node-IP>

#. Prepare initramfs update image:

   ::

      tar -xzvf dd-src.tar.gz
      cd dd-src
      find . | cpio --quiet -o -H newc | gzip -9 > /tmp/initrd_update.img

#. Copy into the TFTP (PXE) bootstrap folder:

   ::

       cp /tmp/initrd_update.img /var/www/nailgun/bootstrap/
       chmod 755 /var/www/nailgun/bootstrap/initrd_update.img

#. Copy inside the cobbler container to the folder:

   ::

       dockerctl copy initrd_update.img cobbler:/var/lib/tftpboot/initrd_update.img

#. Modify the bootstrap menu initrd parameter.

   * Log into the cobbler container:

     ::

         dockerctl shell cobbler

   * Get the variable kopts variable value:

      ::

          cobbler profile dumpvars --name=bootstrap | grep kernel_options
          kernel_options : ksdevice=bootif locale=en_US text mco_user=mcollective initrd=initrd_update.img biosdevname=0 lang url=http://10.20.0.2:8000/api priority=critical mco_pass=HfQqE2Td kssendmac

   * Add *initrd=initrd_update.img* at the beginning of the string
     and re-sync the container. It turns into the kernel
     parameter passing to the kernel on boot
     'initrd=initramfs.img,initrd_update.img':

     ::

         cobbler profile edit --name bootstrap --kopts='initrd=initrd_update.img ksdevice=bootif lang=  locale=en_US text mco_user=mcollective priority=critical url=http://10.20.0.2:8000/api biosdevname=0 mco_pass=HfQqE2Td kssendmac'
         cobbler sync


Modifying initramfs image manually for bootstrap node
+++++++++++++++++++++++++++++++++++++++++++++++++++++

To edit the initramfs (initrd) image,
you should unpack it, modify and pack back.
Initramfs image is a gzip-ed cpio archive.

To change initramfs image, follow these steps:

#. Create a folder for modifying initramfs image and copy the initramfs image into it:

   ::

     mkdir /tmp/initrd-orig
     dockerctl copy cobbler:/var/lib/tftpboot/images/bootstrap/initramfs.img /tmp/initrd-orig/

#. Unpack initramfs image. First of all, unzip it:

   ::

      cd /tmp/initrd-orig/
      mv initramfs.img initramfs.img.gz
      gunzip initramfs.img.gz

#. Unpack the cpio archive to the initramfs folder:

   ::

      mkdir initramfs
      cd initramfs
      cpio -i < ../initramfs.img

#. Now you have the file system what you have in the RAM on the bootstrap:

   ::

     ls -l /tmp/initrd-orig/initramfs

#. Modify it as you need. For example, copy files or modify the scripts:

   ::

      cp hpvsa.ko lib/modules/2.6.32-504.1.3.el6.x86_64/kernel/drivers/scsi/
      echo "modprobe hpvsa" > etc/modprobe.d/hpvsa.conf


    To get more information on how to pass options to
    the module, start dependent modules or black-list modules please,
    consult see the *modprobe.d* man page.

    ::

        vi etc/modprobe.d/blacklist.conf

#. Pack the initramfs back to **initramfs.img.new** image:

   ::

      cd /tmp/initrd-orig/initramfs
      find . | cpio --quiet -o -H newc | gzip -9 > /tmp/initramfs.img.new

#. Clean up. Remove */tmp/initrd-orig* temporary folder:

   ::

      rm -Rf /tmp/initrd-orig/


Creating a custom bootstrap node
++++++++++++++++++++++++++++++++

This option requires further investigation
and will be introduced in the near future.


**Replacing default bootstrap node with the custom one**

Let's suppose that you have created or modified
the initramfs image. It is placed in the */tmp* folder under **initramfs.img.new** name.

To replace the default bootstrap with the custom,
follow these steps:

#. Save the previous initramfs image:

   ::

       mv /var/www/nailgun/bootstrap/initramfs.img /var/www/nailgun/bootstrap/initramfs.img.old


#. Copy the new initramfs image into the bootstrap folder:

   ::

      cd /tmp
      cp initramfs.img.new /var/www/nailgun/bootstrap/initramfs.img
      dockerctl copy /var/www/nailgun/bootstrap/initramfs.img cobbler:/var/lib/tftpboot/images/bootstrap/initramfs.img

#. Make the Cobbler update the files:

   ::

      cobbler sync

