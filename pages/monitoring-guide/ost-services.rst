.. _Monitoring-OSt-services:

OpenStack services
==================

This section is listing for all OpenStack services:

- processes to check existence
- activity metrics to collect
- resource usage to compute

Porcess check at OS level are perform by monitoring agents running on each node.

Activity metrics are often drawn from notifications or logs.

Finally, for each API endpoints basic operations must be regularly tested,
for public and admin endpoints.
In order to poll each APIs, the monitoring system should use a dedicated
*project (tenant)* and *user*.


.. include:: /pages/monitoring-guide/ost-service-ceilometer.rst
.. include:: /pages/monitoring-guide/ost-service-ceph.rst
.. include:: /pages/monitoring-guide/ost-service-cinder.rst
.. include:: /pages/monitoring-guide/ost-service-glance.rst
.. include:: /pages/monitoring-guide/ost-service-heat.rst
.. include:: /pages/monitoring-guide/ost-service-horizon.rst
.. include:: /pages/monitoring-guide/ost-service-keystone.rst
.. include:: /pages/monitoring-guide/ost-service-nova.rst
.. include:: /pages/monitoring-guide/ost-service-neutron.rst
.. include:: /pages/monitoring-guide/ost-service-swift.rst
