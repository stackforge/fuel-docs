Corosync crashes without network connectivity
+++++++++++++++++++++++++++++++++++++++++++++

Depending on a wide range of systems and configurations in the network,
it is possible for Corosync's networking protocol, Totem, to time out.
If this happens for an extended period of time, Corosync may crash.
In addition, MySQL may have stopped.
This guide illustrates the process of working through 
issues with Corosync and MySQL.

**Workaround:**

1. Verify that Corosync is really broken: ``service corosync status``.

* You should see next error
  ::

    corosync dead but pid file exists

2. Start Corosync manually: ``service corosync start``.

3. Run ``ps -ef | grep mysql`` and kill ALL(!) **mysqld** and 
   **mysqld_safe** processes.

4. Wait for Pacemaker to completely start MySQL processes.

* You can check it with the ``ps -ef | grep mysql`` command.
* If it doesn't start, run ``crm resource p_mysql`` start.

5. Run the ``crm status`` command to verify that this host is a member
   of the cluster and that p_mysql does not contain any "Failed actions".
