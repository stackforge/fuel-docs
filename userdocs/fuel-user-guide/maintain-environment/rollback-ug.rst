
.. _rollback-ug:


Rollback
========

You can use the rollback feature to return
a node to its original state (e.g. the state before the node failed).
This can be used to revert changes during a failed upgrade or other
node malfunction.

The rollback is done in five major steps:

#. Maintenance mode -- disable scheduling of new VMs.
#. Shutting the VMs off. Alternatively, live migrating the VMs.
#. Partition preservation -- prevent the node redeployment process
   from deleting data on the partition. This way you will not have to
   manually back up and restore the data to perform the rollback.
#. Node reinstallation -- restore the node to its original state.
#. Enabling the nova-compute service.

Maintenance mode
----------------

Disable the nova-compute service to prevent scheduling of new VMs on this
nova-compute instance:

.. code-block:: console

   $ nova service-disable <host> nova-compute

Shutting the VMs off
--------------------

To shut off all the VMs running on the node to be re-installed, use the
following command:

.. code-block:: console

   $ nova stop [vm-name]

Live migrating the VMs
----------------------

Alternatively to shutting off, live migrate the VMs:

* Manually live migrate instances to other hosts when using shared storage for
  instance disk images:

  .. code-block:: console

     $ nova live-migration <instance>

* Manually live migrate instances to other hosts when not using shared storage
  for instance disk images:

  .. code-block:: console

     $ nova live-migration --block-migrate {instance} <host>

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

Node reinstallation
-------------------

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

Follow the steps below to reinstall the virt role if you have the
Reduced Footprint feature enabled.

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

Enabling nova-compute
---------------------

Enable the nova-compute service:

.. code-block:: console

   $ nova service-enable <host> nova-compute

If you did not perform the live migration, start the VMs that are in the
``SHUTOFF`` status:

.. code-block:: console

   $ nova start [vm-name]

.. seealso::

   * `Planned Maintenance <http://docs.openstack.org/ops-guide/ops_maintenance_compute.html#planned-maintenance>`_