
.. _rollback-ug:


Rollback
========

Starting with Fuel 7.0, you can use the rollback feature to return
a node to its original state (e.g. the state before the node failed).
This can be used to revert changes during a failed upgrade or other
node malfunction.

The rollback is done in two major steps:

#. Partition preservation -- prevent the node redeployment process
   from deleting data on the partition. This way you will not have to
   manually back up and restore the data to perform the rollback.

#. Node reinstallation -- restore the node to its original state.

Partition preservation
----------------------

With partition preservation you can keep any type of data that meets
the following criteria:

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

#. On the Fuel Master node, dump the disks information using this
   :ref:`fuel CLI<fuel-cli-config>` command::

        fuel node --node-id 1 --disk --download

   where ``--node-id 1`` points to the specific node
   (id=1 in this example).

#. Edit the ``root/node_1/disks.yaml`` file to enable partition
   preservation by using the ``keep_data: true`` flag. Also note that
   all partitions with the same name need to have the same flag value.

   Example of the flag in a ``disks.yaml`` file::

    - extra:
       - disk/by-id/scsi-SATA_QEMU_HARDDISK_QM00001
       - disk/by-id/ata-QEMU_HARDDISK_QM00001
       id: disk/by-path/pci-0000:00:01.1-scsi-0:0:0:0
       name: sda
       size: 101836
       volumes:
       - name: os
         size: 101836
         keep_data: true

#. Upload the modified file::

     fuel node --node-id 1 --disk --upload

Node reinstallation
-------------------

#. On the Fuel Master node, issue the following command to reprovision
   the node::

     fuel node --node-id 1 --provision

   where ``--node-id 1`` points to the specific node
   (id=1 in this example).

#. Then issue the following command to redeploy the node::

     fuel node --node-id 1 --deploy
