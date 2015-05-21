

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
  6. Set values "Plugin" = vanilla, "Version" = 2.4.1
  7. Click "Add plugin tags"
  8. Click "Done"
  9. Navigate to "Data Processing" > "Node Group Templates"
  10. Click on "Create Template" button.
  11. Set values "Plugin name" = Vanilla Apache Hadoop,
      "Hadoop version" = 2.4.1
  12. Click "Create"
  13. Set values "Template Name" = vanilla2-worker,
      "OpenStack Flavor" = m1.small, "Floating IP pool" = (external network),
      "Processes": datanode, nodemanager
  14. Click "Create"
  15. Click on "Create Template" button.
  16. Set values "Plugin name" = Vanilla Apache Hadoop,
      "Hadoop version" = 2.4.1
  17. Click "Create"
  18. Set values "Template Name" = vanilla2-master,
      "OpenStack Flavor" = m1.small, "Floating IP pool" = (external network),
      "Processes: namenode, secondarynamenode, resourcemanager, historyserver,
      oozie
  19. Click "Create"
  20. Navigate to "Cluster Templates"
  21. Click on "Create Template" button.
  22. Set values "Plugin name" = Vanilla Apache Hadoop,
      "Hadoop version" = 2.4.1
  23. Click "Create"
  24. Set value "Template Name" = vanilla2-template
  25. Click on tab "Node Groups"
  26. Select "vanilla2-master"
  27. Click "+"
  28. Select "vanilla2-worker"
  29. Click "+"
  30. Click on tab "HDFS Parameters"
  31. Set value "dfs.replication" = 1
  32. Click "Create"
  33. Navigate to "Clusters"
  34. Click on "Launch Cluster" button.
  35. Set values "Plugin name" = Vanilla Apache Hadoop,
      "Hadoop version" = 2.4.1
  36. Click "Create"
  37. Set value "Cluster Name" = vanilla2-cluster
  38. Click "Create"
  39. Waiting until cluster has status "Active"
  40. Select cluster "vanilla2-cluster", click on "Delete Cluster"
  41. Click on "Delete Cluster"
  42. Navigate to "Cluster Templates"
  43. Select templates "vanilla2-template" click on "Delete Templates"
  44. Click on "Delete Templates"
  45. Navigate to "Node Group Templates"
  46. Select templates "vanilla2-master", "vanilla2-worker", click on
      "Delete Templates"


  For more information, see:
  `Sahara documentation <http://sahara.readthedocs.org/en/stable-juno/>`_.
