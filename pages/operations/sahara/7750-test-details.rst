

.. _sahara-test-details:

Sahara Test Details
-------------------

.. topic:: Hadoop cluster operations

  Test checks that Sahara can launch a Hadoop cluster
  using the Vanilla plugin.

  Target component: Sahara

  Scenario:

  1. Login to OpenStack Horizon dashboard
  2. Navigate to "Data Processing" > "Image Registry"
  3. Click on "Register Image"
  4. Select image for registering in field "Image"
  5. Set value "User Name" for this OS
  6. Select values "Plugin"=vanilla, "Version"=2.4.1
  7. Click "Done"
  8. Navigate to “Data Processing” > “Node Group Templates”
  9. Click on “Create Template” button.
  10. Set up values “Vanilla Apache Hadoop”, “2.4.1”
  11. Click “Create”
  12. Set up: Template Name = vanilla2-worker, OpenStack Flavor = m1.small,
      Floating IP pool = (external network), Processes: datanode, nodemanager
  13. Click “Create”
  14. Click on “Create Template” button.
  15. Set up “Vanilla Apache Hadoop”, “2.4.1”
  16. Click “Create”
  17. Set up: Template Name = “vanilla2-master”, OpenStack Flavor = “m1.small”,
      Floating IP pool = (external network), Processes: namenode,
      secondarynamenode, resourcemanager, historyserver, oozie
  18. Click “Create”
  19. Navigate to “Cluster Templates”
  20. Click on “Create Template” button.
  21. Set up “Vanilla Apache Hadoop”, “2.4.1”
  22. Click “Create”
  23. Set up: Template Name = “vanilla2-template”
  24. Click on tab “Node Groups”
  25. Select “vanilla2-master”
  26. Click “+”
  27. Select “vanilla2-worker”
  28. Click “+”
  29. Click on tab "HDFS Parameters"
  30. Set value "dfs.replication" = 1
  31. Click “Create”
  32. Navigate to “Clusters”
  33. Click on “Launch Cluster” button.
  34. Set up “Vanilla Apache Hadoop”, “2.4.1”
  35. Click “Create”
  36. Set up Cluster Name = “vanilla2-cluster”
  37. Click “Create”
  38. Waiting until cluster has status “Active”
  39. Select cluster "vanilla2-cluster", click on "Delete Cluster"
  40. Click on "Delete Cluster"
  41. Navigate to “Cluster Templates”
  42. Select templates "vanilla2-template" click on "Delete Templates"
  43. Click on "Delete Templates"
  44. Navigate to “Node Group Templates”
  45. Select templates "vanilla2-master", "vanilla2-worker", click on
      "Delete Templates"


  For more information, see:
  `Sahara documentation <http://sahara.readthedocs.org/en/stable-juno/>`_.

