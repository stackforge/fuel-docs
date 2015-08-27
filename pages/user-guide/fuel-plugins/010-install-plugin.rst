
.. _install-plugin:


Install Fuel plugins
====================

Overview
--------

Beginning with Mirantis OpenStack 6.0,
Fuel features the ability to install plugins before you deploy your environment.
Plugins are downloadable software components that extend the functionality of your
environments in a flexible, repeatable and reliable manner.

For example,
`Neutron VPNaaS <https://software.mirantis.com/download-mirantis-openstack-fuel-plug-ins/#lbaas>`_
provides flexible IPSec VPN feature-set supported by Neutron CLI and,
more simply, in Horizon, by adding a new set of tabs to Network. 

Validation
----------

The Fuel Plugins Validation is a set of technical and business
processes that Mirantis uses to verify Fuel plugins built by vendors,
allowing a customer's choice of plugins to lead to a predictable outcome.
That means, Mirantis Validation ensures the quality of developed solution.

In terms of Validation, Fuel plugins fall into two categories:

* *Validated* -  thoroughly reviewed, tested and supported by Mirantis.

* *Non-Validated* - reviewed, tested in terms of code and installation procedure,
  but not supported by Mirantis.


See the validation requirements at
`Mirantis website <https://www.mirantis.com/partners/become-mirantis-unlocked-partner/fuel-plugin-development/fuel-plugin-validation/>`_.

For information on development requirements and FAQ, see
`Fuel Plugins <https://wiki.openstack.org/wiki/Fuel/Plugins>`_ wiki page.


Installation steps
------------------

Installation procedure is common for all plugins, but their requirements differ.

#. Download a plugin from
   `Fuel Plugins Catalog <https://www.mirantis.com/products/openstack-drivers-and-plugins/fuel-plugins/>`_.

#. Get acquainted with the plugin documentation to learn about
   prerequisites and limitations.

#. Copy the plugin on already installed Fuel Master node.
   If you do not have the Fuel Master node yet, see `Mirantis Quick Start Guide <https://software.mirantis.com/quick-start/>`_.

   ::

         scp <fuel_plugin-file> root@:<the_Fuel_Master_node_IP>:/tmp

#. Log into the Fuel Master node and install the plugin:

   ::

         cd /tmp
         fuel plugins --install <fuel-plugin-file>

#. After your environment is created, open *Settings* tab on the
   Fuel web UI, scroll down the page and select the plugin checkbox.
   Finish environment configuration and click *Deploy* button.

For Fuel plugins CLI reference, see :ref:`the corresponding section <fuel-plugins-cli>`.


