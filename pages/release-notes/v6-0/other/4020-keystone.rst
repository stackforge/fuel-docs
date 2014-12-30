
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

Known Issues in Mirantis OpenStack 6.0
++++++++++++++++++++++++++++++++++++++

* If one of the Controller nodes in an HA environment
  is destroyed or deleted, all OpenStack services
  (especially Horizon) run slowly because of delays from Keystone.
  See `LP1405549 <https://bugs.launchpad.net/mos/+bug/1405549>`_.

  To fix the problem:

  #.  View the */etc/hosts* file on one of the Controller nodes
      that is alive and determine the IP address
      that is assigned to the Management interface
      of the unavailable Controller.

  #.  Edit the *keystone.conf* file on each Controller node
      to remove this IP address from the list of memcached servers:

      .. code-block :: sh

         DOWN_IP="192.168.0.5"; sed -r 's/'$DOWN_IP':11211,?//g' \
            -i.bak /etc/keystone/keystone.conf

  #.  Restart the Keystone daemon on all Controllers:

      .. code-block :: sh

         service openstack-keystone restart || restart keystone


