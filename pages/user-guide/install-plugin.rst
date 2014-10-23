.. _install-plugin:

How to install Fuel plugins
===========================

Mirantis OpenStack 6.0 supports Pluggable architecture;
Neutron and Cinder plugins are now enabled.
(eli: I can propose to remove this line at all, because as I mentioned in fact
plugins are related not only to Neutron or Cinder)

TODO(eli): add a link on ready plugins, also we can provide links directly
documentation for GlusterFS plugin or LBaaS plugin

To install a plugin, follow these steps:

1. Copy the plugin on already installed Fuel Master node; ssh can be used for that.
   If you do not have the Fuel Master node yet, see :ref:`virtualbox`.

::

       scp fuel_plugin_name-1.0.0.fp root@:master_node_ip:/tmp
       cd /tmp
       fuel plugins --install fuel_plugin_name-1.0.0.fp

2. After your environment is created, the checkbox will appear on Fuel web UI **Settings** tab.
   Use the **Settings** tab to enable and configure the plugin and run the deployment.

.. include:: /pages/user-guide/plugin-gluster.rst
.. include:: /pages/user-guide/plugin-lbaas.rst
