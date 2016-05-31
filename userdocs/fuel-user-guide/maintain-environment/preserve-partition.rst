.. _preserve-partition:

Preserve a partition
~~~~~~~~~~~~~~~~~~~~

As a part of :ref:`rollback feature <rollback-ug>`, you may need to preserve
a partition. With partition preservation you can keep any type of data that
meets the following criteria:

* The data is stored on a dedicated partition.
* The partition is not a root partition. (The root partition is always
  erased during deployment).

The following data types are a good example of what can be preserved:

* Ceph data
* Swift data
* Nova instances cache
* Database, custom partition types

.. note:: Do not change the partition size as this will make the
          the rollback impossible.

#. On the Fuel Master node, dump the disks information:

   ::

        fuel node --node-id <NODE_ID> --disk --download

   where <NODE_ID> points to a specific node identified by its ID
   (a number) that you can get by issuing the ``fuel nodes`` command.

   For example::

      fuel node --node-id 1 --disk --download

#. Edit the ``/root/node_1/disks.yaml`` file to enable partition
   preservation by using the ``keep_data: true`` flag. Also note that
   all partitions with the same name need to have the same flag value.

   Example of the flag in a ``disks.yaml`` file::

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

#. Upload the modified file::

     fuel node --node-id <NODE_ID> --disk --upload

   where <NODE_ID> points to a specific node identified by its ID
   (a number) that you can get by issuing the ``fuel nodes`` command.

   For example::

     fuel node --node-id 1 --disk --upload