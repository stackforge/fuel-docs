
.. _exclude-from-raid:

How To: Exclude some drives from RAID-1 array
=============================================

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

