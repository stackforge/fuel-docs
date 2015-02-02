.. _Monitoring-OSt-services:

OpenStack services
==================

This section is listing for all OpenStack services:

- Heath checks to perform: processes level and services availablilty
- Metrics to collect
- Resource usage

Health checks are done by testing processes at OS level with monitoring agents
running on each node. This consists to check processes existence, check that
network ports supposed to be open are open and network connectivities between
component are effective.

Service availablilty are done by calling each API endpoints to perform
basic operations for public and admin urls.
In order to poll each APIs, the monitoring system should use a dedicated
*project (tenant)* and *user*. The polling interval and operations made must not
overload systems.

Metrics are usualy drawn from notifications, database queries, API calls, and logs.
All data collected will be used to set thresholds on it, provide visibility of users
activites and ressource utilization, and troubleshooting.

.. include:: /pages/monitoring-guide/ost-service-keystone.rst
.. include:: /pages/monitoring-guide/ost-service-nova.rst
.. include:: /pages/monitoring-guide/ost-service-neutron.rst
.. include:: /pages/monitoring-guide/ost-service-ceph.rst
.. include:: /pages/monitoring-guide/ost-service-cinder.rst
.. include:: /pages/monitoring-guide/ost-service-glance.rst
.. include:: /pages/monitoring-guide/ost-service-horizon.rst
.. include:: /pages/monitoring-guide/ost-service-swift.rst
.. include:: /pages/monitoring-guide/ost-service-heat.rst
.. include:: /pages/monitoring-guide/ost-service-ceilometer.rst
