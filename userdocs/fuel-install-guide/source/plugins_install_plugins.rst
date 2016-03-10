.. _plugins_install_plugins:


Install a Fuel plugin
---------------------

The installation procedure is common for all plugins.
For more details about the plugin installation,
see the corresponding plugin documentation.

**To install a Fuel plugin:**

#. Install the Fuel Master node as described in
   :ref:`Install the Fuel Master node <install_install_fuel_master_node>`.

#. Boot the Fuel Master node as described in
   :ref:`Log in to the Fuel Master node <install_login_fuel_master_node>`.

#. Download a plugin from `Fuel Plugins
   сatalog <http://stackalytics.com/report/driverlog?project_id=openstack%2Ffuel>`_.

#. Read a Plugin Guide to learn about prerequisites and limitations.

#. Define variables with values suitable for your environment to be used
   during the plugin installation process or replace them in your command
   line when appropriate.

   .. code-block:: console

      export FUEL_PLUGIN_FILE=fuel-plugin.rpm
      export FUEL_MASTER_NODE=10.20.0.2

#. Copy the plugin to the Fuel Master node.

   .. code-block:: console

      scp ${FUEL_PLUGIN_FILE} root@:${FUEL_MASTER_NODE}:/tmp

#. Install the plugin by typing:

   .. code-block:: console

      ssh root@:${FUEL_MASTER_NODE} "fuel plugins --install /tmp/${FUEL_PLUGIN_FILE}"

#. Create an OpenStack environment as described in
   `Create a new OpenStack environment` in the `Fuel User Guide`.

#. After completing the Create a new OpenStack environment wizard, click 
   :guilabel:`Settings` in the Fuel web UI.

#. Enable plugin in the Fuel web UI as described in the plugin documentation.

#. Configure and deploy your environment as described in
   `Configure a new environment` in the `Fuel User Guide`.


.. see::

   - Fuel plugins CLI
   - `Fuel plugins catalog
     <http://stackalytics.com/report/driverlog?project_id=openstack%2Ffuel>`__
