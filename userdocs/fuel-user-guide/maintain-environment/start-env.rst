.. _start-env:

==============================
Start an OpenStack environment
==============================

This section provides instructions on how to start an entire OpenStack
environment after it has been shut down.

**To start an OpenStack environment:**

#. If required, start the networking infrastructure and non-OpenStack servers.
#. Power on the *Fuel Master node*.
#. Start *controller nodes*.

   Assuming your environment contains 3 controller nodes, start them
   as follows:

   ..  note::
   
       The first controller node to start is the controller node that
       was shut down last.

   #. Start *Controller-01*.

      Wait until the node accomplishes the boot process and some extra minutes
      for Pacemaker/Corosync to complete the start up and to shut down
      the required services due to no quorum.

   #. Start *Controller-02*.

      Wait until the node accomplishes the boot process and some extra minutes
      for Pacemaker/Corosync to complete the start up and to redistribute
      the OpenStack services between the nodes.

      #. Verify the Galera service.

         If your configuration includes a MySQL database of a huge size,
         Galera may stay in the syncing state for several hours until it
         verifies both MySQL replicas between the available controllers.
         Do not interrupt syncing, wait until Galera finishes the process.

   #. Start *Controller-03*.

      Wait until the node accomplishes the boot process and some extra minutes
      for Pacemaker/Corosync to complete the start up and to redistribute
      the OpenStack services between the nodes.

      #. Verify the Galera service.

         If your configuration includes a MySQL database of a huge size,
         Galera may stay in the syncing state for several hours until it
         verifies both MySQL replicas between the available controllers.
         Do not interrupt syncing, wait until Galera finishes the process.

#. Start *ceph osd nodes*.

   All ceph osd nodes may be started at the same time. Ceph starts
   Ceph OSD services one by one, depending on the current load to Ceph
   monitors.

   To verify that all ceph osd nodes are up, log in to any controller
   and type:

   .. code-block:: console

      ceph osd tree

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
