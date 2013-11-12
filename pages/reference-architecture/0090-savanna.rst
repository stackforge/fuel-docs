.. index:: Savanna Deployment

.. _savanna-deployment-label:

Savanna Deployment
------------------

Savanna is a service for launching Hadoop clusters on OpenStack. It is
designed to be vendor-agnostic and currently supports two distributions:
Vanilla Apache Hadoop and Hortonworks Data Platform. For Savanna usage
guidelines consider reading User Guide section of the Savanna docs located
here: http://savanna.readthedocs.org/en/0.2.2/

**Notes and Limitations**

Fuel configures Savanna to use floating IPs to access and configure VMs.

Savanna does not configure OpenStack Security Groups, so manual configuration
is required in each tenant where Savanna is going to be used. Savanna
requires the following network ports to be open for inbound traffic:

 * Port 22 (TCP)

   Required for communication between Savanna and virtual machines.

 * Port 8080 (TCP)

   Ambari REST API [HDP plugin only]

 * Port 50070 (TCP)

   NameNode web interface

 * Port 50030 (TCP)

   JobTracker web interface

 * Port 80 (TCP)

   Ambari web interface [HDP plugin only]

Also verify that communication between virtual machines is not blocked.

.. note:: Hadoop requires at least 1G of memory to run. That means you must
    use flavors having not less than 1G of memory for Hadoop cluster nodes.
