
.. _keystone-rn:

OpenStack Identity (Keystone)
-----------------------------

New Features and Resolved Issues in Mirantis OpenStack 6.0
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

* Keystone no longer hangs when trying to set a lock in Memcache.
  See `LP1370324 <https://bugs.launchpad.net/bugs/1370324>`_.

* API calls to Keystone do not intermittently time out
  because of memcache locks.
  See `LP1378081 <https://bugs.launchpad.net/bugs/1378081>`_.

* Keystone service list no longer lacks Murano.
  See `LP1362037 <https://bugs.launchpad.net/bugs/1362037>`_.

* The eventlet monkepatching now precedes the logging system
  initialization. Previously, it occurred after the logging system
  initialization thus leaving all the locks used in the
  logging handlers non-patched and breaking ``threading.RLock``.
  The initialization order is fixed, so eventlet locks work correctly.
  See `LP1413341 <https://bugs.launchpad.net/mos/+bug/1413341>`_.
