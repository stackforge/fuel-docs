.. index:: HowTo: Backport Memcached backend fixes

.. _backport-memcached-fixes-op:

HowTo: Backport Memcached backend fixes
=======================================

Fuel 6.1 contains several HA fixes to the configuration of
the memcache_pool (see :ref:`Memcached<memcached-term>`)
backend for Keystone which makes responce times of OpenStack
services shorter in the case of the memcached node failure.
There is also a security fix to the Keystone configuration
which makes tokens revocations to be kept in the MySQL
backend instead of memcached.
These can be backported to the Fuel 6.0 release
following the instructions below. Note, that the older
versions of Fuel do not support memcache_pool backend and
the fixes are not applicable for them.

.. warning:: Before performing any operations with Keystone,
   you should schedule maintenance window,
   perform backups of Keystone configuration files,
   and stop all Keystone related services.

#. Download the related fixes for puppet modules from the fuel-library repository
   to the Fuel Master node:
   ::

       wget --no-check-certificate -O /etc/puppet/modules/keystone/manifests/init.pp https://raw.githubusercontent.com/stackforge/fuel-library/stable/6.0/deployment/puppet/keystone/manifests/init.pp
       wget --no-check-certificate -O /etc/puppet/modules/keystone/spec/classes/keystone_spec.rb https://raw.githubusercontent.com/stackforge/fuel-library/stable/6.0/deployment/puppet/keystone/spec/classes/keystone_spec.rb
       wget --no-check-certificate -O /etc/puppet/modules/openstack/manifests/keystone.pp https://raw.githubusercontent.com/stackforge/fuel-library/stable/6.0/deployment/puppet/deployment/puppet/openstack/manifests/keystone.pp

#. Copy the fixed files to all controllers
   ::

       for i in $(fuel nodes --env 1 | awk '/ready.*controller.*True/{print $1}'); do \
         scp /etc/puppet/modules/keystone/manifests/init.pp node-$i:/etc/puppet/modules/keystone/manifests/init.pp;\
         scp /etc/puppet/modules/keystone/spec/classes/keystone_spec.rb node-$i:/etc/puppet/modules/keystone/spec/classes/keystone_spec.rb;\
         scp /etc/puppet/modules/openstack/manifests/keystone.pp node-$i:/etc/puppet/modules/openstack/manifests/keystone.pp;\
       done

.. note:: This step assumes the environment id is a "1" and the
   controller nodes names have a standard Fuel notation,
   like "node-1", "node-42" and so on.

#. Update the /etc/keystone/keystone.conf configuration file on
   all of the controller nodes as the following:
   ::

       [revoke]
       driver = keystone.contrib.revoke.backends.sql.Revoke

       [cache]
       memcache_dead_retry = 30
       memcache_socket_timeout = 1
       memcache_pool_maxsize = 1000

       [token]
       driver = keystone.token.persistence.backends.memcache_pool.Token

#. Restart Keystone related services.
   - Restart keystone on every Controller
   - Restart neutron on every Controller (if installed).
   - Restart the remaining OpenStack services
     on each Controller and Storage node.
   - Restart the OpenStack services on the Compute nodes.
