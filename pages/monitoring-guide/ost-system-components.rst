.. _Monitoring-system-components:

OpenStack System Components
===========================

Here the list of health checks and metrics to collect across all components.

Time daemon
-----------

The local time between nodes is realy important, for many reasons including

- the proper functioning of services using time to operate (cron, database, storage)
- log timestamps coherence
- metrics timestamps coherance

It also a good practice to setup **UTC** timezone all nodes.

Usually *Network Time Protocol* is used to synchronises the system clock
with remote NTP time servers.

On linux boxes **NTPd** daemon must run and configured with several external
time servers.


Clustering
----------

Check Pacemaker resources status by running command line **pcs status**.
All resources must be **Started**.

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

To enable the Rest API for RabbitMQ management it  requires to activate the `management plugin`_.

checks
++++++

- check if processes *epmd* and *beam* are running
- check if these TCP port are open :
    - 4369
    - 41055
    - 5673
    - 15672 (management port used for monitoring)

- Cluster status
    - Unmirror queues
    - Missing nodes in cluster

- Others checks
    - Queues without consumer
    - Missing queues

metrics
+++++++

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
- Number of partitions

- Per queue
   - Number of messages
   - Number of published messages
   - Number of delivered messages
   - Number of acked messages
   - Number of memory used

.. _management plugin: https://www.rabbitmq.com/management.html

Logs
++++

/var/log/rabbitmq/

Open vSwitch
------------

Memcache
--------

check if process *memcached* is running

check if TCP port is open: 11211

