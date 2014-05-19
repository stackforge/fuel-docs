
.. _ceilometer-term:

Ceilometer (OpenStack Telemetry)
--------------------------------

Ceilometer aggregates usage and performance data
across all the services deployed in an OpenStack environment.
This data provides visibility and insight
into the usage of the cloud across dozens of data points
and allows cloud operators to view metrics globally
or by individual deployed resources.
The information gathered can be used for monitoring and capacity planning,
or to create an alarming service,
or can serve data to external software for a customer billing system.
The framework can be expanded to collect measurements for other needs.

Fuel can install Ceilometer on systems running
either the CentOS or Ubuntu operating system;
check the appropriate box when configuring your environment.

Note that Ceilometer collects a great deal of data
and performance a large volume of database writes;
with 100 resources and default configs Ceilometer could to collect more
than 16k samples per hour.

Mirantis OpenStack 5.0 now defaults to installing MongoDB
as the recommended back-end database for OpenStack Telemetry.
The Fuel Master Node enables you to choose
the installation of MongoDB as a role onto a node.
This resolves the Ceilometer performance issues caused
by the volume of concurrent read/write operations.

The Ceilometer (Resource Usage) tab is restored to Horizon.
It was disabled in earlier releases to solve another problem.
.. See `LP <https://bugs.launchpad.net/fuel/+bug/1284578>`_.

For more information, see
*  :ref:`ceilometer-deployment-notes`
* `Ceilometer wiki <https://wiki.openstack.org/wiki/Ceilometer>`_
* `Ceilometer blob <https://github.com/openstack/ceilometer/blob/stable/icehouse/doc/source/install/dbreco.rst>`_

