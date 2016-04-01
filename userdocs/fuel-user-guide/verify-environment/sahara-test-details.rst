
.. _sahara-test-details:

About the Hadoop cluster service test
-------------------------------------

The Hadoop cluster service test verifies that Sahara can launch
a Hadoop cluster using the Vanilla plugin.

The following table describes the details of the Hadoop cluster tests.

.. list-table:: **Sahara platform tests**
   :widths: 10 10 20
   :header-rows: 1

   * - Name
     - Description
     - Scenario
   * - **Test that Sahara can launch a Hadoop cluster using the Vanilla
       plugin.**
     - The test verifies successful launch of the Hadoop cluster.
     - #. Log in to the OpenStack dashboard.
       #. Register an image:

          #. Select :menuselection:`Project --> Data Processing --> Image
             Registry`.
          #. Click :guilabel:`Register Image`.
          #. In the :guilabel:`Image` field, select an image.
          #. Specify the ``User Name`` value for the selected OS.
          #. Set the following values:

             * ``Plugin=vanilla``
             * ``Version=2.6.0``

          #. Click :guilabel:`Add plugin tags`.
          #. Click :guilabel:`Done`.

   * -
     -
     - #. Create a master node group template:

          #. Select :menuselection:`Project --> Data Processing --> Node
             Group Templates`.
          #. Click :guilabel:`Create Template`.
          #. In the :guilabel:`Create Node Group template` dialog, set the
             following values:

             * ``Plugin name=Vanilla Apache Hadoop``
             * ``Hadoop version=2.6.0``

          #. Click `Create` to proceed.
          #. In the second `Create Node Group template` dialog, set the
             following values:

             * ``Template Name=vanilla2-master``
             * ``OpenStack Flavor=m1.small``
             * ``Floating IP pool=(external network)``

          #. In the :guilabel:`Process` section, select:

             * ``namenode``
             * ``secondarynamenode``
             * ``resourcemanager``
             * ``historyserver``
             * ``oozie``

          #. Click `Create`.

   * -
     -
     - #. Create a worker node group template:

          #. Select :menuselection: `Project --> Data Processing -->
             Node Group Templates`.

          #. Click :guilabel:`Create Template`.
          #. In the :guilabel:`Create Node Group template` dialog,
             set the following values:

             * ``Plugin name=Vanilla Apache Hadoop``
             * ``Hadoop version=2.6.0``

          #. Click `Create` to proceed.
          #. In the second `Create Node Group template` dialog, set
             the following values:

             * ``Template Name=vanilla2-worker``
             * ``OpenStack Flavor=m1.small``
             * ``Floating IP pool=(external network)``

          #. In the :guilabel:`Process` section, select:

             * ``datanode``
             * ``nodemanager``

          #. Click :guilabel:`Create`.

   * -
     -
     - #. Create a cluster template:

          #. Select :menuselection:`Project --> Data Processing -->
             Cluster Templates`.
          #. Click :guilabel:`Create Template`.
          #. In the :guilabel:`Create Cluster Template` dialog, set the
             following values:

             * ``Plugin name=Vanilla Apache Hadoop``
             * ``Hadoop version=2.6.0``

          #. Click :guilabel:`Create`.
          #. In the second :guilabel:`Create Cluster Template` dialog, set the
             following values:

             * In the :guilabel:`Details` tab, specify
               ``Template Name=vanilla2-template``.

             * In the :guilabel:`Node Groups` tab, specify ``vanilla2-master``
               and ``vanilla2-worker``.

             * In the :guilabel:`HDFS Parameters` tab, specify
               ``dfs.replication=1``.

          #. Click :guilabel:`Create`.

   * -
     -
     - #. Launch the cluster:

          #. Select :guilabel:`Project --> Data Processing --> Clusters`.
          #. Click :guilabel:`Launch Cluster`.
          #. In the :guilabel:`Launch Cluster` dialog, set the following
             values:

             * ``Plugin name=Vanilla Apache Hadoop``
             * ``Hadoop version=2.6.0``

          #. Click `Create` to proceed.
          #. In the second `Launch Cluster` dialog, set
             :guilabel:``Cluster Name=vanilla2-cluster``.
          #. Click :guilabel:`Create`.
          #. Wait until the cluster has the ``Active`` status.
   * -
     -
     - #. Delete the cluster:

          #. In the :guilabel:`Clusters` page, select the ``vanilla2-cluster``
             cluster.
          #. Click :menuselection:`Delete Cluster`.

       #. Delete the templates:

          #. Select :menuselection:`Project --> Data Processing -->
             Cluster Templates`.
          #. Select the `vanilla2-template` template.
          #. Click :guilabel:`Delete Templates`.
          #. Select :guilabel:`Project --> Data Processing --> Node Group
             Templates`.
          #. Select `vanilla2-master` and `vanilla2-worker` templates.
          #. Click :guilabel:`Delete Templates`.

