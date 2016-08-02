.. _shutdown-env:

==================================
Shut down an OpenStack environment
==================================

This section provides the recommended process for shutting down an entire
OpenStack environment. You may need to shut down an OpenStack environment
if you want to perform maintenance or recovery procedures. The shutdown
process involves stopping all OpenStack virtual machines, the Fuel Master
node, compute, controller and other nodes in a determinate order. Adhering
to the procedure ensures that the shutdown process is performed gracefully
and mitigates the risks of failure during a subsequent start of
the environment.

**To shut down an entire OpenStack environment:**

#. Shut down the OpenStack virtual machines gracefully through either
   Horizon or CLI.

   Verify if there are any virtual machines in your OpenStack environment
   that require customized shutdown procedure or special shutdown sequence
   between several virtual machines. Shut down or suspend these instances
   gracefully.

#. Shut down compute nodes.

   Log in to each compute node as administrator and type:

   .. code-block:: console

      poweroff

   .. note:: All compute nodes may be shut down at the same time.

   .. warning::

      If a node combines more than one role, you may need to perform
      additional steps, such as setting the ``noout`` flag for Ceph OSD nodes,
      for example, before you can shut down the node.

#. Shut down Ceph OSD nodes:

   #. Set the ``noout`` flag to prevent the rebalance procedure launch
      that can be triggered by a delay between Ceph nodes powering off:

      #. Log in to any controller node or any Ceph OSD node and type:

         .. code-block:: console

            ceph osd set noout

      #. Verify the ``noout`` flag is set:

         .. code-block:: console

            ceph -s

         The output of the command above should show the ``noout`` flag
         set into the health status.

   #. On each ceph osd node, type:

      .. code-block:: console

         poweroff

#. Shut down controller nodes by powering them off sequentially.

   An estimated duration of a single controller node shutdown is 30 minutes.
   However, it may take more time depending on configuration.
   Most of the time the system shows the ``unload corosync services`` message.

   Assuming your environment contains 3 controller nodes, shut them down
   as follows:

   #. Put the pacemaker cluster in maintenance mode:

      .. code-block:: console

         pcs property set maintenance-mode=true

   #. Log in to the Controller-03 node as Administrator and type:

      .. code-block:: console

         poweroff

      Wait until the node accomplishes the poweroff procedure and
      some extra minutes to enable Pacemaker/Corosync to redistribute
      services between the remained controller nodes.

   #. Log in to the Controller-02 node as Administrator and type:

      .. code-block:: console

         poweroff

      Wait until the node accomplishes the poweroff procedure and
      some extra minutes to enable Pacemaker/Corosync to stop all services
      on a single remained controller node due to no quorum.

   #. Log in to the Controller-01 node as Administrator and type:

      .. code-block:: console

         poweroff

#. Shut down the Fuel Master node. Log in to the Fuel Master node CLI and
   type:

   .. code-block:: console

      poweroff

#. Shut down any remaining nodes in your environment.
#. If required, shut down the networking infrastructure.
#. To start an environment, proceed to :ref:`start-env`.