
.. _fuel-network.rst:

Networking issues
=================

New Features and Resolved Issues in Mirantis OpenStack 6.0
----------------------------------------------------------

* Neutron metadata agent no longer
  fails after primary controller is shut down.
  See `LP1371561 <https://bugs.launchpad.net/bugs/1371561>`_.

* Requests to Neutron API server are successfully balanced to all Controller nodes.
  See `LP1276762 <https://bugs.launchpad.net/bugs/1276762>`_.

* Admin tenant is now ensured to be created before
  Neutron routers and networks.
  See `LP1385491 <https://bugs.launchpad.net/bugs/1385491>`_.

* When Neutron is deployed with GRE, traffic on instances is no
  longer slow.
  See `LP1256289 <https://bugs.launchpad.net/bugs/1256289>`_.

* Neutron qrouter now migrates after network on the primary controller is
  deleted. See `LP1371550 <https://bugs.launchpad.net/bugs/1371550>`_.

* Neutron dhcp-agent no longer has 'unmanaged' status if mirgated to another controller;
  'Network is unreachable' warning does not appear any more.
  See `LP1377906 <https://bugs.launchpad.net/bugs/1377906>`_.

* After connection is lost on the public NIC of the primary controller, public
  vip now relocate successfully.
  See `LP1370510 <https://bugs.launchpad.net/bugs/1370510>`_.

* Fuel no longer insists on having redundant Public IP range.
  See `LP1376426 <https://bugs.launchpad.net/bugs/1376426>`_.

* Metadata agent now uses RPC instead of Neutron client
  to reduce Keystone load and avoid possible authentication issues.
  See `LP1364348 <https://bugs.launchpad.net/bugs/1364348>`_.

* After environment is shut down, Neutron server is now able to reconnect to MySQL server
  See `LP1387405 <https://bugs.launchpad.net/bugs/1387405>`_.

* Neutron L3 agent does not hang after migration from one controller to another.
  See `LP1361710 <https://bugs.launchpad.net/bugs/1361710>`_.


Known Issues in Mirantis OpenStack 6.0
--------------------------------------

* The floating and public networks
  must use the same L2 network and L3 Subnet.
  These two networks are locked together
  and can only run via the same physical interface on the server.
  See the `Separate public and floating networks blueprint
  <https://blueprints.launchpad.net/fuel/+spec/separate-public-floating>`_
  for information about ongoing work to remove this restriction.

* The Fuel Master node services (such as PostgrSQL and RabbitMQ)
  are not restricted by a firewall.
  The Fuel Master node should live in a restricted L2 network
  so this should not create a security vulnerability.

* L3 agent takes about 30 seconds
  to failover to a standby controller
  when a controller node fails.
  See `LP1328970 <https://bugs.launchpad.net/bugs/1328970>`_.

* Some OpenStack services listen to all of the interfaces,
  a situation that may be detected and reported
  by third-party scanning tools not provided by Mirantis.
  Please discuss this issue with your security administrator
  if it is a concern for your organization.

* VirtualBox scripts do not use NAT-network for a Public vboxnet.
  See `LP1275774 <https://bugs.launchpad.net/bugs/1275774>`_.

* After rollback, Neutron server goes down on all controllers with failed
  OSTF tests.
  See `LP1364465 <https://bugs.launchpad.net/bugs/1364465>`_.

* After HA failover, virtual machines lose connectivity and their IP addresses.
  See `LP1371104 <https://bugs.launchpad.net/bugs/1371104>`_.

* When dnsmasq runs out of IP addresses, no feedback is provided.
  To work around this problem, you should log in to Cobbler
  container and look at the logs.
  See `LP1379494 <https://bugs.launchpad.net/bugs/1379494>`_.

* Neutron fails to allocate new GRE segment after 10 attempts.
  See `LP1381338 <https://bugs.launchpad.net/bugs/1381338>`_.


.. include:: /pages/release-notes/v6-0/9100-mellanox.rst

