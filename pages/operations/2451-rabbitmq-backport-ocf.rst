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
   distributes and ensures the consistent erlang
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
      see :ref:`manage-openstack-services-op` for details

   Mnesia files are located at /var/lib/rabbitmq/mnesia/ and
   OCF files can be found at /usr/lib/ocf/resource.d/mirantis/.

#. Inside the maintenance window, put the p_rabbitmq-server primitive
   in unmanaged state at one of the controller nodes:
   ::

       pcs resource unmanage master_p_rabbitmq-server

   or with the crm tool:
   ::

       crm resource unmanage master_p_rabbitmq-server

#. Check the status. It should show p_rabbitmq-server primitives
   as "Unmanaged":
   ::

       pcs resource show

   or with the crm tool:
   ::

       crm_mon -1

   .. note:: Unmanaged p_rabbitmq-server resources should look like:
      ::

          Master/Slave Set: master_p_rabbitmq-server [p_rabbitmq-server] (unmanaged)
              p_rabbitmq-server  (ocf::fuel:rabbitmq-server):    Master node-1 (unmanaged)
              p_rabbitmq-server  (ocf::fuel:rabbitmq-server):    Slave node-2 (unmanaged)
              p_rabbitmq-server  (ocf::fuel:rabbitmq-server):    Slave node-3 (unmanaged)

#. Download the latest OCF script from the fuel-library repository
   to the Fuel Master node:
   ::

       wget --no-check-certificate -O /etc/puppet/modules/nova/files/ocf/rabbitmq https://raw.githubusercontent.com/stackforge/fuel-library/stable/6.0/deployment/puppet/nova/files/ocf/rabbitmq
       chmod +x /etc/puppet/modules/nova/files/ocf/rabbitmq

.. note:: For the Fuel 5.1 release update the link to use
   a "5.1" version in the download path

#. Copy the script to all controllers:
   ::

       for i in $(fuel nodes --env 1 | awk '/ready.*controller.*True/{print $1}'); do scp /etc/puppet/modules/nova/files/ocf/rabbitmq node-$i:/etc/puppet/modules/nova/files/ocf/rabbitmq; done
       for i in $(fuel nodes --env 1 | awk '/ready.*controller.*True/{print $1}'); do scp /etc/puppet/modules/nova/files/ocf/rabbitmq node-$i:/usr/lib/ocf/resource.d/mirantis/rabbitmq-server; done

.. note:: This step assumes the environment id is a "1" and the
   controller nodes names have a standard Fuel notation,
   like "node-1", "node-42" and so on.

#. Update the configuration of the p_rabbitmq-server resource for
   the new RabbitMQ OCF script at the any controller node:

   ::

       crm configure edit p_rabbitmq-server

   The original primitive may look like:
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

   Make sure the following changes are applied:

   - To the `params` stanza:

     - command_timeout=--signal=KILL

     .. note:: The command_timeout parameter value is given for Ubuntu OS.
        For Centos, this parameter should be set as command_timeout=-s KILL

     - erlang_cookie=false

     .. note:: If you want to allow the OCF script to manage the
        erlang cookie files, provide the existing erlang cookie
        from /var/lib/rabbitmq/.erlang.cookie as an erlang_cookie
        parameter, otherwise set this parameter to false.
        Note, that a different erlang cookie would require to
        erase mnesia files for all controller nodes as well.

     .. warning:: Erasing the mnesia files will also
        erase all custom users, vhosts, queues and other
        RabbitMQ  entities, if any.

  - To the `meta` stanza:

    - failure-timeout="360s"

  - To the `op` stanzas:

    - notify interval="0" timeout="180"
    - start interval="0" timeout="360"

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
      This may take from a 1 up to 20 minutes.

#. Check whether the RabbitMQ cluster is functioning on each controller node:
   ::

       rabbitmqctl cluster_status
       rabbitmqctl list_users

#. Restart RabbitMQ related services.

   See :ref:`manage-openstack-services-op` for details.
