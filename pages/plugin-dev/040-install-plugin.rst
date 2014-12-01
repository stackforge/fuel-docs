
.. _040-install-plugin:

Installing Fuel plug-ins
========================

.. note:: Fuel plug-ins can be installed only before
          environment is configured and deployed.
          Otherwise, you will have to redeploy
          the environment to enable a plug-in.

Installation procedure is common for all plug-ins, but their requirements differ.

.. note:: In current plug-ins implementation,
          it is impossible to uninstall the plug-in.
          You can use the following workaround to reinstall it:

          ::

             rm /var/www/nailgun/plugins/<plugin_name>
             fuel plugins --force --install <plugin_name>

#. Copy the plug-in on already installed Fuel Master node; ssh can be used for that.
   If you do not have the Fuel Master node yet, see :ref:`virtualbox`.

   ::

         scp fuel_plugin_name-1.0.0.fp root@:master_node_ip:/tmp
         cd /tmp
         fuel plugins --install <fuel_plugin_name>-1.0.0.fp

#. After your environment is created, the checkbox will appear on Fuel web UI *Settings* tab.
   Use the *Settings* tab to enable and configure the plug-in and run the deployment.

.. include:: /pages/plugin-dev/041-fuel-plugin-core.rst
.. include:: /pages/plugin-dev/042-fuel-plugin-other.rst
