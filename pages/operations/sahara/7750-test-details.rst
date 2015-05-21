
.. _sahara-test-details:

Sahara Test Details
-------------------

Hadoop cluster operations test
 checks whether Sahara can launch a Hadoop cluster using the Vanilla plugin

Target component
 Sahara

**Scenario**

#. Login to the OpenStack dashboard.

#. Register an image:

   * Navigate to `Project > Data Processing > Image Registry`.

   * Click on `Register Image`.

   * Select an image for registering from the drop-down list
     in the `Image` field.

   * Specify the ``User Name`` value for this OS.

   * Set the following values: ``Plugin=vanilla``, ``Version=2.4.1``.

   * Click `Add plugin tags` and `Done`.

#. Create a master node group template:

   * Navigate to `Project > Data Processing > Node Group Templates`.

   * Click `Create Template`.

   * In the `Create Node Group template` dialog, set the following values:
     ``Plugin name=Vanilla Apache Hadoop``, ``Hadoop version=2.4.1``.
     Click `Create` to proceed.

   * In the second `Create Node Group template` dialog, set the following values:
     ``Template Name=vanilla2-master``, ``OpenStack Flavor=m1.small``,
     ``Floating IP pool=(external network)``, check ``namenode``,
     ``secondarynamenode``, ``resourcemanager``, ``historyserver``, and ``oozie``
     in the `Process` section.

   * Click `Create`.

#. Create a worker node group template:

   * Navigate to `Project > Data Processing > Node Group Templates`.

   * Click `Create Template`.

   * In the `Create Node Group template` dialog, set the following values:
     ``Plugin name=Vanilla Apache Hadoop`` and ``Hadoop version=2.4.1``.
     Click `Create` to proceed.

   * In the second `Create Node Group template` dialog, set the following values:
     ``Template Name=vanilla2-worker``, ``OpenStack Flavor=m1.small``,
     ``Floating IP pool=(external network)``; check ``datanode`` and ``nodemanager``
     in the `Process` section.

   * Click `Create`.

#. Create a cluster template:

   * Navigate to `Project > Data Processing > Cluster Templates`.

   * Click `Create Template`.

   * In the `Create Cluster Template` dialog, set the following values:
     ``Plugin name=Vanilla Apache Hadoop``, ``Hadoop version=2.4.1``.
     Click `Create` to proceed.

   * In the second `Create Cluster Template` dialog, set the following values:

     - the `Details` tab: specify ``Template Name=vanilla2-template``;

     - the `Node Groups` tab: add ``vanilla2-master`` and ``vanilla2-worker``;

     - the `HDFS Parameters` tab: set ``dfs.replication=1``.

   * Click `Create`.

#. Launch the cluster:

   * Navigate to `Project > Data Processing > Clusters`.

   * Click `Launch Cluster`.

   * In the `Launch Cluster` dialog, set the following values:
     ``Plugin name=Vanilla Apache Hadoop``, ``Hadoop version=2.4.1``.
     Click `Create` to proceed.

   * In the second `Launch Cluster` dialog, set ``Cluster Name=vanilla2-cluster``.

   * Click `Create` and wait until the cluster gets the ``Active`` status.


#. Delete the cluster:

   * On the `Clusters` page, select the ``vanilla2-cluster`` cluster from the table
     and click `Delete Cluster`.

#. Delete the templates:

   * Navigate to `Project > Data Processing > Cluster Templates`.

   * Select the `vanilla2-template` templates and click `Delete Templates`.

   * Navigate to `Project > Data Processing > Node Group Templates`.

   * Select `vanilla2-master` and `vanilla2-worker` templates,
     and click `Delete Templates`.



For more information, see
`Sahara documentation <http://sahara.readthedocs.org/en/stable-juno/>`_.
