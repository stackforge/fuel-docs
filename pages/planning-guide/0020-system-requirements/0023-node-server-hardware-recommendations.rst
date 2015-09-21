

.. _target-hdwr-reqs-plan:

Target Node Server Hardware Recommendations
-------------------------------------------

Determining the appropriate hardware
for the target nodes depends on the node type.

- Controller nodes
   Use at least three Controller nodes for high-availability. Further resource
   scaling depends on your use case and requires extensive assessment of your 
   environment and business needs.

- Compute nodes
   The number and hardware configuration of the compute nodes depend on the 
   following:

   - Number of virtual machines
   - Applications that you plan to run on these virtual machines
   - Types of workloads

- Storage nodes
   The number and capacity of the storage nodes highly depend on
   the type of the storage, redundancy, and the workloads that you run
   on the compute nodes.

The OpenStack documentation provides additional guidelines on how to plan your
resources:

- `OpenStack Architecture Design Guide
  <http://docs.openstack.org/arch-design/content/technical-considerations-general-purpose.html>`_

- `OpenStack Operations Guide
  <http://docs.openstack.org/openstack-ops/content/>`_

Use the information provided in these documents in conjunction with
this *Planning Guide*.

For more information, see:

- :ref:`sample-target-node-config-plan`

- :ref:`nodes-roles-plan`

- :ref:`ceilometer-mongodb-plan`

- :ref:`hardware-plan`

- `OpenStack Hardware Compatibility List
  <https://www.mirantis.com/products/openstack-drivers-and-plugins/hardware-compatibility-list/>`__

- `How do you calculate how much hardware you need for your OpenStack cloud?
  <http://www.mirantis.com/blog/openstack-hardware-bom-calculator/>`__
