Corosync crashes without network connectivity
+++++++++++++++++++++++++++++++++++++++++++++

Depending on a wide range of systems and configurations in the network,
it is possible for Corosync's networking protocol, Totem, to time out.
If this happens for an extended period of time, Corosync may crash.
In addition, MySQL may have stopped.
This guide illustrates the process of working through
issues with Corosync and MySQL.

**Workaround:**

#. Verify that Corosync is really broken:

   .. code-block:: bash

       service corosync status

   * You should see this error:

     .. code-block:: bash

          corosync dead but pid file exists

#. Start Corosync manually:

   .. code-block:: bash

        service corosync start

#. Run the following command:

   .. code-block:: bash

         ps -ef | grep mysql


   and kill ALL(!) **mysqld** and **mysqld_safe** processes.

#. Wait for Pacemaker to completely start MySQL processes.

    * Check it with the following command:

      .. code-block:: bash

         ps -ef | grep mysql

    * If it doesn't start, run:

      .. code-block:: bash

         crm resource p_mysql

#. To verify that this host is a member
   of the cluster and that **p_mysql**
   does not contain any "Failed actions",
   run the following command:

   .. code-block:: bash

        crm status
