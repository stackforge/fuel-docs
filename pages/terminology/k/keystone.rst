
.. _keystone-term:

Keystone
--------
Keystone is 
the OpenStack :ref:`identity-service-term`.
It is installed on the target nodes
and used by OpenStack.

Beginning with Mirantis OpenStack 5.1,
Fuel creates a separate Keystone instance
that is installed in a container on the Fuel Master node
and manages access to the Fuel UI.
See :ref:`fuel-passwd-ops` for more information.
In Release 5.1.1 and later,
expired tokens are automatically flushed from this database
so that they do not fill the database.

- `Keystone web page <http://docs.openstack.org/developer/keystone/>`_
- :ref:`Close_look_Multi-node_HA` discusses how Keystone works
  in the OpenStack Environment.
- :ref:`keystone-tokens-perform` discusses how to manage
  expired Keystone tokens in the main database on each Controller
  to avoid performance degradation in the OpenStack environment.


