.. raw:: pdf

   PageBreak

.. index:: Network Architecture

Network Architecture
====================

.. contents :local:

For better network performance and manageability, Fuel place different types 
of traffic into separate networks. This section describes how to distribute 
the network traffic in an OpenStack cluster. 

.. index:: Public Network

Public Network
--------------

This network allows inbound connections to VMs from the outside world (allowing 
users to connect to VMs from the Internet). It also allows outbound connections 
from VMs to the outside world. For security reasons, the public network is usually
isolated from other networks in cluster. The word "Public" means that these addresses
can be used to communicate with cluster and its VMs from outside of cluster.

To enable external access to VMs, the public network provides the address space 
for the floating IPs assigned to individual VM instances by the project 
administrator.

Nova Network can configure this address on the public interface of the Compute
node the instance is running at and then creates a Destination NAT from this
address to the private IP of the corresponding VM instance using iptables.
Then traffic goes to the VM through the appropriate virtual bridge interface.

In the other direction, the public network provides connectivity to the globally 
routed address space for VMs. The IP address from the public network that has 
been assigned to a Compute node is used as the destination for the Source NAT 
performed for traffic going from VM instances on the Compute node to Internet.
Without assigned floating IP address neither incoming Internet connection nor
outgoing connections would be possible.

Neutron on the other hand configures these addresses on the public interface of
the Controller node using namespaces to separate different networks of tenants.
Then it uses Destination NAT to direct the traffic to the Compute node either
through special VLAN or through GRE tunnel depending on network configuration.
On the Compute node the traffic goes through the same virtual bridge to
the target VM instance.

Both VLANs and tunnels are created using Open vSwitch connecting all Controller
and Compute nodes allowing VMs to exchange traffic through the Private network.

Traffic sent by the VM to the Internet goes to the Controller node where it
passes through a Source NAT to the external IP address inside the Public network
and then to the Internet. If there are no assigned floating IPs traffic goes
through the common Public IP address. But if the is a floating IP address assigned
it will be used as traffic exit point instead. So if you don't need to connect
to your VM from the Internet you need no floating IPs because outgoing
connections from the VM will work even without them.

The public network also provides Virtual IPs for Endpoint nodes, which are used to 
connect to OpenStack services APIs.

.. index:: Internal Network, Management Network

Internal (Management) Network
-----------------------------

The internal network connects all OpenStack nodes in the environment. All 
components of an OpenStack environment communicate with each other using this 
network. This network must be isolated from both the private and public 
networks for security reasons.

The internal network can also be used for serving iSCSI protocol exchanges 
between Compute and Storage nodes.

.. index:: Private Network

Private Network
---------------

The private network facilitates communication between each tenant's VMs. Private 
network address spaces are not a part of the enterprise network address space. Fixed 
IPs of virtual instances are directly unaccessible from the rest of Enterprise network.

NIC usage
---------

The current architecture assumes the presence of 3 NICs, but it can be 
customized for two or 4+ network interfaces. Most servers are built with at least 
two network interfaces. In this case, let's consider a typical example of three 
NIC cards. They're utilized as follows:

**eth0**: 
  The internal management network, used for communication with Puppet & Cobbler

**eth1**: 
  The public network, and floating IPs assigned to VMs

**eth2**: 
  The private network, for communication between OpenStack VMs, and the 
  bridge interface (VLANs)

The figure below illustrates the relevant nodes and networks in Neutron VLAN mode.

.. image:: /_images/080-networking-diagram.*
  :width: 75%
  :align: center
