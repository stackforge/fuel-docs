Ceilometer new features
=======================

Mirantis OpenStack 6.1 includes a number of improvements for
Telemetry module:

* new method of partitioning alarm evaluation load using `tooz`_
  coordination, as opposed to a hand-crafted protocol. See the
  `Rebase partitioned alarm evaluation on tooz`_ blueprint
  for details;

* option to split off the alarms persistence into a separate
  database. See the `Dedicated database for the alarm part of
  ceilometer`_ blueprint for details;

* metering of Neutron networking services: LBaaS, FWaaS & VPNaaS.
  You can enable it manually in Ceilometer if you are going to
  deploy additional Fuel plugins:

  - LBAAS: https://github.com/stackforge/fuel-plugin-neutron-lbaas
  - FWAAS: https://github.com/stackforge/fuel-plugin-neutron-fwaas
  - VPNAAS: https://github.com/stackforge/fuel-plugin-neutron-vpnaas

* support for persisting events via the MongoDB storage driver (previously
  limited to SQLAlchemy). See the `Enable event feature on
  MongoDB and DB2`_ blueprint for details;

* support for per-device metering of instance disks. See `Add support
  to gather per-device metrics for instances`_ blueprint for details;

* Ceilometer now uses oslo.messaging instead of openstack.common.rpc. See
  the `Switch to oslo.messaging`_ blueprint for details;

* option to use notifications instead of RPC for metering messages. See
  the `Replace RPC cast() with notifications`_ blueprint for details;

* external MongoDB support. See the `Implement possibility to set external
  MongoDB connection`_ blueprint for details;

* Ceilometer and VCenter integration. See the `Implement possibility to
  setup ceilometer compute agent on controller`_ blueprint for details.

.. _`tooz`: https://github.com/stackforge/tooz
.. _`Rebase partitioned alarm evaluation on tooz`: https://blueprints.launchpad.net/ceilometer/+spec/hash-based-alarm-partitioning
.. _`Dedicated database for the alarm part of ceilometer`: https://blueprints.launchpad.net/ceilometer/+spec/dedicated-alarm-database
.. _`Enable event feature on MongoDB and DB2`: https://blueprints.launchpad.net/ceilometer/+spec/mongodb-events-feature
.. _`Add support to gather per-device metrics for instances`: https://blueprints.launchpad.net/ceilometer/+spec/instance-per-disk-measurement
.. _`Switch to oslo.messaging`: https://blueprints.launchpad.net/ceilometer/+spec/switch-to-oslo.messaging
.. _`Replace RPC cast() with notifications`: https://blueprints.launchpad.net/ceilometer/+spec/replace-rpc-cast-with-notifications
.. _`Implement possibility to set external MongoDB connection`: https://blueprints.launchpad.net/fuel/+spec/external-mongodb-support
.. _`Implement possibility to setup ceilometer compute agent on controller`: https://blueprints.launchpad.net/fuel/+spec/ceilometer-support-for-vcenter
