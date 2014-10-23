
.. _neutron-cinder-plugin:

Install Neutron/Cinder plugins
==============================

Mirantis OpenStack 6.0 supports Pluggable architecture;
Neutron and Cinder plugins are now enabled.

To install Cinder or Neutron plugin, follow these steps:

1. Install the latest version of Fuel (6.0 or newer is supported)
   See :ref:`virtualbox`

2. Copy the plugin on the master node; ssh can be used for that

::

       scp fuel_plugin_name-0.1.0.fp root@:master_node_ip:/tmp
       cd /tmp
       fuel plugins --install fuel_plugin_name-0.1.0.fp

3. After your environment is created, you will be able to see the checkbox on Settings tab.
   Use the Settings tab to enable and configure the plugin and run deployment.
