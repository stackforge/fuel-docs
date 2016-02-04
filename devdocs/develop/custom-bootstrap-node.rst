.. _custom-bootstrap-node:


Bootstrap node
==============

When you would like to bring changes
into bootstrap, you should take up either of the
options:

* create an additional
  "piece" of bootstrap (initrd_update)
  that will be injected into the
  original initramfs image on the bootstrap.
  That means, avoid modifying the original initramfs
  image for bootstrap

* modify the original initramfs image manually

* create a custom initramfs image for
  bootstrap to replace the default one.

Let's take a look at every approach in more details.

Creating and injecting the initrd_update into bootstrap
-------------------------------------------------------

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

Prepare injected initramfs image for CentOS
+++++++++++++++++++++++++++++++++++++++++++

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


Adding initrd_update image to the bootstrap
+++++++++++++++++++++++++++++++++++++++++++

.. note:: Currently, the bootstrap is based on CentOS (kernel and modules).


Let's assume that the Fuel Master node has been deployed:

#. Connect to the Fuel Master node:

   ::

       ssh root@<your-Fuel-Master-node-IP>

#. Prepare initramfs update image:

   ::

      tar -xzvf dd-src.tar.gz
      find dd-src/ | cpio --quiet -o -H newc | gzip -9 > /tmp/initrd_update.img

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
-----------------------------------------------------

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

#. Pack the intiramfs back to **initfamfs.img.new** image:

   ::

      find /tmp/initrd-orig/initramfs | cpio --quiet -o -H newc | gzip -9 > /tmp/initramfs.img.new

#. Clean up. Remove */tmp/initrd-orig* temporary folder:

   ::

      rm -Rf /tmp/initrd-orig/


Creating a custom bootstrap node
--------------------------------

This option requires further investigation
and will be introduced in the near future.


Replacing default bootstrap node with the custom one
++++++++++++++++++++++++++++++++++++++++++++++++++++

Let's suppose that you have created or modified
the initramfs image. It is placed in the */tmp* folder under **initramfs.img.new** name.

To replace the default boostrap with the custom,
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


.. _chroot:

Create Ubuntus chroot on the master node
----------------------------------------

.. note:: There is an alternative to creating chroot on the Fuel master node.
 You can download prebuilt `VM images`_ for Ubuntu and  run  it with  your
 favorite hypervisor. You can use an IBP Ubuntu image which has been built on
 your master node as well.
.. _`VM images`: http://uec-images.ubuntu.com/trusty/current

This part of the document describes how to create a chroot with Ubuntu on
the master node and provides the script for implementing that.
The chroot with Ubuntu could be usefull for:

#. Rebuilding kernel modules for Ubuntu
#. Creating DKMS deb packages from sources
#. Building kernel modules binaries for given kernel version with DKMS

The script below creates the chroot on the master node using prebuilt Ubuntu
cloud image **trusty-server-cloudimg-amd64-root.tar.gz** downloading from the
`VM images`_ site. The name of the image and the link are kept in the variables
UBUNTU_IMAGE and PREBUILT_IMAGE_LINK correspondingly.

The additional set of packages is installed into the chroot, the packages
are: linux-headers, dkms, build-essential and debhelper, which are required
to build DKMS and deal with DEB packages. The list of additional packages
is kept in the UBUNTU_PKGS variable. You can copy and run the script.
Modify the *UBUNTU_IMAGE*, *PREBUILT_IMAGE_LINK*, *DISTRO_RELEASE*,
*KERNEL_FLAVOR* or *MIRROR_DISTRO* variables if required.

The script creates chroot in the folder /tmp with the template name
ubuntu-chroot.XXXXX (where XXXXX is substituted by digits and characters),
mounts /proc filesystem and creates /dev folder with links to the /proc into
the chroot, prepares config for apt package manager, downaloads and install
the packages listed in the *UBUNTU_PKGS* variable.
The name of the chroot folder could be, for example, /tmp/ubuntu-chroot.Yusk8G.

.. note:: The master node has to had an access to the Internet (an Ubuntu repository
 containing required DEB packages).

Please don't forget unmount chroot/proc file system and delete the chroot
when you don't need it any more.

.. code-block:: bash

 #!/bin/bash

 # Define the kernel flavor and path to the link to the prebuild image
 [ -z "$KERNEL_FLAVOR"  ] && KERNEL_FLAVOR="-generic-lts-trusty"
 [ -z "$DISTRO_RELEASE" ] && DISTRO_RELEASE="trusty"
 [ -z "$UBUNTU_IMAGE"   ] && UBUNTU_IMAGE="trusty-server-cloudimg-amd64-root.tar.gz"
 [ -z "$PREBUILT_IMAGE_LINK" ] && \
 PREBUILT_IMAGE_LINK="http://uec-images.ubuntu.com/${DISTRO_RELEASE}/current"

 UBUNTU_PKGS="linux-headers${KERNEL_FLAVOR} linux-firmware dkms build-essential debhelper"

 # Create temporary directory (ubuntu-chroot) by the command
 # [ -z "$root_dir"  ] &&
 root_dir=$(mktemp -d --tmpdir ubuntu-chroot.XXXXX)
 chmod 755 ${root_dir}

 # Download prebuilt image and un-tar it
 # Check if it has been downloaded already
 if [ ! -e "$UBUNTU_IMAGE" ]; then
  # download
  wget ${PREBUILT_IMAGE_LINK}/${UBUNTU_IMAGE}
 fi
 tar -xzvf "${UBUNTU_IMAGE}" -C ${root_dir}

 # Install required packages and resolve dependencies
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

The strong side of DKMS `[1]`_, `[2]`_ is ability to rebuild required kernel module
for different version of kernels. But there is a drawback of installing DKMS
kernel modules into bootstrap. DKMS builds module during installation, what
queries installing additional packages like linux-headers and a building
tool-chain. It makes the bootstrap unnecessarily "heavy". The DKMS package
actually should be installed into IBP (Image Base Provisioning) image, which
is going to be deployed on the nodes and will be re-build during kernel updates.

.. _[1]: https://help.ubuntu.com//community/DKMS
.. _[2]: http://linux.dell.com/dkms/

*The preferable way adding kernel modules on bootstrap is to make up the kernel
module binaries in form of a DEB (RPM in case of RH) package and install the
package on bootstrap as other ordinary packages.*

DKMS provides ability to build DEB (or RPM) package and disk driver archive
"on fly" from sources.

Ubuntu packages could be built on Fuel master in chroot_ with Ubuntu deployed
in the chroot. (See the previous chapter How to create chroot with Ubuntu for
details.)

DKMS allows creating DEB/RPM package from the sources. To create DKMS package
in (DEB) format you need to copy required module' sources into correspondingly
named folder placed in the /usr/src of the chroot and create dkms.conf (config)
file in this folder.

In case, when you have had a DKMS package with sources built and you want
just to export kernel module binaries in DEB format, please install the DKMS
package you have into the chroot (and skip the Creating DKMS chapter).

Creating DKMS package from sources
++++++++++++++++++++++++++++++++++

.. warning::  The chroot folder should be prepared and the dkms, build-essential
 and debhelper packages are required to have been installed into it.

Creating DKMS package requires following steps:

#. Create a folder for required kernel module in the following format
   <module name>-<version> in the /usr/src directory placed in the chroot.
   For example, if the module name is i40e and modules version is 1.3.47,
   then folder /usr/src/i40e-1.3.47 should be created into the chroot.

#. Copy the sources into the created folder

#. Create the dkms.conf file in the <chroot folder>/usr/src/<module>-<version>/
   folder and make up the config for DKMS.


Minimal dkms.conf file
**********************

The minimal dkms.conf should contain following lines `[3]`_, for example:

.. _[3]: http://linux.dell.com/dkms/dkms-for-developers.pdf

.. code-block:: console

  PACKAGE_NAME="$module_name-dkms"
  PACKAGE_VERSION="$module_version"
  BUILT_MODULE_NAME="$module_name"
  DEST_MODULE_LOCATION="/updates"

Working dkms.conf file
**********************

But the fields *MAKE*, *CLEAN*, *BUILD_MODULE_LOCATION* should be configured
to get DKMS work well. There are internal variables in DKMS, which could be
used in the config, for example $kernelver.
Please consult to the man for details `[4]`_.

.. _[4]: http://linux.dell.com/dkms/manpage.html

Here the description of some fields in the dkms.conf file:

  ======================= =================================================
  PACKAGE_NAME            how the DKMS package will be named
  PACKAGE_VERSION         version of the DKMS package
  BUILT_MODULE_NAME       binary kernel module name, which should be installed
  DEST_MODULE_LOCATION    where to install the binary kernel module
  MAKE                    make command to build the kernel module bounded to the
                          kernel version, sources etc ...
  BUILD_KERNEL            version of kernel for which the module should be build
                          please use internal variable $kernelver here
  CLEAN                   clean directive to clean up after build
  BUILT_MODULE_LOCATION   location of the sources in the DKMS tree
  REMAKE_INITRD           should the initrd be rebuild or not when the module installed.
  ======================= =================================================

For our i40e module we have following config:

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

.. note:: The path, which is set in the config file, are bound to the DKMS tree.
  For example,  DEST_MODULE_LOCATION="/updates"  actually means
  /lib/modules/$kernelver/updates
  It’s suggested to install new modules in the /updates folder `[5]`_ for a safe
  way of updating kernel modules.
.. _[5]: http://www.linuxvox.com/2009/10/update-kernel-modules-the-smart-and-safe-way/

Exporting DKMS package and kernel binaries
******************************************

When the dkms.conf ready, we can build the binaries in the chroot and export
the DKMS package (and kernel module binaries) in DEB format.

Run DKMS commands to add ane build DKMS module for a particular kernel version.
Run DKMS commands to create deb package (mkdeb) and disk-driver tar archive
(mkdriverdisk) in the chroot when DKMS kernel module has been built.
See the details in the bash script below.

The script build in the chroot the DKMS package and disk-driver archive with
module binaries for installed kernel version and placed the result into the
**/tmp/dkms-deb** folder.
Two files are built in our case in the /tmp/dkms-deb:

.. code-block:: bash

 $ ls /tmp/dkms-deb/
 i40e-1.3.47-ubuntu-dd.tar  i40e-dkms_1.3.47_all.deb

.. code-block:: console

 The script requires following parameters to be provided:
 $1 - chroot folder with Ubuntu has been deployed
 $2 - module name
 $3 - module version
 $4 - path to the folder where is sources of the kernel module

.. warning:: The script unmount the /proc filesystem in the chroot and delete
 the chroot (made by teh first script) at the end.

.. code-block:: bash

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

The /tmp/dkms-deb folder contains the built DKMS debian package. It could be
installed into the IBP. The debian package with the kernel module binaries
built for a given kernel version is archived in the disk-driver archive.

Unpack the tar file and copy the deb file into the repository.
For example, if the archive is  i40e-1.3.47-ubuntu-dd.tar and the i40e module
was built for 3.13.0-77-generic kernel, the output should be following:

.. code-block:: console

 tar -xvf i40e-1.3.47-ubuntu-dd.tar
 ./
 ./ubuntu-drivers/
 ./ubuntu-drivers/3.13.0/
 ./ubuntu-drivers/3.13.0/i40e_1.3.47-3.13.0-77-generic_x86_64.deb
 ...

The package i40e_1.3.47-3.13.0-77-generic_x86_64.deb contains kernel module
binaries for kernel 3.13.0-77-generic which should be installed on the
bootstrap with the kernel.

.. warning:: Updating the new kernel for Ubuntu requires to rebuild a DEB package with the
 binaries for the kernel from the DKMS package.

Known Issues
************

DKMS has a drawback. Not all kernel module sources could be compiled by DKMS.

DKMS builds the given drivers' sources against different kernels versions.
The ABI (kernel functions) may be changing among different kernels and
potentioally the compilation of a module could fail due to call of
non-existed of has expired functions.

Here the example of attempt building a module taken from one kernel version
against the other kernel version.

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

The make.log file will contain the errors, that some functions or structures 
have not been declared or declared implicitly. For example:

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


To make the kernel module sources compatible to the different kernels, the
sources should contain the wrappers, which are re-declaring changed functions
depend on the kernel version. This work should be done by driver developers.
Here the example of the compat.h file wrapper:

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
 #define RHEL_RELEASE_VERSION(a,b)	(((a) << 8) + (b))
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
 typedef struct napi_struct		rhel_napi;
 #endif

 #define netif_napi_add			netif_napi_add_compat
 #define	netif_napi_del			netif_napi_del_compat
 #define napi_gro_frags(napi) 		napi_gro_frags((rhel_napi*) napi)
 #define napi_get_frags(napi)		napi_get_frags((rhel_napi*) napi)
 #define vlan_gro_frags(napi, g, v)	vlan_gro_frags((rhel_napi*) napi, g, v);
 #define napi_schedule(napi)		netif_rx_schedule((napi)->dev)
 #define napi_enable(napi)		netif_poll_enable((napi)->dev)
 #define napi_disable(napi)		netif_poll_disable((napi)->dev)
 #define napi_complete(napi)		napi_gro_flush((rhel_napi *)napi); \
					netif_rx_complete(napi->dev)
 #define napi_schedule_prep(napi)	netif_rx_schedule_prep((napi)->dev)
 #define __napi_schedule(napi)		__netif_rx_schedule((napi)->dev)

 #define napi_struct			napi_struct_compat

 struct napi_struct_compat {
 #ifdef RHEL
	rhel_napi napi;	/* must be the first member */
 #endif
	struct net_device *dev;
	int (*poll) (struct napi_struct *napi, int budget);
 };

 extern void netif_napi_del_compat(struct napi_struct *napi);
 extern void netif_napi_add_compat(struct net_device *, struct napi_struct *,
				int (*poll) (struct napi_struct *, int), int);
 #endif /*********************** NAPI backport *****************************/

