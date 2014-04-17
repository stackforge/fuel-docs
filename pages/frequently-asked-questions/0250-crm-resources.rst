crm - Cluster Resource Manager
++++++++++++++++++++++++++++++

This is the main pacemaker utility it shows you state of pacemaker cluster.
Several most popular commands that you can use to understand whether your
cluster is consistent:

**crm status**

This command shows you the main information about pacemaker cluster and state of
resources being managed::

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

These commands allow you to respectively start, stop, and restart resources.

**cleanup**

The pacemaker cleanup command resets a resource's state on the node if it is
currently in a failed state or due to some unexpected operation, such as some
side effects of a SysVInit operation on the resource. In such an event,
pacemaker will manage it by itself, deciding which node will run the resource.

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

In this case there were residual OpenStack agent processes that were started by
pacemaker in case of network failure and cluster partitioning. After the
restoration of connectivity pacemaker saw these duplicate resources running on
different nodes. You can let it clean up this situation automatically or, if you
do not want to wait, cleanup them manually.

.. seealso::

  crm interactive help and documentation resources for Pacemaker
  (e.g. http://doc.opensuse.org/products/draft/SLE-HA/SLE-ha-guide_sd_draft/cha.ha.manual_config.html).

In some network scenarios one can get cluster split into several parts and
``crm status`` showing something like this::

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

You can troubleshoot this by checking corosync connectivity between nodes.
There are several points:

1) Multicast should be enabled in the network, IP address configured as
   multicast should not be filtered. The mcast port, a single udp port should
   be accepted on the management network among all controllers

2) Corosync should start after network interfaces are activated.

3) `bindnetaddr` should be located in the management network or at least in
   the same multicast reachable segment

You can check this in output of ``ip maddr show``:

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

This command is used to get/set runtime corosync configuration values including
status of corosync redundant ring members::

  runtime.totem.pg.mrp.srp.members.134245130.ip=r(0) ip(10.107.0.8)
  runtime.totem.pg.mrp.srp.members.134245130.join_count=1
  ...
  runtime.totem.pg.mrp.srp.members.201353994.ip=r(0) ip(10.107.0.12)
  runtime.totem.pg.mrp.srp.members.201353994.join_count=1
  runtime.totem.pg.mrp.srp.members.201353994.status=joined


If IP of the node is 127.0.0.1 it means that corosync started when only loopback
interfaces was available and bound to it.

If there is only one IP in members list that means there is corosync connectivity
issue because the node does not see the other ones. The same stays for the case
when members list is incomplete.

