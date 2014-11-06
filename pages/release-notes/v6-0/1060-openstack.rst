
.. _fuel-general.rst:

OpenStack Deployment Issues
===========================

New Features and Resolved Issues in Mirantis OpenStack 6.0
----------------------------------------------------------

* Nova floating range now waits for both Keystone backends.
  See `LP1381982 <https://bugs.launchpad.net/bugs/1381982>`_.

* Tenant no longer reports wrong name for networks if default
  administrator's name is changed to custom one.
  See `LP1376515 <https://bugs.launchpad.net/bugs/1376515>`_.

Known Issues in 6.0
-------------------

* When :ref:`adding controllers<add-controller-ops>`
  to an existing environment,
  nova-api is unavailable for a few minutes,
  which causes services to be unavailable.
  See `LP1370067 <https://bugs.launchpad.net/fuel/+bug/1370067>`_.

* File injection fails when an instance launches
  Instances with file injection cannot be launched
  after the OpenStack environment is launched.
  Instances that do not require file injection can be launched.
  As a workaround, execute the **update-guestfs-appliance** command
  on each Compute node.
  See `LP1335697 <https://bugs.launchpad.net/bugs/1335697>`_.

* On CentOS in HA mode on vCenter's machine on primary controller OpenStack
  deployment crashes because RabbitMQ can not connect to primary controller.
  See `LP1370558 <https://bugs.launchpad.net/fuel/+bug/1370558>`_.
