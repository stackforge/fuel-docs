.. _mg-ceph:

Ceph
----

Ceph is a unified and distributed storage system that can be used as a
storage backend for Cinder volumes and Glance images.

.. note::
   Ceph Filesystem monitoring is not covered in this document since
   its capabilities are not natively supported by Mirantis OpenStack.
   Mirantis OpenStack uses a single Ceph cluster named *ceph*.

Process Checks
++++++++++++++

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

   * - ceph-mon
     - n/a
     - controller
     -
     - active/active

   * - ceph-osd
     - n/a
     - storage
     -
     - data replication mechanisms

   * - apache/httpd
     - HTTP 6780
     - controller
     - apache mod_fastcgi
     - active/active


Collected Metrics
+++++++++++++++++

.. list-table::
   :header-rows: 1
   :widths: 30 30 40
   :stub-columns: 0
   :class: borderless

   * - Metrics
     - Details
     - Purpose

   * - cluster health
     - command: :ref:`ceph health <ceph_health>`
     - alert: When the status is something else than ``HEALTH_OK``

   * - cluster total space available (Mbyte)
     - command: :ref:`ceph df <ceph_df>`
     - diag

   * - cluster space used (Mbyte)
     - command: :ref:`ceph df <ceph_df>`
     - diag

   * - cluster free space
     - calculated from previous metrics
     - alert: Not enough disk space before more storage capacity can be
       physically provisioned

   * - total number of monitor
     - command: :ref:`ceph mon dump <ceph_mon_dump>`
     - diag

   * - number of monitor in Quorum
     - command: :ref:`ceph mon dump <ceph_mon_dump>`
     - diag

   * - number of OSD daemons per state
     - command: :ref:`ceph osd dump <ceph_osd_dump>`, where states are ``UP`` or ``DOWN`` and
       ``IN`` or ``OUT``
     - diag

   * - rate Kbytes read/write (per pool)
     - command: :ref:`ceph osd pool <ceph_osd_pool>`
     - diag

   * - operation/second (per pool)
     - command: :ref:`ceph osd pool <ceph_osd_pool>`
     - diag

   * - number of object (per pool)
     - command: :ref:`ceph osd pool <ceph_osd_pool>`
     - diag

   * - total number of Placement Groups (PG) per status
     - command: :ref:`ceph pg dump <ceph_pg_dump>`
     - diag

   * - filesystem commit latency (per OSD daemon)
     - command: :ref:`ceph pg dump <ceph_pg_dump>`
     - diag

   * - filesystem apply latency (per OSD daemon)
     - command: :ref:`ceph pg dump <ceph_pg_dump>`
     - diag

   * - KByte used (per OSD daemon)
     - command: :ref:`ceph pg dump <ceph_pg_dump>`
     - diag

   * - cluster write latency
     - command: :ref:`rados bench <rados_bench>`
     - diag


Ceph Cluster Health Checks
++++++++++++++++++++++++++

.. _ceph_health:

**ceph health**

The monitoring system should perform regular checks to verify that the
Ceph cluster is healthy. This can be achieved using the :command:`cepth health`
command::

  # ceph health
  HEALTH_OK

Anything else than ``HEALTH_OK`` should be reported in an alert like the following::

  HEALTH_WARN clock skew detected on mon.node-16, mon.node-17


.. _ceph_df:

**ceph df**

.. code::

   # ceph df
   GLOBAL:
     SIZE     AVAIL     RAW USED     %RAW USED
     380G      368G       12560M          3.22
   POOLS:
     NAME         ID     USED       %USED     MAX AVAIL     OBJECTS
     data         0           0         0          184G           0
     metadata     1           0         0          184G           0
     rbd          2           0         0          184G           0
     images       3      13696k         0          184G           5
     volumes      4           0         0          184G           0
     compute      5           0         0          184G           0

.. _ceph_mon_dump:

**ceph mon dump**

.. code::

   # ceph mon dump --format json
   {
       "created": "0.000000",
       "epoch": 3,
       "fsid": "bbec22eb-b852-4f6f-89f8-9d7fcceb062a",
       "modified": "2015-03-19 14:41:32.374329",
       "mons": [
           {
               "addr": "192.168.0.3:6789/0",
               "name": "node-28",
               "rank": 0
           },
           {
               "addr": "192.168.0.4:6789/0",
               "name": "node-29",
               "rank": 1
           },
           {
               "addr": "192.168.0.5:6789/0",
               "name": "node-30",
               "rank": 2
           }
       ],
       "quorum": [
           0,
           1,
           2
       ]
   }


.. _ceph_osd_dump:

**ceph osd dump**

.. code::

   # ceph osd dump (output truncated)
   ...
   osd.0 up   in  weight 1 up_from 7 up_thru 23 down_at 0   ...
   osd.1 up   in  weight 1 up_from 10 up_thru 23 down_at 0   ...
   osd.2 up   in  weight 1 up_from 15 up_thru 23 down_at 0   ...
   osd.3 up   in  weight 1 up_from 18 up_thru 23 down_at 0   ...
   osd.4 up   in  weight 1 up_from 23 up_thru 23 down_at 0   ...
   osd.5 up   in  weight 1 up_from 23 up_thru 23 down_at 0   ...


.. _ceph_osd_pool:

**ceph osd pool**

.. code::

   # ceph osd pool stats -f json
   [
       {
           "client_io_rate": {
               "op_per_sec": 1,
               "read_bytes_sec": 242,
               "write_bytes_sec": 2982616
           },
           "pool_id": 4,
           "pool_name": "volumes",
           "recovery": {},
           "recovery_rate": {}
       },
   ...


.. _ceph_pg_dump:

**ceph pg dump**

.. code::

   # ceph pg dump -f json (output truncated)
   {
       "full_ratio": "0.950000",
       "last_osdmap_epoch": 25,
       "last_pg_scan": 4,
       "near_full_ratio": "0.850000",
       "osd_stats": [
           {
               "fs_perf_stat": {
                   "apply_latency_ms": 3,
                   "commit_latency_ms": 2
               },
               "hb_in": [
                   1,
                   2,
                   3,
                   4,
                   5
               ],
               "hb_out": [],
               "kb": 66497820,
               "kb_avail": 64344180,
               "kb_used": 2153640,
               "num_snap_trimming": 0,
               "op_queue_age_hist": {
                   "histogram": [],
                   "upper_bound": 1
               },
               "osd": 0,
               "snap_trim_queue_len": 0
           },
   ...

.. _rados_bench:

**rados bench**

The write latency can be obtained with the :command:`rados` command.
It writes objects in different pools. You should keep the frequency
of these checks lightweight to avoid overwhelming the cluster.

For example::

  rados -p data  bench 5 write -t 2  --run-name monit_perf
  # where command options are:
  # -p data: use the pool named ‘data’
  # bench: the rados command ‘bench’
  # 5 : run the bench for 5 seconds
  # write: perform write operations
  # -t 2 : number of concurrent thread

.. note::
   Another way to collect metrics related to OSD daemons is to grab
   from each node the OSD daemon's socket. This command retrieves
   all metrics available, but the output is really verbose and not
   all metrics are useful to monitor::

     echo '{"prefix": "perf dump"}\0' | socat /var/run/ceph/<cluster>-osd.<ID>.\
     asok stdio



