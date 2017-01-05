.. _decompose_services:

============================================
Deploy services on dedicated OpenStack nodes
============================================

You can run different services on dedicated OpenStack nodes depending on
needs of your OpenStack environment. Using the Fuel CLI you can move
controller node services out of the existing controller role into
custom roles and assign these roles to dedicated nodes. This capability
may be helpful while managing highly-loaded OpenStack environments.

The services available for decomposition are:

* Neutron (including L3 agents, LBaaS, and others)
* Keystone
* MySQL DB
* RabbitMQ

**To decompose the controller node services:**

#. Log in to the Fuel Master node console.
#. Download the controller's role configuration:

   .. code-block:: console

      fuel role --release 2 --role controller --file controller.yaml

   You will get the configuration file with the following content:

   .. code-block:: yaml

      meta:
       conflicts:
       - compute
       description: The Controller initiates orchestration activities and provides an external
         API.  Other components like Glance (image storage), Keystone (identity management),
         Horizon (OpenStack dashboard) and Nova-Scheduler are installed on the controller
         as well.
       group: base
       has_primary: true
       limits:
         min: 1
         overrides:
         - condition: settings:neutron_advanced_configuration.neutron_l3_ha.value == true
           message: Neutron L3 HA requires at least 2 Controller nodes to function properly.
           min: 2
         recommended: 3
       name: Controller
       public_for_dvr_required: true
       public_ip_required: true
       tags:
       - controller
       - rabbitmq
       - database
       - keystone
       - neutron
       update_required:
       - compute
       - cinder
       weight: 10
      name: controller
      volumes_roles_mapping:
      - allocate_size: min
       id: os
      - allocate_size: min
       id: logs
      - allocate_size: all
       id: image
      - allocate_size: min
       id: mysql
      - allocate_size: min
       id: horizon

#. In ``controller.yaml``, remove the tag from the ``tags`` section that
   corresponds to the service you need to move to a dedicated node and save
   the changes.

   For example, remove the ``database`` tag and save the changes. Now, your
   controller role configuration file does not include the ``database`` tag
   in the ``tags`` section, and the ``mysql`` record in
   the ``volumes_roles_mapping`` section:

   .. code-block:: yaml
      :emphasize-lines: 20-24, 30-38

      meta:
       conflicts:
       - compute
       description: The Controller initiates orchestration activities and provides an external
         API.  Other components like Glance (image storage), Keystone (identity management),
         Horizon (OpenStack dashboard) and Nova-Scheduler are installed on the controller
         as well.
       group: base
       has_primary: true
       limits:
         min: 1
         overrides:
         - condition: settings:neutron_advanced_configuration.neutron_l3_ha.value == true
           message: Neutron L3 HA requires at least 2 Controller nodes to function properly.
           min: 2
         recommended: 3
       name: Controller
       public_for_dvr_required: true
       public_ip_required: true
       tags:
       - controller
       - rabbitmq
       - keystone
       - neutron
       update_required:
       - compute
       - cinder
       weight: 10
      name: controller
      volumes_roles_mapping:
      - allocate_size: min
       id: os
      - allocate_size: min
       id: logs
      - allocate_size: all
       id: image
      - allocate_size: min
       id: horizon

#. Upload the updated controller role:

   .. code-block:: console

      fuel role --release 2 --role controller --update --file controller.yaml

#. Create a new custom role for the service you need to remove from
   the controller node:

   #. For example, create and edit ``database.yaml`` specifying the removed
      entries from the controller role configuration:

      .. code-block:: yaml

         meta:
          description: Galera is a database backend for OpenStack.
          group: base
          name: Database (MySQL)
          has_primary: true
          limits:
            min: 1
            recommended: 3
          tags:
          - database
          weight: 70
         name: database
         volumes_roles_mapping:
         - allocate_size: min
          id: os
         - allocate_size: min
          id: mysql

   #. In the Fuel CLI, create the new role based on the ``database.yaml``
      configuration file:

      .. code-block:: console

         fuel role --release 2 --create --file database.yaml

#. Assign the newly created role using the Fuel web UI or CLI as described
   in :ref:`change-roles`.

#. To apply the changes, deploy your OpenStack environment.

.. seealso::

   * :ref:`cli-roles`