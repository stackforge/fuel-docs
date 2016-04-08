.. _cli-config-openstack-services-workflow:

Workflow of the configuration change override
---------------------------------------------

The ``override_resources`` Puppet resource overrides the already existing
resources and creates the resources that have not been defined previously.

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
is passed to ``override_resources`` from Hiera.

The following Hiera files cover the hierarchical configuration
overrides:

- ``/etc/hiera/override/config/%{::fqdn}``
- ``/etc/hiera/override/config/role``
- ``/etc/hiera/override/config/cluster``

Hiera delivers the hierarchical structure of data.

The top-level granular tasks used to override the configuration have
the ``refresh_on`` parameter.

**Example:**

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

Nailgun uses the ``refresh_on`` parameter to run the respective 
task when you change the OpenStack configuration.
