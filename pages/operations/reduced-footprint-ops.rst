
.. _reduced-footprint-ops:

Using the reduced footprint feature
===================================

With the reduced footprint feature you can spawn virtual machines
on nodes.

This can be useful in the following scenarios (but not limited to them):

* Run a minimal two node cluster on a single physical machine.
* Put external services on the spawned virtual machines (e.g.
  a monitoring service).
* Run three controllers on virtual machines on three different physical
  machines.

Reduced footprint flow in brief
-------------------------------

Minimal requirements:

* Two bare metal nodes. Alternatively, you can have one virtual
  machine (with Fuel installed on it) and one bare metal.
* Fuel 7.0 ISO.

Deployment flow:

#. Install Fuel on a bare metal or virtual machine.
#. Boot another bare metal machine via Fuel PXE.
#. Enable the **Advanced** feature group in Fuel.
#. Create a new environment in Fuel.
#. Assign the "virt" role to the discovered node.
#. Upload the virtual machine configuration to Fuel.
#. Provision the bare metal node with the "virt" role. This
   will also spawn the virtual machines.
#. Assign roles to the spawned and discovered virtual machines.
#. Deploy the environment.
#. Migrate the Fuel server as an additional virtual machine located on
   the physical server.

Reduced footprint flow detailed
-------------------------------

#. Install Fuel on a bare metal or virtual machine. For details see :ref:`download-install-ug`.
#. Boot another bare metal machine via Fuel PXE. For details see :ref:`boot-nodes-ug`.
#. Enable the **Advanced** feature group in Fuel. On the Fuel Master
   node edit the ``/etc/fuel/version.yaml`` file and add ``advanced``
   under ``feature groups`` there. Here is a sample::

     VERSION:
       feature_groups:
         - mirantis
         - advanced

   Having added "advanced" to the yaml file, issue the following commands::

    dockerctl shell nailgun
    supervisorctl restart nailgun

#. Create a new environment in Fuel. For details see :ref:`create-env-ug`.
#. Assign the "virt" role to the discovered node. On the
   Fuel Master node, issue the following command::

     fuel --env-id=<ENV_ID> node set --node-id=<NODE_ID> --role=virt

   where <NODE_ID> points to a specific node identified by its ID
   (a number) that you can get by issuing the ``fuel nodes`` command;
   <ENV_ID> points to the environment ID respectively; you can get the
   environment ID by issues the ``fuel environment`` command.

   For example::

     fuel --env-id=1 node set --node-id=1 --role=virt

#. Upload the virtual machine configuration to Fuel. On the
   Fuel Master node, issue the following command::

     fuel2 node create-vms-conf <NODE_ID> --conf‚{"id":<VM_ID>,
     "mem":<MEMORY_SIZE>,"cpu":<CPU_CORE_COUNT>}

   For example::

     fuel2 node create-vms-conf 2 —conf‚{"id":1,"mem”:2,"cpu":4}

   where <NODE_ID> is "virt" node ID, <VM_ID> is VM ID that should
   be unique on that "virt" node, <MEMORY_SIZE> is the memory amount
   in gigabytes, and <CPU_CORE_COUNT> is the number of CPUs.

#. Provision the bare metal node with the virtual role and spawn
   virtual machines.
   At this point you can go back to the Fuel UI. On the Dashboard there
   you will see the **Provision VMs** button that you need to click.
   Alternatively, you can do this through Fuel CLI on the Fuel Master
   node by issuing the following command::

     fuel2 env spawn-vms <CLUSTER_ID>

   For example::

      fuel2 env spawn-vms 1

#. Assign controller roles to the spawned virtual machines. For details
   see :ref:`assign-roles-ug`. Alternatively, you can do this through
   Fuel CLI by issuing the following command::

     fuel --env-id=<ENV_ID> node set --node-id=<NODE_ID> --role=controller

   You can specify several nodes with the ``--node-id`` parameter.
   For example::

     fuel --env-id=1 node set --node-id=2,3,4 --role=controller

#. Deploy the environment. For details see :ref:`deploy-changes`.
   Alternatively, you can do this through Fuel CLI by issuing the
   following command::

     fuel --env <ENV_ID> node --deploy --node-id=<NODE_ID>

   You can specify several nodes with the ``--node-id`` parameter.
   For example::

     fuel --env 1 node --deploy --node-id=1,2,3,4

#. Use the fuel-migrate scrpt to migrate the Fuel Master node into
   into a virtual machine on a compute node. This allows for reduced
   resource use in small environments and lets the Fuel Master node
   run on physical or virtual machines by essentially making it
   host agnostic.

     fuel-migrate

   This will give you all the available parameters to properly do the
   migration with the ``fuel-migrate`` script.

   Simple usage scenario:

   #. Identify the node with the compute role by issuing the following
      command on the Fuel Master node (and checking its output)::

       fuel node

   #. Run the migration script::

       fuel-migrate <DESTINATION_COMPUTE>

      where <DESTINATION_COMPUTE> is the name or IP address of the
      destination compute node where the virtual machine will be
      created.

      For example::

       fuel-migrate node-1

   Once you start the script, it will do the following:

   #. Create a blank disk image on the destination node, define the
      virtual machine, start the virtual machine, and boot with Fuel
      PXE server.
   #. Partition the disk on the destination node.
   #. Reboot the Fuel Master node into maintenance mode and
      synchronize the data.
   #. Swap the IP address on the source and destination Fuel Master
      nodes. It will then reboot the destination virtual machine.

   An indication of that the script has run successfully will be the
   following message (with additional details on how to proceed)
   after you log in to the Fuel Master node via SSH::

      Congratulation! You are on cloned Fuel now!
      The migration tasks have completed. The clone should be up and
      functioning correctly.

   Additional notes:

   * You can define the destination disk size in gigabytes with
     the ``--fvm_disk_size`` parameter.

     For example::

         fuel-migrate node-1 --fvm_disk_size=50g

   * By default, the destination node will use the admin network
     interface. If you need to create additional interfaces, you
     can do so with the ``--other_net_bridges`` parameter.

     For example::

          fuel-migrate node-1 --other_net_bridges=eth1,,virbr13

   * By default, the migration log file is /var/log/fuel-migrate.log.
     If the migration fails, check the log for errors.

   Custom usage example::

     fuel-migrate 192.168.116.1 --admin_net_br=virbr12 --del_vm
     --other_net_bridges=eth1,,virbr13 --fvm_disk_size=100g
     --dkvm_folder=/var/lib/libvirt/images/

   This example will do the following:

   #. Set the destination compute node with the IP address 192.168.116.1
   #. Use virbr12 on the host to connect to the admin interface (which
      is public network connected to the current Fuel Master node in
      this case).
   #. Remove the destination virtual machine if it exists.
   #. Use virbr13 for Ethernet 1.
   #. Set the destination disk size to 100 GB.
   #. Set the path to the folder on KVM hist where disk will
      be created to ``/var/lib/libvirt/images/``
