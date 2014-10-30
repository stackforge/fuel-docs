
.. _other-rn:

Issues in other components
==========================

.. include:: /pages/release-notes/v6-0/other/4010-horizon.rst
.. include:: /pages/release-notes/v6-0/other/6040-murano.rst
.. include:: /pages/release-notes/v6-0/other/4020-keystone.rst
.. include:: /pages/release-notes/v6-0/other/5010-ceilometer-mongodb.rst
.. include:: /pages/release-notes/v6-0/other/5030-zabbix.rst


Known issues for 6.0
--------------------

* Fuel ISO build system is unable to pick up base packages
  from EXTRA_DEB_REPOS.
  See `LP1381672 <https://bugs.launchpad.net/fuel/+bug/1381672>`_.

* Shotgun does not ensure enough disk space for diagnostic snapshotю
  See `the related
  blueprint <https://blueprints.launchpad.net/fuel/+spec/manage-logs-with-free-space-consideration>`_.

* Sometimes, Galera can not sync databases using *mysqldump*;
  in most cases, this happens on slow hardware.
  See `LP1356812 <https://bugs.launchpad.net/fuel/+bug/1356812>`_.

* When a new OpenStack environment is created in Firefox browser,
  in the "name"  field a tooltip on the basis of the previous file data entered.
  See `LP1373440 <https://bugs.launchpad.net/fuel/+bug/1373440>`_.
