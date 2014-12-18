
.. _crm-ops:

crm - Cluster Resource Manager
++++++++++++++++++++++++++++++

The **crm** utility shows you
the state of the :ref:`Pacemaker<pacemaker-term>` cluster
and can be used for maintenance
and to analyze whether the cluster is consistent.
This section discusses some frequently-used commands.

**crm status**

This command shows you the main information
about the Pacemaker cluster and the state of the resources being managed.
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
   p_neutron-dhcp-agent   (ocf::mirantis:neutron-agent-dhcp):     Started node-1.test.domain.local 
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

  crm(live)resource#  status`

  clone_p_neutron-plugin-openvswitch-agent  (ocf::pacemaker:neutron-agent-ovs) Started
  clone_p_neutron-dhcp-agent   (ocf::pacemaker:neutron-agent-dhcp) Started
  clone_p_neutron-l3-agent     (ocf::pacemaker:neutron-agent-l3) Started

**crm(live)resource#  start|restart|stop|cleanup <resource_name>**

These commands, in order, allow you to start, stop, and restart resources.

**cleanup**

The cleanup command resets a resource's state on the node
if it is currently in a failed state
because of some unexpected operation,
such as some side effects of a System V **init** operation on the resource.
If this happens,
Pacemaker can do the clean-up,
deciding which node will run the resource.

Example::

  3 Nodes configured, 3 expected votes
  3 Resources configured.
  ============

  3 Nodes configured, 3 expected votes
  16 Resources configured.


  Online: [ controller-01 controller-02 controller-03 ]

   vip__management	(ocf::heartbeat:IPaddr2):   	Started controller-01
   vip__public    	(ocf::heartbeat:IPaddr2):   	Started controller-02
   Clone Set: clone_p_haproxy [p_haproxy]
    Started: [ controller-01 controller-02 controller-03 ]
   Clone Set: clone_p_mysql [p_mysql]
    Started: [ controller-01 controller-02 controller-03 ]
   Clone Set: clone_p_neutron-openvswitch-agent [p_neutron-openvswitch-agent]
    Started: [ controller-01 controller-02 controller-03 ]
   Clone Set: clone_p_neutron-metadata-agent [p_neutron-metadata-agent]
    Started: [ controller-01 controller-02 controller-03 ]
   clone_p_neutron-dhcp-agent   (ocf::mirantis:neutron-agent-dhcp): 	Started controller-01
   clone_p_neutron-l3-agent 	(ocf::mirantis:neutron-agent-l3):   	Started controller-03

In this case,
CRM found residual OpenStack agent processes
that had been started by Pacemaker
because of network failure and cluster partitioning.
After the restoration of connectivity,
Pacemaker saw these duplicate resources running on different nodes.
You can let it clean up this situation automatically or, if you
do not want to wait, cleanup them manually.

For more information, see `crm interactive help and documentation
<http://doc.opensuse.org/products/draft/SLE-HA/SLE-ha-guide_sd_draft/cha.ha.manual_config.html>`_.

Sometimes a cluster gets split into several parts.
In this case, ``crm status`` shows something like this::

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

#. Multicast should be enabled in the network
   and the IP address configured as multicast should not be filtered.
   The mcast port, a single UDP port,
   should be accepted on the management network between all controllers.

#. Corosync should start after the network interfaces are activated.

#. `bindnetaddr` should be located in the management network
   or at least in the same multicast reachable segment.

You can check this in the output of ``ip maddr show``:

.. code-block:: none
   :emphasize-lines: 1,8

   5:  br-mgmt
      link  33:33:00:00:00:01
      link  01:00:5e:00:00:01
      link  33:33:ff:a3:e2:57
      link  01:00:5e:01:01:02
      link  01:00:5e:00:00:12
      inet  224.0.0.18
      inet  239.1.1.2
      inet  224.0.0.1
      inet6 ff02::1:ffa3:e257
      inet6 ff02::1

**corosync-objctl**

This command can get/set runtime Corosync configuration values
including the status of Corosync redundant ring members::

  runtime.totem.pg.mrp.srp.members.134245130.ip=r(0) ip(10.107.0.8)
  runtime.totem.pg.mrp.srp.members.134245130.join_count=1
  ...
  runtime.totem.pg.mrp.srp.members.201353994.ip=r(0) ip(10.107.0.12)
  runtime.totem.pg.mrp.srp.members.201353994.join_count=1
  runtime.totem.pg.mrp.srp.members.201353994.status=joined


If the IP of the node is 127.0.0.1,
it means that Corosync started
when only the loopback interface was available and bound to it.

If the members list contains only one IP address or is incomplete,
it indicates that there is a Corosync connectivity issue
because this node does not see the other ones.

