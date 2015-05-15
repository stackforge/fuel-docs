
.. _storage-rn:

Storage technologies Issues
===========================


Resolved storage technologies issues
------------------------------------

* Enabling the *Assign public network to all nodes* option on the
  *Settings* tab of the Fuel web UI no longer
  uses the default gateway from Storage network, and does not
  make the Internet host unreachable.
  See `LP1404809 <https://bugs.launchpad.net/bugs/1404809>`_.

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
