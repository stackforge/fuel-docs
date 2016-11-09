.. _network-templates-intro:

Deploy network configurations using network templates
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

By default, Fuel configures the following networks (Linux bridges): Public,
Private, Storage, Admin (PXE), and Management. In addition, if you install the
OpenStack Bare Metal service, Fuel creates the Baremetal network. If you need
to add a custom network or do not need any of the default networks, you can
configure or delete the required networks through network templates.

Network templates enable you to:

* Create a custom set of networks.
* Create mappings of network roles to networks.
* Use a network on a specific node only if a corresponding node role is
  configured on the node
* Implement custom networking topologies, such as sub-interface bonding,
  and so on.

This section includes the following topics:

.. toctree::
   :maxdepth: 1

   network-templates/network-templates-overview.rst
   network-templates/network-templates-limitations.rst
   network-templates/network-templates-structure.rst
   network-templates/network-templates-create.rst
   network-templates/network-templates-delete.rst
   network-templates/network-templates-examples.rst
