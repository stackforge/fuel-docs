
HA stability and scalability improvements
-----------------------------------------

Mirantis OpenStack 6.0 includes a number of internal enhancements
to improve the stability and scalability of the deployed environment:

- The caching system is improved in Keystone: a new memcache_pool
  backend allows you to reuse open memcache connections and resolve
  issues related to the usage of threading.local objects in the
  eventlet environment.

