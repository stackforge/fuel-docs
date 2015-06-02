.. _mg-rabbitmq:

RabbitMQ
--------

All OpenStack services depend on RabbitMQ messages queues to
communicate and distribute the workload across workers. Therefore, it
is critical to monitor the healthiness of this component to ensure
there are no communication issues or performance bottlenecks
especially between the API endpoints and the workers. Furthermore, in
order to appraise correctly the availability status of the message
queues you need to take into account that RabbitMQ operates in a
`cluster`_ of `highly available queues`_.

**Process checks**

RabbitMQ is composed of two processes which run in pairs colocalized
on each controller node of the HA cluster.

.. list-table::
   :header-rows: 1
   :widths: 20 20 20 20
   :stub-columns: 0
   :class: borderless

   * - Process name
     - Incoming connections
     - Role 
     - HA mode

   * - epmd

       beam
     - TCP 4369

       TCP 41055, 5673
       HTTP 15672 (management port used to monitor servers)
     - controller
     - active/active

.. note::
   In order to enable the monitoring of RabbitMQ, the
   `management plugin`_ must be installed to expose RabbitMQ’s
   management Rest API. As for the service checks, a
   dedicated user should be used to query the Rest API or
   use :command:`rabbitmqctl` command line. For example, the
   following command returns the status of the cluster::
   
   # rabbitmqctl cluster_status

**RabbitMQ Cluster status**

.. list-table::
   :header-rows: 1
   :widths: 20 20 20
   :stub-columns: 0
   :class: borderless

   * - Check
     - Source
     - Purpose

   * - Unmirror queues
     - API management: In response from resource ``/queues``, check
       for each queue with **x-ha-policy** *arguments* that
       **synchronised_slave_nodes** is more than 0.
     - Alert: Slaves are not synchronized.

   * - Missing nodes in cluster
     - API management: Check the **running** status for each node,
       resource ``/nodes``.
     - Alert: One or several nodes are not being viewed as running.
       This should not happen unless they are in maintenance.

   * - Number of queues without consumer
     - API management: The number of consumers is directly accessible
       within the response from resources ``/queues/<name>``.
     - Alert: Queues without consumers should not happen. This could
       be a symptom of a resource leak situation.

**Collected Metrics**

.. list-table::
   :header-rows: 1
   :widths: 20 20 20
   :stub-columns: 0
   :class: borderless

   * - Metric
     - Source
     - Purpose

   * - Total number of nodes in cluster
     - API management
     - diag

   * - Number of connections
     - API management
     - diag

   * - Number of consumers
     - API management
     - Alert: Zero consumers should never happen. Something is
       probably deeply broken.

   * - Number of exchanges
     - API management
     - Alert: Zero exchanges should never happen. Something is
       probably deeply broken.

   * - Number of queues
     - API management
     - Alert: Zero queues should never happen. Something is
       probably deeply broken.

**Metrics per queue**

.. list-table::
   :header-rows: 1
   :widths: 20 20 20
   :stub-columns: 0
   :class: borderless

   * - Metric
     - Source
     - Purpose

   * - Number of ready messages
     - API management
     - Alert: When the value is beyond standard deviation or top
       percentiles threshold depending on the data-points
       distribution. This could be the symptom of a resource
       congestion situation.

   * - Number of consumers
     - API management
     - diag

   * - Number of published messages
     - API management
     - diag

   * - Number of delivered messages
     - API management
     - diag

   * - Number of acked messages
     - API management
     - diag

   * - Number of memory used
     - API management
     - diag

   * - Errors
     - ``/var/log/rabbitmq/``\*.log
     - Alert: When a sudden spike of errors is detected.



.. Links
.. _`cluster`: https://www.rabbitmq.com/clustering.html
.. _`highly available queues`: https://www.rabbitmq.com/ha.html
.. _`management plugin`: https://www.rabbitmq.com/management.html

