
.. _ml2-create-ops:

Creating and Configuring ML2 Drivers
====================================

Fuel 5.1 supports :ref:`ml2-term` drivers
and uses them to provide support for Mellanox and NSX devices.
This document explains how to implement support
for other devices using the ML2 infrastructure.

ML2 support is implemented by manually editing configuration files
on the server where ML2 support is to be implemented.
To get started, use SSH to log into the Fuel Master node
and use **su** to gain superuser privileges.
From the Master node,
you can connect to each of the other nodes in the environment
using the **ssh** command with either the node name or IP address.

You can follow an example ml2 configuration at
`<http://www.revolutionlabs.net/2013/11/part-2-how-to-install-openstack-havana_15.html>`.


Configure neutron.conf file
---------------------------

The */etc/neutron/neutron.conf* file
must contain the following lines:

::

    core_plugin = neutron.plugins.ml2.plugin.Ml2Plugin
    service_plugin =

Check init scripts
------------------

Fuel implements ML2 drivers using :ref:`ovs-term`
and only for :ref:`Neutron<neutron-term>` network topologies.
Check your init scripts to ensure that
**neutron-openvswitch-agent** and
**neutron-server** are reading the **ml2.ini** file.

Install packages
----------------

Install the following packages:


- ml2 (neutron-plugin-ml2 for Ubuntu,
  openstack-neutron-ml2 for centos
- brocade

Populate astute.yaml
--------------------
You can now add ML2 data to the quantum_settings section
of the astute.yaml file:

::

    quantum_settings:
      server:
        core_plugin: openvswitch
        service_plugins:
            'neutron.services.l3_router.l3_router_plugin.L3RouterPlugin,
            neutron.services.firewall.fwaas_plugin.FirewallPlugin,
            neutron.services.metering.metering_plugin.MeteringPlugin'
      L2:
        mechanism_drivers:
        type_drivers: "local,flat,l2[:segmentation_type]"
        tenant_network_types: "local,flat,l2[:segmentation_type]"
        flat_networks: '*'
        tunnel_types: l2[:segmentation_type]
        tunnel_id_ranges: l2[:tunnel_id_ranges]
        vxlan_group: "None"
        vni_ranges: l2[:tunnel_id_ranges]

Note the following:

- The following values should be set
  only if L2[enable_tunneling] is true:
  tunnel_types, tunnel_id_ranges, vxlan_group, vni_ranges.

- The l2[<*item*>] settings refer to values
  that are already in the quantum_settings.

- This only shows new items that are related to ml2 configuration.
  The values shown are the defaults that are used
  if no other value is set.

