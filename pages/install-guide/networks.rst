.. raw:: pdf

   PageBreak

.. index:: Fuel UI: Network Configuration

.. _fuelui-network:


Understanding and Configuring the Network
=========================================

.. contents :local:

OpenStack environments use several types of network managers: FlatDHCPManager, 
VLANManager (Nova Network) and Neutron (formerly Quantum). All configurations 
are supported. For more information about how the network managers work, you 
can read these two resources:

* `OpenStack Networking – FlatManager and FlatDHCPManager 
  <http://www.mirantis.com/blog/openstack-networking-flatmanager-and-flatdhcpmanager/>`_
* `OpenStack Networking for Scalability and Multi-tenancy with VLANManager 
  <http://www.mirantis.com/blog/openstack-networking-vlanmanager/>`_
* `Neutron - OpenStack <https://wiki.openstack.org/wiki/Neutron/>`_

FlatDHCPManager (multi-host scheme)
-----------------------------------

The main ingredient in FlatManager is to configure a bridge 
(i.e. **br100**) on every Compute node and have one of the machine's physical 
interfaces connect to it. Once the virtual machine is launched, its virtual 
interface connects to that bridge as well.
The same L2 segment is used for all OpenStack projects, which means that there 
is no L2 isolation between virtual hosts, even if they are owned by separate 
projects. Additionally, there is only one flat IP pool defined for the entire 
environment. For this reason, it is called the *Flat* manager.

The simplest case here is as shown on the following diagram. Here the *eth1* 
interface is used to give network access to virtual machines, while *eth0* 
interface is the management network interface.

.. image:: /_images/flatdhcpmanager-mh_scheme.jpg
  :align: center

Fuel deploys OpenStack in FlatDHCP mode with the **multi-host** 
feature enabled. Without this feature enabled, network traffic from each VM 
would go through the single gateway host, which inevitably creates a single 
point of failure. In **multi-host** mode, each Compute node becomes a gateway 
for all the VMs running on the host, providing a balanced networking solution. 
In this case, if one of the Computes goes down, the rest of the environment 
remains operational.

The current version of Fuel uses VLANs, even for the FlatDHCP network 
manager. On the Linux host, it is implemented in such a way that it is not 
the physical network interfaces that connects to the bridge, but the 
VLAN interface (i.e. *eth0.102*).

FlatDHCPManager (single-interface scheme)
-----------------------------------------

.. image:: /_images/flatdhcpmanager-sh_scheme.jpg
  :width: 100%
  :align: center

In order for FlatDHCPManager to work, one designated switch port where each 
Compute node is connected needs to be configured as tagged (trunk) port 
with the required VLANs allowed (enabled, tagged). Virtual machines will 
communicate with each other on L2 even if they are on different Compute nodes. 
If the virtual machine sends IP packets to a different network, they will be 
routed on the host machine according to the routing table. The default route 
will point to the gateway specified on the networks tab in the UI as the 
gateway for the Public network.

.. raw:: pdf

   PageBreak

VLANManager
------------

VLANManager mode is more suitable for large scale clouds. The idea behind 
this mode is to separate groups of virtual machines owned by different 
projects into separate and distinct L2 networks. In VLANManager, this is done 
by tagging IP frames, identified by a given VLAN. It allows virtual machines 
inside the given project to communicate with each other and not to see any 
traffic from VMs of other projects. Again, like with FlatDHCPManager, switch 
ports must be configured as tagged (trunk) ports to allow this scheme to work.

.. image:: /_images/vlanmanager_scheme.jpg
  :width: 100%
  :align: center

.. raw:: pdf

   PageBreak

.. index:: Fuel UI: Deployment Schema

Fuel Deployment Schema
======================

Via VLAN tagging on a physical interface, OpenStack Computes will untag the IP 
packets and send them to the appropriate VMs. Simplifying the configuration 
of VLAN Manager, there is no known limitation which Fuel could add in this 
particular networking mode.

Configuring the network
-----------------------

Once you choose a networking mode (FlatDHCP/VLAN), you must configure equipment 
accordingly. The diagram below shows an example configuration.

.. image:: /_images/physical-network.png
  :width: 100%
  :align: center

Fuel operates with following logical networks:

**Fuel** network 
  Used for internal Fuel communications only and PXE booting (untagged on the scheme);

**Public** network 
  Is used to get access from virtual machines to outside, Internet or office 
  network (VLAN 101 on the scheme);

**Floating** network 
  Used to get access to virtual machines from outside (shared L2-interface with 
  Public network; in this case it's VLAN 101);

**Management** network 
  Is used for internal OpenStack communications (VLAN 100 on the scheme);
  
**Storage** network 
  Is used for Storage traffic (VLAN 102 on the scheme);

**Fixed** network
  One (for flat mode) or more (for VLAN mode) virtual machines 
  networks (VLANs 103-200 on the scheme).

Mapping logical networks to physical interfaces on servers
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

Fuel allows you to use different physical interfaces to handle different 
types of traffic. When a node is added to the environment, click at the bottom 
line of the node icon. In the detailed information window, click the "Configure 
Interfaces" button to open the physical interfaces configuration screen.

.. image:: /_images/network_settings.jpg
  :align: center
  :width: 100%

On this screen you can drag-and-drop logical networks to physical interfaces 
according to your network setup. 

All networks are presented on the screen, except Fuel.
It runs on the physical interface from which node was initially PXE booted,
and in the current version it is not possible to map it on any other physical 
interface. Also, once the network is configured and OpenStack is deployed,
you may not modify network settings, even to move a logical network to another 
physical interface or VLAN number.

Switch
++++++

Fuel can configure hosts, however switch configuration is still manual work. 
Unfortunately the set of configuration steps, and even the terminology used, 
is different for different vendors, so we will try to provide 
vendor-agnostic information on how traffic should flow and leave the 
vendor-specific details to you. We will provide an example for a Cisco switch.

First of all, you should configure access ports to allow non-tagged PXE booting 
connections from all Slave nodes to the Fuel node. We refer this network 
as the Fuel network.
By default, the Fuel Master node uses the `eth0` interface to serve PXE 
requests on this network, but this can be changed :ref:`during installation 
<Network_Install>` of the Fuel Master node.
So if that's left unchanged, you have to set the switch port for `eth0` of Fuel 
Master node to access mode.
We recommend that you use the `eth0` interfaces of all other nodes for PXE booting 
as well. Corresponding ports must also be in access mode.

Taking into account that this is the network for PXE booting, do not mix 
this L2 segment with any other network segments. Fuel runs a DHCP 
server, and if there is another DHCP on the same L2 network segment, both the 
company's infrastructure and Fuel's will be unable to function properly.
You also need to configure each of the switch's ports connected to nodes as an 
"STP Edge port" (or a "spanning-tree port fast trunk", according to Cisco 
terminology). If you don't do that, DHCP timeout issues may occur.

As long as the Fuel network is configured, Fuel can operate.
Other networks are required for OpenStack environments, and currently all of 
these networks live in VLANs over the one or multiple physical interfaces on a 
node. This means that the switch should pass tagged traffic, and untagging is done
on the Linux hosts. 

.. note:: For the sake of simplicity, all the VLANs specified on the networks tab of 
  the Fuel UI should be configured on switch ports, pointing to Slave nodes, 
  as tagged.

Of course, it is possible to specify as tagged only certain ports for certain 
nodes. However, in the current version, all existing networks are automatically 
allocated for each node, with any role.
And network check will also check if tagged traffic pass, even if some nodes do 
not require this check (for example, Cinder nodes do not need fixed network traffic).

This is enough to deploy the OpenStack environment. However, from a 
practical standpoint, it's still not really usable because there is no 
connection to other corporate networks yet. To make that possible, you must 
configure uplink port(s). 

One of the VLANs may carry the office network. To provide access to the Fuel Master 
node from your network, any other free physical network interface on the 
Fuel Master node can be used and configured according to your network 
rules (static IP or DHCP). The same network segment can be used for 
Public and Floating ranges. In this case, you must provide the corresponding 
VLAN ID and IP ranges in the UI. One Public IP per node will be used to SNAT
traffic out of the VMs network, and one or more floating addresses per VM 
instance will be used to get access to the VM from your network, or 
even the global Internet. To have a VM visible from the Internet is similar to 
having it visible from corporate network - corresponding IP ranges and VLAN IDs
must be specified for the Floating and Public networks. One current limitation 
of Fuel is that the user must use the same L2 segment for both Public and 
Floating networks.

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

Router
++++++

To make it possible for VMs to access the outside world, you must have an IP 
address set on a router in the Public network. In the examples provided, 
that IP is 12.0.0.1 in VLAN 101.

Fuel UI has a special field on the networking tab for the gateway address. As 
soon as deployment of OpenStack is started, the network on nodes is 
reconfigured to use this gateway IP as the default gateway.

If Floating addresses are from another L3 network, then you have to configure the 
IP address (or even multiple IPs if Floating addresses are from more than one L3 
network) for them on the router as well.

Otherwise, Floating IPs on nodes will be inaccessible.

.. _access_to_public_net:

Deployment configuration to access OpenStack API and VMs from host machine
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

Helper scripts for VirtualBox create network adapters `eth0`, `eth1`, `eth2`
which are represented on host machine as `vboxnet0`, `vboxnet1`, `vboxnet2`
correspondingly, and assign IP addresses for adapters: 

  vboxnet0 - 10.20.0.1/24, 
  vboxnet1 - 172.16.1.1/24, 
  vboxnet2 - 172.16.0.1/24.

For the demo environment on VirtualBox, the first network adapter is used to run Fuel 
network traffic, including PXE discovery.

To access the Horizon and OpenStack RESTful API via Public network from the host machine,
it is required to have route from your host to the Public IP address on the OpenStack Controller.
Also, if access to Floating IP of VM is required, it is also required to have route
to the Floating IP on Compute host, which is binded to Public interface there.
To make this configuration possible on VirtualBox demo environment, the user has
to run Public network untagged. On the image below you can see the configuration of
Public and Floating networks which will allow to make this happen.

.. image:: /_images/vbox_public_settings.jpg
  :align: center
  :width: 100%

By default Public and Floating networks are ran on the first network interface.
It is required to change it, as you can see on this image below. Make sure you change
it on every node.

.. image:: /_images/vbox_node_settings.jpg
  :align: center
  :width: 100%

If you use default configuration in VirtualBox scripts, and follow the exact same
settings on the images above, you should be able to access OpenStack Horizon via
Public network after the installation.

If you want to enable Internet on provisioned VMs by OpenStack, you
have to configure NAT on the host machine. When packets reach `vboxnet1` interface,
according to the OpenStack settings tab, they have to know the way out of the host.
For Ubuntu, the following command, executed on the host, can make this happen::

  sudo iptables -t nat -A POSTROUTING -s 172.16.1.0/24 \! -d 172.16.1.0/24 -j MASQUERADE

To access VMs managed by OpenStack it is needed to provide IP addresses from 
Floating IP range. When OpenStack environment is deployed and VM is provisioned there,
you have to associate one of the Floating IP addresses from the pool to this VM,
whether in Horizon or via Nova CLI. By default, OpenStack blocks all the traffic to the VM.
To allow the connectivity to the VM, you need to configure security groups.
It can be done in Horizon, or from OpenStack Controller using the following commands::

  . /root/openrc
  nova secgroup-add-rule default icmp -1 -1 0.0.0.0/0
  nova secgroup-add-rule default tcp 22 22 0.0.0.0/0

IP ranges for Public and Management networks (172.16.*.*) are defined in ``config.sh`` 
script. If default values don't fit your needs, you are free to change them, but before
the installation of Fuel Master node.
  
