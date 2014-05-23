Neutron versus Nova-Network
---------------------------

OpenStack networking with Neutron (Quantum) has some differences from
Nova-network. Neutron is able to virtualize and manage both layer 2 (logical)
and layer 3 (network) of the OSI network model, as compared to simple layer 3
virtualization provided by nova-network. This is the main difference between
the two networking models for OpenStack. Virtual networks (one or more) can be
created for a single tenant, forming an isolated L2 network called a
"private network". Each private network can support one or many IP subnets.
Private networks can be segmented using one of two different topologies:

* **VLAN segmentation** "Private network" traffic is managed by
  Neutron by the use of a dedicated network adapter. This network adapter must be
  attached to a untagged network port. This network segment also must be
  reserved only for Neutron on each host (Computes and Controllers). You should
  not use any other 802.1q VLANs on this network for other purposes.
  Additionally, each private network requires its own dedicated VLAN, selected
  from a given range configured in Fuel UI.
* **GRE segmentation** In this mode of operation, Neutron does not
  require a dedicated network adapter. Neutron builds a mesh of GRE tunnels from
  each compute node and controller nodes to every other node. Private networks
  for each tenant make use of this mesh for isolated traffic.

It is important to note:

* If you use tagged networks for your configuration
  and combine multiple networks onto one NIC,
  you should make the Public network untagged on this NIC.
  This is not a requirement, but best for access to the OpenStack Dashboard
  and public OpenStack API.
* You should place the Private, Admin, Public and Management networks on a
  separate NIC to ensure that traffic is separated adequately.
* Admin and Private networks must be located together
  on a NIC that is separate from the other networks.
* :ref:`ovs-term` improves the flexiblity and performance
  of both Neutron topologies.
