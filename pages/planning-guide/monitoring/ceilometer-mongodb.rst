
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

Mirantis OpenStack 5.0 and later defaults to installing MongoDB
as the recommended back-end database for OpenStack Telemetry.
This significantly improves the Ceilometer performance issues
encountered in earlier releases that used the MySQL database;
MongoDB is better able to handle the volume of concurrent read/write operations.

Ceilometer collects two different categories of data:

- **Billable events** such as "instance X was created",
  "volume Z was deleted.
  These notifications appear in the cloud ecosystem continuously;
  monitoring them does not consume
  significant amounts of resources in the cloud environment.

- **Metrics** that analyze the activity in the cloud environment
  at the moment of sampling.
  This information is gathered by polling
  and can consume significant amounts of I/O processing resources
  and large amounts of database storage.

Ceilometer can be configured to collect a large amount of metering data
and thus perform a high volume of database writes.
In planning the resources required,
consider the following:

- The resources consumed by metrics sampling are determined by
  the polling interval, the number of metrics being collected,
  and the number of resources from which metrics are collected.
  The amount of storage required is also affected
  by the frequency with which you offload or purge the data from the database.

- Frequent polling of metrics yields a better picture
  of what is happening in the cloud environment
  but also significantly increases the amount of data being processed and stored.
  For example, in one test sampling the same metrics
  for the same (fairly small) number of resources
  in the same environment:

    - 1 minute polling accumulated .8TB of data over a year.
    - 30 second polling accumulated 1.4TB of data over a year.
    - 5 second polling accumulated 14.5TB of data over a year.

- Ceilometer consumes fairly small amounts of CPU
  but the I/O processing is extremely intensive
  when the data is written to the disk.
  This is why we recommend using dedicated MongoDB nodes
  rather than running the MongoDB role on Controller nodes.
  In our lab tests, nearly 100% of the disk I/O resources on the Controller nodes
  were sometimes consumed by Ceilometer writing data to MongoDB
  when the database was located on the Controller.
  This nearly halted all other processing on the Controller node
  and prevented other processes from running.

To install Ceilometer:

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


