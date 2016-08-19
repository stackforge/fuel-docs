.. _sysreq_fuel_slave_node_hw_recs:

Fuel Slave nodes hardware recommendations
-----------------------------------------

Determining the appropriate hardware for the slave nodes depends on the node
type, the workloads that you plan to run on the nodes, and whether you combine
different OpenStack components on one node or run them separately. Typically,
you need a two-socket server with the CPU, memory, and disk space that meet
your project requirements.
Read the `OpenStack Architecture Design Guide` for recommendations on how
to plan an OpenStack deployment.

General guidelines for the Fuel Slave nodes:

* Controller nodes
   Use at least three controller nodes for high availability.
   High availability is recommended for all production environments. However,
   you can start with a single controller node for testing purposes and add
   more nodes later. The controller nodes must form a quorum. Therefore, for
   all deployments, the total number of controller nodes must be odd. Further
   resource scaling depends on your use case and requires extensive assessment
   of your environment and business needs.

* Compute nodes
   The number and hardware configuration of the compute nodes depend on the
   following:

   * Number of virtual machines
   * Applications that you plan to run on these virtual machines
   * Types of workloads

* Storage nodes
   The number and capacity of the storage nodes highly depend on the type of
   the storage, redundancy, and workloads that you run on the compute
   nodes. Therefore, the storage configuration for every deployment will
   vary significantly.

* Telemetry - MongoDB nodes
   Fuel deploys MongoDB version 2.6. To install Telemetry with the MongoDB
   database, we recommend that you add three dedicated nodes. You can also
   configure one MongoDB role for each controller node.

   Since the MongoDB node is configured in the polling mode, you cannot add
   more than seven MongoDB nodes. This is a MongoDB limitation, and it is not
   controlled by Fuel. For more details, see
   `MongoDB documenation <https://docs.mongodb.com>`_.

.. seealso::

   - `OpenStack Architecture Design Guide
     <http://docs.openstack.org/arch-design/content/technical-considerations-general-purpose.html>`__
   - `OpenStack Operations Guide
     <http://docs.openstack.org/openstack-ops/content/>`_
   - :ref:`sysreqs_sample_target_node_config`
