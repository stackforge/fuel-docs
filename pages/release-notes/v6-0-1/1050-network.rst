
.. _fuel-network.rst:

Networking issues
=================

Resolved networking issues in 6.0.1
-----------------------------------

* Multiple L3 agents are now enabled and operate in parallel.
  This effectively distributes the load between the controllers.
  See `Multiple L3 agents <https://blueprints.launchpad.net/fuel/+spec/fuel-multiple-l3-agents>`_ blueprint and `LP1328970 <https://bugs.launchpad.net/bugs/1328970>`_.

* Neutron metadata agent no longer
  fails after primary controller is shut down.
  See `LP1371561 <https://bugs.launchpad.net/bugs/1371561>`_.

* Requests to Neutron API server are successfully balanced to all Controller nodes.
  See `LP1276762 <https://bugs.launchpad.net/bugs/1276762>`_.

* Admin tenant is always created before
  Neutron routers and networks.
  See `LP1385491 <https://bugs.launchpad.net/bugs/1385491>`_.

* When Neutron is deployed with GRE, traffic on instance now flows
  much faster.
  See `LP1256289 <https://bugs.launchpad.net/bugs/1256289>`_.

* Neutron qrouter now migrates after network on the primary controller is
  deleted. See `LP1371550 <https://bugs.launchpad.net/bugs/1371550>`_.

* Neutron dhcp-agent no longer has 'unmanaged' status if migrated to another controller;
  'Network is unreachable' warning does not appear any more.
  See `LP1377906 <https://bugs.launchpad.net/bugs/1377906>`_.

* After connection is lost on the public NIC of the primary controller, public
  vip now relocates successfully.
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

* Nailgun will now reuse admin addresses that were assigned to the node during bootstrap.
  See `LP1271571 <https://bugs.launchpad.net/bugs/1271571>`__.

* Neutron no longer fails to allocate new GRE segment after a number of attempts.
  See `LP1381338 <https://bugs.launchpad.net/bugs/1381338>`_.

* Previously, in some larger scale environments,
  virtual machines failed to launch due to slow processing of IP tables rules.
  This issue is now fixed, so service timeout is observed.
  See `LP1399168 <https://bugs.launchpad.net/bugs/1399168>`_.

* Rescheduling a Neutron agent to a different controller may disrupt network
  connectivity to instances due to mismatching file permissions assumptions
  between Neutron and Pacemaker.
  OCF scripts for Neutron agents were updated to explicitly set umask to 0022.
  See `LP1392330 <https://bugs.launchpad.net/bugs/1392330>`_.

Known networking issues
-----------------------

* Current OVS bonding is now an Experimental Feature
  due to several issues discovered. To enable Experimental mode,
  see :ref:`experimental-features-op`.
  If you want to run Linux bonding instead, follow
  instructions in :ref:`Types of Bonding<types-bonding-arch>`.
  See `LP1401260 <https://bugs.launchpad.net/bugs/1401260>`_.

* The floating and public networks
  must use the same L2 network and L3 subnet.
  These two networks are locked together
  and can only run via the same physical interface on the server.
  See the `Separate public and floating networks blueprint
  <https://blueprints.launchpad.net/fuel/+spec/separate-public-floating>`_
  for information about the ongoing work to remove this restriction.

* The Fuel Master node services (such as PostgrSQL and RabbitMQ)
  are not restricted by a firewall.
  The Fuel Master node should live in a restricted L2 network
  to reduce security vulnerability.

* Some OpenStack services listen to all of the interfaces,
  a situation that may be detected and reported
  by third-party scanning tools not provided by Mirantis.
  Please discuss this issue with your security administrator
  if it is a concern for your organization.

* VirtualBox scripts do not use NAT-network for a Public vboxnet.
  This happens, because NAT-network in VirtualBox is still officially experimental.
  See `LP1275774 <https://bugs.launchpad.net/bugs/1275774>`_.

* Sometimes Open vSwitch flows enabling network access
  to VM instances are dropped.
  To work around this problem, restart Neutron L3 agent.
  See `LP1393771 <https://bugs.launchpad.net/bugs/1393771>`_.

* If you enable *Assign public network to all nodes* option on the
  *Settings* tab of the Fuel web UI,
  the default gateway from Storage network is used.
  That means, host located in the Internet are unreachable.
  See `LP1404809 <https://bugs.launchpad.net/bugs/1404809>`_.

* In an environment with more than 60 tenant networks, rescheduling a Neutron
  agent to a different controller may time out and leave behind orphaned
  networks and dnsmasq processes.
  See `LP1405477 <https://bugs.launchpad.net/bugs/1405477>`_.

* In rare cases, the Neutron DHCP agent takes up to 10 minutes to failover to a
  standby controller. Fuel sets the DHCP lease time to 120 seconds,
  which may lead to the loss of IP addresses and connectivity of instances.
  For more information on investigation and workaround,
  see `LP1371104 <https://bugs.launchpad.net/bugs/1371104>`_.

* During OpenStack deployment,
  a spurious critical error may appear in a log related to the ovs-agent.
  The error is misleading; no actual malfunction has occurred.
  See `LP1347612 <https://bugs.launchpad.net/mos/+bug/1347612>`_.

.. include:: /pages/release-notes/v6-0-1/9100-mellanox.rst

