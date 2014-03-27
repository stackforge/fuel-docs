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
administrator. Nova Network or Neutron services can then
configure this address on the public network interface of the Network controller
node. E.g. environments based on Nova Network use iptables to create a
Destination NAT from this address to the private IP of the corresponding VM
instance through the appropriate virtual bridge interface on the Network
controller node.

In the other direction, the public network provides connectivity to the globally
routed address space for VMs. The IP address from the public network that has
been assigned to a compute node is used as the source for the Source NAT
performed for traffic going from VM instances on the compute node to Internet.

The public network also provides Virtual IPs for Endpoint nodes, which are used to
connect to OpenStack services APIs.
