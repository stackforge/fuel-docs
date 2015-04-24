
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
`Neutron LBaaS <https://software.mirantis.com/download-mirantis-openstack-fuel-plug-ins/#lbaas>`_
provides Load-Balancing-as-a-Service for Neutron, OpenStack Network Service.

Certification
-------------

The Fuel Plugins Certification is
a set of technical and business
processes that Mirantis uses
to verify Fuel plugins built by vendors,
allowing customer choice of plugins to lead to a predictable outcome.
That means, Mirantis Certification ensures the quality of developed solution.

In terms of Certification, Fuel plugins fall into two categories:

* *Certified* -  thoroughly reviewed, tested and supported by Mirantis.

* *Non-Certified* - reviewed, tested in terms of code and installation procedure,
  but not supported by Mirantis.

For information on development requirements and FAQ, see
`Fuel Plugins <https://wiki.openstack.org/wiki/Fuel/Plugins>`_ wiki page.


Installation steps
------------------

Installation procedure is common for all plugins, but their requirements differ.

#. Download a plugin from
   `Fuel Plugins Catalog <https://software.mirantis.com/download-mirantis-openstack-fuel-plug-ins/>`_.

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


