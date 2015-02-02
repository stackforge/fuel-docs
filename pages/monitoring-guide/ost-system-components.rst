.. _Monitoring-system-components:

OpenStack System Components
===========================

Here is the list of health checks and metrics to collect across all components.

Time synchronization
--------------------

The local time between nodes is really important, for many reasons including

- the proper functioning of services using time to operate:
   - cron,
   - database,
   - storage,
   - cluster *Ceph*
- log timestamps consistency
- metrics timestamps consistency

It's also a good practice to setup timezone **UTC** for all nodes.

Usually *Network Time Protocol* is used to synchronize the system clock
with remote NTP time servers.

On linux boxes **NTPd** daemon must run and be configured with several external
time servers.
Distributions provide a configured package but it is necessary to
use pool of geographically closest NTP servers.

The monitoring system must check the liveness of the daemon to ensure
the whole cluster is time synchronized.

Clustering
----------

**Pacemaker** and **Corosync** ensure services clustering.
The clustering stack is able to give a big picture on cluster status and services health.


Check **corosync** status and verify ring is in the *active* with *no faults* state.

   ::

     # corosync-cfgtool -s
     Printing ring status.
     Local node ID 33597632
     RING ID 0
     id= 192.168.0.2
     status= ring 0 active with no faults

Check Pacemaker resources status by running command line **crm status**.
All resources must be **Started**.

   ::

     # crm status
      Cluster name:-
      Last updated: Tue Feb 10 12:43:35 2015
      Last change: Tue Feb 10 11:43:39 2015 via cibadmin on node-1
      Stack: classic openais (with plugin)
      Current DC: node-1 - partition with quorum
      Version: 1.1.10-42f2063
      2 Nodes configured, 2 expected votes
      19 Resources configured

      Online: [ node-1 node-2 ]
      Full list of resources:
      vip__public    (ocf::mirantis:ns_IPaddr2):     Started node-1
      Clone Set: clone_ping_vip__public [ping_vip__public]
          Started: [ node-1 node-2 ]
      vip__management        (ocf::mirantis:ns_IPaddr2):     Started node-1
      Clone Set: clone_p_heat-engine [p_heat-engine]
          Started: [ node-1 node-2 ]
      Master/Slave Set: master_p_rabbitmq-server [p_rabbitmq-server]
          Masters: [ node-1 ]
          Slaves: [ node-2 ]
      Clone Set: clone_p_neutron-plugin-openvswitch-agent [p_neutron-plugin-openvswitch-agent]
          Started: [ node-1 node-2 ]
      p_neutron-dhcp-agent   (ocf::mirantis:neutron-agent-dhcp):     Started node-1
      Clone Set: clone_p_neutron-metadata-agent [p_neutron-metadata-agent]
          Started: [ node-1 node-2 ]
      Clone Set: clone_p_neutron-l3-agent [p_neutron-l3-agent]
          Started: [ node-1 node-2 ]
      Clone Set: clone_p_mysql [p_mysql]
          Started: [ node-1 node-2 ]
      Clone Set: clone_p_haproxy [p_haproxy]
          Started: [ node-1 node-2 ]

Some components are in active/passive topology,
It's useful to know which node handles the workload.
In order to determine where active resource is located,
the following command provides for example the current node where
is running dhcp agent:

  ::

    # crm_resource  --locate --quiet --resource p_neutron-dhcp-agent
    node-1


HAProxy
-------

HAproxy is the HTTP loadbalancer in front of all OpenStack API endpoints
and is also a TCP loadbalancer for MySQL.

HAProxy provides an interface to retrieve statistics for its *frontends* and *backends*,
`several metrics`_ are available and the following command can be run to retrieve all
of them:

   ::

    echo "show stat" |socat /var/lib/haproxy/stats stdio

It is useful to collect at least the following metrics for each HAProxy instances:

+---------------------+---------+---------+-----------+
| Metric              | Unit    | Type    | Threshold |
+=====================+=========+=========+===========+
| Connection Errors   | Integer | Counter |           |
+---------------------+---------+---------+-----------+
| Current Sessions    | Integer | Counter |           |
+---------------------+---------+---------+-----------+
| Denied Requests     | Integer | Counter |           |
+---------------------+---------+---------+-----------+
| Denied Responses    | Integer | Counter |           |
+---------------------+---------+---------+-----------+
| Bytes in/out        | Integer | Counter |           |
+---------------------+---------+---------+-----------+
| Max Queued requests | Integer | Counter |           |
+---------------------+---------+---------+-----------+
| Queued Requests     | Integer | Counter |           |
+---------------------+---------+---------+-----------+
| Queue Limit         | Integer | Gauge   |           |
+---------------------+---------+---------+-----------+
| Request Errors      | Integer | Counter |           |
+---------------------+---------+---------+-----------+

It is also relevant to check *back ends* status: monitoring system must raise a
warning alert if one back end is not UP and a critical alert when all of them
are down.

   ::

     echo "show stat" |socat /var/lib/haproxy/stats stdio|grep BACKEND|awk -F , '{print $1, $2, $18, $37}'


.. _several metrics: http://cbonte.github.io/haproxy-dconv/configuration-1.5.html#9


LibVirt
-------

Libvirt daemon must be started on all compute nodes, without no virtual machine will spawn.

Check if **libvirtd** process is running as root on each *compute* node.

Database
--------

The database is critical, it's used by almost all OpenStack services as primary back end.

1. MySQL status must be checked on each cluster member

   ::

     mysqladmin ping

2. Metrics to collect frequently

Where `server status variables`_ interesting are:

+---------------------+----------------+----------+--------------------------------------------------+
| Metric              | Unit           | Type     | Threshold                                        |
+=====================+================+==========+==================================================+
| Uptime              | second         | Counter  |                                                  |
+---------------------+----------------+----------+--------------------------------------------------+
| Bytes received      | bytes/sec      | Gauge    |                                                  |
+---------------------+----------------+----------+--------------------------------------------------+
| Bytes sent          | bytes/sec      | Counter  |                                                  |
+---------------------+----------------+----------+--------------------------------------------------+
| Begin               | operations     | Counter  |                                                  |
+---------------------+----------------+----------+--------------------------------------------------+
| Commit              | operations     | Counter  |                                                  |
+---------------------+----------------+----------+--------------------------------------------------+
| Delete              | operations     | Counter  |                                                  |
+---------------------+----------------+----------+--------------------------------------------------+
| Insert              | operations     | Counter  |                                                  |
+---------------------+----------------+----------+--------------------------------------------------+
| Rollback            | operations     | Counter  |                                                  |
+---------------------+----------------+----------+--------------------------------------------------+
| Select              | operations     | Counter  |                                                  |
+---------------------+----------------+----------+--------------------------------------------------+
| Update              | operations     | Counter  |                                                  |
+---------------------+----------------+----------+--------------------------------------------------+
| Queries             | queries        | Counter  |                                                  |
+---------------------+----------------+----------+--------------------------------------------------+
| Slow queries        | number         | Counter  | indicate a slow down, see below for details      |
+---------------------+----------------+----------+--------------------------------------------------+

These metrics are retrieved by executing this SQL command:

  ::

    show global status where Variable_name=<NAME>

Also it is useful to know MySQL version, collect once a day the version by running command:

  ::

    mysql -V

3. Keep an eye on databases size at least daily.

   Several databases are managed by the server, it's important to monitor their size:

   ::

    SELECT table_schema "database", sum( data_length + index_length ) / 1024 / 1024 "size_mb" FROM information_schema.TABLES GROUP BY table_schema order by 2 desc;

   and also distinguish their size per table:

  ::

    SELECT table_name AS "Tables",  round(((data_length + index_length) / 1024 / 1024), 2) "Size in MB"  FROM information_schema.TABLES  WHERE table_schema = "<DATABASE>" ORDER BY (data_length + index_length) DESC;

    # where <DATABASE> is the database name like nova, neutron, cinder, ..

4. Pay attention to MySQL logs, this is a good help to detect/troubleshoot issues or slowdowns.

   Monitor error logs, */var/log/mysqld.log*.

   And activate slow queries log with parameter *slow_query_log=1*, **long_query_time**,
   and *slow_query_log_file=<filename>*

   .. _server status variables: http://dev.mysql.com/doc/refman/5.6/en/server-status-variables.html

5. Cluster status ??


RabbitMQ
---------

All OpenStack services depend on the message queue server to communicate and
distribute the workload and notifications are emited over this
same wire.
It's critical to monitor the health and the usage of this component.

Also, RabbitMQ is deployed in cluster_ with `highly available queues`_,
it is necessary to pay attention to specific metrics related to.

.. note:: In order to enable monitoring of RabbitMQ, the `management plugin`_
          must be installed to expose a rest API.
          Ideally a dedicated user with tag *monitoring* must be used.

checks
``````
An alert must be raised for any failed check below:

- check if processes **epmd** and **beam** are running
- check if these TCP ports are open :
    - 4369
    - 41055
    - 5673
    - 15672 (management port used to monitor servers)

- Cluster status
    - Unmirror queues: within response from ressource */queues*,
      check for each queue with **x-ha-policy** *arguments* that **synchronised_slave_nodes**
      is more than 0
    - Missing nodes in cluster: check the **running** status for each nodes,
      accessible within the response from resource */nodes*

- Others checks
    - Queues without consumer: the number of consumers is directly accessible
      within the response from resources */queues/<name>*
    - Missing queues: determine if some queues are missing,
      require to know how many queues must be created for the deployment,
      the number depends of which OpenStack services are deployed.

metrics
```````
Collect these metrics

+-----------------------------------+--------+-------+-------------------------------------------+
| Metric                            | Unit   | Type  | Threshold                                 |
+===================================+========+=======+===========================================+
| number of nodes in cluster        | Number | Gauge |                                           |
+-----------------------------------+--------+-------+-------------------------------------------+
| Number of missing nodes           | Number | Gauge | should be considered, depending of the    |
|                                   |        |       | cluster state                             |
+-----------------------------------+--------+-------+-------------------------------------------+
| Number of connections             | Number | Gauge |                                           |
+-----------------------------------+--------+-------+-------------------------------------------+
| Number of exchanges               | Number | Gauge | zero exchanges is alerting                |
+-----------------------------------+--------+-------+-------------------------------------------+
| Number of queues                  | Number | Gauge | zero queue is alerting                    |
+-----------------------------------+--------+-------+-------------------------------------------+
| Number of ready messages          | Number | Gauge | high value could indicate a lack of       |
|                                   |        |       | consumer(s)                               |
+-----------------------------------+--------+-------+-------------------------------------------+
| Number of unacknowledged messages | Number | Gauge |                                           |
+-----------------------------------+--------+-------+-------------------------------------------+
| Number of uncommitted messages    | Number | Gauge |                                           |
+-----------------------------------+--------+-------+-------------------------------------------+
| Number of partitions              | Number | Gauge |                                           |
+-----------------------------------+--------+-------+-------------------------------------------+

Also metrics per queue

+------------------------------+--------+-------+-------------------------+
| Metric                       | Unit   | Type  | Threshold               |
+==============================+========+=======+=========================+
| Number of messages           | Number | Gauge | high value indicate a   |
|                              |        |       | lack of consumer        |
+------------------------------+--------+-------+-------------------------+
| Number of published messages | Number | Gauge |                         |
+------------------------------+--------+-------+-------------------------+
| Number of delivered messages | Number | Gauge |                         |
+------------------------------+--------+-------+-------------------------+
| Number of acked messages     | Number | Gauge |                         |
+------------------------------+--------+-------+-------------------------+
| Number of memory used        | Number | Gauge |                         |
+------------------------------+--------+-------+-------------------------+

.. _management plugin: https://www.rabbitmq.com/management.html
.. _cluster: https://www.rabbitmq.com/clustering.html
.. _highly available queues: https://www.rabbitmq.com/ha.html

logs
````
Logs are by default in */var/log/rabbitmq/*.

Open vSwitch
------------

*Open vSwitch* component is the heart of tenant networks, hence the need to monitor it
by checking if processes **ovsdb-server** and **ovs-vswitchd** are running on all nodes.

Also it's good to keep an eye on number of dropped and errors packets per interface.

   ::

      # ovs-vsctl get Interface br-tun statistics
      {collisions=0,
      rx_bytes=648,
      rx_crc_err=0,
      rx_dropped=0,
      rx_errors=0,
      rx_frame_err=0,
      rx_over_err=0,
      rx_packets=8,
      tx_bytes=0,
      tx_dropped=0,
      tx_errors=0,
      tx_packets=0}

Memcached
---------

Memcache is used by *Keystone* service to store tokens.
The availability and health of memcache is critical for all users operations since
this in-memory storage server is part of all authentification requests to
access OpenStack services.

First step is to check if process **memcached** is running and is listening
on TCP port **11211** on all *controller* nodes.

Memcache statistics can be retrieved by command:

  ::

    echo -e "stats\nquit" | nc 127.0.0.1 11211 | grep "STAT"

Refere to the `memcached documentation <https://github.com/memcached/memcached/blob/master/doc/protocol.txt>`_
for the complete list of stats available, below a selected list of metrics:

+-------------------+---------------------------------------------+---------+------------------------------------------+
| Metric            | Unit                                        | Type    | Threshold                                |
+===================+=============================================+=========+==========================================+
| uptime            | second                                      | Counter |                                          |
+-------------------+---------------------------------------------+---------+------------------------------------------+
| version           |                                             | String  |                                          |
+-------------------+---------------------------------------------+---------+------------------------------------------+
| curr_item         | item                                        | Gauge   |                                          |
+-------------------+---------------------------------------------+---------+------------------------------------------+
| total_item        | item                                        | Gauge   |                                          |
+-------------------+---------------------------------------------+---------+------------------------------------------+
| cmd_get           | number of get                               | Counter |                                          |
+-------------------+---------------------------------------------+---------+------------------------------------------+
| cmd_set           | number of set                               | Counter |                                          |
+-------------------+---------------------------------------------+---------+------------------------------------------+
| get_hits          | number of hits                              | Counter |                                          |
+-------------------+---------------------------------------------+---------+------------------------------------------+
| get_misses        | number of get misses                        | Counter |                                          |
+-------------------+---------------------------------------------+---------+------------------------------------------+
| curr_connections  | connection                                  | Gauge   |                                          |
+-------------------+---------------------------------------------+---------+------------------------------------------+
| total_connections | connection                                  | Counter |                                          |
+-------------------+---------------------------------------------+---------+------------------------------------------+
| evictions         | number of valid items removed from cache to | Counter | should never happen, require to increase |
|                   | free memory for new items                   |         | memory size                              |
+-------------------+---------------------------------------------+---------+------------------------------------------+
| bytes_read        | bytes                                       | Counter |                                          |
+-------------------+---------------------------------------------+---------+------------------------------------------+
| bytes_written     | bytes                                       | Counter |                                          |
+-------------------+---------------------------------------------+---------+------------------------------------------+
| limit_maxbytes    | max bytes to use for storage                | Gauge   |                                          |
+-------------------+---------------------------------------------+---------+------------------------------------------+
| threads           | threads                                     | Gauge   |                                          |
+-------------------+---------------------------------------------+---------+------------------------------------------+
| conn_yields       | connection yield                            | Counter | if >0 consider increase connection limit |
+-------------------+---------------------------------------------+---------+------------------------------------------+
| maxbytes          | bytes                                       | Gauge   |                                          |
+-------------------+---------------------------------------------+---------+------------------------------------------+
| maxconns          | connection                                  | Gauge   |                                          |
+-------------------+---------------------------------------------+---------+------------------------------------------+
| number            | item                                        | Gauge   |                                          |
+-------------------+---------------------------------------------+---------+------------------------------------------+
| evicted           | item                                        | Gauge   |                                          |
+-------------------+---------------------------------------------+---------+------------------------------------------+
| outofmemory       | hits                                        | Counter | unable to store item should never happen |
+-------------------+---------------------------------------------+---------+------------------------------------------+

Log is generally located here */var/log/memcached.log*
