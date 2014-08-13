
.. _ceilometer-mongodb-plan:

Ceilometer and MongoDB
----------------------

Fuel can deploy :ref:`ceilometer-term`,
the OpenStack Telemetry component.
When enabled, Ceilometer collects and shares measurement data
gathered from all OpenStack components.
This data cam be used for monitoring and capacity planning purposes
as well as for an alarming service.
Ceilometer's REST API can also provide data
to external monitoring software
for a customer's billing system.

Ceilometer can be configured to collect a large amount of metering data
and thus perform a high volume of database writes.
For example, with 100 resources and default configs
Ceilometer collects around 16k samples per hour.
Mirantis OpenStack 5.0 now defaults to installing MongoDB
as the recommended back-end database for OpenStack Telemetry.
The Fuel Master Node enables you to choose
the installation of MongoDB as a role onto a node.
This resolves the Ceilometer performance issues caused
by the volume of concurrent read/write operations.

To install Ceilometer with Fuel:

- Check the appropriate box on the :ref:`platform-services-ug` screen
  when configuring your environment.
- Assign the :ref:`mongodb-term` role
  to an appropriate number of servers
  on the :ref:`assign-roles-ug` screen.

See :ref:`ceilometer-ops` for information
about configuring and running Ceilometer.

Ideally, MongoDB should run on dedicated servers,
with at least as many MongoDB nodes
as Controller nodes in the environment.

QUESTIONS:

- How to estimate the compute and disk resources
  required for Ceilometer and MongoDB
- Can we give a high-level view of how people decide
  what to do with the data Ceilometer gathers?
  Are there existing front ends that can process and/or display
  the data or does every user need to use the REST API to pull out
  the info they want and pass it to some other application?
  We need just a high-level overview here; we can link to other
  details for information.


