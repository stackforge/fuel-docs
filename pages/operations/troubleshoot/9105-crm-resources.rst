
.. _crm-ops:

crm - Cluster Resource Manager
++++++++++++++++++++++++++++++

The **crm** utility shows you
the state of the :ref:`pacemaker<pacemaker-term>` cluster
and can be used to analyze whether the cluster is consistent
and to use other maintenance tasks for the cluster.
This section discusses some frequently-used commands.

**crm status**

rhis command shows you the main information
about the Pacemaker cluster and the state of the resources being managed.
For example::

  crm(live)# status
  ============
  Last updated: Tue May 14 15:13:47 2013
  Last change: Mon May 13 18:36:56 2013 via cibadmin on fuel-controller-01
  Stack: openais
  Current DC: fuel-controller-01 - partition with quorum
  Version: 1.1.6-9971ebba4494012a93c03b40a2c58ec0eb60f50c
  5 Nodes configured, 5 expected votes
  3 Resources configured.
  ============

  Online: [ fuel-controller-01 fuel-controller-02 fuel-controller-03
  fuel-controller-04 fuel-controller-05 ]

  p_quantum-plugin-openvswitch-agent (ocf::pacemaker:quantum-agent-ovs): Started fuel-controller-01
  p_quantum-dhcp-agent (ocf::pacemaker:quantum-agent-dhcp): Started fuel-controller-01
  p_quantum-l3-agent (ocf::pacemaker:quantum-agent-l3): Started fuel-controller-01

**crm(live)# resource**

Here you can enter resource-specific commands::

  crm(live)resource#  status`

  p_quantum-plugin-openvswitch-agent  (ocf::pacemaker:quantum-agent-ovs) Started
  p_quantum-dhcp-agent   (ocf::pacemaker:quantum-agent-dhcp) Started
  p_quantum-l3-agent     (ocf::pacemaker:quantum-agent-l3) Started

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

   vip__management_old	(ocf::heartbeat:IPaddr2):   	Started controller-01
   vip__public_old    	(ocf::heartbeat:IPaddr2):   	Started controller-02
   Clone Set: clone_p_haproxy [p_haproxy]
    Started: [ controller-01 controller-02 controller-03 ]
   Clone Set: clone_p_mysql [p_mysql]
    Started: [ controller-01 controller-02 controller-03 ]
   Clone Set: clone_p_quantum-openvswitch-agent [p_quantum-openvswitch-agent]
    Started: [ controller-01 controller-02 controller-03 ]
   Clone Set: clone_p_quantum-metadata-agent [p_quantum-metadata-agent]
    Started: [ controller-01 controller-02 controller-03 ]
   p_quantum-dhcp-agent   (ocf::mirantis:quantum-agent-dhcp): 	Started controller-01
   p_quantum-l3-agent 	(ocf::mirantis:quantum-agent-l3):   	Started controller-03

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
   should be accepted on the management network among all controllers.

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

