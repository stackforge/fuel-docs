
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

