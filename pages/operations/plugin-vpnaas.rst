.. _plugin-vpnaas:

VPNaaS Neutron plugin
=====================

VPNaaS is an Experimental plugin.
<add external links&intro information (what this plugin serves for)>

Requirements
------------

Installation
------------

1. Clone the `fuel-plugins <https://github.com/stackforge/fuel-plugins>`_ repo.

2. Install Fuel Plugin Builder:

   ::

       pip install fuel-plugin-builder

3. Execute **fpb --build vpnaas**.
   After that, *vpnaas-plugin-1.0.0.fp* plugin file will be created.

4. Move this file to the Fuel
   Master node and install it using the following command:

  ::

     fuel plugins --install vpnaas-plugin-1.0.0.fp

Configuration
-------------

Enable the plugin on the **Settings** tab of the Fuel web UI.

<add a screenshot>
