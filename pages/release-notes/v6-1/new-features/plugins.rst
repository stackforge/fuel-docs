
Fuel plugins and new task type
------------------------------

The Fuel web UI now provides a message about installed plugins
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

If the environment has been deployed successfully,
a message will appear on the Fuel web UI, informing you
about the deployed plugins, their names and description.


Fuel Plugins SDK is released
++++++++++++++++++++++++++++

`Fuel Plugins SDK <https://wiki.openstack.org/wiki/Fuel/Plugins>`_
provides a set of
useful recommendations on planning and driving
Fuel Plugins development process.
What is more, you can now use not only
SDK, but also
`Fuel Plugins Certification page <https://www.mirantis.com/partners/become-mirantis-technology-partner/fuel-plugin-development/fuel-plugin-certification/>`_ at Mirantis
website
to get more details on certification
workflow.

Reboot task type is now introduced
++++++++++++++++++++++++++++++++++

A new task type is now introduced for plugin developers.
During plugin installation, a node can require reboot to
apply multiple changes. With this task type,
it will reboot and come back to the online state
before starting the next tasks. Reboot task type
requires several parameters: timeout (by default, it is set to 300
seconds), UID (for nodes) and priority (the order in which nodes will
be rebooted).

For more information, see the
`Fuel Plugins <https://wiki.openstack.org/wiki/Fuel/Plugins#type:_reboot_parameter>`_ wiki page.

LBaaS is supported in HA
++++++++++++++++++++++++

LBaaS Fuel plugin, previously available
in multi-node mode only, is now supported
in HA.

New Plugins for Fuel are available
++++++++++++++++++++++++++++++++++

Using the
`Fuel Plugins Catalog <https://software.mirantis.com/download-mirantis-openstack-fuel-plug-ins/>`_,
you can download and install the following
plugins for Fuel:

+======================+============+=========+===========+
|  Monitoring          | Networking | Storage | HA        |
+======================+============+=========+===========+
| LMA Collector        | VPNaaS     | EMC VNX | HA fencing|
+----------------------+------------+---------+-----------+
| Elasticsearch-Kibana | FWaaS      |
+----------------------+------------+
| Zabbix               | Contrail   |
+----------------------+------------+
| InfluxDB-Grafana     | Mellanox   |
+----------------------+------------+
|                      | Cisco ACI  |
+----------------------+------------+
|                      | Calico     |
+----------------------+------------+
