
Fuel plugins and new task type
------------------------------

The Fuel web UI now provides a message about installed plugins
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

If environment has been deployed successfully,
a message will appear on the Fuel web UI, informing you
about the deployed plugin, its name and description.


Reboot task type
++++++++++++++++

A new task type is now introduced for plugin developers.
During plugin installation, a node can require reboot to
apply multiple changes. With this task type,
it will reboot and come back to the online state
before starting another tasks. Reboot task type
requires several parameters: timeout (by default, it is set to 300
seconds), UID (for nodes) and priority (the order in which nodes will
be rebooted).

For more information, see the
`Fuel Plugins <https://wiki.openstack.org/wiki/Fuel/Plugins#type:_reboot_parameter>`_ wiki page.

New Plugins for Fuel
++++++++++++++++++++

Using the
`Fuel Plugins Catalog <https://software.mirantis.com/download-mirantis-openstack-fuel-plug-ins/>`_,
you can download and install the following
plugins for Fuel:

+======================+============+=========+===========+
|  Monitoring          | Networking | Storage | HA        |
+======================+============+=========+===========+
| LMA Collector        | VPNaaS     | EMC VNX | HA fencing|
+----------------------+------------+---------+-----------+
| Elastic Search&Kibana| FWaaS      |         |           |
+----------------------+------------+---------+-----------+
| Zabbix               | Contrail   |         |           |
+----------------------+------------+---------+-----------+


