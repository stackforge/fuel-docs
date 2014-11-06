
.. _fuel-general.rst:

OpenStack Deployment Issues
===========================

New Features and Resolved Issues in Mirantis OpenStack 6.0
----------------------------------------------------------

* Nova floating range now waits for both Keystone backends.
  See `LP1381982 <https://bugs.launchpad.net/bugs/1381982>`_.

* Previously, default Neutron networks were created
  with admin tenant name, even if it was changed into custom one
  in cluster settings. This problem is now fixed.
  See `LP1376515 <https://bugs.launchpad.net/bugs/1376515>`_.

* File injection no longer fails when an instance launches
  See `LP1335697 <https://bugs.launchpad.net/bugs/1335697>`_.

Known Issues in 6.0
-------------------

* When :ref:`adding controllers<add-controller-ops>`
  to an existing environment,
  nova-api is unavailable for a few minutes,
  which causes services to be unavailable.
  See `LP1370067 <https://bugs.launchpad.net/fuel/+bug/1370067>`_.

* On CentOS in HA mode on vCenter's machine on primary controller OpenStack
  deployment crashes because RabbitMQ can not connect to primary controller.
  See `LP1394188 <https://bugs.launchpad.net/fuel/+bug/1394188>`_.
