.. _plugin-vpnaas:

Neutron VPNaaS
++++++++++++++

VPNaaS plug-in provides `Neutron VPNaaS <https://wiki.openstack.org/wiki/Neutron/VPNaaS>`__ functionality:  VPN-as-a-Service with IPsec and OpenSWAN.

Requirements
^^^^^^^^^^^^

VPNaaS plug-in is compatible with OpenStack Juno Release 2014.2
and supports Ubuntu 14.04 LTS and CentOS 6.5-based operating systems.

Installation
^^^^^^^^^^^^

#. Download the plug-in from `<https://software.mirantis.com/fuel-plug-ins>`_.

#. Move this file to the Fuel
   Master node and install it using the following command:

   ::

        fuel plugins --install vpnaas-plugin-1.0.0.fp

#. After plug-in is installed, create an environment with Neutron.

Configuration
^^^^^^^^^^^^^

#. Enable the plug-in on the *Settings* tab of the Fuel web UI.

   .. image:: /_images/vpnaas_plugin.png

#. For further steps, see
   `Configure VPN-as-a-Service (VPNaaS) <https://www.mirantis.com/blog/mirantis-openstack-express-vpn-service-vpnaas-step-step/>`_ from Mirantis blogpost.

