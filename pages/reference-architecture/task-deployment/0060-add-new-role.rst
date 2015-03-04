.. _0060-add-new-role:

Creating a separate role and attach a task to it
------------------------------------------------

#. Use the following:

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

#. After this is done you can go to the Fuel UI and check if a role
*redis* is created. You can now attach tasks to the role:

 #. Install redis puppet module:

      puppet module install thomasvandoren-redis

 #. Write a simple manifest to /etc/puppet/modules/redis/example/simple_redis.pp

      include redis

 #. Create a configuration for Fuel in /etc/puppet/modules/redis/example/redis_tasks.yaml

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

 #. Create an enviroment:

   * properly configure public network (because redis packages are fetched from upstream)
   * enable Assign public network to all nodes option on Fuel Settings page

 #. Provision the redis node:

    fuel node --node 1 --env 1 --provision

 #. Finish the installation on install_redis (there is no need to execute all tasks from *post_deployment*):

    fuel node --node 1 --end install_redis
