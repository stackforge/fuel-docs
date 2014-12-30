.. _0412-plugin-lbaas:

Neutron LBaaS
+++++++++++++

This plug-in provides `Neutron LBaaS <https://wiki.openstack.org/wiki/Neutron/LBaaS/
PluginDrivers>`_ for environments with multiple Compute nodes.

Limitations
^^^^^^^^^^^

LBaaS plug-in can be enabled
only in multi-node environments.

Installation
^^^^^^^^^^^^

#. Download the plug-in from `<https://software.mirantis.com/fuel-plug-ins>`_.

#. Install the LBaaS plug-in. For instructions, see :ref:`040-install-plugin`.

#. After plug-in is installed, create a *multi-node*
   environment with Neutron.

Configuration
^^^^^^^^^^^^^

#. Enable the plug-in on the *Settings* tab of the Fuel web UI.

   .. image:: /_images/fuel_plugin_lbaas_configuration.png

#. For further steps, see
   `Configure Neutron LBaaS <https://wiki.openstack.org/wiki/Neutron/LBaaS/UI>`_ in the official OpenStack documentation.

How to use
^^^^^^^^^^

* Scenario 1: Enable load balancing for tenant

  #. Log in as admin.

  #. Go to the *Advanced Services* screen and enable *Load Balancing service* for *Project*.

  #. Go to the *Service properties* and add *Device* into the list of available devices.

* Scenario 2: Create new balanced service

  #. Log in as user.

  #. Go to the *Load Balancing* screen.

  #. In *VIPs* tab (it opens by default), click *Create VIP*.

  #. Provide *VIP name*, click *OK*. The screen switches to *VIP Overview*.

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

