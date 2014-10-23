.. _plugin-vpnaas:

VPNaaS Neutron plugin
+++++++++++++++++++++

VPNaaS is an Experimental plugin that provides `Neutron VPNaaS <https://wiki.openstack.org/wiki/Neutron/VPNaaS>`__ functionality.

**Requirements**

VPNaaS plugin is compatible with OpenStack Juno Release 2014.2.
It also supports Ubuntu 14.04 LTS and CentOS 6.5.

**Installation**

#. Download the plugin from TODO: <link>.

#. Move this file to the Fuel
   Master node and install it using the following command:

   ::

        fuel plugins --install vpnaas-plugin-1.0.0.fp

#. After plugin is installed, create an environment with Neutron.


**Configuration**

Enable the plugin on the *Settings* tab of the Fuel web UI.

For further steps, see `Configure VPN-as-a-Service (VPNaaS) <https://www.mirantis.com/blog/mirantis-openstack-express-vpn-service-vpnaas-step-step/>`__ from Mirantis blogpost.

