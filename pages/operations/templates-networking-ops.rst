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
  via CLI or API. The "Networks" tab of Fuel Web UI will become inactive
  after you upload a networking template.

Working with Networking Templates
---------------------------------

A networking template is a YAML file in the following strict format::

   network_template_<ENV_ID>.yaml

where <ENV_ID> is the ID of your OpenStack environment that you can
get by issuing the ``fuel environment`` command.

For example, if the ID of your environment is ``1``, the name of the
template must be ``network_template_1.yaml``

Networking Templates Samples
++++++++++++++++++++++++++++

You can download samples from the `network_templates repository
folder <https://github.com/stackforge/fuel-qa/tree/master/fuelweb_test/network_templates>`_.

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
