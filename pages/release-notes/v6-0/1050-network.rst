
.. _fuel-network.rst:

Networking issues
=================

Known Issues in 6.0
-------------------
* In Neutron GRE HA mode, network list
  can not be retrieved.
  See `LP1383265 <https://bugs.launchpad.net/bugs/1383265>`_.

* The floating VLAN and public networks
  must use the same L2 network and L3 Subnet.
  These two networks are locked together
  and can only run via the same physical interface on the server.
  See the `Separate public and floating networks blueprint
  <https://blueprints.launchpad.net/fuel/+spec/separate-public-floating>`_.
  for information about ongoing work to remove this restriction.

* The Fuel Master node services (such as PostgrSQL and RabbitMQ)
  are not restricted by a firewall.
  The Fuel Master node should live in a restricted L2 network
  so this should not create a security vulnerability.

* IP ranges can not be updated for management and storage networks.
  See `LP1365368 <https://bugs.launchpad.net/bugs/1365368>`_.

* L3 agent takes more than 30 seconds
  to failover to a standby controller
  when a controller node fails.
  See `LP1328970 <https://bugs.launchpad.net/bugs/1328970>`_.

* Some OpenStack services listen to all of the interfaces,
  a situation that may be detected and reported
  by third-party scanning tools not provided by Mirantis.
  Please discuss this issue with your security administrator
  if it is a concern for your organization.

* LACP Bonding must be enabled in the switch
  before deploying an environment that uses it
  Network interfaces must be connected to a switch with LACP enabled
  before attempting to deploy an environment
  with "LACP balance-tcp" enabled
  or the deployment will fail
  with many network error messages.
  See `LP1370593 <https://bugs.launchpad.net/fuel/+bug/1370593>`_.

* A spurious "Critical error" is logged
  in the *neutron-openvswitch-agent.log* on the Compute node.
  It does not affect the behavior of Neutron networking
  and can be ignored.
  This is related to the upstream
  `LP1246848 <https://bugs.launchpad.net/nova/+bug/1246848>`_.

* When ovs-agent is started, Critical error appears.
  See `LP1347612 <https://bugs.launchpad.net/bugs/1347612>`_.


.. include:: /pages/release-notes/v6-0/9100-mellanox.rst

