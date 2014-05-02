
.. _sahara-ports:

Ports Used by Sahara
--------------------

The table below lists:

- Ports that must be open for inbound traffic
  (marked with 'yes' in the 'Required for Sahara' column)
  in order for Sahara to work properly.

- Ports that are used for running Sahara post-deployment health checks.
  They must be opened for inbound traffic for post-deployment health
  checks to succeed.

The ports must be opened in the 'default' security group in each
tenant where Sahara is to be used.

+-----------------+-------------------+------------------------+--------------------------------------+
| Port / protocol | Required for      | Required for Sahara    | Port Description                     |
|                 | Sahara            | post-deployment        |                                      |
|                 |                   | health checks          |                                      |
+=================+===================+========================+======================================+
| 22 / TCP        | yes               | yes                    | Required for communication           |
|                 |                   |                        | between Sahara and virtual machines  |
+-----------------+-------------------+------------------------+--------------------------------------+
| 80 / TCP        | yes (HDP          | no                     | Ambari web interface                 |
|                 |      plugin only) |                        |                                      |
+-----------------+-------------------+------------------------+--------------------------------------+
| 8080 / TCP      | yes (HDP          | no                     | Ambari REST API                      |
|                 |      plugin only) |                        |                                      |
+-----------------+-------------------+------------------------+--------------------------------------+
| 11000 / TCP     | yes (EDP only)    | no                     | Oozie REST API                       |
|                 |                   |                        |                                      |
+-----------------+-------------------+------------------------+--------------------------------------+
| 8020 / TCP      | no                | no                     | NameNode HDFS port                   |
|                 |                   |                        |                                      |
+-----------------+-------------------+------------------------+--------------------------------------+
| 8021 / TCP      | no                | no                     | JobTracker port for job submission   |
|                 |                   |                        |                                      |
+-----------------+-------------------+------------------------+--------------------------------------+
| 50010 / TCP     | no                | no                     | DataNode HDFS port                   |
|                 |                   |                        |                                      |
+-----------------+-------------------+------------------------+--------------------------------------+
| 50030 / TCP     | no                | yes                    | JobTracker Web UI                    |
|                 |                   |                        |                                      |
+-----------------+-------------------+------------------------+--------------------------------------+
| 50060 / TCP     | no                | yes                    | TaskTracker Web UI                   |
|                 |                   |                        |                                      |
+-----------------+-------------------+------------------------+--------------------------------------+
| 50070 / TCP     | no                | yes                    | NameNode Web UI                      |
|                 |                   |                        |                                      |
+-----------------+-------------------+------------------------+--------------------------------------+
| 50075 / TCP     | no                | yes                    | DataNode Web UI                      |
|                 |                   |                        |                                      |
+-----------------+-------------------+------------------------+--------------------------------------+
| 50090 / TCP     | no                | yes                    | Secondary NameNode Web UI            |
|                 |                   |                        |                                      |
+-----------------+-------------------+------------------------+--------------------------------------+


.. note:: The ports listed above are defaults.
    if some of them are changed while launching a Hadoop cluster,
    the corresponding ports must be opened instead of the default ones.


Also make sure that communication between virtual machines is not blocked.

