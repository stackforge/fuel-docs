.. index:: HowTo: Functional tests for HA

.. _crm-verify-neutron:

How to verify that Neutron HA is working
++++++++++++++++++++++++++++++++++++++++

To verify that Neutron HA is working,
simply shut down the node hosting the Neutron agents
(either gracefully or with a hard shutdown).
You should see agents start on the other node:


  # crm status

  Online: [ fuel-controller-02 fuel-controller-03 fuel-controller-04 fuel-controller-05 ]
  OFFLINE: [ fuel-controller-01 ]

  clone_p_neutron-plugin-openvswitch-agent (ocf::pacemaker:neutron-agent-ovs): Started fuel-controller-02
  clone_p_neutron-dhcp-agent (ocf::pacemaker:neutron-agent-dhcp): Started fuel-controller-02
  clone_p_neutron-l3-agent (ocf::pacemaker:neutron-agent-l3): Started fuel-controller-02

and see corresponding Neutron interfaces on the new Neutron node::

  # ip link show

  11: tap7b4ded0e-cb: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc
  12: qr-829736b7-34: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc
  13: qg-814b8c84-8f: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc

You can also check ``ovs-vsctl show output``
to see that all corresponding tunnels/bridges/interfaces
are created and connected properly::

  ce754a73-a1c4-4099-b51b-8b839f10291c
    Bridge br-mgmt
        Port br-mgmt
            Interface br-mgmt
                type: internal
        Port "eth1"
            Interface "eth1"
    Bridge br-ex
        Port br-ex
            Interface br-ex
                type: internal
        Port "eth0"
            Interface "eth0"
        Port "qg-814b8c84-8f"
            Interface "qg-814b8c84-8f"
                type: internal
    Bridge br-int
        Port patch-tun
            Interface patch-tun
                type: patch
                options: {peer=patch-int}
        Port br-int
            Interface br-int
                type: internal
        Port "tap7b4ded0e-cb"
            tag: 1
            Interface "tap7b4ded0e-cb"
                type: internal
        Port "qr-829736b7-34"
            tag: 1
            Interface "qr-829736b7-34"
                type: internal
    Bridge br-tun
        Port "gre-1"
            Interface "gre-1"
                type: gre
                options: {in_key=flow, out_key=flow, remote_ip="10.107.0.8"}
        Port "gre-2"
            Interface "gre-2"
                type: gre
                options: {in_key=flow, out_key=flow, remote_ip="10.107.0.5"}
        Port patch-int
            Interface patch-int
                type: patch
                options: {peer=patch-tun}
        Port "gre-3"
            Interface "gre-3"
                type: gre
                options: {in_key=flow, out_key=flow, remote_ip="10.107.0.6"}
        Port "gre-4"
            Interface "gre-4"
                type: gre
                options: {in_key=flow, out_key=flow, remote_ip="10.107.0.7"}
        Port br-tun
            Interface br-tun
                type: internal
    ovs_version: "1.4.0+build0"

