
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
In 5.1.1 and later releases,
expired tokens are automatically cleaned from
the Keystone database on the Fuel Master node.

- `Keystone web page <http://docs.openstack.org/developer/keystone/>`_
- :ref:`Close_look_Multi-node_HA` discusses how Keystone works
  in the OpenStack Environment.
- :ref:`keystone-tokens-perform` discusses how to manage
  expired Keystone tokens in the databases
  installed on the Controller nodes
  to avoid performance degradation in the OpenStack environment.


