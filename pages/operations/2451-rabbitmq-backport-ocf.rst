.. index:: HowTo: Backport RabbitMQ Pacemaker OCF script

.. _backport-rabbitmq-ocf-op:

HowTo: Backport RabbitMQ Pacemaker OCF script
=============================================

Fuel 6.1 contains many fixes to the RabbitMQ OCF script
which makes the :ref:`RabbitMQ<rabbitmq-term>`
cluster more reliable and predictable.
This can be backported to the Fuel 5.1 and 6.0 releases
following the instructions below.
The older Fuel versions do not use Pacemaker for
RabbitMQ cluster management, hence the given changes to the OCF
script are not applicable for them.

.. note:: The OCF script in the Fuel 6.1 release also
   distributes and ensures the consistent Erlang
   cookie file among the all controller nodes.
   For backports to the older Fuel versions, this feature
   is disabled by default in the OCF script.
   If you think you want to enable it, please read
   carefully the details below.

#. Schedule maintenance window.

   .. warning:: Before performing any operations with RabbitMQ,
      you should schedule maintenance window,
      perform backups of all RabbitMQ mnesia files and OCF scripts,
      and stop all OpenStack services an all environment nodes,
      see :ref:`manage-openstack-services-op` for details.

   Mnesia files are located at ``/var/lib/rabbitmq/mnesia/`` and
   OCF files can be found at ``/usr/lib/ocf/resource.d/mirantis/``.

#. Inside the maintenance window, put the p_rabbitmq-server primitive
   in unmanaged state at one of the controller nodes:
   ::

       pcs resource unmanage master_p_rabbitmq-server

   or with the crm tool:
   ::

       crm resource unmanage master_p_rabbitmq-server

   .. note:: Normally, the crm tool can be installed from the
     crmsh package, by commands:
     ::

         yum install crmsh || apt-get install crmsh

#. Check the status. It should show p_rabbitmq-server primitives
   as "Unmanaged":
   ::

       pcs resource show

   or with the crm tool:
   ::

       crm_mon -1

   Unmanaged p_rabbitmq-server resources should look like:
      ::

          Master/Slave Set: master_p_rabbitmq-server [p_rabbitmq-server] (unmanaged) \
              p_rabbitmq-server  (ocf::fuel:rabbitmq-server):    Master node-1 (unmanaged) \
              p_rabbitmq-server  (ocf::fuel:rabbitmq-server):    Slave node-2 (unmanaged) \
              p_rabbitmq-server  (ocf::fuel:rabbitmq-server):    Slave node-3 (unmanaged) \

#. Download the latest OCF script from the fuel-library repository
   to the Fuel Master node:
   ::

       wget --no-check-certificate -O /etc/puppet/modules/nova/files/ocf/rabbitmq \
         https://raw.githubusercontent.com/stack \
         forge/fuel-library/stable/6.0/deployment/puppet/nova/files/ocf/rabbitmq
         chmod +x /etc/puppet/modules/nova/files/ocf/rabbitmq

   .. note:: For the Fuel 5.1 release update the link to use
             a "5.1" version in the download path.

#. Copy the script to all controllers:
   ::

       for i in $(fuel nodes --env <env_ID> | awk '/ready.*controller.*True/{print $1}'); \
       do scp /etc/puppet/modules/nova/files/ocf/rabbitmq \ 
       node-$i:/etc/puppet/modules/nova/files/ocf/rabbitmq; done
       for i in $(fuel nodes --env <env_ID> | awk '/ready.*controller.*True/{print $1}'); \
       do scp /etc/puppet/modules/nova/files/ocf/rabbitmq \
       node-$i:/usr/lib/ocf/resource.d/mirantis/rabbitmq-server; done

   .. note:: This step assumes the environment id is a "1" and the
             controller nodes names have a standard Fuel notation,
             like "node-1", "node-42", and so on.

#. Update the configuration of the p_rabbitmq-server resource for
   the new RabbitMQ OCF script at any controller node:

   ::

       crm configure edit p_rabbitmq-server

   An example primitive may look like:
   ::

       primitive p_rabbitmq-server ocf:mirantis:rabbitmq-server \
               params node_port="5673" \
               meta failure-timeout="60s" migration-threshold="INFINITY" \
               op demote interval="0" timeout="60" \
               op notify interval="0" timeout="60" \
               op promote interval="0" timeout="120" \
               op start interval="0" timeout="120" \
               op monitor interval="30" timeout="60" \
               op stop interval="0" timeout="60" \
               op monitor interval="27" role="Master" timeout="60"

   or in an XML notation:
   ::

       xml <primitive class="ocf" id="p_rabbitmq-server" provider="mirantis" \
          type="rabbitmq-server">
         <operations>
           <op id="p_rabbitmq-server-monitor-30" interval="30" name="monitor" timeout="60"/> \
           <op id="p_rabbitmq-server-monitor-27" interval="27" name="monitor" \ 
               role="Master" timeout="60"/>
           <op id="p_rabbitmq-server-start-0" interval="0" \
               name="start" timeout="60"/>
           <op id="p_rabbitmq-server-stop-0" interval="0" \
               name="stop" timeout="60"/>
           <op id="p_rabbitmq-server-promote-0" interval="0" \
               name="promote" timeout="120"/>
           <op id="p_rabbitmq-server-demote-0" interval="0" \
               name="demote" timeout="60"/>
           <op id="p_rabbitmq-server-notify-0" interval="0" \
               name="notify" timeout="60"/>
         </operations> \
         <instance_attributes id="p_rabbitmq-server-instance_attributes"> \
           <nvpair id="p_rabbitmq-server-instance_attributes-node_port" \
            name="node_port" value="5673"/>
         </instance_attributes> \
         <meta_attributes id="p_rabbitmq-server-meta_attributes"> \
           <nvpair id="p_rabbitmq-server-meta_attributes-migration-threshold" \
            name="migration-threshold" value="INFINITY"/>
           <nvpair id="p_rabbitmq-server-meta_attributes-failure-timeout" \
            name="failure-timeout" value="60s"/> \
         </meta_attributes> \
       </primitive>
       #vim:set syntax=pcmk

   Make sure the following changes are applied:

   - To the `params` stanza:

     - Add the parameter ``command_timeout`` with the value ``--signal=KILL``

     .. note:: The ``command_timeout`` parameter value is given for Ubuntu OS.
        For Centos, this parameter should be set to a ``-s KILL``

     .. note:: Use ``some_param="some_value"`` notation, or for the XML case:
        ::

            <nvpair id="p_rabbitmq-server-instance_attributes-some_param" \
             name="some_param" value="some_value"/>

     - Add the ``erlang_cookie`` parameter with the value ``false``

     .. note:: If you want to allow the OCF script to manage the
        Erlang cookie files, provide the existing Erlang cookie
        from /var/lib/rabbitmq/.erlang.cookie as an ``erlang_cookie``
        parameter, otherwise set this parameter to a ``false``.
        Note, that a different Erlang cookie would require to
        erase mnesia files for all controller nodes as well.

     .. warning:: Erasing the mnesia files will also
        erase all custom users, vhosts, queues, and other
        RabbitMQ  entities, if any.

   - To the `meta` stanza:

    - Set the ``failure-timeout`` to a ``"360s"``

   - To the `op` stanzas:

    - Set the ``notify interval`` to a ``"0"`` and the ``timeout`` to a ``"180"``
    - Set the ``start interval`` to a ``"0"`` and the ``timeout`` to a ``"360"``

   Or the same with the pcs tool:
   ::

      pcs resource meta p_rabbitmq-server failure-timeout=360s
      pcs resource op remove p_rabbitmq-server notify interval=0 timeout=60
      pcs resource op add p_rabbitmq-server notify interval=0 timeout=180
      pcs resource op remove p_rabbitmq-server start interval=0 timeout=60
      pcs resource op add p_rabbitmq-server start interval=0 timeout=360

   .. note:: Ignore messages like "Error: Unable to find operation matching:"

   .. note:: You cannot add resource attributes with pcs tool, you should install
      crmsh package and use crm tool in order to update ``command_timeout`` and
      ``erlang_cookie`` parameters, see details above.

   As a result, the given example resource should look like:
   ::

      # pcs resource show p_rabbitmq-server
       Resource: p_rabbitmq-server (class=ocf provider=mirantis type=rabbitmq-server)
        Attributes: command_timeout="-s KILL" erlang_cookie=EOKOWXQREETZSHFNTPEY \ 
                    node_port=5673
        Meta Attrs: migration-threshold=INFINITY failure-timeout=360s
        Operations: start interval=0 timeout=360 (p_rabbitmq-server-start-0)
                    monitor interval=30 timeout=60 (p_rabbitmq-server-monitor-30)
                    notify interval=0 timeout=180 (p_rabbitmq-server-notify-0)
                    monitor interval=27 role=Master timeout=60 (p_rabbitmq-server-monitor-27)
                    demote interval=0 timeout=60 (p_rabbitmq-server-demote-0)
                    promote interval=0 timeout=120 (p_rabbitmq-server-promote-0)
                    stop interval=0 timeout=60 (p_rabbitmq-server-stop-0)

   or with the crm tool:
   ::

      # crm configure show p_rabbitmq-server
      primitive p_rabbitmq-server ocf:mirantis:rabbitmq-server \
              op start timeout=360 interval=0 \
              op monitor timeout=60 interval=30 \
              op notify timeout=180 interval=0 \
              op monitor timeout=60 role=Master interval=27 \
              op demote timeout=60 interval=0 \
              op promote timeout=120 interval=0 \
              op stop timeout=60 interval=0 \
              params command_timeout="-s KILL" erlang_cookie=EOKOWXQREETZSHFNTPEY \
              node_port=5673
              meta migration-threshold=INFINITY failure-timeout=360s

  .. raw:: pdf

     PageBreak

   The output also may have an XML notation and may look like:
   ::

          xml <primitive class="ocf" id="p_rabbitmq-server" provider="mirantis" \
              type="rabbitmq-server"> \
           <operations> \
             <op id="p_rabbitmq-server-monitor-30" interval="30" name="monitor" \
              timeout="60"/>
             <op id="p_rabbitmq-server-monitor-27" interval="27" name="monitor" \
               role="Master" timeout="60"/>
             <op id="p_rabbitmq-server-start-0" interval="0" name="start" \
              timeout="360"/>
             <op id="p_rabbitmq-server-stop-0" interval="0" name="stop" \
              timeout="60"/>
             <op id="p_rabbitmq-server-promote-0" interval="0" name="promote" \
              timeout="120"/>
             <op id="p_rabbitmq-server-demote-0" interval="0" name="demote" \
              timeout="60"/>
             <op id="p_rabbitmq-server-notify-0" interval="0" name="notify" \
              timeout="180"/>
           </operations> \
           <instance_attributes id="p_rabbitmq-server-instance_attributes"> \
             <nvpair id="p_rabbitmq-server-instance_attributes-node_port" \
              name="node_port" value="5673"/>
             <nvpair id="p_rabbitmq-server-instance_attributes-command_timeout" \
              name="command_timeout" value="--signal=KILL"/>
             <nvpair id="p_rabbitmq-server-instance_attributes-erlang_cookie" \
              name="erlang_cookie" value="EOKOWXQREETZSHFNTPEY"/> \
           </instance_attributes> \
           <meta_attributes id="p_rabbitmq-server-meta_attributes"> \
             <nvpair id="p_rabbitmq-server-meta_attributes-migration-threshold" \
              name="migration-threshold" value="INFINITY"/>
             <nvpair id="p_rabbitmq-server-meta_attributes-failure-timeout" \
              name="failure-timeout" value="360s"/> \
           </meta_attributes> \
         </primitive>


#. Put the p_rabbitmq-server to management state and restart it:
   ::

       pcs resource manage master_p_rabbitmq-server
       pcs resource disable master_p_rabbitmq-server
       pcs resource enable master_p_rabbitmq-server
       pcs resource cleanup master_p_rabbitmq-server

   or with the crm tool:
   ::

       crm resource manage master_p_rabbitmq-server
       crm resource restart master_p_rabbitmq-server
       crm resource cleanup master_p_rabbitmq-server

   .. note:: During this operation, the RabbitMQ cluster will be restarted.
      This may take from a 1 up to 20 minutes. If there are any issues, see
      :ref:`crm-ops`.

#. Check whether the RabbitMQ cluster is functioning on each controller node:
   ::

       rabbitmqctl cluster_status
       rabbitmqctl list_users

#. Restart RabbitMQ related services.

   See :ref:`manage-openstack-services-op` for details.
