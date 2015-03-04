.. _0010-tasks-schema:

Task Schema
------------

Task that are used for building deployment graph can be grouped next way:

Common parameters

::

  - id: graph_node_id
    type: one of [group, stage, puppet, etc]
    role: match where this tasks should be executed
    requires: [requiremetns for this node]
    required_for: [specify which nodes depends on this task]


Stages

Stages are used to build skeleton of the graph, and will be used to extend
it with all kinds of additional functionality, like provisioning, etc.

In 6.1 we will have next stages in the deployment graph:

::
    - pre_deployment_start
    - pre_deployment_end
    - deploy_start
    - deploy_end
    - post_deployment_start
    - post_deployment_end

Stage example

.. code-block:: yaml

  - id: deploy_end
    type: stage
    requires: [deploy_start]

# TODO(dshulyak) insert graph with stages here

Groups

In 6.1 groups are representation of roles in the main deployment graph.

::

  - id: controller
    type: group
    role: [controller]
    requires: [primary-controller]
    required_for: [deploy_end]
    parameters:
      strategy:
        type: parallel
          amount: 6

Primary-controller should be installed when controller will start its own
execution.
And finish of this group is required to consider that deploy_end is done.

In parameters section for groups strategy can be specified, in 6.1 we are
supporting next strategies:

1. parallel - all node in this group will be executed in parallel, if there is
other groups that doesnt depend on each other - they will be executed in parallel
too, example is cinder and compute groups.

2. parallel by amount - run in parallel by specified number, like in controller
example that number is 6.

3. one_by_one - deploy nodes in this group strictly one after another

# TODO(dshulyak) add graph with groups for 6.1

Void


Making task a void - will guarantee that this task will not be executed,
but all edges (dependnecies) of this task will be preserved.

Example:

.. code-block:: yaml

    - id: netconfig
      type: void
      groups: [primary-controller, controller, cinder, compute, ceph-osd,
               zabbix-server, primary-mongo, mongo]
      required_for: [deploy_end]
      requires: [logging]
      parameters:
        puppet_manifest: /etc/puppet/modules/osnailyfacter/other_path/netconfig.pp
        puppet_modules: /etc/puppet/modules
        timeout: 3600

Puppet


Task of type puppet is preferable way to execute deployment code on nodes,
it is in fact the only mco agent that are capable of executing code in background

And in 6.1 it is the only task that is allowed to be used in main deployment stages,
between (deploy_start and deploy_end).

Example:

.. code-block:: yaml

  - id: netconfig
      type: puppet
      groups: [primary-controller, controller, cinder, compute, ceph-osd,
               zabbix-server, primary-mongo, mongo]
      required_for: [deploy_end]
      requires: [logging]
      parameters:
        puppet_manifest: /etc/puppet/modules/osnailyfacter/other_path/netconfig.pp
        puppet_modules: /etc/puppet/modules
        timeout: 3600

Shell

Shell tasks should be used outside of main deployment procedure.
Basically it will just execute the blocking command on specified roles.

Example:

.. code-block:: yaml

  - id: enable_quorum
    type: shell
    role: [primary-controller]
    requires: [post_deployment_start]
    required_for: [post_deployment_end]
    parameters:
      cmd: ruby /etc/puppet/modules/osnailyfacter/modular/astute/enable_quorum.rb
      timeout: 180


Upload file

TODO

Sync

TODO

Copy files

TODO

Reboot

TODO