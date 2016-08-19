.. _reinstall-virtual-role:

========================
Reinstall a virtual role
========================

If you have the Reduced Footprint feature enabled, you may need to reinstall
the virtual role.

**To reinstall a virtual role:**

#. Log in to the Fuel Master node CLI.
#. Download the information about disks:

   ::

     fuel node --node-id <NODE_ID> --disk --download

   where <NODE_ID> points to the node with virt role identified by its ID
   (a number) that you can get by issuing the ``fuel nodes`` command.

   **Example:**

   ::

     fuel node --node-id 1 --disk --download

#. Open the ``/root/node_1/disks.yaml`` file for editing.
#. Enable the partition preservation of the volume with ``vm`` name by setting
   its ``keep_data`` flag to ``true``. All partitions with the same name need
   to have the same flag value.

   **Example:**

   ::

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

    where <NODE_ID> points to a specific node identified by its ID (a number)
    that you can get by issuing the ``fuel nodes`` command.

#. Upload the modified file:

   ::

     fuel node --node-id <NODE_ID> --disk --upload

   **Example:**

   ::

     fuel node --node-id 1 --disk --upload

#. Reprovision the node:

   ::

     fuel node --node-id <NODE_ID> --provision

   **Example:**

   ::

     fuel node --node-id 1 --provision

#. Provision the bare-metal node with the virtual role and spawn
   virtual machines:

   ::

     fuel2 env spawn-vms <CLUSTER_ID>

   **Example:**

   ::

     fuel2 env spawn-vms 1

#. Redeploy the spawned node:

   ::

     fuel node --node-id <NODE_ID> --deploy