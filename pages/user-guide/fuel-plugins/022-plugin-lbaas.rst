.. _plugin-lbaas:

Neutron LBaaS
+++++++++++++

This plug-in provides `Neutron LBaaS <https://wiki.openstack.org/wiki/Neutron/LBaaS/
PluginDrivers>`_ for a multi-node mode.

**Requirements**

Note that LBaaS plug-in can be enabled
only in *multi-node* environments.

**Installation**

#. Download the plug-in from `<https://software.mirantis.com/fuel-plugins>`_.

#. Install LBaaS plug-in. For instructions, see :ref:`install-plugin`.

#. After plugin is installed, create a *multi-node*
   environment with Neutron.

**Configuration**

#. Enable the plug-in on the *Settings* tab of the Fuel web UI.

   .. image:: /_images/fuel_plugin_lbaas_configuration.png

#. For further steps, see
   `Configure Neutron LBaaS <https://wiki.openstack.org/wiki/Neutron/LBaaS/UI>`_ in the official OpenStack documentation.
