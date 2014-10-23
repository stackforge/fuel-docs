.. _plugin-vpnaas:

VPNaaS Neutron plugin
=====================

VPNaaS is an experimental plugin.

Requirements
------------

Installation
------------

Clone the fuel-plugins repo from https://github.com/stackforge/fuel-plugins
Install Fuel Plugin Builder using documentation from the fuel-plugins repo
Execute fpb --build , where is the path to the plugin's main folder (vpnaas)
vpnaas-plugin-1.0.0.fp plugin file will be created
Move this file to the Fuel master node and install it using the following command: fuel plugins --install vpnaas-plugin-1.0.0.fp

Configuration
-------------
