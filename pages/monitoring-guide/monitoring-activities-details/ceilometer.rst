.. _mg-ceilometer:

Ceilometer
----------

Ceilometer is the OpenStack telemetry project which aims to provide
a unique point of information to acquire all of the resource usage measurements that operators need for chargeback and billing.

|

**Process checks**

.. list-table::
   :header-rows: 1
   :widths: 30 15 15 20 20
   :stub-columns: 0
   :class: borderless

   * - Process name
     - Incoming connections
     - Role
     - Dependencies
     - HA mode

   * - ceilometer-api
     - HTTP 8777
     - controller
     - storage
     - active/active

   * - :ref:`ceilometer-agent-central <agents>`
     - RPC
     - controller
     - amqp
     - active/passive

   * - :ref:`ceilometer-agent-compute <agents>`
     - RPC
     - compute
     - amqp
     - active/passive

   * - ceilometer-agent-notification
     - RPC
     - controller
     - amqp
     - active/active

   * - ceilometer-collector
     - RPC
     - controller
     - amqp,storage
     - active/active

   * - ceilometer-alarm-evaluator
     - RPC
     - controller
     - ceilometer api, storage
     - active/active

   * - ceilometer-alarm-notifier
     - RPC
     - controller
     - amqp, external system
     - active/active

.. _agents:

*ceilometer-agent-central* and *ceilometer-agent-compute* are
replaced by a single process named *ceilometer-polling*.

.. note::
   Since several storage backends can be used by Ceilometer, the
   monitoring of these backends is not addressed in this document.
   See `Ceilometer backends list <http://docs.openstack.org/developer/ceilometer/install/dbreco.html>`_.

|

**API checks**

The list of samples must use the *limit* option not to overload the
service by retrieving too much data.

|

**Collected Metrics**

.. list-table::
   :header-rows: 1
   :widths: 20 40 40
   :stub-columns: 0
   :class: borderless

   * - Metrics
     - Source
     - Purpose

   * - API errors
     - Logs:

       all entries with HTTP 500 error
     - Alert:

       When a sudden spike of errors is detected.
