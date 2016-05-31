.. _reinstall-node:

Reinstall a node
================

**To reinstall a node**:

#. Log in to the Fuel Master node.

#. On the Fuel Master node, issue the following command to reprovision
   the node::

     fuel node --node-id <NODE_ID> --provision

   where <NODE_ID> points to a specific node identified by its ID
   (a number) that you can get by issuing the ``fuel nodes`` command.

   For example::

     fuel node --node-id 1 --provision

#. Then issue the following command to redeploy the node::

     fuel node --node-id <NODE_ID> --deploy

   where <NODE_ID> points to a specific node identified by its ID
   (a number) that you can get by issuing the ``fuel nodes`` command.

Virt role reinstallation
------------------------

**To reinstall the virt role if you have the
Reduced Footprint feature enabled:**

#. On the Fuel Master node, dump the disks information:

   ::

        fuel node --node-id <NODE_ID> --disk --download

   where <NODE_ID> points to the node with virt role identified by its ID
   (a number) that you can get by issuing the ``fuel nodes`` command.
   For example::

      fuel node --node-id 1 --disk --download

#. Edit the `/root/node_1/disks.yaml` file to enable the partition
   preservation of the volume with ``vm`` name using the ``keep_data: true``
   flag of the corresponding volumes. Note that all partitions with
   the same name need to have the same flag value.

   Example of the flag in a `disks.yaml` file::

    - extra:
      - disk/by-id/wwn-0x5000c5007a287855
      - disk/by-id/scsi-SATA_ST2000DM001-1ER_Z4Z1WH2V
      - disk/by-id/ata-ST2000DM001-1ER164_Z4Z1WH2V
      id: disk/by-path/pci-0000:00:1f.2-scsi-0:0:0:0
      name: sda
      size: 1907037
      volumes:
      - keep_data: false
        name: os
        size: 67584
      - keep_data: false
        name: cinder
        size: 919726
      - keep_data: true
        name: vm
        size: 919727

#. Upload the modified file::

     fuel node --node-id <NODE_ID> --disk --upload

   where <NODE_ID> points to a specific node identified by its ID
   (a number) that you can get by issuing the ``fuel nodes`` command.

   For example::

     fuel node --node-id 1 --disk --upload

#. On the Fuel Master node, reprovision the node::

     fuel node --node-id <NODE_ID> --provision

   where <NODE_ID> points to a specific node identified by its ID
   (a number) that you can get by issuing the ``fuel nodes`` command.

   For example::

     fuel node --node-id 1 --provision

#. Provision the bare-metal node with the virtual role and spawn
   virtual machines::

     fuel2 env spawn-vms <CLUSTER_ID>

   For example::

      fuel2 env spawn-vms 1

#. Redeploy the spawned node::

     fuel node --node-id <NODE_ID> --deploy

   where <NODE_ID> points to a specific node identified by its ID
   (a number) that you can get by issuing the ``fuel nodes`` command.