.. _fuel-network.rst:

Networking Issues
=================

Resolved networking issues
--------------------------

* Open vSwitch has been upgraded to Version 2.3.
  VM to VM network performance is no longer limited to 2.5 Gb.
  See `LP1403047 <https://bugs.launchpad.net/bugs/1403047>`_.
  See `LP1400355 <https://bugs.launchpad.net/bugs/1400355>`_.

Known networking issues
-----------------------

* HA will fail if a node runs out of RAM and swap
  memory, because Pacemaker resources will not
  migrate from the affected node.
  The recommendation is to employ
  external monitoring along with STONITH.
  See `LP11422186 <https://bugs.launchpad.net/bugs/1422186>`_.

* Network verification may fail on VirtualBox after deployment on CentOS.
  The workaround is to enable at least one VLAN (even unused) in the
  interface at the node startup.
  See `LP1457478 <https://bugs.launchpad.net/fuel/+bug/1457478>`_.

.. include:: /pages/release-notes/v6-1/9100-mellanox.rst
