
.. _l2-multiple-arch:

Implementation of Multiple L2 Networks
======================================

Multiple L2 networks are used for environments
that deploy a large number of target :ref:`nodes<node-term>`,
to avoid the broadcast storms that can occur
when all nodes share a single L2 domain.
Multiple L2 networks can be configured
for OpenStack environments that use the
:ref:`Neutron GRE<neutron-gre-ovs-arch>` topology
and are deployed using Fuel 6.0 and later.

This section discusses how support for multiple L2 networks is implemented.
:ref:`l2-multiple-ops` tells how to configure this feature
for your Fuel environments.

Multiple L2 networks are based on
:ref:`Node Groups<node-group-term>`,
which are arbitrary groupings of nodes
in the current cluster:

- Each :ref:`logical network<logical-networks-arch>`
  is associated with a Node Group rather than a cluster.
- Each node group belongs to a cluster.
- Each cluster can support multiple Node Groups.

:ref:`Nailgun<nailgun-term>` manages multiple L2 networks:

- A :ref:`node<node-term>` serializes its network information
  based on its relationship to networks in its Node Group.

- Each node must be associated with a Node Group;
  if it is not, network data cannot be serialized for that node
  and so it is considered to be in an error state.

- A set of networks is generated when a Node Group is created.
  These networks are deleted when the Node Group is deleted.

- Fuel DHCP discover networks are managed
  by adding or removing `fuelweb_admin` NetworkGroups to NodeGroups.

- Each Network Group is associated with a Node Group
  rather than with a cluster
  as they were in earlier releases.

- Each fuelweb_admin network must have a DHCP network
  configured in the :ref:`dnsmasq.template<dnsmasq-template-ref>` file.

- DHCP requests can be forwarded to the Fuel Master node
  using either of the following methods:

  * **dhcp-helper(8)** (**bootp**) issued by the network switch
  * using a relay client such as **dhclient(8)** or **dhcp-helper**

The `nodegroups` table stores information about all configured Node Groups.
To view the contents of this table,
issue the **fuel nodegroup** command

::

  [root@nailgun ~]# fuel nodegroup

  id | cluster | name          
  ---|---------|---------------
  1  | 1       | default       
  2  | 1       | group-custom-1


The fields displayed are:

:id:    Sequential ID number assigned by Cobbler
        when the Node Group is created
        and used as the Public Key for the Node Group.

:cluster:    Network Group with which the Node Group is associated.

:name:    Display name for the Node Group, assigned by the operator.

The `network_groups` table can be viewed
in the :ref:`network_1.yaml<network-1-yaml-ref>` file.

