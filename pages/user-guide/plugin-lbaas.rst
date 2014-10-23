.. _plugin-lbaas:

How to install LBaaS plugin
===========================

This plugin provides `Neutron LBaaS <https://wiki.openstack.org/wiki/Neutron/LBaaS/
PluginDrivers>`_ for a multinode mode.

Requirements
------------

Note that LBaaS plugin can be enabled
only in **Multinode** mode environments.

Installation
------------

1. Download the plugin from TODO: <link>.

2. Install LBaaS plugin. For instructions, see :ref:`install-plugin`.

3. After plugin is installed, create a **multinode**
   environment with Neutron.

Configuration
-------------

Enable the plugin on the **Settings** tab of the Fuel web UI.

.. image:: /_images/fuel_plugin_lbaas_configuration.png

For further steps, see `Configure Neutron LBaaS <https://wiki.openstack.org/wiki/Neutron/LBaaS/UI>`_ in the official OpenStack documentation.
