
.. _keystone-rn:

OpenStack Identity (Keystone)
-----------------------------

New Features and Resolved Issues in Mirantis OpenStack 6.0
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

* Keystone no longer hangs when trying to set a lock in Memcache.
  See `LP1370324 <https://bugs.launchpad.net/bugs/1370324>`_.

Known Issues in Mirantis OpenStack 6.0
++++++++++++++++++++++++++++++++++++++

* Tokens can not withstand high load:
  Keystone fails load tests.
  See `LP1387627 <https://bugs.launchpad.net/bugs/1387627>`_.

* Keystone service list lacks Murano.
  See `LP1362037 <https://bugs.launchpad.net/bugs/1362037>`_.
