
Fuel plugins and new task type
------------------------------

Fuel web UI now provides a message about installed plugins
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

If the environment has been deployed successfully,
a message will appear on the Fuel web UI informing you
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

LBaaS plugin compatible with controllers in HA mode
+++++++++++++++++++++++++++++++++++++++++++++++++++

The 6.1 compatible LBaaS plugin has been modified so that it
can be deployed on controllers in HA mode. Please note that this
enables the new LBaaS plugin to work with 6.1, but does not make
the plugin itself HA.

Zabbix is no longer supported as a core Fuel component
++++++++++++++++++++++++++++++++++++++++++++++++++++++

Zabbix is now only available as a plugin for Fuel.
For information on prerequisites, installation
and configuration instructions, see the `Fuel Plugins Catalog <https://software.mirantis.com/download-mirantis-openstack-fuel-plug-ins/>`_.

New Plugins for Fuel are available
++++++++++++++++++++++++++++++++++

Using the
`Fuel Plugins Catalog <https://software.mirantis.com/download-mirantis-openstack-fuel-plug-ins/>`_,
you can download and install new Fuel Plugins.
Please, note that they will be available within
a few weeks of the Mirantis OpenStack 6.1 release:

+----------------------+------------+---------+
|  Monitoring          | Networking | Storage |
+======================+============+=========+
| LMA Collector        | VPNaaS     | EMC VNX |
+----------------------+------------+---------+
| Elasticsearch-Kibana | FWaaS      |         |
+----------------------+------------+---------+
| Zabbix               | Mellanox   |         |
+----------------------+------------+---------+
| InfluxDB-Grafana     | Cisco ACI  |         |
+----------------------+------------+---------+
|                      | Calico     |         |
+----------------------+------------+---------+

.. note:: LBaaS plugins compatible with Fuel 6.0 and 6.1 are not
 supported for customer deployments due to the limitations
 of the community solution, including no failover of load-balanced
 objects or HTTPS termination. Mirantis will
 review capabilities of the project in the community again in
 advance of the Fuel 8.0 release.
Unsupported plugins are published to
`DriverLog <http://stackalytics.com/driverlog/?project_id=openstack%2Ffuel&vendor=&release_id=>`_.


