.. _fuel-restore-rn:

Fuel Master Backup/Restore
--------------------------

New Features and Resolved Issues in Mirantis OpenStack 6.0
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

* Disk calculation for backup and restore now works correctly.
  See `LP1375180 <https://bugs.launchpad.net/bugs/1375810>`_.
* Backup is now blocked if Fuel tasks are running.
  See `LP1352847 <https://bugs.launchpad.net/bugs/1352847>`_.

Known Issues in Mirantis OpenStack 6.0
++++++++++++++++++++++++++++++++++++++

* Firewall rules sometimes appear as missing when restoring from backup.
  Restarting Fuel Master host can work around this issue.
  See `LP1362159 <https://bugs.launchpad.net/bugs/1362159>`_.
