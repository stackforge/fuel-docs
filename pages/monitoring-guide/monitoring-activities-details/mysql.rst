.. _mg-mysql:

MySQL
-----

The MySQL database running on the OpenStack controller nodes is a
central component, because it is used by almost all the OpenStack
components as their primary data persistence storage. Therefore, it
is a critical to monitor the healthiness of this component on each
of the controller nodes cluster.

**Process checks**

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

   * - mysqld
     - TCP 3306
     - controller
     - storage
     - active/passive

In addition to checking the existence of the process, it is necessary
to check the availability status of the MySQL database. This can be
verified using the command::

  # mysqladmin ping


| **Collected Metrics**


.. list-table::
   :header-rows: 1
   :widths: 20 20 20
   :stub-columns: 0
   :class: borderless

   * - Metrics
     - Source
     - Purpose

   * - bytes received (bytes/sec)
     - :ref:`poll SQL <poll_SQL>` 
     - diag

   * - bytes sent (bytes/sec)
     - :ref:`poll SQL <poll_SQL>`
     - diag

   * - begin operations
     - :ref:`poll SQL <poll_SQL>`
     - diag

   * - commit operations
     - :ref:`poll SQL <poll_SQL>`
     - diag

   * - delete operations
     - :ref:`poll SQL <poll_SQL>`
     - diag

   * - insert operations
     - :ref:`poll SQL <poll_SQL>`
     - diag

   * - rollback operations
     - :ref:`poll SQL <poll_SQL>`
     - diag

   * - select operations
     - :ref:`poll SQL <poll_SQL>`
     - Alert: 
       The absence of select operations could indicate that
       the connection to the database is broken unless the MySQL
       server is in maintenance.

   * - update operations
     - :ref:`poll SQL <poll_SQL>`
     - diag

   * - number of queries
     - :ref:`poll SQL <poll_SQL>`
     - :ref:`diag <diag>`

   * - slow queries
     - :ref:`poll SQL <poll_SQL>`
     - diag
       

   * - Database physical size (Mbyte)
     - poll SQL: 

       SELECT table_schema "database", sum( data_length +
       index_length ) / 1024 / 1024 "size_mb" FROM
       information_schema.TABLES GROUP BY table_schema order by 2
       desc;
     - diag

.. _poll_SQL:

These poll SQL metrics can be collected using the following SQL command::

  SHOW GLOBAL STATUS WHERE Variable_name=<NAME>

See MySQL `server status variables`_ for details.

.. _diag:

.. note::

   You should pay attention to MySQL logs to detect slow down queries
   for diagnostic purposes. You can activate slow queries log with the
   following configuration parameters:
   ``slow_query_log=1``, ``long_query_time=5``, and
   ``slow_query_log_file=<filename>``.


| **Metrics related to the MySQL cluster**

The high availability of the MySQL database is supported in
active/passive mode with one master and several slaves nodes.
You should continuously monitor that slaves are ready to take over
in case of a master node failure to ensure that the high availability
of the MySQL cluster is still being ensured.

.. list-table::
   :header-rows: 1
   :widths: 20 20 20
   :stub-columns: 0
   :class: borderless

   * - Metrics
     - Source
     - Purpose

   * - wsrep_ready
     - :ref:`SQL <SQL>` possible values: ``ON``/``OFF``
     - Alert: node not ready if ``OFF``

   * - wsrep_cluster_size
     - :ref:`SQL: <SQL>` number of nodes
     - diag

   * - wsrep_replicated_bytes
     - :ref:`SQL: <SQL>` bytes sent to other nodes
     - diag

   * - wsrep_received_bytes
     - :ref:`SQL: <SQL>` bytes received from other nodes
     - diag

   * - wsrep_cluster_status
     - :ref:`SQL: <SQL>`  Primary/Non- Primary/Disconnected
     - Alert: A node is disconnected from the cluster.

   * - wsrep_local_commits
     - :ref:`SQL <SQL>` number of commit
     - diag

   * - errors
     - ``/var/log/mysqld.log``
     - Alert: When a sudden spike of errors is detected.

.. _SQL:

These metrics can be collected with the SQL command::

  SHOW STATUS WHERE Variable_name REGEXP 'wsrep.*';


.. Links
.. _`server status variables`:  http://dev.mysql.com/doc/refman/5.6/en/server-status-variables.html
