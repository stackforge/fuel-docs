.. _0060-add-new-role:

Creating separate role and attach task for it
----------------------------------------------

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