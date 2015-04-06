
.. _fuel-network.rst:

Networking issues
=================

Resolved networking issues
--------------------------

* DB migration refactor and new timeline.

* IPSet support for security groups in place of iptables (this option is configurable).

* L3 agent performance improvements.

* Migration to oslo.messaging library for RPC communication.

* Security group rules for devices RPC call refactoring (a huge performance improvement).

Known networking issues
-----------------------

* Distributed Virtual Router Support (DVR).

* Full IPv6 support for tenant networks.

* High Availability for the L3 Agent.

New Plugins
-----------

* VPNaaS. VPN-as-a-Service is a Neutron extension that introduces VPN feature set.
  VPNaaS provides multiple tunneling and security protocols with static routing.
  For now, this plugin uses OpenSwan, which is an opensource IPsec implementation for Linux.

  See the `support-vpnaas-in-mos blueprint
  <https://blueprints.launchpad.net/fuel/+spec/support-vpnaas-in-mos>`_
  for details about the implementation.

* FWaaS. Firewall-as-a-Service is a Neutron extension that introduces Firewall feature set.

  See the `support-fwaas-in-mos blueprint
  <https://blueprints.launchpad.net/fuel/+spec/support-fwaas-in-mos>`_
  for details about the implementation.

.. include:: /pages/release-notes/v6-1/9100-mellanox.rst
