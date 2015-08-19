.. _templates-networking-ops:

Using Networking Templates
==========================

Starting with Fuel 7.0 you can use networking templates.
Templates allow for more flexible network configurations and provide
you with the following abilities:

* Ability to create additional networks (e.g. an extra network for Swift)
  and delete networks.
* Have a specific set of network roles.
* Ability to create a network only if a relevant node role is present
  on the node.
* Ability to provide custom networking topologies (e.g. subinterface bonding).

Networking Templates Limitations
--------------------------------

* Interdependencies between templates for different node roles cannot
  be set.
* Network roles to networks mapping and network topology cannot be set
  for nodes individually. They can only be set for node role or/and node
  group.
* There is no UI support for networking templates. You can only operate
  via CLI or API. The "Configure Interfaces" tab of Fuel Web UI will
  become inactive after you upload a networking template.

Working with Networking Templates
---------------------------------

A networking template is a YAML file in the following format::

   network_template_<ENV_ID>.yaml

where <ENV_ID> is the ID of your OpenStack environment that you can
get by issuing the ``fuel environment`` command.

For example, if the ID of your environment is ``1``, the name of the
template must be ``network_template_1.yaml``

Networking Templates Samples
++++++++++++++++++++++++++++

You can download samples from the `network_templates repository
folder <https://github.com/stackforge/fuel-qa/tree/master/fuelweb_test/network_templates>`_.

.. note:: There is no default or generated template in your Fuel
          installation provided by default.

Networking Templates Structure
++++++++++++++++++++++++++++++

Each template consists of five major sections.

* ``adv_net_template`` -- This is the network configuration template
  for the cluster.

* ``nic_mapping`` -- Aliases to NIC names mapping are set here.

* ``templates_for_node_role`` -- List of template names for every
  node role used in the environment.

* ``network_assignments`` -- Endpoints used in the template body. This
  is where the mapping is set between endpoints and network names to
  set the L3 configuration for the endpoints.

* ``network_scheme`` -- Template bodies for every template listed under
  ``templates_for_node_role``

nic_mapping section detailed
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Sample::

  nic_mapping:
  default:
	if1: eth0
	if2: eth1
	if3: eth2
	if4: eth3
  node-33:
	if1: eth1
	if2: eth3
	if3: eth2
	if4: eth0

NIC aliases (e.g. "if1") are used in templates in the topology
description in the ``transformations`` scetion. With ``nic_mapping``
you can set mapping of aliases to NIC names for different nodes.

The ``default`` mapping is set for all nodes that do not have name
aliases. Custom mapping can be set for any particular node (by node
name).

The number of NICs for any node may vary. It depends on the topologies
defined for the nodes in templates in the ``transformations`` section.

Use if aliases in templates is optional. You can use NIC names if all
nodes have the same set of NICs and they are connected in the same way.

templates_for_node_role section detailed
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Sample::

  templates_for_node_role:
  controller:
	- public
	- private
	- storage
	- common
  compute:
	- common
	- private
	- storage
  ceph-osd:
	- common
	- storage

This is where you provide the list of template names for every node
role used in the environment.

The order of templates matters. The description of the topology
that is in the ``transformations`` section of the template is executed
by Puppet in the order provided on its input. Also, the order of
creating the networking objects cannot be arbitrary. For example,
a bridge should be created first, and the subinterface that will carry
its traffic should be created after that.

While templates can be reused for different node roles, each template
is executed once for every node.

When several roles are mixed on one node, an alphabetical order of node
roles is used to determine the final order of the templates.

network_assignments section detailed
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Sample::

  network_assignments:
  storage:
	ep: br-storage
  private:
	ep: br-prv
  public:
	ep: br-ex
  management:
	ep: br-mgmt
  fuelweb_admin:
	ep: br-fw-admin

Endpoints are used in the template body. The mapping is set here
between endpoints and network names to get the networks' L3
configuration to be set for endpoints.

The sample above shows the default mapping which is set without a
template. The set of networks can be changed using API: networks
can be created or deleted via API.

network_scheme section detailed
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Sample::

  network_scheme:
    storage: # template name
        transformations:
            ...
        endpoints:
            ...
        roles:
            ...
    private:
        transformations:
            ...
        endpoints:
            ...
        roles:
            ...
    ...

Each template has a name which is referenced in the sections above
and consists of the three following sections:

* ``transformations`` -- A sequence of actions to build proper network
  topology is defined here. The "transmormation" from physical
  interface to endpoint is described here.

* ``endpoints`` -- All endpoints introduced by the template.

* ``roles`` -- The mapping of network roles to endpoints. When several
  templates are used for one node there should be no contradictions
  in this mapping.

Operating with Networking Templates
+++++++++++++++++++++++++++++++++++

To upload a networking template, on the Fuel Master node issue the
following command::

       fuel --env <ENV_ID> network-template --upload --dir <PATH>

where where <ENV_ID> is the ID of your OpenStack environment that you
can get by issuing the ``fuel environment`` command; <PATH> is the path
to where your template is.

For example::

    fuel --env 1 network-template --upload --dir /home/stack/

To download a networking template to the current directory,
on the Fuel Maste node issue the following command::

    fuel --env <ENV_ID> network-template --download

For example::

    fuel --env 1 network-template --download

To delete an existing networking template, on the Fuel Master node
issue the following command::

    fuel --env <ENV_ID> network-template --delete

For example::

    fuel --env 1 network-template --delete

To create a network group, issue the following command::

    fuel network-group --create --node-group <GROUP_ID> --name \
    "<GROUP_NAME>" --release <RELEASE_ID> --vlan 100 --cidr 10.0.0.0/24

where <GROUP_ID> is the ID of your :ref:`node-group-term` that you can
get by issuing the ``fuel node`` command; <GROUP_NAME> is the name that
you would like to assign to your group; <RElEASE_ID> is the ID of your
release.

For example::

      fuel network-group --create --node-group 1 --name \
      "new network" --release 2 --vlan 100 --cidr 10.0.0.0/24

To list all available network groups issue the following command::

    fuel network-group list

To filter network groups by node group::

    fuel network-group --node-group <GROUP_ID>

For example::

    fuel network-group --node-group 1

To delete network groups::

    fuel network-group --delete --network <GROUP_ID>

For example::

    fuel network-group --delete --network 1

You can also specify multiple groups to delete::

    fuel network-group --delete --network 2,3,4
