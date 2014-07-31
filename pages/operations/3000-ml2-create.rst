
.. _ml2-create-ops:

Creating and Configuring ML2 Drivers
====================================

Fuel 5.1 supports :ref:`ml2-term` drivers
and uses them to provide support for Mellanox and NSX devices.

You can now add ML2 data to the quantum_settings section
of the *node.yaml* file,
which will update the *astute.yaml* file:

::

        quantum_settings:
          server:
            core_plugin: openvswitch
            service_plugins:
                'neutron.services.l3_router.l3_router_plugin.L3RouterPlugin,
                neutron.services.firewall.fwaas_plugin.FirewallPlugin,
                neutron.services.metering.metering_plugin.MeteringPlugin'
          L2:
            provider:'ml2'
            mechanism_drivers: 'openvswitch'
            type_drivers: "local,flat,l2[:segmentation_type]"
            tenant_network_types: "local,flat,l2[:segmentation_type]"
            flat_networks: '*'
            segmentation-type:'vlan'
            tunnel_types: l2[:segmentation_type]
            tunnel_id_ranges: l2[:tunnel_id_ranges]
            vxlan_group: 'None'
            vni_ranges: l2[:tunnel_id_ranges]

Note the following:

- The following values should be set
  only if L2[enable_tunneling] is true:
  tunnel_types, tunnel_id_ranges, vxlan_group, vni_ranges.

- The l2[:item] settings refer to values
  that are already in the quantum_settings.

- This only shows new items that are related to ml2 configuration.
  The values shown are the defaults that are used
  if no other value is set.

- All Neutron component packages are available to download.

