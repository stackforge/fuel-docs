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

.. note:: Since a resource restart requires a considerable amount of time,
          some commands listed in the table below do not provide an
          immediate output.

.. list-table::
   :widths: 3 25
   :header-rows: 1

   * - Service name
     - Restart procedure
   * - Ceilometer
     - #. Log in to a controller node CLI.
       #. Restart the Ceilometer services:

          .. code-block:: console

           # service ceilometer-agent-central restart
           # service ceilometer-api restart
           # service ceilometer-agent-notification restart
           # service ceilometer-collector status restart

       #. Verify the status of the Ceilometer services. See
          :ref:`service-status`.
       #. Repeat step 1 - 3 on all controller nodes.
   * - Cinder
     - #. Log in to a controller node CLI.
       #. Restart the Cinder services:

          .. code-block:: console

           # service cinder-api restart
           # service cinder-scheduler restart

       #. Verify the status of the Cinder services. See
          :ref:`service-status`.
       #. Repeat step 1 - 3 on all controller nodes.
       #. On every node with Cinder role, run:

          .. code-block:: console

           # service cinder-volume restart
           # service cinder-backup restart

       #. Verify the status of the ``cinder-volume`` and ``cinder-backup``
          services.
   * - Corosync/Pacemaker
     - #. Log in to a controller node CLI.
       #. Restart the Corosync and Pacemaker services:

          .. code-block:: console

           # service corosync restart
           # service pacemaker restart

       #. Verify the status of the Corosync and Pacemaker services. See
          :ref:`service-status`.
       #. Repeat step 1 - 3 on all controller nodes.
   * - Glance
     - #. Log in to a controller node CLI.
       #. Restart the Glance services:

          .. code-block:: console

           # service glance-api restart
           # service glance-registry restart

       #. Verify the status of the Glance services. See
          :ref:`service-status`.
       #. Repeat step 1 - 3 on all controller nodes.
   * - Horizon
     - Since the Horizon service is available through the Apache server,
       you should restart the Apache service on all controller nodes:

       #. Log in to a controller node CLI.
       #. Restart the Apache server:

          .. code-block:: console

           # service apache2 restart

       #. Verify whether the Apache service is successfully running after
          restart:

          .. code-block:: console

           # service apache2 status

       #. Verify whether the Apache ports are opened and listening:

          .. code-block:: console

           # netstat -nltp | egrep apache2

       #. Repeat step 1 - 3 on all controller nodes.
   * - Ironic
     - #. Log in to a controller node CLI.
       #. Restart the Ironic services:

          .. code-block:: console

           # service ironic-api restart
           # service ironic-conductor restart

       #. Verify the status of the Ironic services. See
          :ref:`service-status`.
       #. Repeat step 1 - 3 on all controller nodes.
       #. On any controller node, run the following command for the
          ``nova-compute`` service configured to work with Ironic:

          .. code-block:: console

           # crm resource restart p_nova_compute_ironic

       #. Verify the status of the ``p_nova_compute_ironic`` service.

   * - Keystone
     - Since the Keystone service is available through the Apache server,
       complete the following steps on all controller nodes:

       #. Log in to a controller node CLI.
       #. Restart the Apache server:

          .. code-block:: console

           # service apache2 restart

       #. Verify whether the Apache service is successfully running after
          restart:

          .. code-block:: console

           # service apache2 status

       #. Verify whether the Apache ports are opened and listening:

          .. code-block:: console

           # netstat -nltp | egrep apache2

       #. Repeat step 1 - 3 on all controller nodes.

   * - MySQL
     - #. Log in to any controller node CLI.
       #. Run the following command:

          .. code-block:: console

           # pcs status | grep -A1 mysql

          In the output, the resource ``clone_p_mysql`` should be in the
          ``Started`` status.
       #. Disable the ``clone_p_mysql`` resource:

          .. code-block:: console

           # pcs resource disable clone_p_mysqld

       #. Verify that the resource ``clone_p_mysqld`` is in the ``Stopped``
          status:

          .. code-block:: console

           # pcs status | grep -A2 mysql

          It may take some time for this resource to be stopped on all
          controller nodes.
       #. Enable the ``clone_p_mysql`` resource:

          .. code-block:: console

           # pcs resource enable clone_p_mysqld

       #. Verify that the resource ``clone_p_mysqld`` is in the ``Started``
          status again on all controller nodes:

          .. code-block:: console

           # pcs status | grep -A2 mysql

       .. warning:: Use the :command:`pcs` commands instead of :command:`crm`
                    for restarting the service.
                    The pcs tool correctly stops the service according to the
                    quorum policy preventing MySQL failures.
   * - Neutron
     - Use the following restart steps for the DHCP Neutron agent as an
       example for all Neutron agents.

       #. Log in to any controller node CLI.
       #. Verify the DHCP agent status:

          .. code-block:: console

           # pcs resource show | grep -A1 neutron-dhcp-agent
 
          The output should contain the list of all controllers in the
          ``Started`` status.
       #. Stop the DHCP agent:

          .. code-block:: console

           # pcs resource disable clone_neutron-dhcp-agent

       #. Verify the Corosync status of the DHCP agent:

          .. code-block:: console

           # pcs resource show | grep -A1 neutron-dhcp-agent

          The output should contain the list of all controllers in the
          ``Stopped`` status.
       #. Verify the ``neutron-dhcp-agent`` status on the OpenStack side:

          .. code-block:: console

           # neutron agent-list

          The output table should contain the DHCP agents for every
          controller node  with ``xxx`` in the ``alive`` column.
       #. Start the DHCP agent on every controller node:

          .. code-block:: console

           # pcs resource enable clone_neutron-dhcp-agent

       #. Verify the DHCP agent status:

          .. code-block:: console

           # pcs resource show | grep -A1 neutron-dhcp-agent
 
          The output should contain the list of all controllers in the
          ``Started`` status.
       #. Verify the ``neutron-dhcp-agent`` status on the OpenStack side:

          .. code-block:: console

           # neutron agent-list

          The output table should contain the DHCP agents for every
          controller node  with ``:-)`` in the ``alive`` column and ``True``
          in the ``admin_state_up`` column.
   * - Nova
     - #. Log in to a controller node CLI.
       #. Restart the Nova services:

          .. code-block:: console

           # service nova-api restart
           # service nova-cert restart
           # service nova-compute restart
           # service nova-conductor restart
           # service nova-consoleauth restart
           # service nova-novncproxy restart
           # service nova-scheduler restart
           # service nova-spicehtml5proxy restart
           # service nova-xenvncproxy restart

       #. Verify the status of the Nova services. See
          :ref:`service-status`.
       #. Repeat step 1 - 3 on all controller nodes.
       #. On every compute node, run:

          .. code-block:: console

           # service nova-compute restart
       #. Verify the status of the ``nova-compute`` service.
   * - RabbitMQ
     - #. Log in to any controller node CLI.
       #. Disable the RabbitMQ service:

          .. code-block:: console

           # pcs resource disable master_p_rabbitmq-server

       #. Verify whether the service is stopped:

          .. code-block:: console

           # pcs status | grep -A2 rabbitmq

       #. Enable the service:

          .. code-block:: console

           # pcs resource enable master_p_rabbitmq-server

          During the startup process, the output of the :command:`pcs status`
          command can show all existing RabbitMQ services in the ``Slaves``
          mode.

       #. Verify the service status:

          .. code-block:: console

           # rabbitmqctl cluster_status

          In the output, the ``running_nodes`` field should contain all
          controllers’ host names in the ``rabbit@<HOSTNAME>`` format. The
          ``partitions`` field should be empty.
   * - Swift
     - #. Log in to a controller node CLI.
       #. Restart the Swift services:

          .. code-block:: console

           # service swift-account-auditor restart
           # service swift-account restart
           # service swift-account-reaper restart
           # service swift-account-replicator restart
           # service swift-container-auditor restart
           # service swift-container restart
           # service swift-container-reconciler restart
           # service swift-container-replicator restart
           # service swift-container-sync restart
           # service swift-container-updater restart
           # service swift-object-auditor restart
           # service swift-object restart
           # service swift-object-reconstructor restart
           # service swift-object-replicator restart
           # service swift-object-updater restart
           # service swift-proxy restart

       #. Verify the status of the Swift services. See
          :ref:`service-status`.
       #. Repeat step 1 - 3 on all controller nodes.
