
.. _hardware-rn:

Hardware support issues
=======================

Resolved hardware issues
------------------------

* RAID-1 spans all configured disks on a node.
  Fuel 6.0 and older
  puts a boot partition on each disk
  because OpenStack does not have access to the BIOS.
  Starting with Fuel 6.1, the boot partition
  is put on the first disk only.
  See `LP1258347 <https://bugs.launchpad.net/fuel/+bug/1258347>`_.

* More than 28 disks per node, which used to be a limitation,
  are now supported from Ubuntu installation.
  See `LP1340414 <https://bugs.launchpad.net/bugs/1340414>`_.

Known hardware issues
---------------------

* You may experience some performance drop on CEPH
  on disks with 4 KB sector size, since the default
  sector size for operation is 512-bytes.
  See `LP1318614 <https://bugs.launchpad.net/fuel/+bug/1318614>`_.

