.. _network-templates-examples:

Network template examples
=========================

This section provides an examples of how to configure
network using network templates. You can use the default template
and modify it for your requirements or use any of the templates provided
in the `network templates folder </examples/network_templates.html>`_.

The following table describes network template examples:

.. list-table:: **Examples of network templates**
   :widths: 10 10
   :header-rows: 1

   * - Template
     - Description
   * - ``default.yaml``
     - The dafault network template deploys the basic configuration that you
       can deploy using the Fuel web UI. You can use this template to create
       your own network template.
   * - ``one_network.yaml``
     - A network template that describes a configuration in which one network
       serves all traffic.
   * - ``two_networks.yaml``
     - A network template that describes a configuration in which all traffic
       is served by two networks.

.. toctree::
   :maxdepth: 1

   examples/one-network.rst
   examples/two-networks.rst
