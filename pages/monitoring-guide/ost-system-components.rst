.. _Monitoring-system-components:

OpenStack System Components
===========================

Here is the list of health checks and metrics to collect across all components.

Time synchronization
--------------------

The local time between nodes is really important, for many reasons including

- the proper functioning of services using time to operate (cron, database, storage)
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
and is also a TCP loadbalancer for RabbitMQ and MySQL.

HAProxy provides an interface to retrieve statistics for its *frontends* and *backends*,
`several metrics`_ are available and the following command can be run to retrieve all
of them:

   ::

    echo "show stat" |socat /var/lib/haproxy/stats stdio

It is useful to collect at least the following metrics for each HAProxy instance:

- Connection Errors
- Current Sessions
- Denied Requests
- Denied Responses
- Bytes in/out
- Max Queued requests
- Queued Requests
- Queue Limit
- Request Errors
- Rate

It is relevant to check *back ends* status: monitornig system must raise a
warning alert if one back end is not UP and a critical alert when all of them
are down.

   ::

     echo "show stat" |socat /var/lib/haproxy/stats stdio|grep BACKEND|awk -F , '{print $1, $2, $18, $37}'


.. _several metrics: http://cbonte.github.io/haproxy-dconv/configuration-1.5.html#9


LibVirt
-------

Check if **libvirtd** process is running as root on each *compute* node.

Database
--------

The database is critical, it's used by almost all OpenStack services as primary back end.

1. MySQL status must be checked on each cluster member

   ::

     mysqladmin ping

2. Metrics to collect frequently (~30 seconds)

Where `server status variables`_ interesting are:

- Uptime
- Bytes received per second
- Bytes sent per second
- Begin operations per second
- Commit operations per second
- Delete operations per second
- Insert operations per second
- Rollback operations per second
- Select operations per second
- Update operations per second
- Queries per second
- Slow queries

by executing this SQL command:

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

   And activate slow queries log with parameter *slow_query_log=1* and *slow_query_log_file=<filename>*

   .. _server status variables: http://dev.mysql.com/doc/refman/5.6/en/server-status-variables.html

5. Cluster status ??


RabbitMQ
---------

We assume that server is deployed in cluster_ with `highly available queues`_.

.. note:: In order to enable the Rest API for RabbitMQ management the
          `management plugin`_ must be installed and ideally a
          dedicated user with tag *monitoring* must be used.

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
      check for each queue with **x-ha-policy** *arguments* that **synchronised_slave_nodes** is more than 0
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
Collect these metrics periodically:

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

.. _cluster: https://www.rabbitmq.com/clustering.html
.. _highly available queues: https://www.rabbitmq.com/ha.html

logs
````
Logs are by default in */var/log/rabbitmq/*.

Open vSwitch
------------
Check if processes **ovsdb-server** and **ovs-vswitchd** are running on all nodes.

Number of dropped packets per interface.

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

Memcache
--------

Check if process **memcached** is running and is listening on TCP port 11211.

Memcache statistics can be retrieved by command:

  ::

    echo -e "stats\nquit" | nc 127.0.0.1 11211 | grep "STAT"

- Current number of bytes used to store items
- Bytes read by this server per second
- Bytes sent by this server per second
- Number of retrieval requests per second
- Number of storage requests per second
- Total number of retrieval and storage requests per second
- Number of connection structures allocated by the server
- Number of open connections
- Current number of items stored
- Items removed to free memory per second
- Keys requested and found present per second
- Items requested and not found per second
- Bytes this server is allowed to use for storage
- Process id of this server process
- System time for this process
- User time for this process
- Number of worker threads requested
- Number of connections opened per second
- Number of new items stored per second
- Number of seconds since the server started

Logs */var/log/memcached.log*
