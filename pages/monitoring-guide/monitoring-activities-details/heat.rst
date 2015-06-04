.. _mg-heat:

Heat
----

Heat is the OpenStack service to orchestrate the deployment of
multiple composite cloud applications using the AWS CloudFormation
template format, through both an OpenStack-native ReST API and a
CloudFormation-compatible Query API.

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

   * - heat-api
     - 8004
     - controller
     - db, amqp
     - active/active

   * - heat-engine
     - RPC
     - controller
     - db, amqp, other OpenStack services
     - active/active

   * - heat-api-cfn
     - 8000
     - controller
     - db, amqp
     - active/active

.. note::

   The heat-api-cloudwatch service is not addressed here as it is
   deprecated by the Heat team.

| **Collected Metrics**

.. list-table::
   :header-rows: 1
   :widths: 20 20 20
   :stub-columns: 0
   :class: borderless

   * - Metric
     - Source
     - Purpose

   * - number of active stacks
     - API

       GET /v1/{tenant_id}/stacks
     - diag

   * - number of stacks in error
     - API

       GET /v1/{tenant_id}/stacks
     - diag

   * - number of stacks in progress
     - API

       GET /v1/{tenant_id}/stacks
     - diag

   * - API errors
     -
     - Alert:

       When a sudden spike of errors is detected.

