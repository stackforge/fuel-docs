
.. _install-plugin:


How to install Fuel plug-ins
============================

Mirantis OpenStack 6.0 supports Pluggable architecture.
This new feature provides extending Fuel in a more flexible manner:
there is no need to apply patches manually after Fuel upgrade and support them.

.. note:: Fuel plug-ins can be installed only before
          environment is configured and deployed.
          Otherwise, you will have to redeploy
          the environment to enable a plug-in.

Installation procedure is common for all plug-ins, but their requirements differ.

#. Copy the plug-in on already installed Fuel Master node; ssh can be used for that.
   If you do not have the Fuel Master node yet, see :ref:`virtualbox`.

   ::

         scp fuel_plugin_name-1.0.0.fp root@:master_node_ip:/tmp
         cd /tmp
         fuel plugins --install fuel_plugin_name-1.0.0.fp

#. After your environment is created, the checkbox will appear on Fuel web UI **Settings** tab.
   Use the **Settings** tab to enable and configure the plug-in and run the deployment.

.. include:: /pages/user-guide/fuel-plugins/020-fuel-plugin-core.rst
.. include:: /pages/user-guide/fuel-plugins/030-fuel-plugin-exp.rst