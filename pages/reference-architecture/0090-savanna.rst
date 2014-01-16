.. index:: Savanna Deployment

.. _savanna-deployment-label:

Savanna Deployment
------------------

Savanna is a service for launching Hadoop clusters on OpenStack. It is
designed to be vendor-agnostic and currently supports two distributions:
Vanilla Apache Hadoop and Hortonworks Data Platform. For Savanna usage
guidelines consider reading User Guide section of the Savanna docs located
here: http://savanna.readthedocs.org/en/0.3/

**Notes and Limitations**

Fuel configures Savanna to use floating IPs to access and configure VMs.

Savanna does not configure OpenStack Security Groups, so manual configuration
is required in each tenant where Savanna is going to be used. Savanna
requires the following network ports to be open for inbound traffic:

 * Port 22 (TCP)

   Required for communication between Savanna and virtual machines

 * Port 80 (TCP)

   Ambari web interface [HDP plugin only]

 * Port 8080 (TCP)

   Ambari REST API [HDP plugin only]

 * Port 11000 (TCP)

   Oozie REST API [EDP only]

Below are the ports which are not required to be open for Savanna to work
properly. They serve as entry points for JobTracker, HDFS, Web UI, etc.
So user might want them be accessible as well:

 * Port 8080 (TCP)

   NameNode HDFS port

 * Port 8081 (TCP)

   JobTracker port for job submission

 * Port 50010 (TCP)

   DataNode HDFS port

 * Port 50030 (TCP)

   JobTracker Web UI

 * Port 50060 (TCP)

   TaskTracker Web UI

 * Port 50070 (TCP)

   NameNode Web UI

 * Port 50075 (TCP)

   DataNode Web UI

 * Port 50090 (TCP)

   Secondary NameNode Web UI

Also verify that communication between virtual machines is not blocked.

.. node:: The above listed ports are defaults. If some of them are changed
    while creating a cluster, the corresponding ports must be opened instead
    of the default ones.

.. note:: Hadoop requires at least 1G of memory to run. That means you must
    use flavors having not less than 1G of memory for Hadoop cluster nodes.
