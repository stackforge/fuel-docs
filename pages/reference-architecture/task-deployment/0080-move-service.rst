.. _0080-move-service:

Moving existing services to separate node
------------------------------------------

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