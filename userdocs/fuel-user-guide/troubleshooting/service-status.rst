.. _service-status:

==================================
Verify an OpenStack service status
==================================

To ensure that an OpenStack service is up and running, verify the service
status on *every controller node*. Some OpenStack services require additional
verification on the non-controller nodes. The following table describes the
verification steps for the common OpenStack services.

.. note:: In the table below, the output of the
          :command:`service <SERVICE_NAME> status` command should contain the
          service status and the process ID unless indicated otherwise.
          For example, ``neutron-server start/running, process 283``.

.. list-table:: **Verifying an OpenStack service status**
   :widths: 3 25
   :header-rows: 1

   * - Service name
     - Verification procedure/command
   * - Ceilometer
     - #. On every MongoDB node, run:

          .. code-block:: console

           # service mongodb status
           # netstat -nltp | grep mongo

          The output of the :command:`netstat` command returns the
          management and local IP addresses and ports in the
          ``LISTEN`` status.

       #. On every controller node, run:

          .. code-block:: console

           # service ceilometer-agent-central status
           # service ceilometer-api status
           # service ceilometer-agent-notification status
           # service ceilometer-collector status

       #. On every compute node, run:

          .. code-block:: console

           # service ceilometer-polling status

       #. On any controller node, run :command:`pcs status | grep ceilometer`
          or :command:`crm status | grep ceilometer` to verify which node is
          currently handling requests and their status. The output should
          contain the node ID and the ``Started`` status.
   * - Cinder
     - #. On every controller node, run:

          .. code-block:: console

           # service cinder-api status
           # service cinder-scheduler status

       #. On every node with the Cinder role, run:

          .. code-block:: console

           # service cinder-volume status
           # service cinder-backup status

   * - Corosync/Pacemaker
     - On every controller node:

       #. Run :command:`service corosync status` and
          :command:`service pacemaker status`.
       #. Verify the output of the :command:`pcs status` or
          :command:`crm status` command. The ``Online`` field should contain
          all the controllers' host names.
       #. Verify the output of the :command:`pcs resource show` or
          :command:`crm resource show` command. All resources should be
          ``Started``.
   * - Glance
     - On every controller node, run:

       .. code-block:: console

        # service glance-api status
        # service glance-registry status

   * - Heat
     - #. On any controller node, verify the status of Heat engines:

          .. code-block:: console

           # source openrc
           # heat service-list

          The output should contain the table with a list of the Heat engines
          for all controller nodes in the ``up`` status.
       #. On every controller node, run:

          .. code-block:: console

           # service heat-api status
           # service heat-api-cfn status
           # service heat-api-cloudwatch status
           # service heat-engine status

   * - Horizon
     - Since Horizon runs under the Apache server, complete the following
       steps on all controller nodes:

       #. Verify whether the Apache service is running using the
          :command:`service apache2 status` command.
       #. Verify whether the Horizon ports are opened and listening using the
          :command:`netstat -nltp | egrep ':80|:443'` command. The output
          should contain the management and local IP addresses with either
          port 80 or 443 in the ``LISTEN`` status.
   * - Ironic
     - #. On every controller node, run :command:`service ironic-api status`.
       #. On every Ironic node, run :command:`service ironic-conductor status`.
       #. On any controller node, run :command:`pcs status | grep ironic`.
          The output should contain the name or ID of the node where the
          ``p_nova_compute_ironic`` resource is running.
   * - Keystone
     - Since Keystone runs under the Apache server, complete the following
       steps on all controller nodes (and the nodes with the Keystone role if
       any):

       #. Verify whether the Apache service is running using
          :command:`service apache2 status`.
       #. Verify whether the Keystone ports are opened and listening using
          :command:`netstat -nltp | egrep '5000|35357'`. The output should
          contain the management and local IP addresses with the ports 5000
          and 35357 in the ``LISTEN`` status.
   * - MySQL/Galera
     - On any controller node:

       #. Verify the output of the :command:`pcs status|grep -A1 clone_p_mysql`
          or :command:`crm status|grep -A1 clone_p_mysql` command. The resource
          ``clone_p_mysqld`` should be in the ``Started`` status for all
          controllers.
       #. Verify the output of the
          :command:`mysql -e "show status" | egrep 'wsrep_(local_state|incoming_address)'`
          command. The ``wsrep_local_state_comment`` variable should be
          ``Synced``, the ``wsrep_incoming_address`` field should contain all
          IP addresses of the controller nodes (in the management network).
   * - Neutron
     - #. On every compute node, run:

          .. code-block:: console

           # service neutron-openvswitch-agent status

       #. On every controller node:

          #. Verify the ``neutron-server`` service status:

             .. code-block:: console

              # service neutron-server status

          #. Verify the statuses of the Neutron agents:

             .. code-block:: console

              # service neutron-metadata-agent status
              # service neutron-dhcp-agent status
              # service neutron-l3-agent status
              # service neutron-openvswitch-agent status

       #. On any controller node:

          #. Verify the states of the Neutron agents:

             .. code-block:: console

              # source openrc
              # neutron agent-list

             The output table should list all the Neutron agents with the
             ``:-)`` value in the ``alive`` column and the ``True`` value in
             the ``admin_state_up`` column.

          #. Verify the Corosync/Pacemaker status:

             .. code-block:: console

              # pcs status | grep -A2 neutron or

             The output should contain the Neutron resources in the ``Started``
             status for all controller nodes.
   * - Nova
     - * Using the Fuel CLI:

         #. On every controller node, run:

            .. code-block:: console

             # service nova-api status
             # service nova-cert status
             # service nova-compute status
             # service nova-conductor status
             # service nova-consoleauth status
             # service nova-novncproxy status             
             # service nova-scheduler status
             # service nova-spicehtml5proxy status
             # service nova-xenvncproxy status

         #. On every compute node, run :command:`service nova-compute status`.

       * Using the Nova CLI:

         .. code-block:: console

          # source openrc
          # nova service-list

         The output should contain the table with the Nova services list. The
         services status should be ``enabled``, their state should be ``up``.
   * - RabbitMQ
     - * On any controller node, run :command:`rabbitmqctl cluster_status`.

         In the output, the ``running_nodes`` field should contain all the
         controllers’ host names in the ``rabbit@<HOSTNAME>`` format. The
         ``partitions`` field should be empty.
   * - Swift
     - * On every controller node, run:

         .. code-block:: console

          # service swift-account-auditor status
          # service swift-account status
          # service swift-account-reaper status
          # service swift-account-replicator status
          # service swift-container-auditor status
          # service swift-container status
          # service swift-container-reconciler status
          # service swift-container-replicator status
          # service swift-container-sync status
          # service swift-container-updater status
          # service swift-object-auditor status
          # service swift-object status
          # service swift-object-reconstructor status
          # service swift-object-replicator status
          # service swift-object-updater status
          # service swift-proxy status

.. seealso:: :ref:`restart-service`
