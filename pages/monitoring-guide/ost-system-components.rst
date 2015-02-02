.. _Monitoring-system-components:

OpenStack System Components
===========================

Here the list of health checks and metrics to collect across all components.

Clustering
----------

Check Pacemaker resources status by running command ligne **pcs status**. All resources must be **Started**.

LibVirt
-------


Database
--------

MySQL
_____

monitor error and Slow queries in logs.

Health of cluster


AMQP Broker
-----------

RabbitMQ
________

checks
++++++

- check if processes *epmd* and *beam* are running
- check if these TCP port are open :
    - 4369
    - 41055
    - 5673 ..
- Cluster status
    - partitions
    - Unmirror.queues

- Checks requiring knowledge of the topology:
    - Queues.without.consumers
    - Missing.queues
    - Missing nodes in cluster

metrics
+++++++

requirement to activate the `management plugin`_

- Process liveness
- Uptime
- Number of nodes in cluster
- Number of missing nodes
- Number of connections
- Number of exchanges
- Number of queues
- Number of ready messages
- Number of unacknowledged messages
- Number of uncommitted messages

- Per queue
   - Number of published messages
   - Number of delivered messages
   - Number of acked messages
   - Number of memory used

.. _management plugin: https://www.rabbitmq.com/management.html


Open vSwitch
------------

Memcache
--------

check if process *memcached* is running

check if TCP port is open: 11211

