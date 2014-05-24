
.. _switch-plan:

Switches
--------

You must manually configure your switches
before deploying your OpenStack environment.
Unfortunately the set of configuration steps, and even the terminology used,
is different for different vendors;
this section provides some vendor-agnostic information
about how traffic should flow.
We also provide sample switch configurations:

* :ref:`cisco-2960g-nova`
* :ref:`juniper-ex4200-nova`
* :ref:`cisco-2960g-neutron`
* :ref:`juniper-ex4200-neutron`

To configure your switches:

* Configure all access ports to allow non-tagged PXE booting connections
  from each slave node to the Fuel Master node.
  This network is referred to as the Fuel network.

* By default, the Fuel Master node uses the `eth0` interface
  to serve PXE requests on this network,
  but this can be changed :ref:`during installation <Network_Install>`
  of the Fuel Master node.

* If you use the `eth0` interface for PXE requests,
  you must set the switch port for `eth0` on the Fuel Master node
  to access mode.

* We recommend that you use the `eth0` interfaces of all other nodes
  for PXE booting as well.
  Corresponding ports must also be in access mode.

* Taking into account that this is the network for PXE booting,
  do not mix this L2 segment with any other network segments.
  Fuel runs a DHCP server, and,
  if there is another DHCP on the same L2 network segment,
  both the company's infrastructure and Fuel's
  are unable to function properly.

* You must also configure each of the switch's ports
  connected to nodes as an "STP Edge port"
  (or a "spanning-tree port fast trunk", according to Cisco terminology).
  If you do not do that, DHCP timeout issues may occur.

As long as the Fuel network is configured, Fuel can operate.
Other networks are required for OpenStack environments,
and currently all of these networks live in VLANs
over the one or multiple physical interfaces on a node.
This means that the switch should pass tagged traffic,
and untagging is done on the Linux hosts.

.. note:: For the sake of simplicity, all the VLANs specified on the networks tab of
  the Fuel UI should be configured on switch ports, pointing to Slave nodes,
  as tagged.

Of course, it is possible to specify as tagged
only certain ports for certain nodes.
However, in the current version,
all existing networks are automatically allocated for each node,
with any role.
And network check also checks if tagged traffic can pass,
even if some nodes do not require this check.
for example, Cinder nodes do not need fixed network traffic)

This is enough to deploy the OpenStack environment.
However, from a practical standpoint,
it is still not really usable
because there is no connection to other corporate networks yet.
To make that possible, you must configure uplink port(s).

One of the VLANs may carry the office network.
To provide access to the Fuel Master node from your network,
any other free physical network interface
on the Fuel Master node can be used
and configured according to your network rules (static IP or DHCP).
The same network segment can be used for Public and Floating ranges.
In this case, you must provide
the corresponding VLAN ID and IP ranges in the UI.
One Public IP per node is used to SNAT traffic out of the VMs network,
and one or more floating addresses per VM instance
are used to get access to the VM from your network,
or even the global Internet.
To have a VM visible from the Internet is similar
to having it visible from corporate network -
corresponding IP ranges and VLAN IDs must be specified
for the Floating and Public networks.
One current limitation of Fuel
is that the user must use the same L2 segment
for both Public and Floating networks.

Example configuration for one of the ports on a Cisco switch::

  interface GigabitEthernet0/6               # switch port
  description s0_eth0 jv                     # description
  switchport trunk encapsulation dot1q       # enables VLANs
  switchport trunk native vlan 262           # access port, untags VLAN 262
  switchport trunk allowed vlan 100,102,104  # 100,102,104 VLANs are passed with tags
  switchport mode trunk                      # To allow more than 1 VLAN on the port
  spanning-tree portfast trunk               # STP Edge port to skip network loop
                                             # checks (to prevent DHCP timeout issues)
  vlan 262,100,102,104                       # Might be needed for enabling VLANs
