
.. _keystone-term:

Keystone
--------
Keystone is 
the OpenStack :ref:`identity-service-term`.
It provides a single point of integration
for OpenStack policy, catalog, token, and authenthentication.
Each Keystone function has a pluggable backend
which supports different methods to use the particular service
such as LDAP, SQL, and Key Value Stores (KVS).

See:

- :ref:`Close_look_Multi-node_HA` discusses how Keystone works
  in the OpenStack Environment.
- :ref:`keystone-tokens-perform` discusses how to manage
  expired Keystone tokens in the database
  to avoid performance degradation in the OpenStack environment.
- `Keystone web page <http://docs.openstack.org/developer/keystone/>`_
- `Keystone Architecture
  <docs.openstack.org/training-guides/content/module001-ch007-keystone-arch.html>`_.


