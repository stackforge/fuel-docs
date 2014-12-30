.. _plugin-lbaas:

Neutron LBaaS
+++++++++++++

This plug-in provides `Neutron LBaaS <https://wiki.openstack.org/wiki/Neutron/LBaaS/
PluginDrivers>`_ for environments with multiple compute nodes.

**Limitations**

Note that LBaaS plug-in can be enabled
only in multi-node environments.

**Installation**

#. Download the plug-in from `<https://software.mirantis.com/fuel-plug-ins>`_.

#. Install LBaaS plug-in. For instructions, see :ref:`install-plugin`.

#. After plugin is installed, create a *multi-node*
   environment with Neutron.

**Configuration**

#. Enable the plug-in on the *Settings* tab of the Fuel web UI.

   .. image:: /_images/fuel_plugin_lbaas_configuration.png

#. For further steps, see
   `Configure Neutron LBaaS <https://wiki.openstack.org/wiki/Neutron/LBaaS/UI>`_ in the official OpenStack documentation.

**How to use**

* Scenario 1: Enable load balancing for tenant

  #. Log in as admin.

  #. Go to *Advanced Services* screen and enable *Load Balancing service* for *Project*.

  #. Go to *Service properties* and add *Device* into the list of available devices.

* Scenario 2: Create new balanced service

  #. Log in as user.

  #. Go to *Load Balancing* screen.

  #. In *Vips* tab (it opens by default), click *Create Vip*.

  #. Provide *Vip name*, click *Ok*. The screen switches to *Vip Overview*.

  #. Add members, change balancing method, health monitors, etc.

* Scenario 3: Put member (backend server) out of service

  #. Log in as user.

  #. Go to *Load Balancing* screen, *Members* tab.

  #. Find the member by address.

  #. In the commands selector, choose *Put Offline* and confirm it.

* Scenario 4: Create custom health monitor

  #. Log in as user.

  #. Go to *Load Balancing* screen, *Health Monitors* tab.

  #. Click *Add New Monitor*, provide details.
     Added monitor will be available in selector in Vip editor.

