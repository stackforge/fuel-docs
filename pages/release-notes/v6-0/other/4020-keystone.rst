
.. _keystone-rn:

OpenStack Identity (Keystone)
-----------------------------

New Features and Resolved Issues in Mirantis OpenStack 6.0
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

* Keystone no longer hangs when trying to set a lock in Memcache.
  See `LP1370324 <https://bugs.launchpad.net/bugs/1370324>`_.

* API calls to Keystone do not intermittently time out
  because of memcache locks.
  See `LP1378081 <https://bugs.launchpad.net/bugs/1378081>`_.

* Keystone service list no longer lacks Murano.
  See `LP1362037 <https://bugs.launchpad.net/bugs/1362037>`_.
