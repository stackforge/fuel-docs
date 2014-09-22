
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

.. _ceilometer-vcenter:

Configuring Ceilometer for vCenter
----------------------------------

The default Fuel deployment
does not configure Ceilometer
to collect metering information from vCenter.
This also means that,
if the vCenter installation is used with Heat,
autoscaling does not work correctly
because the alarms sent to Heat
are implemented using meters.

To configure Ceilometer to collect
metering information for vCenter:

Install **ceilometer-compute-agent** on the Controller node
using the appropriate command:
::

  yum install openstack-ceilometer-compute (CentOS)
  apt-get install ceilometer-agent-compute (Debian)

Configure Ceilometer by adding the following lines
to the *ceilometer.conf* file:
::

  [DEFAULT]
  default_log_levels=amqp=WARN,amqplib=WARN,boto=WARN,qpid=WARN, \
     sqlalchemy=WARN,suds=INFO,iso8601=WARN, \
     requests.packages.urllib3.connectionpool=WARN,oslo.vmware=WARN
  hypervisor_inspector=vsphere

  [vmware]
  See Note [1] below.

  [alarm]
  evaluation_interval=<Period of evaluation cycle>  See Note [2] below.

:Note [1]:   Configure according to the `VMware documentation <http://docs.openstack.org/developer/ceilometer/configuration.html#vmware-configuration-options>`_.

:Note [2]:  This value should be >= than the configured pipeline interval
            for the collection of the underlying metrics.

You must also patch a known
`Icehouse bug <https://bugs.launchpad.net/ceilometer/+bug/1330330>`_ with the VMware inspector.
Use this `fix <https://review.openstack.org/#/c/100441/>`_.

When you have completed these steps,
restart **ceilometer-agent-compute**, **ceilometer-alarm-evaluator**
and **ceilometer-alarm-notifier**.


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

