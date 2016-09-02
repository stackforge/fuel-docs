.. _cli_noop:

==================================================
Detect customizations of the OpenStack environment
==================================================

Before you redeploy, update, or upgrade your OpenStack environment, ensure
that new Fuel tasks run will not overwrite important changes that had been
applied to a whole OpenStack environment, a particular OpenStack node,
or a task graph.

**To detect customizations in Fuel task graphs:**

* To check a particular task graph for customizations, execute this graph
  in the ``noop`` mode:

  .. code-block:: console

     fuel2 graph execute --env <ENV_ID> --type <GRAPH_TYPE> --noop

* To check a particular OpenStack node for customizations, deploy the node
  in the ``noop`` mode:

  .. code-block:: console

     fuel2 env nodes deploy --nodes <NODE_ID> --env <ENV_ID> --noop --force

  .. note::

     The Puppet Noop run for any OpenStack environment or node does not
     change their statuses. The Noop run is an additional check
     rather than a part of the deployment process.

* To view the Puppet Noop run report for a particular task graph, type:

  .. code-block:: console

     fuel deployment-tasks --env <ENV_ID> --tid <TASK_ID> --include-summary

  Reports for each Puppet Noop run are stored on each OpenStack node in
  the ``/var/lib/puppet/reports/<node-fqdn>/<timestamp>.yaml`` directory
  and include details about the changes that were applied to Fuel task
  graphs.