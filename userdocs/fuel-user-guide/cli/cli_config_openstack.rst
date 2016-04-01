.. _fuel-cli-config-openstack-services:

Changing the configuration of Nova, Neutron, and Keystone
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++

Using CLI, you can override the hardcoded, or provided by Nailgun,
configuration values, as well as introduce new configuration options
for OpenStack services.

You can change the Nova, Neutron, and Keystone configuration for:

- A single node
- All nodes with a certain role
- An environment

You can change the configuration before or after the environment deployment.

The services the configuration of which you change restart automatically
after applying the changes.

The ``override_resources`` Puppet resource applies changes to the existing
configuration resources and creates the new ones that were not previously
defined.

To change the configuration of OpenStack Services
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Log in to the Fuel Master node.
#. Edit the YAML file with the configuration options of the services that
   you are going to change. Example:

   .. code-block:: yaml

        configuration:
          nova_config:
            DEFAULT/debug:
              value: True
            DEFAULT/amqp_durable_queues:
              value: False
          keystone_config:
            DEFAULT/default_publisher_id:
              ensure: absent
            DEFAULT/crypt_strength:
              value: 6000

#. Upload the YAML file:

   * To upload the changes for the environment:

     .. code-block:: console

         fuel openstack-config --env 1 --upload file.yaml

   * To upload the changes for all nodes with a role:

     .. code-block:: console

         fuel openstack-config --env 1 --role compute --upload file.yaml

   * To upload the changes for certain nodes:

     .. code-block:: console

         fuel openstack-config --env 1 --node 1,2,3 --upload file.yaml

#. Execute the changes:

   * To execute the changes for the environment:

     .. code-block:: console

         fuel openstack-config --env 1 --execute

   * To execute the changes for all nodes with a role:

     .. code-block:: console

         fuel openstack-config --env 1 --role compute --execute

   * To execute the changes for certain nodes:

     .. code-block:: console

         fuel openstack-config --env 1 --node 1,2,3 --execute

The services will restart automatically.

**Additional commands**

* List the configuration changes history:

  .. code-block:: console

      fuel openstack-config --env 1 --list

  This command returns a list of configuration changes, each of them with
  a respective ID record.

* Download a previously uploaded YAML file with the configuration changes:

  .. code-block:: console

      fuel openstack-config --id 1 --download

  The ``id`` parameter is the record number from the changes history that
  you can get with the :command:`fuel openstack-config --env 1 --list` command.

**Workflow of the configuration change override**

The ``override_resources`` Puppet resource overrides the already existing
resources and creates the previously not defined resources.

.. note:: ``override_resources`` must always be used as the first resource
          in manifests.

Example:

.. code-block:: puppet

 keystone_config {
   'DEFAULT/debug': {value => True}
 }
 override_resource {'keystone_config':
   data => {
      'DEFAULT/debug': {'value' => False},
      'DEFAULT/max_param_size': {'value' => 128}
   }
 }

The Nova, Keystone, and Neutron top-level granular tasks use
``override_resources``. The new parameter hash used in the Puppet resources
is passed to ``override_resources`` from hiera.

The three following hiera files cover the hierarchical configuration
overrides:

- ``/etc/hiera/override/config/%{::fqdn}``
- ``/etc/hiera/override/config/role``
- ``/etc/hiera/override/config/cluster``

Hiera delivers the hierarchical structure of data.

The top-level granular tasks used to override the configuration have
the ``refresh_on`` parameter.

Example:

.. code-block:: yaml

 - id: keystone
   type: puppet
   groups: [primary-controller, controller]
   required_for: [openstack-controller]
   requires: [openstack-haproxy, database, rabbitmq]
   refresh_on: [keystone_config]
   parameters:
     puppet_manifest:
        /etc/puppet/modules/osnailyfacter/modular/keystone/keystone.pp
     puppet_modules: /etc/puppet/modules
     timeout: 3600
   test_pre:
     cmd: ruby
        /etc/puppet/modules/osnailyfacter/modular/keystone/keystone_pre.rb
   test_post:
     cmd: ruby
        /etc/puppet/modules/osnailyfacter/modular/keystone/keystone_post.rb

Nailgun uses the ``refresh_on`` parameter to run the respective task when user changes the
OpenStack configuration.
