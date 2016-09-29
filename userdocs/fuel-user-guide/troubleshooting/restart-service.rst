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
     - On every controller node, run:

       .. code-block:: console

        # service ceilometer-agent-central restart
        # service ceilometer-api restart
        # service ceilometer-agent-notification restart
        # service ceilometer-collector status restart
   * - Cinder
     - #. On every controller node, run:

          .. code-block:: console

           # service cinder-api restart
           # service cinder-scheduler restart

       #. On every node with Cinder role, run

          .. code-block:: console

           # service cinder-volume restart
           # service cinder-backup restart
   * - Corosync/Pacemaker
     - On every controller node, run:

       .. code-block:: console

        # service corosync restart
        # service pacemaker restart
   * - Glance
     - On every controller node, run:

       .. code-block:: console

        # service glance-api restart
        # service glance-registry restart
   * - Horizon
     - Since Horizon runs under the Apache server, complete the following
       steps on all controller nodes:

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
   * - Ironic
     - * On every controller node, run:

         .. code-block:: console

          # service ironic-api restart
          # service ironic-conductor restart

       * On any controller node, run the following command for the
         ``nova-compute`` service configured to work with Ironic:

         .. code-block:: console

          # crm resource restart p_nova_compute_ironic
   * - Keystone
     - Since Keystone runs under the Apache server, complete the following
       steps on all controller nodes:

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
     - #. On every controller node, run:

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

       #. On every compute node, run:

          .. code-block:: console

           # service nova-compute restart
   * - RabbitMQ
     - On any controller node:

       #. Disable the service using
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
     - On every controller node, run:

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

.. seealso:: :ref:`service-status`
