

.. _memcached-term:

Memcached
---------

Memcached is a general-purpose distributed memory caching system
that OpenStack uses as a highly available backend for the
:ref:`Keystone<keystone-term>` and the OpenStack Dashboard
(:ref:`horizon-term`).
See `Caching layer <http://docs.openstack.org/admin-guide-cloud/content/section_caching-layer.html>`
and `Key-value stores <http://docs.openstack.org/admin-guide-cloud/content/dashboard-session-key-value-store.html>`
admin guides for details.
:ref:`Swift<swift-object-storage-term>` proxy server is also
configured to use the memcached,
see `Object Storage documentaion <http://docs.openstack.org/admin-guide-cloud/content/object-storage-service.html>`.

.. note:: Fuel configures the Keystone to use the ``memcache_pool``
   backend for tokens, but tokens revokations are tracked in the
   :ref:`MySQL/Galera<galera-cluster-term>` backend due to
   security reasons. Starting from the Fuel 6.1 release, the
   memcached instances are also configured to consume no more
   than 50% of RAM.

Additional information is available:

- :ref:`backport-memcached-fixes-op` explains how to backport
  the HA fixes for the Keystone memcache_pool backend to
  pre-6.1 environments.

See also:

- `Caching layer configuration <http://docs.openstack.org/juno/config-reference/content/section_keystone-cache.html>`_
