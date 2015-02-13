
Fuel plugins and new task type
------------------------------

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

HA fencing
++++++++++

<https://blueprints.launchpad.net/fuel/+spec/fencing-in-puppet-manifests>`_.

LMA Collector
+++++++++++++

VNPaaS
++++++

VPNaaS plugin for Neutron is now certified.

FWaaS
+++++

Elastic Search&Kibana plugin
++++++++++++++++++++++++++++

Contrail
++++++++

EMC
+++

Mellanox Infiniband
+++++++++++++++++++

Zabbix
++++++
