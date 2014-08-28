
.. _ceilometer-ops:

Running Ceilometer
==================

Fuel can deploy the OpenStack Telemetry component
:ref:`Ceilometer<ceilometer-term>`
to run in your OpenStack environment.
When enabled, Ceilometer collects and shares measurement data
gathered from all OpenStack components.
This data can be used for monitoring and capacity planning purposes
as well as for an alarming service.
Ceilometer's REST API can also provide data
to external monitoring software for a customer's billing system.
See :ref:`ceilometer-mongodb-plan` for information
about the resources required to run Ceilometer.

For complete information about configuring and running Ceilometer,
see `Ceilometer Developer Documentation <http://docs.openstack.org/developer/ceilometer/>`_.

.. _ceilometer-config-ops:

Configuring Ceilometer
----------------------

Three types of measurement are defined:

- Cumulative -- increasing over time (instance hours)
- Gauge -- Discrete items (floating IPs, image uploads)
  and fluctuating values (disk I/O)
- Delta -- Changing over time (bandwidth)

For a complete list of meter types by component
that are currently implemented, see
`<http://docs.openstack.org/developer/ceilometer/measurements.html>`_

For a complete list of Configuration Options, see
`<http://docs.openstack.org/developer/ceilometer/configuration.html>`_

.. _ceilometer-api-ops:

Performance and database backend
--------------------------------

Ceilometer can be configured to collect a large amount of metering data
and thus perform a high volume of database writes.
For example, with 100 resources and default configs
Ceilometer collects around 16k samples per hour.

Starting with version 5.0, Mirantis OpenStack defaults to installing
:ref:`mongodb-term` as the recommended back-end database for Ceilometer.
The Fuel Master Node enables you to choose
the installation of MongoDB as a role onto a node;
see :ref:`assign-roles-ug` for instructions.
This resolves the Ceilometer performance issues caused
by the volume of concurrent read/write operations.

