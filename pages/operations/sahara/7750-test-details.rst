

.. _sahara-test-details:

Sahara Test Details
-------------------

.. topic:: Hadoop cluster operations

  Test checks that Sahara can launch a Hadoop cluster
  using the Vanilla plugin.

  Target component: Sahara

  Scenario:

  1. Create a flavor for Sahara VMs.
  2. Create a node group template for JobTracker and NameNode.
  3. Create a cluster template using the node group template.
  4. List current node group templates.
  5. List current cluster templates.
  6. Launch a Hadoop cluster with the created cluster template.
  7. Check the launched Hadoop cluster is up by accessing web interfaces of
     the appropriate components (JobTracker, NameNode, TaskTracker, DataNode).
  8. Terminate the launched cluster.
  9. Delete the created cluster template.
  10. Delete the created node group templates.
  11. Delete the created flavor.

  For more information, see:
  `Sahara documentation <http://sahara.readthedocs.org/en/stable-icehouse/>`_.

