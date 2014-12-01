.. _install-plugin:

How to install Fuel plugins
===========================

Mirantis OpenStack 6.0 supports Pluggable architecture;

TODO(eli): add link on the page with list of plugins

To install a plugin, follow these steps:

1. Copy the plugin on already installed Fuel Master node; ssh can be used for that.
   If you do not have the Fuel Master node yet, see :ref:`virtualbox`.

::

       scp fuel_plugin_name-1.0.0.fp root@:master_node_ip:/tmp
       cd /tmp
       fuel plugins --install fuel_plugin_name-1.0.0.fp

2. After your environment is created, the checkbox will appear on Fuel web UI **Settings** tab.
   Use the **Settings** tab to enable and configure the plugin and run the deployment.


