.. _cli_noop:

==================================================
Detect customizations of the OpenStack environment
==================================================

Before you redeploy, update, or upgrade your OpenStack environment, ensure
that new Fuel tasks run will not overwrite important changes that had been
applied to a whole OpenStack environment or a particular OpenStack node.

**To detect customizations using the Fuel task graphs:**

* To check a particular environment for customizations using a particular
  task graph, execute this graph in the ``noop`` mode::

  .. code-block:: console

     fuel2 graph execute --env <ENV_ID> --type <GRAPH_TYPE> --noop

* To check particular OpenStack nodes for customizations using a particular
  task graph, execute this graph in the ``noop`` mode:

  .. code-block:: console

     fuel2 graph execute --env <ENV_ID> --type <GRAPH_TYPE> -n <NODE_IDs> --noop

  .. note::

     The Puppet Noop run for any OpenStack environment or node does not
     change their statuses. The Noop run is an additional check
     rather than a part of the deployment process.

* To view the Puppet Noop run reports for a particular task graph, type
  one of the following:

  .. code-block:: console

     fuel deployment-tasks --tid <TASK_ID> --task-name <TASK_NAME> --include-summary

  Reports for each Puppet Noop run are stored on each OpenStack node in
  the ``/var/lib/puppet/reports/<NODE-FQDN>/<TIMESTAMP>.yaml`` directory
  and include details about the changes that were applied to the Fuel task
  graphs.