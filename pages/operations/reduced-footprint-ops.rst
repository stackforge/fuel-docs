
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

#. Upload the virtual machine configuration to Fuel. On the
   Fuel Master node, issue the following command::

     fuel2 node create-vms-conf <NODE_ID> --conf‚{"id":<VM_ID>,
     "mem":<MEMORY_SIZE>,"cpu":<CPU_CORE_COUNT>}

   For example::

     fuel2 node create-vms-conf 2 —conf‚{"id":1,"mem”:2,"cpu":4}

   where <NODE_ID> is "virt" node ID, <VM_ID> is VM ID that should
   be unique on that "virt" node, <MEMORY_SIZE> is the memory amount,
   and <CPU_CORE_COUNT> is the number of CPUs.

#. Provision the bare metal node with the virtual role and spawn
   virtual machines.
   At this point you can go back to the Fuel UI. On the Dashboard there
   you will see the **Provision VMs** button that you need to click.
   Alternatively, you can do this through Fuel CLI on the Fuel Master
   node by issuing the following command::

     fuel2 env spawn-vms <cluster_id>

   For example::

      fuel2 env spawn-vms 1

#. Assign controller roles to the spawned virtual machines. For details
   see :ref:`assign-roles-ug`. Alternatively, you can do this through
   Fuel CLI by issuing the following command::

     fuel --env-id=<ENV_ID> node set --node-id=<NODE_ID> --role=controller

#. Deploy the environment. For details see :ref:`deploy-changes`.
   Alternatively, you can do this through Fuel CLI by issuing the
   following command::

     fuel --env <ENV_ID> node --deploy --node-id=<NODE_ID>

#. Migrate the Fuel server as an additional virtual machine located on
   the physical server. On the Fuel Master node, issue the following command::

     fuel-migrate

   This will give you all the available parameters to properly do the
   migration with the ``fuel-migrate`` script.
