.. _cli_noop:

========================================================
Detect custom configurations in an OpenStack environment
========================================================

Before you redeploy, update, or upgrade your OpenStack environment, ensure
that next Fuel tasks run will not override important changes that had been
applied to a whole OpenStack environment or a particular OpenStack node.
This procedure should only be applied to OpenStack nodes with the ``ready``
statuses or to OpenStack environments with the ``operational`` statuses.

**To detect custom configurations using the Fuel task graphs:**

#. Select from the following options:

   * If you want to check that an environment has customizations using
     a specific graph, execute the graph in the ``noop`` mode:

     .. code-block:: console

        fuel2 graph execute --env <ENV_ID> --type <GRAPH_TYPE> --noop --force

   * If you want to check that particular OpenStack nodes have customizations
     using a specific graph, execute this graph in the ``noop`` mode:

     .. code-block:: console

        fuel2 graph execute --env <ENV_ID> --type <GRAPH_TYPE> -n <NODE_IDs> --noop --force

     .. note:: The Puppet Noop run for any OpenStack environment or node
               does not change their statuses. The Noop run is an additional
               check rather than a part of the deployment process.

   * If you want to view the Puppet Noop run reports for a particular task graph,
     type one of the following:

     .. code-block:: console

        fuel deployment-tasks --tid <TASK_ID> --task-name <TASK_NAME> --include-summary

     .. code-block:: console

        fuel2 task history show <TASK_ID> --include-summary

     Reports for each Puppet Noop run are stored on all OpenStack nodes in
     the ``/var/lib/puppet/reports/<NODE-FQDN>/<TIMESTAMP>.yaml`` directory
     and include details about the changes that were applied to the Fuel task
     graphs.