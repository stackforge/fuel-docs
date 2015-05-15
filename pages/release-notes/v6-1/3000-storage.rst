
.. _storage-rn:

Storage technologies Issues
===========================


Resolved storage technologies issues
------------------------------------


Known storage technologies issues
---------------------------------

* Placing Ceph OSD on Controllers is not recommended because it can severely
  degrade controller's performance.
  It is better to use separate storage nodes
  if you have enough hardware.

* You may experience some performance drop on CEPH
  on disks with 4 KB sector size, since the default
  sector size for operation is 512-bytes.
  See `LP1318614 <https://bugs.launchpad.net/fuel/+bug/1318614>`_.
