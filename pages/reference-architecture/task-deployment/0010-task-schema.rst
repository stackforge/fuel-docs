.. _0010-tasks-schema:

Task Schema
------------

Tasks that are used to build a deployment graph can be grouped
in the following way:

Common parameters

::

  - id: graph_node_id
    type: one of [group, stage, puppet, etc]
    role: match where this tasks should be executed
    requires: [requiremetns for this node]
    required_for: [specify which nodes depends on this task]


Stages
------

Stages are used to build a graph skeleton.
The skeleton is then extended with additional functionality, like provisioning, etc.

The deployment graph of Fuel 6.1 has the following stages:

::
    - pre_deployment_start
    - pre_deployment_end
    - deploy_start
    - deploy_end
    - post_deployment_start
    - post_deployment_end

Stage example
-------------

.. code-block:: yaml

  - id: deploy_end
    type: stage
    requires: [deploy_start]

# TODO(dshulyak) insert graph with stages here

Groups
------

In Fuel 6.1 groups are a representation of roles in the main deployment graph.

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

Primary-controller should be installed when Controller starts its own execution.
And finish of this group is required to consider that *deploy_end* is done.

You can also specify a strategy for groups in the *parameters* section.
Fuel 6.1 supports the following strategies:

* parallel - all nodes in this group will be executed in parallel. If there are
other groups that do not depend on each other, they will be executed in parallel
as well. For example, Cinder and Compute groups.

* parallel by amount - run in parallel by a specified number. For example, *amount: 6*.

* one_by_one - deploy all nodes in this group in a strict one-by-one succession.

# TODO(dshulyak) add graph with groups for 6.1

Void
----

Making a task *void* will guarantee that this task will not be executed,
but all the task's depdendencies will be preserved.

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
------

Task of *type: puppet* is the preferable way to execute the deployment code on nodes.
This is the only mcollective agent that is capable of executing code in background.

In Fuel 6.1 this is the only task that is allowed to be used in the main deployment stages -
between *deploy_start* and *deploy_end*.

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
-----

Shell tasks should be used outside of the main deployment procedure.
Basically, shell tasks will just execute the blocking command on specified roles.

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
-----------

TODO

Sync
----

TODO

Copy files
----------

TODO

Reboot
------

TODO
