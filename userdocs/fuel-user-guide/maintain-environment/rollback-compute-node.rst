.. _rollback-compute-node:

Rollback a compute node
-----------------------

You can rollback a compute node to its original state, for example, the state
before it failed.

**To rollback a compute node**:

#. SSH to one of the controller nodes.

#. Put the node into maintenance mode to prevent scheduling of new VMs by
   disabling the nova-compute service:

   .. code-block:: console

      $ nova service-disable <host> nova-compute

#. Power off all the VMs running on the node to be re-installed:

   .. code-block:: console

      $ nova stop [vm-uuid]


   Alternatively, live migrate the VMs:

   #. Get a list of all VMs running on a host:

      .. code-block:: console

         $ nova list --host <host> --all-tenants

   #. Manually live migrate instances to other hosts:

      * When using shared storage for instance disk images:

        .. code-block:: console

           $ nova live-migration <instance>

      * When not using shared storage for instance disk images:

        .. code-block:: console

           $ nova live-migration --block-migrate {instance} <host>

#. (Optional) Preserve partitions as described in :ref:`preserve-partition`.

#. Reinstall the node as described in :ref:`reinstall-node`.

#. Enable the nova-compute service:

   .. code-block:: console

      $ nova service-enable <host> nova-compute

#. If you did not perform the live migration, start the VMs that are in the
   ``SHUTOFF`` status:

   .. code-block:: console

      $ nova start [vm-uuid]

.. seealso::

   * `Planned Maintenance <http://docs.openstack.org/ops-guide/ops_maintenance_compute.html#planned-maintenance>`_