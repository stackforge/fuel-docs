
.. _install-plugin:

Fuel Plugins
============

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
That means, Mirantis Certification guarantees the quality of developed solution.

In terms of Certification, Fuel plugins fall into two categories:

* *Certified* -  thoroughly reviewed, tested and supported by Mirantis.

* *Non-Certified* - reviewed by Mirantis, but not supported or guaranteed.

All plugins, both certified and non-certified, are digitally signed and hosted by Mirantis.
s
If you are interested in certifying your plugin, see Fuel Plugin Certification Playbook TBD



Installing Fuel plugins
-----------------------

Installation procedure is common for all plugins, but their requirements differ.

In current plugins implementation,
it is impossible to uninstall the plugin.
You can use the following workaround to reinstall it:

::

          rm /var/www/nailgun/plugins/<plugin_name>
          fuel plugins --force --install <plugin_name>

#. Download a plugin from
   `Fuel Plugins Catalog <https://software.mirantis.com/download-mirantis-openstack-fuel-plug-ins/>`_.

#. Get acquainted with the plugin documentation to learn about
   prerequisites and limitations.

#. Copy the plugin on already installed Fuel Master node.
   If you do not have the Fuel Master node yet, see `Mirantis Quick Start Guide <https://software.mirantis.com/quick-start/>`_.

   ::

         scp <fuel_plugin_name-1.0.0>.fp root@:<the_Fuel_Master_node_IP>:/tmp

  
  .. note:: Beginning with 6.1 Fuel release, *.fp* file format is replaced
            with the *.rpm*. That means, you should change *<fuel_plugin_name-1.0.0>.fp*
            into *<fuel_plugin_name-1.0.0>.noarch.rpm* format. The installation
            command now looks like *yum install fuel_<plugin_file name>.noarch.rpm*.

#. Log into the Fuel Master node and install the plugin:

   ::
         cd /tmp
         fuel plugins --install <fuel_plugin_name>.fp

#. After your environment is created, open *Settings* tab on the
   Fuel web UI and select the plugin checkbox. Finish environment configuration
   and click *Deploy* button.

.. SeeAlso:: If you are interested in developing your own plugin for Fuel,
             see `Plugins <https://wiki.openstack.org/Fuel/Plugins>`_ wiki page.
