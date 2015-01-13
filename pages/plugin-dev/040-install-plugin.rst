
.. _040-install-plugin:

Installing Fuel plug-ins
========================

.. note:: Fuel plug-ins can be installed only before
          environment is configured and deployed.
          Otherwise, you will have to redeploy
          the environment to enable a plug-in.

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

#. Install Fuel, either on Virtualbox (following the instructions in
   `the Quick Start Guide <https://software.mirantis.com/quick-start/>`_ ) or on bare metal
   (following the instructions in :ref:`create-media-ug`.

#. Copy the plug-in on the installed Fuel Master node:

   ::

         scp fuel_plugin_name-1.0.0.fp root@:<the_Fuel_Master_node_ip>:/tmp
         cd /tmp
         fuel plugins --install <fuel_plugin_name>.fp

#. After your environment is created, open *Settings* tab on the
   Fuel web UI and select the plug-in checkbox. After that you
   can deploy the environment.
