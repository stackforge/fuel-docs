.. _0080-move-service:

Moving existing services to a separate node
-------------------------------------------

Service cross-dependencies lead to problems when moving services.

Here is an example of separating a :ref:`RabbitMQ <rabbitmq-term>` process
and disabling the creation of RabbitMQ resources in :ref:`Pacemaker <pacemaker-term>`.

#. Create a file with ``rabbitmq.yaml`` with the following content:

   .. code-block:: yaml

                                  meta:
                           description: Rabbitmq cluster
                          name: Rabbitmq
                         name: rabbitmq
                       volumes_roles_mapping:
                            - allocate_size: min
                         id: os

#. Run the following command:

   ::

      fuel role --rel <1> --create --file rabbitmq.yaml

#. Provide information on when this role should be deployed:

   .. code-block:: yaml

    - id: rabbitmq
      type: group
      role: [rabbitmq]
      required_for: [primary-controller]
      parameters:
        strategy:
          type: parallel

#. Add the task that will install RabbitMQ server:

   .. code-block:: yaml

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

#. Add a task that will change endpoints of RabbitMQ hosts on other nodes:

   .. code-block:: yaml

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

Having performed all steps above, perform sync and assign RabbitMQ role as standalone
or as part of a Controller.

