.. _cli-config-openstack-services:

==================================================
Modify the configuration of the OpenStack services
==================================================

.. include:: /userdocs/snippets/notes/deprecated-cli-v1.rst

You can customize the hardcoded, or provided by Nailgun,
configuration values, as well as introduce new configuration options
for the OpenStack services, such as Nova, Neutron, and Keystone using CLI.

You can change the Nova, Neutron, and Keystone configuration for a single
node, all nodes with a specific role, or a whole OpenStack environment.

Changes to the OpenStack services configuration can be applied before
or after you deploy an OpenStack environment.

After you apply changes, the services will be automatically restarted.

The ``override_resources`` Puppet resource applies changes to the existing
configuration resources and creates the new ones that were not previously
defined.

**To modify the configuration of the OpenStack services:**

#. Log in to the Fuel Master node.
#. Edit the ``.yaml`` file with the configuration options of the services that
   you want to change.

   **Example:**

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

#. Upload the ``.yaml`` file:

   * To upload the changes for an OpenStack environment:

     .. code-block:: console

         fuel openstack-config --env <env_id> --upload file.yaml

   * To upload the changes for all nodes with a specific role:

     .. code-block:: console

        fuel openstack-config --env <env_id> --role compute \
        --upload <file.yaml>

   * To upload the changes for selected nodes:

     .. code-block:: console

         fuel openstack-config --env <env_id> --node 1,2,3 \
         --upload <file.yaml>

#. Apply the changes:

   * To apply the changes for the environment:

     .. code-block:: console

         fuel openstack-config --env <env_id> --execute

   * To apply the changes for all nodes with a role:

     .. code-block:: console

         fuel openstack-config --env <env_id> --role compute --execute

   * To apply the changes for certain nodes:

     .. code-block:: console

         fuel openstack-config --env <env_id> --node 1,2,3 --execute

   The services will restart automatically.
#. Optionally, run these additional commands:

   #. List the configuration changes history:

      .. code-block:: console

         fuel openstack-config --env <env_id> --list

   #. Download the previously uploaded ``.yaml`` file with the configuration
      changes:

      #. Obtain the record number from the changes history:

         .. code-block:: console

            fuel openstack-config --env <env_id> --list

      #. Download the ``.yaml`` file: 

         .. code-block:: console

            fuel openstack-config --id <id> --download

.. seealso::

   - :ref:`cli-config-openstack-services-workflow`
