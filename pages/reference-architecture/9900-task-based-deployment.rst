
Granular documentation content:

1. Tasks schema
2. API
3. Limitations
4. Examples
4.1. Additional task for existing role
4.2. Swapping a task with custom task
4.3. Creating separate role and attach task for it
4.4. Moving existing services to separate node
4.5. How to extend deployment with custom driver - TODO
4.6. Skipping task by api or by configuration - TODO

===========================
TASK SCHEMA
===========================

Task that are used for building deployment graph can be grouped next way:


COMMON PARAMETERS
-----------------

::

  - id: graph_node_id
    type: one of [group, stage, puppet, etc]
    role: match where this tasks should be executed
    requires: [requiremetns for this node]
    required_for: [specify which nodes depends on this task]


STAGES
-------
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

::

  - id: deploy_end
    type: stage
    requires: [deploy_start]

# TODO(dshulyak) insert graph with stages here

GROUPS
-------
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

VOID
-----

Making task a void - will guarantee that this task will not be executed,
but all edges (dependnecies) of this task will be preserved.

Example:

::
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

PUPPET
------

Task of type puppet is preferable way to execute deployment code on nodes,
it is in fact the only mco agent that are capable of executing code in background

And in 6.1 it is the only task that is allowed to be used in main deployment stages,
between (deploy_start and deploy_end).

Example:

::

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

SHELL
-----

Shell tasks should be used outside of main deployment procedure.
Basically it will just execute the blocking command on specified roles.

Example:

::

  - id: enable_quorum
    type: shell
    role: [primary-controller]
    requires: [post_deployment_start]
    required_for: [post_deployment_end]
    parameters:
      cmd: ruby /etc/puppet/modules/osnailyfacter/modular/astute/enable_quorum.rb
      timeout: 180


UPLOAD_FILE
------------

TODO

SYNC
------------

TODO

COPY_FILES
-----------

TODO

REBOOT
---------

TODO


==================
API
==================

If you want to change/add some tasks right on
master node, just add tasks.yaml
and appropriate manifests in folder for release that you are interested in.
Then apply this command:

>> fuel rel --sync-deployment-tasks --dir /etc/puppet

Also you may want to overwrite deployment tasks for any specific
release/cluster by next commands:

>> fuel rel --rel <id> --deployment-tasks --download
>> fuel rel --rel <id> --deployment-tasks --upload

>> fuel env --env <id> --deployment-tasks --download
>> fuel env --env <id> --deployment-tasks --upload

After this is done - you will be able to run customized graph of tasks:

The most basic command:

>> fuel node --node 1,2,3 --tasks upload_repos netconfig

Developer will need to specify nodes that should be used in deployment and
tasks ids. Order in which they are provided doesn't matter,
it will be computed from dependencies specified in database. Also very
important to understand that if task is mapped to role controller,
but node where you want to apply that task doesn't have this role - it wont
be executed.

Skipping of tasks

>> fuel node --node 1,2,3 --skip netconfig hiera

List of task that are provided with this parameter will be skipped during
graph traversal in nailgun.
The main question is - should we skip other task that have provided tasks
as dependencies?
In my opinion we can leave this flag as simple as it is, and use following
commands for "smarter" traversal.

Specify start and end nodes in graph:

>> fuel node --node 1,2,3 --end netconfig

Will deploy everything up to netconfig task, including netconfig. This is:
all tasks that we are considering as pre_deployment (keys generation, rsync
manifests, sync time, upload repos),
and such tasks as hiera setup, globals computation and maybe some other
basic preparatory tasks.

>> fuel node --node 1,2,3 --start netconfig

Start from netconfig, including netconfig, deploy all other tasks, tasks
that we are considering as post_deployment.
For example if one want to execute only netconfig successors:

>> fuel node --node 1,2,3 --start netconfig --skip netconfig

And user will be able to use start and end at the same time:

>> fuel node --node 1,2,3 --start netconfig --end upload_cirros

Nailgun will build path that includes only necessary tasks to join this two
points.

=============
LIMITATIONS
=============

Only puppet in main deployment for 6.1
---------------------------------------

All agents except puppet are working in blocking way, and our deployment
model can not execute some tasks that are blocking and non blocking.
This is part of technical debt that can be easily resolved with mistral.

In pre/post deployment stages any of the supported task drivers can be used.

No cross dependencies between groups
------------------------------------------------------------------

We can not provide a model right now that will allow to run some tasks
on primary-controller, than run on controller, and then get back to
primary-controller.

In 6.1 cross-dependencies will be solved by post deployment stage.

Cross dependency will be available when we will have orchestrator with
convenient graph based api, like mistral.

No provisioning as separate stage
----------------------------------

Another story


=============
EXAMPLES
=============

Additional task for existing role
---------------------------------

Add task description in

::
   /etc/puppet/2014.2-6.1/modules/my_tasks.yaml

   - id: my_task
     type: puppet
     groups: [compute]
     required_for: [deploy_end]
     requires: [netconfig]
     parameters:
        puppet_manifest: /etc/puppet/modules/my_task.pp
        puppet_modules: /etc/puppet/modules
        timeout: 3600

And run

::

  fuel rel --sync-deployment-tasks --dir /etc/puppet/2014.2-6.1

After syncing task to nailgun database - you will be able to deploy it on
selected groups. In this example it will be deployed after netconfig.


Swapping a task with custom task
----------------------------------------

It is just a matter of changing path to executable file.

::

     - id: netconfig
       type: puppet
       groups: [primary-controller, controller, cinder, compute, ceph-osd, zabbix-server, primary-mongo, mongo]
       required_for: [deploy_end]
       requires: [logging]
       parameters:

           # puppet_manifest: /etc/puppet/modules/osnailyfacter/netconfig.pp

           /etc/puppet/modules/osnailyfacter/custom_netwrok_configuration.pp
           puppet_modules: /etc/puppet/modules
           timeout: 3600


Creating separate role and attach task for it
-----------------------------------------------

# NOTE(dshulyak) role creation is not in master yet, but will be soon

::

  Create a file with redis.yaml with content

  meta:
    description: Simple redis server
    name: Controller
  name: redis
  volumes_roles_mapping:
    - allocate_size: min
      id: os

  Create a role with

  fuel role --rel 1 --create --file redis.yaml

After this is done you can go on Fuel UI and see that we created a role
redis, and now can attach tasks for it.

Install redis puppet module

    puppet module install thomasvandoren-redis

Write simple manifest at /etc/puppet/modules/redis/example/simple_redis.pp

    include redis


Create configuration for fuel in /etc/puppet/modules/redis/example/redis_tasks.yaml

::

  # redis group
    - id: redis
      type: group
      role: [redis]
      required_for: [deploy_end]
      tasks: [globals, hiera, netconfig, install_redis]
      parameters:
        strategy:
            type: parallel

  # Install simple redis server
    - id: install_redis
      type: puppet
      requires: [netconfig]
      required_for: [deploy_end]
      parameters:
        puppet_manifest: /etc/puppet/modules/redis/example/simple_redis.pp
        puppet_modules: /etc/puppet/modules
        timeout: 180


fuel rel --sync-deployment-tasks --dir /etc/puppet/2014.2-6.1/

Create enviroment
  - properly configure public network (because redis packages fetched from upstream)
  - enable public network on all interfaces

Provision redis node:

   fuel node --node 1 --env 1 --provision

Finish installation on install_redis (no need to execute all different tasks from post_deployment)

  fuel node --node 1 --end install_redis


Moving existing services to separate node
--------------------------------------------

The main problem with moving services around is that there is a lot of
cross-dependencies between those services.

Lets take a look at separation of rabbitmq process
(also we will need disable creation of rabbitmq resources in pacemaker)

::

  Create a file with rabbitmq.yaml with content

  meta:
    description: Rabbitmq cluster
    name: Rabbitmq
  name: rabbitmq
  volumes_roles_mapping:
    - allocate_size: min
      id: os

  fuel role --rel 1 --create --file rabbitmq.yaml

::

  # provide information when this role should be deployed
    - id: rabbitmq
      type: group
      role: [rabbitmq]
      required_for: [primary-controller]
      parameters:
        strategy:
          type: parallel

  # task that will install rabbitmq server
    - id: rabbitmq_installation
      type: puppet
      requires: [netconfig]
      required_for: [controller_services]
      groups: [rabbitmq]
      # groups: [controller, primary-controller]
      parameters:
        puppet_manifest: /etc/puppet/modules/rabbitmq.pp
        pupput_modules: /etc/puppet/modules
        timeout: 1200

  # change endpoints of rabbitmq hosts on other nodes
    - id: change_rabbitmq_endpoints
      type: puppet
      requires: [globals, hiera]
      # all tasks that depends on galera endpoints
      required_for: [compute_services, cinder_services, contoroller_services, haproxy]
      groups: [compute, cinder, controller]
      parameters:
        puppet_manifest: /etc/puppet/modules/change_galera_endpoints.pp
        puppet_modules: /etc/puppet/modules
        timeout: 180

Perform sync and assign rabbitmq role as standalone or as part of controller.


Extending deployment with ansible
----------------------------------

TODO
