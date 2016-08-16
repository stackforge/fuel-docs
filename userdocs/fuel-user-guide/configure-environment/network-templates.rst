.. _network-templates-intro:

Deploy network configurations using network templates
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

By default, Fuel configures the following networks (Linux bridges): Public,
Private, Storage, Admin (PXE), and Management. In addition, if you install the
OpenStack Bare Metal service, Fuel creates the Baremetal network. If you need
to add custom network or do not need any of the default network, you can
configure them by using network templates.

Network templates enable you to:

* Create custom networks and delete predefined networks.
* Create network roles.
* Restrict creation of a network only if a corresponding node role is
  configured on the node.
* Implement custom networking topologies, such as sub-interface bonding,
  and so on.

This section includes the following topics:

.. toctree::
   :maxdepth: 3

   network-templates/network-templates-overview.rst
   network-templates/network-templates-limitations.rst
   network-templates/network-templates-structure.rst
   network-templates/network-templates-create.rst
   network-templates/network-templates-delete.rst

#   network-templates/network-templates-examples.rst
