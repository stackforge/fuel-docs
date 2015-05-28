.. _mg-memcached:

Memcached
---------

Memcache is an in-memory storage server. It is mainly used by
*Keystone* to store tokens. The availability of memcache is therefore
critical to ensure that the authentication requests performed by the
OpenStack services can be satisfied.

The *consoleauth* Nova service also uses memcache to share
authorization tokens and to ensure the high availability of the
service.

**Process checks**

Memcached process checks should be performed for each controller
node.

.. list-table::
   :header-rows: 1
   :widths: 20 20 20 40
   :stub-columns: 0
   :class: borderless

   * - Process name
     - Incoming connections
     - Role
     - HA mode

   * - memcached
     - TCP port 11211
     - controller
     - active/active

Memcache statistics per server can be collected with the command::

   echo -e "<command>\nquit" | nc 127.0.0.1 11211

   # where command is one of “stats” or “stats items”

Refer to the `memcached documentation`_ for the complete list of stats available. Below is a selected list of metrics:

.. list-table::
   :header-rows: 1
   :widths: 20 20 20
   :stub-columns: 0
   :class: borderless

   * - Metrics
     - Source
     - Purpose

   * - curr_item
     - command stats: number of current items
     - diag

   * - total_item
     - command stats items: total number of items
     - diag

   * - cmd_get
     - command stats: number of get
     - diag

   * - cmd_set
     - command stats: number of set
     - diag

   * - get_hits
     - command stats: number of hits
     - diag

   * - get_misses
     - command stats: number of get misses
     - Alert: high number of misses indicates a misconfiguration
       somewhere (TTL too short or memory starvation)

   * - curr_connections
     - command stats: number of current connections
     - diag

   * - total_connections
     - command stats: counter total of connections
     - diag

   * - evictions
     - command stats: number of valid items removed from cache
       to free memory for new items
     - Alert: should never happen. Requires to increase the memory size

   * - bytes_read
     - command stats: bytes read from cache
     - diag

   * - bytes_written
     - command stats: bytes write in cache
     - diag

   * - limit_maxbytes
     - command stats: max bytes to use for storage
     - diag

   * - threads
     - command stats: number of threads
     - diag

   * - conn_yields
     - command stats: connection yield
     - diag

       when > 0 consider increasing the connection limit

   * - maxbytes
     - command stats: maximum memory bytes to use
     - diag

   * - maxconns
     - command stats: maximum connection
     - diag

   * - evicted
     - command stats: counter of evicted items
     - diag

   * - outofmemory
     - command stats: number of times the server fails to store a new
       item due to a lack of memory available
     - Alert: Unable to store item should never happen

   * - errors
     - ``/var/log/memcached.log``
     - Alert: When a sudden spike of errors is detected



.. Links:
.. _`memcached documentation`: https://github.com/memcached/memcached/blob/master/doc/protocol.txt
