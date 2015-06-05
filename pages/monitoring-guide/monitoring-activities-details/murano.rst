.. _mg-murano:

Murano
------

Murano is an OpenStack service which provides a catalog of
applications that can be readily deployed in an OpenStack cloud.
Murano orchestrates the deployment of those applications
automatically using other OpenStack services.

| **Process checks**

.. list-table::
   :header-rows: 1
   :widths: 20 20 20 20 20
   :stub-columns: 0
   :class: borderless

   * - Process name
     - Incoming connections
     - Role
     - Dependencies
     - HA mode

   * - murano-api
     - HTTP 8082
     - controller
     - db, amqp
     - active/active

   * - murano-engine
     - RPC
     - controller
     - murano-api, heat, :ref:`neutron <neutron>`, :ref:`amqp <amqp>`
     - active/active

.. _neutron:

In MOS 7.0, Neutron will be an optional dependency. If not found in
Keystone, Murano will fall back to use Nova Network.

.. _amqp:

May be configured to use additional instance of RabbitMQ. Note that
RabbitMQ instance used by Murano resides on the primary controller
node and listen port 55572 on public network.


| **API checks**

Check the proper functioning of the API with a read operation. For
example:

* list available packages:

  /v1/catalog/packages

* check if the package with Core Murano library is registered:

  /v1/catalog/packages?fqn=io.murano

  This API call should return a JSON object with “packages” property
  set to a json-array containing at least one object.

| **Collected Metrics**

.. list-table::
   :header-rows: 1
   :widths: 20 20 20
   :stub-columns: 0
   :class: borderless

   * - Metrics
     - Source
     - Purpose

   * - API errors
     - Logs:

       All entries with HTTP 500 error
     - Alert:

       When a sudden spike of errors is detected.

   * - Number of environments
     - Poll SQL:

       select count(id) from environment;
     - diag

   * - Number of successful deployments
     - Poll SQL:

       select count(id) from session where state='deployed'
     - diag

   * - Number of running deployments
     - Poll SQL:

       select count(id) from session where state='deploying'
     - diag

   * - Number of deployments which failed to complete or failed to be deleted
     - Poll SQL:

       select count(id) from session where state like '%failure'
     - diag

   * - Number of running deployments which have not been updated for
       more than 2 hours
     - Poll SQL:

       select count(id) from session where state='deploying' and
       updated < (now() - INTERVAL 2 HOUR)
     - Alert:

       Deployment in ``deploying`` state which has not been updated
       for a long period of time likely indicates a job which has
       hung up and needs some attention.

   * - Total number of application packages in catalog
     - Poll SQL:

       select count(id) from package;
     - diag


Murano RabbitMQ instance
++++++++++++++++++++++++

| **Process checks:**

Murano RabbitMQ instance runs as a named instance -
``murano@localhost``.

.. list-table::
   :header-rows: 1
   :widths: 20 20 20 20
   :stub-columns: 0
   :class: borderless

   * - Process name
     - Incoming connections
     - Role
     - HA mode

   * - beam
     - TCP 41056, 55572
     - controller
     - no

The command below returns the status of the Murano RabbitMQ instance::

 # rabbitmqctl -n murano@localhost status

And the following command returns pid of Murano RabbitMQ instance if exists::

 # ps axf | grep beam | grep  'murano@localhost' | grep -oP '(?<=(^\s))(\d+)'

