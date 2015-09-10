
.. _ceilometer-mongodb-plan:

Ceilometer and MongoDB
----------------------

Fuel can deploy :ref:`ceilometer-term` in your OpenStack environment.
Ceilometer collects and shares measurement data from all OpenStack components.
You can use this data to monitor utilization, as well as for capacity planning,
and the alarming service.
In addition, Ceilometer's REST API provides data to external monitoring
software for third-party billing systems.

Mirantis OpenStack installs MongoDB as a back-end database for OpenStack
Telemetry.
This helps to resolve the Ceilometer performance issues with MySQL database
encountered in earlier releases, because MongoDB better handles the volume of
concurrent read and write operations.

Ceilometer collects the following types of data:

- **Billable events**

  Billable events include such events as "instance X was created"
  and "volume Z was deleted". Though the system sends these notifications
  continuously, monitoring of billable events uses little resources of
  the cloud environment.

- **Metrics**

  Metrics analyze activities in the cloud environment at the moment
  of sampling. This information is gathered by polling
  and may consume significant amounts of I/O processing resources
  and large amount of database storage.

You can configure Ceilometer to collect the large amount of metering data
and, therefore, process high volume of database writes.


.. _plg-plan-res-ceilometer:

Planning resources for Ceilometer
---------------------------------

When planning your resources, consider the following:

- The MongoDB partition requires at least 10240 MB of free space.

- The resources consumed by metrics sampling are determined by
  the polling interval, the number of metrics being collected, and the number
  of resources from which metrics are collected.
  The amount of storage required is also affected
  by the frequency with which you offload or purge the data from the database.

- Frequent polling of metrics yields a better picture
  of what is happening in the cloud environment,
  but also significantly increases the amount of data being processed and stored.

  For example, in one test sampling, the same metrics
  for the same fairly small number of resources
  in the same environment resulted in the following:

  - 1 minute polling accumulated 0.8 TB of data over a year.
  - 30 second polling accumulated 1.4 TB of data over a year.
  - 5 second polling accumulated 14.5 TB of data over a year.

- Ceilometer consumes fairly small amounts of CPU.
  However, the I/O processing is extremely intensive
  when the data is written to the disk.
  Therefore, we recommend using dedicated MongoDB nodes
  rather than running the MongoDB role on the Controller nodes.

  In our lab tests, nearly 100% of the disk I/O resources on the Controller
  nodes were sometimes consumed by Ceilometer writing data to MongoDB
  when the database was located on the Controller node and a small
  polling interval was used.
  This configuration halted or interferred with all other OpenStack services
  on the Controller node and prevented other processes from running.

Installing Ceilometer
---------------------

Before installing Ceilometer, verify that your environment meets the
recommendations described in :ref:`plg-plan-res-ceilometer`.

You can add Ceilometer to your OpenStack environment when you configure an
OpenStack environment in the deployment wizard or in the
**Settings** tab.

To install Ceilometer:

1. Select from the following options:

- In the deployment wizard:

  #. In the **Additional Services** screen, select the **Install Ceilometer**
     checkbox.

- In the **Settings** tab.:

  #. Select the **Install Ceilometer** checkbox.

2. Create the new OpenStack environment.
3. Click on the new environment.
4. In the **Nodes** tab, assign the **Telemetry-MongoDB** role to the required
   servers.

.. note::
   We recommend that you run MongoDB on dedicated servers. The minimum number
   of MongoDB nodes must be equal or greater than the number of the Controller
   nodes deployed in the OpenStack environment.
