

.. _logical-networks-arch:

Logical Networks
----------------

For better network performance and manageability,
Fuel places different types of traffic into separate logical networks.
This section describes how to distribute
the network traffic in an OpenStack environment.

.. index:: Admin (PXE) Network

Admin (PXE) Network ("Fuel network")

  The Fuel Master Node uses this network
  to provision and orchestrate the OpenStack environment.
  It is used during installation to provide DNS, DHCP, and gateway services
  to a node before that node is provisioned.
  Nodes retrieve their network configuration
  from the Fuel Master node using DHCP,
  which is why this network must be isolated from the rest of your network
  and must not have a DHCP server other than the Fuel Master running on it.


.. index:: Public Network

Public Network

  The word "Public" means that these addresses can be used to communicate with
  the cluster and its VMs from outside of the cluster (the Internet, corporate
  network, end users).

  The public network provides connectivity to the globally routed address space
  for VMs. The IP address from the public network that has been assigned to a
  compute node is used as the source for the Source NAT performed for traffic
  going from VM instances on the compute node to the Internet.

  The public network also provides Virtual IPs for public endpoints, which are
  used to connect to OpenStack services APIs.

  Finally, the public network provides a contiguous address range for the
  floating IPs that are assigned to individual VM instances by the project
  administrator. Nova Network or Neutron services can then configure this
  address on the public network interface of the Network controller node.
  Environments based on Nova Network use iptables to create a Destination NAT
  from this address to the private IP of the corresponding VM instance through
  the appropriate virtual bridge interface on the Network controller node.

  For security reasons, the public network is usually isolated from other
  networks in the cluster.

  If you use tagged networks for your configuration and combine multiple
  networks onto one NIC, you should leave the Public network untagged on that
  NIC. This is not a requirement, but it simplifies external access to
  OpenStack Dashboard and public OpenStack API endpoints.

Storage Network

  Part of a cluster's internal network.
  It is used to separate storage traffic
  (Swift, Ceph, iSCSI, etc.)
  from other types of internal communications in the cluster.
  The Storage network is usually on a separate VLAN or interface,
  isolated from all other communication.

Management network

  Also part of a cluster's internal network.
  It serves all other internal communications,
  including database queries, AMQP messaging, high availability services).

Private Network (Fixed network)

  The private network facilitates communication between each tenant's VMs.
  Private network address spaces
  are not a part of the enterprise network address space;
  fixed IPs of virtual instances cannot be accessed directly
  from the rest of the Enterprise network.

  Just like the public network, the private network should be isolated from
  other networks in the cluster for security reasons.

<<<<<<< HEAD
Internal Network

  The internal network connects all OpenStack nodes in the environment.
  All components of an OpenStack environment
  communicate with each other using this network.
  This network must be isolated from both the private and public networks
  for security reasons.

  The internal network can also be used for serving iSCSI protocol exchanges
  between Compute and Storage nodes.

If you want to combine another network
with the Admin network on the same NIC,
you must leave the Admin network untagged.
This is the default configuration and cannot be changed in the Fuel UI
although you could modify it by manually editing configuration files.
=======
.. note:: If you want to combine another network
          with the Admin network on the same network interface,
          you must leave the Admin network untagged.
          This is the default configuration and cannot be changed in the Fuel UI
          although you could modify it by manually editing configuration files.
>>>>>>> Clarify information about single NIC
