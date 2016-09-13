.. _workflows-create-task:

Creating a separate role with a task
------------------------------------

You can create a separate role and attach a custom task to that
role. Examples in this section describe installation of a Redis
database server. You can apply similar principles for other
tasks.

**To create a separate role with a task:**

#. Create a ``.yaml`` file with a user-friendly name.

   For example, ``redis.yaml``.

#. Open the file for editing and add meta information:

   **Example:**

   .. code-block:: console

      meta:
        description: Simple Redis server
        name: Controller
      name: redis
      volumes_roles_mapping:
        - allocate_size: min
          id: os

#. Create a role using Fuel CLI:

   .. code-block:: console

      fuel role --rel 1 --create --file <my.yaml>

   **Example:**

   .. code-block:: console

      fuel role --rel 1 --create --file redis.yaml

#. Log in to the Fuel Web UI.
#. In the :guilabel:`Nodes` tab, verify that the required role is created.
#. Attach a task to the newly created role:

   #. Log in to Fuel CLI.
   #. Install the required Puppet modules.

      **Example:**

      .. code-block:: console

         puppet module install thomasvandoren-redis

   #. Write a simple manifest to the required location. For example:
      ``/etc/puppet/modules/redis/example/simple_redis.pp`` and include redis.

   #. Create a deployment task in you ``tasks.yaml``. For example, 
      ``in /etc/puppet/modules/redis/example/redis_tasks.yaml``.

      **Example:**

      .. code-block:: console

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

   #. Synchronize deployment tasks:

      .. code-block:: console

         fuel rel --sync-deployment-tasks --dir <path-to-puppet-manifest>

      **Example:**

      .. code-block:: console

         fuel rel --sync-deployment-tasks --dir /etc/puppet/2014.2.2-6.1/

   #. Configure and create an OpenStack environment with all required
      network, storage, and other settings.
   #. Provision a node with the created role:

      **Example:**

      .. code-block:: console

         fuel node --node <node_ID> --env <env_ID> --provision

   #. Deploy a node with the created role:

      .. code-block:: console

         fuel node --node <node_ID> --env <env_ID> --deploy
