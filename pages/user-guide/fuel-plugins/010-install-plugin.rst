
.. _install-plugin:

Install Fuel plug-ins
=====================

Beginning with Mirantis OpenStack 6.0,
Fuel features the ability to install plug-ins when you deploy your environment.
Plug-ins are downloadable software components that extend the functionality of your environments in a flexible, repeatable and reliable manner.

For example,
`Neutron LBaaS <https://software.mirantis.com/download-mirantis-openstack-fuel-plug-ins/#lbaas>`_
provides Load-Balancing-as-a-Service for Neutron, OpenStack Network Service.

Plug-ins fall into two categories:

* *Certified*: certified plug-ins are thoroughly reviewed, tested and supported by Mirantis.

* *Non-Certified*: non-certified plug-ins are reviewed by Mirantis, but not supported or guaranteed.

All plug-ins, both certified and non-certified, are digitally signed and hosted by Mirantis.

.. SeeAlso::

      If you are interested in developing your own plug-in for Fuel,
      see the :ref:`plugin-dev`.

How to install Fuel plug-ins
----------------------------

Installation procedure is common for all plug-ins, but their requirements differ.

In current plug-ins implementation,
it is impossible to uninstall the plug-in.
You can use the following workaround to reinstall it:

::

          rm /var/www/nailgun/plugins/<plugin_name>
          fuel plugins --force --install <plugin_name>

#. Download a plug-in from
   `Plugin Catalog <https://software.mirantis.com/download-mirantis-openstack-fuel-plug-ins/>`_.

#. Download the plug-in documentation to get acquainted with
   prerequisites and limitations.

#. Copy the plug-in on already installed Fuel Master node; ssh can be used for that.
   If you do not have the Fuel Master node yet, see :ref:`virtualbox`.

   ::

         scp fuel_plugin_name-1.0.0.fp root@:<the_Fuel_Master_node_ip>:/tmp
         cd /tmp
         fuel plugins --install <fuel_plugin_name>.fp

#. After your environment is created, open *Settings* tab on the
   Fuel web UI and select the plug-in checkbox. After that you
   can deploy the environment.
