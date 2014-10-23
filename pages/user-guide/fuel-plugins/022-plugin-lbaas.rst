.. _plugin-lbaas:

LBaaS plug-in
+++++++++++++

This plug-in provides `Neutron LBaaS <https://wiki.openstack.org/wiki/Neutron/LBaaS/
PluginDrivers>`_ for a multinode mode.

**Requirements**


Note that LBaaS plug-in can be enabled
only in **Multinode** mode environments.

**Installation**


#. Download the plug-in from TODO: <link>.

#. Install LBaaS plug-in. For instructions, see :ref:`install-plugin`.

#. After plugin is installed, create a **multinode**
   environment with Neutron.

**Configuration**

#. Enable the plugin on the *Settings* tab of the Fuel web UI.

.. image:: /_images/fuel_plugin_lbaas_configuration.png

#. For further steps, see
   `Configure Neutron LBaaS <https://wiki.openstack.org/wiki/Neutron/LBaaS/UI>`_ in the official OpenStack documentation.
