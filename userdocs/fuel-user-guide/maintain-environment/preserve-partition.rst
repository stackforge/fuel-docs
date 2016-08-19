.. _preserve-partition:

====================
Preserve a partition
====================

This section is a part of the :ref:`Rollback a node <rollback-ug>` procedure.
With partition preservation you can keep any type of data that meets the
following criteria:

* The data is stored on a dedicated partition.
* The partition is not a root partition. (The root partition is always
  erased during deployment).

You can preserve the following types of data:

* Ceph data
* Swift data
* Nova instances data
* Database, custom partition types

.. note:: Do not change the partition size as this will make the
          the rollback impossible.

**To preserve a partition:**

#. Log in to the Fuel Master node CLI.
#. Obtain the node ID number by typing:

   ::

     fuel nodes

#. Download the information about disks:

   ::

     fuel node --node-id <NODE_ID> --disk --download

   where <NODE_ID> points to a specific node identified by its ID
   (a number) that you can get by issuing the ``fuel nodes`` command.

   **Example:**

   ::

     fuel node --node-id 1 --disk --download

#. Open the ``/root/node_1/disks.yaml`` file for editing.
#. Enable partition preservation by setting the ``keep_data:`` flag value to
   ``true``.
   All partitions with the same name need to have the same flag value.

   **Example:**

   ::

     - extra:
        - disk/by-id/scsi-SATA_QEMU_HARDDISK_QM00001
        - disk/by-id/ata-QEMU_HARDDISK_QM00001
        id: disk/by-path/pci-0000:00:01.1-scsi-0:0:0:0
        name: sdc
        size: 101836
        volumes:
        - name: mysql
          size: 101836
          keep_data: true

#. Upload the modified file:

   ::

     fuel node --node-id <NODE_ID> --disk --upload

   **Example:**

   ::

     fuel node --node-id 1 --disk --upload