.. index:: Savanna Deployment

.. _savanna-deployment-label:

Savanna Deployment
------------------

Savanna is a service for launching Hadoop clusters on OpenStack. It is
designed to be vendor-agnostic and currently supports two distributions:
Vanilla Apache Hadoop and Hortonworks Data Platform. For Savanna usage
guidelines consider reading User Guide section of the Savanna docs located
here: http://savanna.readthedocs.org/en/0.3/

**Network Requirements**

Fuel configures Savanna to use floating IPs to access and configure VMs.

Savanna does not configure OpenStack Security Groups, so manual configuration
is required in each tenant where Savanna is going to be used. Below is the
table listing ports which should be considered to be opened for inbound
traffic. The ports having 'yes' in column 'Required for Savanna' are
required to be opened in order for Savanna to function properly.

Also Fuel has post-deployment checks for Savanna, see details in
:ref:`platform-tests-label`. If you want to run the checks, open ports
having 'yes' in 'Required for Savanna post-deployment' check column.

+-----------------+-------------------+------------------------+--------------------------------------+
| Port / protocol | Required for      | Required for Savanna   | Port                                 |
|                 | Savanna           | post-deployment checks | Description                          |
+=================+===================+========================+======================================+
| 22 / TCP        | yes               | yes                    | Required for communication           |
|                 |                   |                        | between Savanna and virtual machines |
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

