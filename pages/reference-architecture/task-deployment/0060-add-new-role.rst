.. _0060-add-new-role:

Creating a separate role and attaching a task to it
---------------------------------------------------

# NOTE(dshulyak) role creation is not in master yet, but will be soon

To create a separate role and attach a task to it,
follow these steps:

#. Create a file with ``redis.yaml`` with the following
   content:

   .. code-block:: yaml

     meta:
       description: Simple redis server
       name: Controller
     name: redis
     volumes_roles_mapping:
       - allocate_size: min
         id: os

#. Create a role:

   ::


         fuel role --rel 1 --create --file redis.yaml

#. After this is done, you can go to the Fuel web UI and check if a role
   *redis* is created.

#. You can now attach tasks to the role. First, install redis puppet module:

   ::

        puppet module install thomasvandoren-redis

#. Write a simple manifest to ``/etc/puppet/modules/redis/example/simple_redis.pp``
    and include *redis*.

#. Create a configuration for Fuel in ``/etc/puppet/modules/redis/example/redis_tasks.yaml``:

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

#. Run the following command:

   ::

      fuel rel --sync-deployment-tasks --dir /etc/puppet/2014.2-6.1/

#. :ref:`Create an enviroment <create-env-ug>`. Note the following:

   * :ref:`configure public network <network-settings-ug>`
     properly since *redis* packages are fetched from the upstream.

   * enable public network on all interfaces.

#. Provision the *redis* node:

   ::

       fuel node --node <1> --env <1> --provision

#. Finish the installation on ``install_redis``
    (there is no need to execute all tasks from ``post_deployment`` stage):

    ::

        fuel node --node <1> --end install_redis
