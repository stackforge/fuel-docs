.. _mos61mu-1467671:

Node with Broadcast NetXtreme II NIC failed to reboot
=====================================================

The driver for Broadcast NetXtreme II NIC had no appropriate
shutdown handler required to properly disable the devices.
Because of that the node hang on reboot as the driver code
was attempting to use the freed resources.
The issue was fixed by adding shutdown handler.

Affected packages
-----------------
* **Centos\@6.1:** kernel-lt-3.10.55-1.mira6

Fixed packages
--------------
* **Centos\@6.1:** kernel-lt-3.10.55-1.mira7

Patching scenario - CentOS
--------------------------

#. Run the following commands on Fuel master node::

       cp /var/www/nailgun/bootstrap/initramfs.img /var/www/nailgun/bootstrap/initramfs.img.orig
       cp /var/www/nailgun/bootstrap/linux /var/www/nailgun/bootstrap/linux.orig
 
       mkdir /root/NEW_INITRAMFS
       cd /root/NEW_INITRAMFS
       cat /var/www/nailgun/bootstrap/initramfs.img | gunzip -c | cpio -imudv
 
       wget http://mirror.fuel-infra.org/mos/centos-6/mos6.1/updates/Packages/kernel-lt-3.10.55-1.mira7.x86_64.rpm
 
       rpm --install --force --nodeps --root=/root/NEW_INITRAMFS kernel-lt-3.10.55-1.mira7.x86_64.rpm
       depmod -a -b /root/NEW_INITRAMFS/ 3.10.55-1.mira7.x86_64
 
       cd /root/NEW_INITRAMFS
       rm *.rpm
 
       cp boot/vmlinuz-3.10.55-1.mira7.x86_64 /var/www/nailgun/bootstrap/linux
 
       find . -xdev | cpio --create --format='newc' | gzip -9 > /var/www/nailgun/bootstrap/initramfs.img
 
       dockerctl shell cobbler cobbler sync
