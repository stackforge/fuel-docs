Issues Resolved in Mirantis OpenStack 5.0
=========================================

Murano OSTF test for Linux Apache Service fails
-----------------------------------------------

The Murano OSTF test for the Linux Apache service failed with an AssertionError.
See `LP1271089 <https://bugs.launchpad.net/fuel/+bug/1271089>`_.

Sahara logging now works correctly
----------------------------------

Issues with Sahara logging are resolved.
See `LP1285766 <https://bugs.launchpad.net/fuel/+bug/1285766>`_
and `LP 1288475 <https://bugs.launchpad.net/fuel/+bug/1288475>`_.

Ceph RadosGW sometimes failed to start on some controllers
----------------------------------------------------------

In HA mode, RadosGW services occasionall failed on some controller nodes
during deployment;
this could be fixed by manually starting the rados-gw service.
The issue has been resolved.
See `LP1261955 <https://bugs.launchpad.net/fuel/+bug/1261966>`_.

