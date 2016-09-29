.. _restart-service:

============================
Restart an OpenStack service
============================

Troubleshooting of an OpenStack service usually requires a service restart.
To restart an OpenStack service, complete the steps described in the
following table on *all controller nodes* unless indicated otherwise.

.. caution:: Before restarting a service on the next controller node,
             verify that the service is up and running on the node where you
             have restarted it using the :command:`service <SERVICE_NAME> status`.

.. list-table::
   :widths: 3 25
   :header-rows: 1

   * - Service name
     - Restart command/steps
   * - Ceilometer
     - * :command:`service ceilometer-<SERVICE_NAME> restart`
   * - Cinder
     - #. On every controller node, run :command:`service cinder-api restart`
          and :command:`service cinder-scheduler restart`.
       #. On every node with Cinder role, run
          :command:`service cinder-volume restart` and
          :command:`service cinder-backup restart`.
   * - Corosync/Pacemaker
     - * :command:`service corosync restart`
       * :command:`service pacemaker restart`
   * - Glance
     - * :command:`service glance-<SERVICE_NAME> restart`
   * - Horizon
     - #. Restart the Apache service using :command:`service apache2 restart`.
       #. Verify whether the Apache service is successfully running after
          restart using :command:`service apache2 status`.
       #. Verify whether the Apache ports are opened and listening using
          :command:`netstat -nltp | egrep apache2`.
   * - Ironic
     - * :command:`service ironic-<SERVICE_NAME> restart`
       * For ``nova-compute`` service configured to work with Ironic, run
         :command:`crm resource restart p_nova_compute_ironic` on any
         controller node.
   * - Keystone
     - * :command:`service apache2 restart`
   * - MySQL
     - On any controller node:

       #. Run :command:`pcs status | grep -A1 mysql`. In the output, the
          resource ``clone_p_mysql`` should be in the ``Started`` status.
       #. Run :command:`pcs resource disable clone_p_mysqld`.
       #. Run :command:`pcs status | grep -A2 mysql` to verify that the
          resource ``clone_p_mysqld`` is in the ``Stopped`` status. It may
          take some time for this resource to be stopped on all controller
          nodes.
       #. Run :command:`pcs resource enable clone_p_mysqld`.
       #. Run :command:`pcs status | grep -A2 mysql` to verify that the
          resource ``clone_p_mysqld`` is in the ``Started`` status again on
          all controller nodes.

       .. warning:: Use the :command:`pcs` commands instead of :command:`crm`
                    for restarting the service.
                    The pcs tool correctly stops the service according to the
                    quorum policy preventing MySQL failures.
   * - Neutron
     - On any controller node:

       #. Verify the Neutron agents' status.
       #. Stop the Neutron DHCP agent using
          :command:`pcs resource disable clone_neutron-dhcp-agent`.
       #. Verify the Corosync status of the DHCP agent using
          :command:`pcs resource show | grep -A1 neutron-dhcp-agent`.
          The output should contain the list of all controllers in the
          ``Stopped`` status.
       #. Verify the ``neutron-dhcp-agent`` status on the OpenStack side
          using :command:`neutron agent-list`.

          The output table should contain the DHCP agents for every
          controller node  with ``xxx`` in the ``alive`` column.
       #. Start the DHCP agent on every controller node using
          :command:`pcs resource enable clone_neutron-dhcp-agent`.
       #. Verify the DHCP agent status using
          :command:`pcs resource show | grep -A1 neutron-dhcp-agent`.
          The output should contain the list of all controllers in the
          ``Started`` status.
       #. Verify the ``neutron-dhcp-agent`` status on the OpenStack side
          using :command:`neutron agent-list`.

          The output table should contain the DHCP agents for every
          controller node  with ``:-)`` in the ``alive`` column and ``True``
          in the ``admin_state_up`` column.
   * - Nova
     - * On the nodes with related Nova services, run
         :command:`service nova-<SERVICE_NAME> restart`.
   * - RabbitMQ
     - #. Disable the service using
          :command:`pcs resource disable master_p_rabbitmq-server`.
       #. Verify whether the service is stopped using
          :command:`pcs status | grep -A2 rabbitmq`.
       #. Enable the service using
          :command:`pcs resource enable master_p_rabbitmq-server`.

          During the startup process, the output of the :command:`pcs status`
          command can show all existing RabbitMQ services in the ``Slaves``
          mode.
       #. Verify the service status using
          :command:`rabbitmqctl cluster_status`. In the output, the
          ``running_nodes`` field should contain all controllers’ host names
          in the ``rabbit@<HOSTNAME>`` format. The ``partitions`` field
          should be empty.
   * - Swift
     - * :command:`service swift-<SERVICE_NAME> restart`

.. seealso:: :ref:`service-status`
