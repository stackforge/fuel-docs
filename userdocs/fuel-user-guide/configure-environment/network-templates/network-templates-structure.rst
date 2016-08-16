.. _network-templates-structure:

Structure of network templates
------------------------------

You can use the structure described in this section, as well
as the default template to create a template that meets the
requirements of your configuration.

The procedure of creation networks is different for service
networks, such as Storage, Management, and Admin networks
and for networks that communicate with the OpenStack
Networking service, or workload networks, such Private and Public
networks. When you add new networks, you must understand whether
traffic from this network flows through the OpenStack Networking
service or not.

Network parameters are defined in the ``adv_net_template``
section in the ``network_template_<ENV_ID>.yaml`` file.

.. toctree::
   :maxdepth: 1

   network-templates-structure/network_scheme.rst
   network-templates-structure/nic_mapping.rst
   network-templates-structure/templates_for_node_role.rst
   network-templates-structure/network_assignment.rst
