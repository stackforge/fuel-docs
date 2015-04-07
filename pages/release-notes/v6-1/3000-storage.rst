
.. _storage-rn:

Storage technologies Issues
===========================


Resolved storage technologies issues
------------------------------------

* Cinder-backup service is now enabled for environments with Ceph
  running as Cinder back end.
  See `LP1411635 <https://bugs.launchpad.net/fuel/+bug/1411635>`_.


Known storage technologies issues
---------------------------------

* Placing Ceph OSD on Controllers is not recommended because it can severely
  degrade controller's performance.
  It is better to use separate storage nodes
  if you have enough hardware.

