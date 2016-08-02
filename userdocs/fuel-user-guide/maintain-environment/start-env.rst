.. _start-env:

==============================
Start an OpenStack environment
==============================

To resume an OpenStack environment after it has been shut down, you need
to bring the environment back to operation. This section provides instructions
on how to start an entire OpenStack environment.

**To start an OpenStack environment:**

#. Verify that hardware is up and running.
#. Power on the Fuel Master node.
#. Start controller nodes.

   Assuming your environment contains 3 controller nodes, start them
   as follows:

   ..  note::

       The first controller node to start is the controller node that
       was shut down last.

   #. Start the Controller-01 node.

      Wait until the node accomplishes the boot process and some extra minutes
      for Pacemaker/Corosync to complete the start up and to shut down
      the required services due to no quorum.

   #. Start the Controller-02 node.

      Wait until the node accomplishes the boot process and some extra minutes
      for Pacemaker/Corosync to complete the start up and to redistribute
      the OpenStack services between the nodes.

   #. Start the Controller-03 node.

      Wait until the node accomplishes the boot process and some extra minutes
      for Pacemaker/Corosync to complete the start up and to redistribute
      the OpenStack services between the nodes.

   #. Remove the maintenance mode from the Pacemaker resources:

      .. code-block:: console

         pcs property set maintenance-mode=false

   #. Verify the Galera service.

      .. warning::

         If your configuration includes a MySQL database of a huge size,
         Galera may stay in the syncing state for several hours until it
         verifies both MySQL replicas between the available controllers.
         Do not interrupt syncing, wait until Galera finishes the process.

#. Start Ceph OSD nodes.

   You can start all Ceph OSD nodes at the same time. Ceph starts
   Ceph OSD services one by one, depending on the current load to Ceph
   monitors.

#. To verify that all Ceph OSD nodes are up and running, log in to
   any controller node and type:

   .. code-block:: console

      ceph osd tree

   If some Ceph OSD nodes are not up and running, check it manually.

#. Remove the ``noout`` flag:

   #. Log in to any controller or any Ceph node and type:

      .. code-block:: console

         ceph osd unset noout

   #. Verify the flag is set:

      .. code-block:: console

         ceph -s

      The output of the command above should NOT show the ``noout`` flag
      set into the health status.

#. Start compute nodes.
#. Verify the OpenStack services.
#. Start virtual machines through either Horizon or CLI.
