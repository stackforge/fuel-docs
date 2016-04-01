
.. _customize-partitions-ug:

Configure disk partitioning
---------------------------

By default, Fuel allocates a balanced amount of disk space for
all components that will be installed on the corresponding node.
After you assign a role or roles to a node, you can modify the
disk partition as needed.

If you modify node roles, Fuel resets the disk partition to default settings.

The following table describes the partition types that you can configure
for each node.

.. list-table:: **Disk partition types**
   :widths: 10 25
   :header-rows: 1

   * - Type of partition
     - Description
   * - Base system
     - Comprehensive of swap space, includes operating system and basic
       software option.
   * - Virtual storage
     - Storage for virtual instances.
   * - Image storage
     - Glance stores virtual instance images in this partition.
   * - Cinder
     - Storage allocated for Cinder.
   * - Ceph and Ceph Journal
     - Storage allocated for Ceph.
   * - MongoDB
     - Storage used for Ceilometer information stored in MongoDB.
   * - MySQL
     - Storage for Zabbix statistics.

**To configure disk partitioning:**

#. In the Fuel web UI, click :guilabel:`Nodes`.
#. Select a node or nodes.

   .. note::
      You can select multiple nodes of the same role. The nodes with
      the same role must have identical hardware configuration. You cannot
      change configuration of multiple nodes with different roles or hardware
      in one transaction.

#. Click :guilabel:`Disk Configuration`.
#. Click on a partition that you want to modify.
#. In the :guilabel:`Volume Groups`, adjust the partition size using the
   slider.
#. Alternatively, type the partition size in the corresponding field.

   Fuel adjusts the number you type to satisfy block size boundary
   requirements. The display adjusts to show the new allocation.
#. Click  :guilabel:`Apply`.
