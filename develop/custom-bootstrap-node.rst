.. _custom-bootstrap-node:


Bootstrap node
==============

Fuel bootstrap nodes are based either CentoOS or Ubuntu
distributives and are called CentOS bootstrap or Ubuntu
bootstrap correspondingly. The MOS(s) prior the version 7.0 are
all based on CentOS. The MOS 7.0 allowes using both types
of bootstraps (Ubuntu and CentOS), but the Ubuntu bootstrap was
targeted as an experimental feature on account of the
`Undetermenistic network interfaces naming bug`_.
MOS 8.0 also has both bootstraps (Ubuntu and Centos), but the
CentOS bootstrap is targetted as depricated and not suggested
for using it any more (since the MOS 8.0 version).

.. _`Undetermenistic network interfaces naming bug`: https://bugs.launchpad.net/mos/+bug/1487044

.. note:: *This version of the document describes how to deal
 with the Ubuntu bootstrap. Please consult the previous document
 version for CentOS bootstrap.*

.. note:: Please take into account, that Ubuntu bootstrap and
 CentOS bootstrap are placed at the different folders.
 The CentOS bootstrap could be find at
 **/var/www/nailgun/bootstrap** folder,
 the current Ubuntu bootstrap is located at the
 **/var/www/nailgun/bootstraps/active** folder.
 Please keep in mind, that the folders could be changed in future.

When you would like to bring changes
into bootstrap, you should take up either of the
options:

* create a custom initramfs image for
  bootstrap to replace the default one.

* modify the original initramfs image manually

Let's take a look at every approach in more details.


Creating a custom bootstrap node (Ubuntu)
-----------------------------------------

.. warning:: The commands for creating Ubuntu bootstrap are
 different for MOS 8.0 and MOS 7.0 .

MOS 8.0 allows us creating a new Ubuntu bootstrap with
the command **fuel-bootstrap** with different keys. Please
consult the MOS 8.0 documentation for the details.
The three steps are required to create new Ubuntu bootstrap
and activate it (make it the current active image):

* build new bootstrap image (it is built as a tar archive)

* import the built image from the archive

* activate the new image

To build the new image please type the command fuel-bootstrap build:

.. code-block:: console

  fuel-bootstrap build

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

  ===== Some output was skipped here ========

 Build process is in progress. Usually it takes 15-20 minutes. It depends on your internet connection and hardware performance.
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


As the result the new bootstrap image is built and placed
(by default) in /tmp folder. Assuming, the new image was named
**93f117b9-65b7-41fa-ade2-52002989dda1** and the archive name is
**/tmp/93f117b9-65b7-41fa-ade2-52002989dda1.tar.gz**, please
type the command to import the new bootstrap image:

.. code-block:: console

  fuel-bootstrap import /tmp/93f117b9-65b7-41fa-ade2-52002989dda1.tar.gz

 Try extract /tmp/93f117b9-65b7-41fa-ade2-52002989dda1.tar.gz to /tmp/tmpaLrxol
 Bootstrap image 93f117b9-65b7-41fa-ade2-52002989dda1 has been imported.

Now this bootstrap image could be activated and after that it will be used
for booting on the nodes.

.. code-block:: console

  fuel-bootstrap activate 93f117b9-65b7-41fa-ade2-52002989dda1

 Starting new HTTP connection (1): 10.20.0.2
 Starting new HTTP connection (1): 10.20.0.2
 Starting new HTTP connection (1): 10.20.0.2
 Starting new HTTP connection (1): 10.20.0.2
 Bootstrap image 93f117b9-65b7-41fa-ade2-52002989dda1 has been activated.


MOS 7.0 allowes us creating custom Ubuntu bootstrap and
active it with the two commands, *which have been
depricated since MOS 8.0*:

.. code-block:: bash

  fuel-bootstrap-image
  fuel-bootstrap-image-set ubuntu


Modifying initramfs image manually for bootstrap node
-----------------------------------------------------

The fuel-bootstrap utility builds Ubuntu bootstrap, which is
splitted into two files: initrd.img and root.squashfs.
The initrd.img is downloaded (during the PXE boot) first.
It is unpacked as temporary file system, makes some initialization,
downloads the root.squashfs image. After that, the root.squashfs is
unpacked the mount point of the file system is switched to the root.squasfs.

There is a possibility to add a package into bootstrap
"on fly" by the command:

.. code-block:: console

  fuel-bootstrap build --package <package-name>

The package will be added into both images initrd.img and
the root.squashfs.

It also possible to add an arbitrary files and folders into
the root.squasfs (but not to the initrd.img) by the command:

.. code-block:: console

  fuel-bootstrap build --extra-dir <root-path>

There are tasks which require to edit bootstrap manually.
To add kernel module binaries into initramfs and root.squashfs
could be such a task.

To edit the initramfs (initrd.img) image, you should unpack it,
modify and pack back.
Initramfs image is a compressed cpio archive.

.. warning:: The initrd.img and root.squashfs location could
 be defferent for different MOS version. This description is
 actual for the MOS 8.0

.. warning:: The squashfs-tools should be installed prior working
 with the root.squashfs image.

To change initramfs image (initrd.img) and root.squashfs, follow these steps:

Unpack initrd.img and root.squashfs
+++++++++++++++++++++++++++++++++++

#. Create a folder for modifying bootstrap and copy the initramfs and root.squashfs images into it:

.. code-block:: console

     mkdir /tmp/initrd-orig
     cp /var/www/nailgun/bootstraps/active/initrd.img  /tmp/initrd-orig/
     cp /var/www/nailgun/bootstraps/active/root.squashfs /tmp/initrd-orig/

#. Unpack initramfs. First of all, un-compress the initrd.img:

.. code-block:: console

      cd /tmp/initrd-orig/
      mv initrd.img initrd.img.xz
      xz -d initrd.img.xz

#. Unpack the cpio archive to the initramfs folder:

.. code-block:: console

      mkdir initramfs
      cd initramfs
      cpio -i < ../initramfs.img

#. Unpack root.squashfs image (into the squashfs-root folder):

.. code-block:: console

      unsquashfs root.squashfs

#. Now you have the file system what you have in the RAM on the bootstrap:

.. code-block:: console

     ls -l /tmp/initrd-orig/initramfs
     ls -l /tmp/initrd-orig/squashfs-root

Modify initrd.img and root.squashfs
+++++++++++++++++++++++++++++++++++

.. warning:: To add or update a new kernel module it's not enough just to copy
 it,  but the **depmod** command should be run for updating  the modules.alias,
 modules.dep files to let the kernel know about the new module.

.. note:: There is `safe way to update kernel modules`_ for Ubuntu, when
 the new module is installed into the /lib/moduels/<version>/updates folder.
 The previous kernel  module is still kept in the system, but hidden  by
 the new module. When something went wrong with the new module it could be
 easially removed from the */update* folder and the older version of module
 will be returned back.

.. _`safe way to update kernel modules`: http://www.linuxvox.com/2009/10/update-kernel-modules-the-smart-and-safe-way/

#. Modify it as you need. For example, copy new kernel module aacraid into the initrd:

.. code-block:: console

    mkdir -p /tmp/initrd-orig/initramfs/lib/modules/3.13.0-77-generic/updates
    cp aacraid.ko /tmp/initrd-orig/initramfs/lib/modules/3.13.0-77-generic/updates

#. Modify the squashfs-root, copying the new kernel module aacraid into the folder:

.. code-block:: console

   mkdir -p /tmp/initrd-orig/squashfs-root/lib/modules/3.13.0-77-generic/updates
   cp aacraid.ko /tmp/initrd-orig/squashfs-root/lib/modules/3.13.0-77-generic/updates

#. Run depmod to update information about kernel modules on initrd and root.squashfs:

.. code-block::  console

   depmod -a -b /tmp/initrd-orig/initramfs/ -F /tmp/initrd-orig/squashfs-root/boot/System.map-3.13.0-77-generic 3.13.0-77-generic

   depmod -a -b /tmp/initrd-orig/squashfs-root/ -F /tmp/initrd-orig/squashfs-root/boot/System.map-3.13.0-77-generic 3.13.0-77-generic

The depmod was called with the following parameters:

.. code-block:: console

   *depmod -a -b <base dir> -F <System.map location> <kernel version>*

====  =================================================================
 -a     Rebuild information for all modules
 -b     Base folder, If your modules are not currently in the (normal)
        directory /lib/modules/version. In our case it were the folders
        where initramfs and root.squasfs
 -F     location of the System.map produced when the kernel was built
====  =================================================================

.. note:: It's important to pass correct kernel version to the depmod command
 at the end of the paramters,  otherwise the version of the current kernel on
 MOS master node will be used.

The following files will be modified in the initramfs and squashfs-root
folders after running the depmod command:

* lib/modules/3.13.0-77-generic/modules.alias

* lib/modules/3.13.0-77-generic/modules.alias.bin

* lib/modules/3.13.0-77-generic/modules.dep

* lib/modules/3.13.0-77-generic/modules.dep.bin

* lib/modules/3.13.0-77-generic/modules.symbols.bin

.. note:: To get more information on how to pass options to
    the module, start dependent modules or black-list modules please,
    consult see the *modprobe.d* man page.

Pack the initramfs and squashfs-root back
+++++++++++++++++++++++++++++++++++++++++

#. Pack the intiramfs back to **initfamfs.img.new** image:

.. code-block:: console

      find /tmp/initrd-orig/initramfs | cpio --quiet -o -H newc | xz --check=crc32 > ../initrd.img.new


#. Pack the squashfs back to the **root.squashfs.new**

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

    cp root.squashfs.new initrd.img.new /var/www/nailgun/bootstraps/active/
    cd /var/www/nailgun/bootstraps/active/
    mv initrd.img initrd.img.orig
    mv root.squashfs root.squashfs.orig
    cp initrd.img.new initrd.img
    cp root.squashfs.new root.squashfs
    cobbler sync

#. Clean up. Remove */tmp/initrd-orig* temporary folder:

.. code-block:: console

      rm -Rf /tmp/initrd-orig

