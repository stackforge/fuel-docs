.. _install_plugins:


Install the Fuel Plugins
========================

The installation procedure is common for all plugins.
For more details about the plugin installation and its requirements,
see the corresponding plugin documentation.

#. Install the Fuel Master node as described in :ref:`Install the Fuel Master node`.

#. Boot the Fuel Master node as described in :ref:`Boot the Fuel Master node`.

#. Download a plugin from `Fuel Plugins сatalog`_.

#. Read the plugin documentation to learn about prerequisites and limitations.

#. Define variables with values suitable for your environment to be used
   during the plugin installation process.

   .. code-block:: console

       export FUEL_PLUGIN_FILE=fuel-plugin.rpm
       export FUEL_MASTER_NODE=10.20.0.2

#. Copy the plugin to the Fuel Master node.

   .. code-block:: console

        scp $FUEL_PLUGIN_FILE root@:$FUEL_MASTER_NODE:/tmp

#. Log in to the Fuel Master node CLI as root.

#. Install the plugin by typing:

   .. code-block:: console

         cd /tmp
         fuel plugins --install $FUEL_PLUGIN_FILE

#. Create an OpenStack environment as described in `Create a new OpenStack environment`
   in the `Fuel User Guide`.

#. After completing the Create a new OpenStack environment wizard, click *Settings* in Fuel web UI.

#. Enable plugin in the Fuel UI as described in the plugin documentation.

#. Configure and deploy your environment as described in `Configure a new environment`
   in the `Fuel User Guide`.


.. seealso::

   - :ref:`Fuel plugins CLI <fuel-plugins-cli>`
   - `Fuel plugins catalog`_

.. links
.. _`Fuel plugins catalog`: http://stackalytics.com/report/driverlog?project_id=openstack%2Ffuel
