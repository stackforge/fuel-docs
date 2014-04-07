.. index:: Sahara Deployment

.. _sahara-deployment-label:

Sahara Deployment
-----------------

Sahara is a service for launching Hadoop clusters on OpenStack.
It is vendor-agnostic and currently supports three distributions:
Vanilla Apache Hadoop, Hortonworks Data Platform (HDP),
and the Intel Distribution for Apache Hadoop (IDH).
For Sahara usage guidelines, read the User Guide section of the
`Sahara documentation <http://sahara.readthedocs.org/en/0.3/>`_.

**Network Requirements**

Fuel configures Sahara to use floating IPs to access and configure VMs.

Sahara does not configure OpenStack Security Groups so the default security
group must be configured manually in each tenant where Sahara will be used.
The table below lists the ports that must be open for inbound traffic
(marked with 'yes' in the 'Required for Sahara' column) and the ports that
are used for running Sahara post-deployment health checks.

For the post-deployment checks details see :ref:`platform-tests-label`.
If you want to run the checks, open the ports that have 'yes' in the
corresponding column. Note that the checks are run in the tenant you've
specified in 'OpenStack Settings' tab during OpenStack installation, so
that is where you need to configure the default Security Group.
By default 'admin' tenant is used for post-deployment checks.

+-----------------+-------------------+------------------------+--------------------------------------+
| Port / protocol | Required for      | Required for Sahara    | Port                                 |
|                 | Sahara            | post-deployment checks | Description                          |
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

.. note:: The above listed ports are defaults. If some of them are changed
    while launching a Hadoop cluster, the corresponding ports must be opened
    instead of the default ones.

Also make sure that communication between virtual machines is not blocked.

**VM Flavor Requirements**

Hadoop requires at least 1G of memory to run. That means you must
use flavors having not less than 1G of memory for Hadoop cluster nodes.
