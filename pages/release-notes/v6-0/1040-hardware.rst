
.. _hardware-rn:

Hardware support issues
=======================

Known Issues in 5.1
-------------------

Some UEFI hardware cannot be used
+++++++++++++++++++++++++++++++++

Some UEFI chips (such as the Lenovo W520)
do not emulate legacy BIOS
in a way that is compatible with the grub settings
used for the Fuel Master node.

This issue also affects servers used
as Controller, Compute, and Storage nodes;
because they are booted from PXE rom
and then the chain32 loader boots from the hard drive,
it is possible to boot them with an operating system
that is already installed,
but it is not possible to install an operating system on them
because the operating system distributions that are provided
do not include UEFI images.
See `UEFI support blueprint
<https://blueprints.launchpad.net/fuel/+spec/uefi-support>`_.

Ubuntu does not support NetFPGA cards
+++++++++++++++++++++++++++++++++++++

CentOS includes drivers for netFPGA devices
but Ubuntu does not.
See `LP1270889 <https://bugs.launchpad.net/fuel/+bug/1270889>`_.
[in progress]

CentOS issues using Neutron-enabled installations with VLANS
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

Deployments using CentOS may run into problems
using Neutron VLANs or GRE
(with VLAN tags on the management, storage or public networks).
The problems include poor performance, intermittent connectivity problems,
one VLAN but not others working, or total failure to pass traffic.
This is because the CentOS kernel is based on a pre-3.3 kernel
and so has poor support for VLAN tagged packets
moving through :ref:`ovs-term`  Bridges.
Ubuntu is not affected by this issue.

A workaround is to enable VLAN Splinters in OVS.
For CentOS, the Fuel UI Settings page can now deploy
with a VLAN splinters workaround enabled in two separate modes --
soft trunks and hard trunks:

*  The **soft trunks mode** configures OVS to enable splinters
   and attempts to automatically detect in-use VLANs.
   This provides the least amount of performance overhead
   but the traffic may not be passed onto the OVS bridge in some edge cases.

*  The **hard trunks mode** also configureS OVS to enable splinters
   but uses an explicitly defined list of all VLANs across all interfaces.
   This should prevent the occasional failures associated with the soft mode
   but requires that corresponding tags be created on all of the interfaces.
   This introduces additional performance overhead.
   In the hard trunks mode,
   you should use fewer than 50 VLANs in the Neutron VLAN mode.

Fuel also provides another option here:
using the experimental Fedora long-term support 3.10 kernel.
This option has had minimal testing
and may invalidate your agreements with your hardware vendor.
But using this kernel may allow you to use VLAN tagged packets
without using VLAN splinters,
which can provide significant performance advantages.
See :ref:`ovs-arch`
for more information about using Open VSwitch.

HP BL120/320 RAID controller line is not supported
++++++++++++++++++++++++++++++++++++++++++++++++++

You should contact Mirantis to get a non-standard kernel ISO.
Note, that it is impossible to update the kernel if there are no drivers for this
version. This happens because the source code for the hpvsa module is not open and
HP issues the hpvsa binaries for specific kernel versions only.
They do not always coincide with the ones used in Fuel with Ubuntu.
Currently, no equipment for testing is available and the testing itself can not
be performed due to closed HP VSA source code. ISO may be assembled only for kernel
versions, provided by HP. See `LP1359331 <https://bugs.launchpad.net/bugs/1359331>`_.
For information on some kernel modules, compiled for specific kernels' versions,
see `HP storage <https://launchpad.net/~hp-iss-team/+archive/ubuntu/hp-storage>`_. and
`hpvsa update <https://launchpad.net/~hp-iss-team/+archive/ubuntu/hpvsa-update>`_.

RAID-1 spans all configured disks on a node
+++++++++++++++++++++++++++++++++++++++++++

RAID-1 spans all configured disks on a node,
putting a boot partition on each disk
because OpenStack does not have access to the BIOS.
It is not currently possible to exclude some drives
from the Fuel configuration on the Fuel UI.
This means that one cannot, for example,
configure some drives to be used for backup and recover
or as b-cache.

You can work around this issue as follows.
This example is for a system that has three disks: sda, sdb, and sdc.
Fuel will provision sda and sdb as RAID-1 for OpenStack
but sdc will not be used  as part of the RAID-1 array:

#. Use the Fuel CLI to obtain provisioning data:
   ::

     fuel provisioning --env-id 1 --default -d

#. Remove the drive which you do not want to be part of RAID:
   ::

     - size: 300
       type: boot
     - file_system: ext2
       mount: /boot
       name: Boot
       size: 200
       type: raid


#. Run deployment
   ::

     fuel provisioning --env-id 1 -u
#. Confirm that your partition is not included in the RAID array:
   ::

     [root@node-2 ~]# cat /proc/mdstat
     Personalities : [raid1]
     md0 : active raid1 sda3[0] sdb3[1] 204736 blocks
           super 1.0 [2/2] [UU]


See `LP1258347 <https://bugs.launchpad.net/fuel/+bug/1258347>`_.
[in progress?]

Intel PCI-express SSD drivers are not supported
+++++++++++++++++++++++++++++++++++++++++++++++

Currently, Fuel supports the block devices with names like sd*, hd*, vd* with type "disk". Nevertheless, Intel PCI-ex SSD drives have nvmeXnY names where X and Y are integer values.
Such disks appear in Fuel UI, but Fuel skips these during the deployment process. What is more, these disks needs the drivers, available at `Intel Solid-State Drive Data Center Tool
<https://downloadcenter.intel.com/Detail_Desc.aspx?agr=Y&ProdId=3810&DwnldID=23931&ProductFamily=Solid-State+Drives+and+Caching&ProductLine=Intel%C2%AE+High+Performance+Solid-State+Drives&ProductProduct=Intel%C2%AE+SSD+DC+P3600+Series&lang=eng>`_.

See `LP1372547 <https://bugs.launchpad.net/fuel/+bug/1372547>`_.

Other issues
++++++++++++

* Large number of disks may fail Ubuntu installation.
  See `LP1340414 <https://bugs.launchpad.net/bugs/1340414>`_.

* When all the space on SSD is configured ad a base system,
  Ubuntu stops installation and asks where to install the system.
  After posting an answer manually, installation continues.
  See `LP1382292 <https://bugs.launchpad.net/bugs/1382292>`_.

