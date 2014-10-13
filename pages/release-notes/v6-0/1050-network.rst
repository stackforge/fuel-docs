
.. _fuel-network.rst:

General networking issues
=========================

Known Issues in 5.1
-------------------

* **The floating VLAN and public networks**
  **must use the same L2 network and L3 Subnet.**
  These two networks are locked together
  and can only run via the same physical interface on the server.
  See the `Separate public and floating networks blueprint
  <https://blueprints.launchpad.net/fuel/+spec/separate-public-floating>`_.
  for information about ongoing work to remove this restriction.

* **The Admin(PXE) network cannot be assigned to a bonded interface.**
  When implementing bonding, at least three NICs are required:
  two for the bonding plus one for the Admin(PXE) network,
  which cannot reside on the bond and cannot be moved.
  See `LP1290513 <https://bugs.launchpad.net/fuel/+bug/1290513>`_.

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


LACP Bonding must be enabled in switch before deploying an environment that uses it
-----------------------------------------------------------------------------------

Network interfaces must be connected to a switch with LACP enabled
before attempting to deploy an environment
with "LACP balance-tcp" enabled
or the deployment will fail
with many network error messages.
See `LP1370593 <https://bugs.launchpad.net/fuel/+bug/1370593>`_.


