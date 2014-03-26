.. index:: HowTo: Create an XFS disk partition

.. _create-the-XFS-partition:

HowTo: Create an XFS disk partition
-----------------------------------

In most cases, Fuel creates the XFS partition for you.  If for some reason you 
need to create it yourself, use this procedure:

.. note:: Replace ``/dev/sdb`` with the appropriate block device you wish to
  configure.

1. Create the partition itself
   ::

     fdisk /dev/sdb
       n(for new)
       p(for partition)
       <enter> (to accept the defaults)
       <enter> (to accept the defaults)
       w(to save changes)


2. Initialize the XFS partition
   ::

     mkfs.xfs -i size=1024 -f /dev/sdb1

3. For a standard swift install, all data drives are mounted directly under 
   /srv/node, so first create the mount point
   ::

     mkdir -p /srv/node/sdb1

4. Finally, add the new partition to fstab so it mounts automatically, then 
   mount all current partitions
   ::

     echo "/dev/sdb1 /srv/node/sdb1 xfs
     noatime,nodiratime,nobarrier,logbufs=8 0 0" >> /etc/fstab
     mount -a
