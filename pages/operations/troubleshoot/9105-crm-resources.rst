
.. _crm-ops:

crm - Cluster Resource Manager
++++++++++++++++++++++++++++++

The **crm** utility shows you the state of the :ref:`Pacemaker<pacemaker-term>`
cluster and can be used for maintenance and to analyze whether the cluster is
consistent. This section discusses some frequently-used commands.

**crm status**

This command shows you the main information about the Pacemaker cluster and
the state of the resources being managed.
For example::

  crm(live)# status
  ============
  root@node-2:/usr/lib/ocf/resource.d/mirantis# crm status
  Last updated: Thu Dec 18 16:06:27 2014
  Last change: Thu Dec 18 15:09:07 2014 via cibadmin on node-1.test.domain.local
  Stack: classic openais (with plugin)
  Current DC: node-1.test.domain.local - partition with quorum
  Version: 1.1.10-42f2063
  3 Nodes configured, 3 expected votes
  27 Resources configured
  ============

  Online: [ node-1.test.domain.local node-2.test.domain.local node-3.test.domain.local ]

  vip__public    (ocf::mirantis:ns_IPaddr2):     Started node-1.test.domain.local
   Clone Set: clone_ping_vip__public [ping_vip__public]
       Started: [ node-1.test.domain.local node-2.test.domain.local node-3.test.domain.local ]
   vip__management        (ocf::mirantis:ns_IPaddr2):     Started node-1.test.domain.local
   Clone Set: clone_p_heat-engine [p_heat-engine]
       Started: [ node-1.test.domain.local node-2.test.domain.local node-3.test.domain.local ]
   Master/Slave Set: master_p_rabbitmq-server [p_rabbitmq-server]
       Masters: [ node-1.test.domain.local ]
       Slaves: [ node-2.test.domain.local node-3.test.domain.local ]
   Clone Set: clone_p_neutron-plugin-openvswitch-agent [p_neutron-plugin-openvswitch-agent]
       Started: [ node-1.test.domain.local node-2.test.domain.local node-3.test.domain.local ]
   Clone Set: clone_p_neutron-dhcp-agent [p_neutron-dhcp-agent]
       Started: [ node-1.test.domain.local node-2.test.domain.local node-3.test.domain.local ]
   Clone Set: clone_p_neutron-metadata-agent [p_neutron-metadata-agent]
       Started: [ node-1.test.domain.local node-2.test.domain.local node-3.test.domain.local ]
   Clone Set: clone_p_neutron-l3-agent [p_neutron-l3-agent]
       Started: [ node-1.test.domain.local node-2.test.domain.local node-3.test.domain.local ]
   Clone Set: clone_p_mysql [p_mysql]
       Started: [ node-1.test.domain.local node-2.test.domain.local node-3.test.domain.local ]
   Clone Set: clone_p_haproxy [p_haproxy]
       Started: [ node-1.test.domain.local node-2.test.domain.local node-3.test.domain.local ]

**crm(live)# resource**

Here you can enter resource-specific commands::

  crm(live)resource#  status

  Clone Set: clone_p_neutron-openvswitch-agent [p_neutron-openvswitch-agent]
      Started: [ node-1.test.domain.local node-2.test.domain.local node-3.test.domain.local ]
  Clone Set: clone_p_neutron-dhcp-agent [p_neutron-dhcp-agent]
      Started: [ node-1.test.domain.local node-2.test.domain.local node-3.test.domain.local ]
  Clone Set: clone_p_neutron-metadata-agent [p_neutron-metadata-agent]
      Started: [ node-1.test.domain.local node-2.test.domain.local node-3.test.domain.local ]
  Clone Set: clone_p_neutron-l3-agent [p_neutron-l3-agent]
      Started: [ node-1.test.domain.local node-2.test.domain.local node-3.test.domain.local ]

**crm(live)resource#  start|restart|stop|cleanup <resource_name>**

These commands, in order, allow you to start, stop, and restart resources.

**crm(live)resource#cleanup**

The cleanup command resets a resource's state on the node if it is currently
in a failed state because of some unexpected operation, such as some side
effects of a System V **init** operation on the resource. If this happens,
Pacemaker can do the clean-up, deciding which node will run the resource.

Example::

  3 Nodes configured, 3 expected votes
  3 Resources configured.
  ============

  3 Nodes configured, 3 expected votes
  16 Resources configured.


  Online: [ controller-01 controller-02 controller-03 ]

   vip__management      (ocf::heartbeat:IPaddr2):         Started controller-01
   vip__public          (ocf::heartbeat:IPaddr2):         Started controller-02
   Clone Set: clone_p_haproxy [p_haproxy]
    Started: [ controller-01 controller-02 controller-03 ]
   Clone Set: clone_p_mysql [p_mysql]
    Started: [ controller-01 controller-02 controller-03 ]
   Clone Set: clone_p_neutron-openvswitch-agent [p_neutron-openvswitch-agent]
    Started: [ controller-01 controller-02 controller-03 ]
   Clone Set: clone_p_neutron-metadata-agent [p_neutron-metadata-agent]
    Started: [ controller-01 controller-02 controller-03 ]
   Clone Set: clone_p_neutron-metadata-agent [p_neutron-dhcp-agent]
    Started: [ controller-01 controller-02 controller-03 ]
   p_neutron-dhcp-agent   (ocf::mirantis:neutron-agent-dhcp): Started controller-01
   Clone Set: clone_p_neutron-l3-agent [p_neutron-l3-agent]
    Started: [ controller-01 controller-02 controller-03 ]

In this case, **crm** found residual OpenStack agent processes that had been
started by Pacemaker because of network failure and cluster partitioning.
After the restoration of connectivity, Pacemaker saw these duplicate resources
running on different nodes. You can let it clean up this situation
automatically or, if you do not want to wait, cleanup them manually.

For more information, see
`crm interactive help and documentation
<https://www.suse.com/documentation/sle_ha/book_sleha/data/sec_ha_manual_config_crm.html>`_.

Sometimes a cluster gets split into several parts. In this case, ``crm status``
shows something like this::

  On ctrl1
  ============
  ….
  Online: [ ctrl1 ]

  On ctrl2
  ============
  ….
  Online: [ ctrl2 ]

  On ctrl3
  ============
  ….
  Online: [ ctrl3 ]


You can troubleshoot this by checking connectivity between nodes.
Look for the following:

#. By default Fuel configures corosync over UDP. Security Appliances shouldn't
   block UDP traffic for 5404, 5405 ports. Deep traffic inspection should be
   turned off for these ports. These ports should be accepted on the management
   network between all controllers.

#. Corosync should start after the network interfaces are activated.

#. `bindnetaddr` should be located in the management network
   or at least in the same reachable segment.

**corosync-cfgtool -s**

This command displays the cluster connectivity status.::

  Printing ring status.
  Local node ID 50490378
  RING ID 0
        id      = 10.107.0.8
        status  = ring 0 active with no faults

FAULTY status indicates connectivity problems.

**corosync-objctl**

This command can get/set runtime Corosync configuration values including the
status of Corosync redundant ring members::

  runtime.totem.pg.mrp.srp.members.134245130.ip=r(0) ip(10.107.0.8)
  runtime.totem.pg.mrp.srp.members.134245130.join_count=1
  ...
  runtime.totem.pg.mrp.srp.members.201353994.ip=r(0) ip(10.107.0.12)
  runtime.totem.pg.mrp.srp.members.201353994.join_count=1
  runtime.totem.pg.mrp.srp.members.201353994.status=joined

If the IP of the node is 127.0.0.1, it means that Corosync started when only
the loopback interface was available and bound to it.

If the members list contains only one IP address or is incomplete, it indicates
that there is a Corosync connectivity issue because this node does not see the
other ones.

As **no-quorum-policy** is set to **stop** on fully functioning cluster,
Pacemaker will stop all resources on quorumless partition. If quorum is present,
the cluster will function normally, allowing to drop minor set of controllers.
This eliminates split-brain scenarios where nodes doesn't have quorum or
can't see each other.

In some scenarios, such as manual cluster recovery, **no-quorum-policy** can be
set to **ignore**. This setting allows operator to start operations on single
controller rather than waiting for for quorum.

.. code-block :: bash

  pcs property set no-quorum-policy=ignore

Once quorum or cluster is restored, **no-quorum-policy** should be set back to
its previous value.

Also, Fuel temporarily sets **no-quorum-policy** to **ignore** when
Cloud Operator adds/removes a controller node to the cluster.
This is required for scenarios when Cloud Operator adds more controller nodes
than the cluster currently consist of. Once addition/removal of new controller
node is done, Fuel sets **no-quorum-policy** to **stop** value.

It's also recommended to configure fencing (STONITH) for Pacemaker cluster.
That could be done manually or with help of Fencing plugin[1]_ for Fuel.
When STONITH enabled, **no-quorum-policy** could be set to **suicide** as well.
When set to **suicide**, the node will shoot itself and any other nodes in the
partition without quorum - but it won't try to shoot the nodes it can't see.
When set to **ignore** (or when it has quorum), it will shoot anyone it can't see.
For any other value, it won't shoot anyone when it doesn't have quorum.

Furthermore, Corosync will always try to automatically restore the cluster back
into single partition and start all of the resources, if any were stopped, unless
some controller nodes are damaged (cannot run the Corosync service for example).
Such nodes cannot join back the cluster and must be fenced by the STONITH daemon.
That is why production cluster should always have a fencing enabled.

.. [1] `Fencing plugin <https://github.com/stackforge/fuel-plugins/tree/master/ha_fencing>`_
