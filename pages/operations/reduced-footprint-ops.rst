
.. _reduced-footprint-ops:

Using the reduced footprint feature
===================================

With the reduced footprint feature you can spawn virtual machines
on one node. 

This can be useful in the following scenarios (but not limited to them):

* Run a minimal two node cluster on a single physical machine.
* Put external services on the spawned virtual machines (e.g.
  a monitoring service).
* Run three controllers on virtual machines on three different physical
  machines.

Reduced footprint flow in brief
-------------------------------

Minimal requirements:

* Two bare metal machines. Alternatively, you can have one virtual
  machine (with Fuel installed on it) and one bare metal.
* Fuel 7.0 ISO.

Deployment flow:

#. Install Fuel on a bare metal or virtual machine.
#. Boot another bare metal machine via Fuel PXE.
#. Enable the **Advanced** feature group in Fuel.
#. Create a new environment in Fuel.
#. Assign the "virt" role to the booted bare metal machine.
#. Upload the virtual machine configuration to Fuel.
#. Provision the bare metal machine with the "virt" role. This
   will also spawn the virtual machines.
#. Assign roles to the spawned virtual machines.
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
#. Assign the "virt" role to the booted bare metal machine. On the
   Fuel Master node, issue the following command::

     fuel --env-id=1 node set --node-id=1 --role=virt

   where ``--node-id=1`` and ``--env-id=1`` point to the node and
   the environment (id=1 in this example).

#. Upload the virtual machine configuration to Fuel. On the
   Fuel Master node, issue the following command::

     fuel2 node create-vms-conf 1 --conf '{"id":1, “mem”: 2, “cpu”: 4}'

   where ``id`` is the node id, ``mem`` is the memory amount, and
   ``cpu`` is the number of CPUs.

#. Provision the bare metal machine with the virtual role and spawn
   virtual machines.
   At this point you can go back to the Fuel UI. On the Dashboard there
   you will see the **Provision VMs** button that you need to click.
   Alternatively, you can do this through Fuel CLI on the Fuel Master
   node by issuing the following command::

     fuel2 env spawn-vms 1

#. Assign controller roles to the spawned virtual machines. For details
   see :ref:`assign-roles-ug`. Alternatively, you can do this through
   Fuel CLI by issuing the following command::

     fuel --env-id=1 node set --node-id=2,3,4 --role=controller

#. Deploy the environment. For details see :ref:`deploy-changes`.
   Alternatively, you can do this through Fuel CLI by issuing the
   following command::

     fuel --env 1 node --deploy --node-id=1,2,3,4

#. Migrate the Fuel server as an additional virtual machine located on
   the physical server. On the Fuel Master node, issue the following command::

     fuel-migrate

   This will give you all the available parameters to properly do the
   migration with the ``fuel-migrate`` script.
