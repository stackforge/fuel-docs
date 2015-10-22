.. _install_plugins:


Install the Fuel Plugin
~~~~~~~~~~~~~~~~~~~~~~~

The installation procedure is common for all plugins.
For more details about the plugin installation and its requirements,
see the corresponding plugin documentation.

**To install a Fuel plugin:**

#. Install the Fuel Master node as described in `Install the Fuel Master node`.

#. Boot the Fuel Master node as described in `Boot the Fuel Master node`.

#. Download a plugin from `Fuel Plugins сatalog`_.

#. Read the plugin documentation to learn about prerequisites and limitations.

#. Define variables with values suitable for your environment to be used
   during the plugin installation process or replace them in your command
   line when appropriate.

   .. code-block:: console

       export FUEL_PLUGIN_FILE=fuel-plugin.rpm
       export FUEL_MASTER_NODE=10.20.0.2

#. Copy the plugin to the Fuel Master node.

   .. code-block:: console

        ssh root@:${FUEL_MASTER_NODE} "fuel plugins --install /tmp/${FUEL_PLUGIN_FILE}"

#. Install the plugin by typing:

   .. code-block:: console

         cd /tmp
         fuel plugins --install ${FUEL_PLUGIN_FILE}

#. Create an OpenStack environment as described in `Create a new OpenStack environment`
   in the `Fuel User Guide`.

#. After completing the Create a new OpenStack environment wizard, click *Settings* in the Fuel web UI.

#. Enable plugin in the Fuel web UI as described in the plugin documentation.

#. Configure and deploy your environment as described in `Configure a new environment`
   in the `Fuel User Guide`.


.. seealso::

   - `Fuel plugins CLI <fuel-plugins-cli>`
   - `Fuel plugins catalog`_

.. links
.. _`Fuel plugins catalog`: http://stackalytics.com/report/driverlog?project_id=openstack%2Ffuel
