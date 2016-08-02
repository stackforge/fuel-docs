.. _shutdown-env:

==================================
Shut down an OpenStack environment
==================================

This section provides the proper process for shutting down an entire
OpenStack environment. The process involves stopping all virtual machines
and Fuel nodes in a determinate order. Adhering to the procedure ensures
that the shutdown process is done gracefully and mitigates the risks of
failure during a subsequent start of the environment.

**To shut down an entire OpenStack environment:**

#. Shut down *OpenStack virtual machines* gracefully through either
   Horizon or CLI.

   Verify if there are any virtual machines in your OpenStack environment
   that require customized shutdown procedure or special shutdown sequence
   between several virtual machines. Shut down or suspend these instances
   gracefully.

#. Shut down *compute nodes*.

   Log in to each compute node as administrator and type:

   .. code-block:: console

      poweroff

   .. note:: All compute nodes may be shut down at the same time.

#. Shut down *ceph osd nodes*:

   #. Set the ``noout`` flag to prevent the rebalance procedure launch
      that can be triggered by a delay between Ceph nodes powering off:

      #. Log in to any controller or any Ceph node and type:

         .. code-block:: console

            ceph osd set noout

      #. Verify the flag is set:

         .. code-block:: console

            ceph -s

         The output of the command above should show the ``noout`` flag
         set into the health status. 

   #. On each ceph osd node, type:

      .. code-block:: console

         poweroff

#. Shut down *controller nodes* powering them off sequentially.

   An estimated duration of a single controller node shutdown is 30 minutes.
   Though, it make take a longer time depending on an environment configuration.
   Much of the time the system shows the ``unload corosync services`` message.

   Assuming your environment contains 3 controller nodes, shut them down
   as follows:

   #. Log in to *Controller-03* node as administrator and type:

      .. code-block:: console

         poweroff

      Wait until the node accomplishes the poweroff procedure and
      some extra minutes to enable Pacemaker/Corosync to redistribute
      services between the remained controller nodes.

   #. Log in to *Controller-02* node as administrator and type:

      .. code-block:: console

         poweroff

      Wait until the node accomplishes the poweroff procedure and
      some extra minutes to enable Pacemaker/Corosync to stop all services
      on a single remained controller node due to no quorum.

   #. Log in to *Controller-01* node as administrator and type:

      .. code-block:: console

         poweroff

#. Shut down the *Fuel Master node*. Log in to the Fuel Master CLI and type:

   .. code-block:: console

      poweroff

#. Shut down any remained nodes in your environment.
#. If required, shut down the networking infrastructure.
#. To start an environment, proceed to :ref:`start-env`.