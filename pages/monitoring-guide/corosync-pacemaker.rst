.. _mg-corosync-pacemaker:

Corosync/Pacemaker
------------------

The Mirantis OpenStack HA cluster for the controller nodes is
implemented using :ref:`Pacemaker <pacemaker-term>`
and :ref:`Corosync <corosync-term>`. Corosync provides messaging
and membership services while Pacemaker performs resources
management. Resources management includes detecting and recovering
the nodes and resources under its control from a failure. Please
check the documentation for further details about :ref:`how HA with
Pacemaker and Corosync work <pacemaker-corosync-arch>` in Mirantis
OpenStack.

For Corosync you should perform regular checks to verify that the
ring is in the ``active with no faults`` state as shown below::

   # corosync-cfgtool -s
   Printing ring status.
   Local node ID 33597632
   RING ID 0
   id= 192.168.0.2
   status= ring 0 active with no faults

Pacemaker is responsible for handling the failover of OpenStack
services in the HA cluster in case of a hardware or software failure.
To achieve this goal, Pacemaker monitors the state of the resources
under its control (every 30 seconds by default) to return a health
status for each of those resources. With Pacemaker, you should
perform regular checks to verify that its resources are in the
``started`` state on the Fuel Master node node when HA is handled in
active/passive mode, and that at least one resource is in the
``started`` state on each of the cluster nodes when HA is
handled in active/active mode. You can make that verification with
the :command:`crm status` command as shown below::

 # crm status

Example of the output for the above command::

 ============
 Last updated: Tue Jun 23 08:47:23 2015
 Last change: Mon Jun 22 17:24:32 2015
 Stack: corosync
 Current DC: node-1.domain.tld (1) - partition with quorum
 Version: 1.1.12-561c4cf
 3 Nodes configured
 43 Resources configured
 ============

 Online: [ node-1.domain.tld node-2.domain.tld node-3.domain.tld ]

 Clone Set: clone_p_vrouter [p_vrouter]
     Started: [ node-1.domain.tld node-2.domain.tld node-3.domain.tld ]
 vip__management (ocf::fuel:ns_IPaddr2): Started node-1.domain.tld
 vip__public_vrouter (ocf::fuel:ns_IPaddr2): Started node-1.domain.tld
 vip__management_vrouter (ocf::fuel:ns_IPaddr2): Started node-1.domain.tld
 vip__public (ocf::fuel:ns_IPaddr2): Started node-2.domain.tld
 Master/Slave Set: master_p_conntrackd [p_conntrackd]
     Masters: [ node-1.domain.tld ]
     Slaves: [ node-2.domain.tld node-3.domain.tld ]
 Clone Set: clone_p_haproxy [p_haproxy]
     Started: [ node-1.domain.tld node-2.domain.tld node-3.domain.tld ]
 Clone Set: clone_p_dns [p_dns]
     Started: [ node-1.domain.tld node-2.domain.tld node-3.domain.tld ]
 Clone Set: clone_p_mysql [p_mysql]
     Started: [ node-1.domain.tld node-2.domain.tld node-3.domain.tld ]
 Master/Slave Set: master_p_rabbitmq-server [p_rabbitmq-server]
     Masters: [ node-1.domain.tld ]
     Slaves: [ node-2.domain.tld node-3.domain.tld ]
 Clone Set: clone_p_heat-engine [p_heat-engine]
     Started: [ node-1.domain.tld node-2.domain.tld node-3.domain.tld ]
 Clone Set: clone_p_neutron-plugin-openvswitch-agent [p_neutron-plugin-openvswitch-agent]
     Started: [ node-1.domain.tld node-2.domain.tld node-3.domain.tld ]
 Clone Set: clone_p_neutron-dhcp-agent [p_neutron-dhcp-agent]
     Started: [ node-1.domain.tld node-2.domain.tld node-3.domain.tld ]
 Clone Set: clone_p_neutron-metadata-agent [p_neutron-metadata-agent]
     Started: [ node-1.domain.tld node-2.domain.tld node-3.domain.tld ]
 Clone Set: clone_p_neutron-l3-agent [p_neutron-l3-agent]
     Started: [ node-1.domain.tld node-2.domain.tld node-3.domain.tld ]
 Clone Set: clone_p_ntp [p_ntp]
     Started: [ node-1.domain.tld node-2.domain.tld node-3.domain.tld ]
 Clone Set: clone_ping_vip__public [ping_vip__public]
     Started: [ node-1.domain.tld node-2.domain.tld node-3.domain.tld ]

Here, the :command:`crm status` command provides an easy method to
inform the monitoring system that the HA cluster is comprised of
three controller nodes (node-1, node-2, and node-3), and that node-1
is the actual master node. It also tells the monitoring
system that the VIPs for the public and management interfaces are
started on the master node and that the HAProxy is started on all
the nodes of the HA cluster.

The :command:`crm_resource` command can also be used to verify on
which node a particular resource is active. Execution of the command
below, for example, tells the monitoring system that the Neutron DHCP
agent is active on node-1::

 # crm_resource  --locate --quiet --resource p_neutron-dhcp-agent
 node-1

Use the :option:`--resource vip_public` option to find out on which
node the public VIP is active::

 # crm_resource  --locate --quiet --resource vip__public
 node-1
