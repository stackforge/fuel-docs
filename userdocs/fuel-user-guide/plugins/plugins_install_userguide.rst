.. _plugins_install_userguide:

Install a Fuel plugin
---------------------

The installation procedure is common for all plugins hosted
in the pre-populated repository at
http://mirror.fuel-infra.org/mos-plugins/centos/

**To install a Fuel plugin:**

#. Log in to the Fuel CLI on the Fuel Master node.

#. Run the :command:`yum install` command:

   .. code-block:: console

      yum install {FUEL_PLUGIN_NAME}

#. Register the plugin in Nailgun:

   .. code-block:: console

      fuel plugins --sync