.. _install_plugins:


Install the Fuel Plugins
========================

Installation procedure is common for all plugins, but their requirements differ.

#. Download a plugin from `Fuel Plugins сatalog`_.

#. Get acquainted with the plugin documentation to learn about
   prerequisites and limitations.

#. Copy the plugin on the already installed Fuel Master node.
   If you do not have the Fuel Master node yet, see :ref:`quickstart-guide`:

   .. code-block:: console

         scp <fuel_plugin-file> root@:<the_Fuel_Master_node_IP>:/tmp

#. Log into the Fuel Master node and install the plugin:

   .. code-block:: console

         cd /tmp
         fuel plugins --install <fuel-plugin-file>

#. After your environment is created, open *Settings* tab on the
   Fuel web UI, scroll down the page and select the plugin checkbox.
   Finish environment configuration and click *Deploy* button.

For Fuel plugins CLI reference, see :ref:`the corresponding section <fuel-plugins-cli>`.

.. seealso::

   - :ref:`Fuel Plugins Overview`
   - :ref:`Prerequisites`
   - :ref:`Develop a Fuel plugin`
   - :ref:`Prerequisites`
   - :ref:`View Fuel plugins`

.. links
.. _`Fuel plugins catalog`: https://www.mirantis.com/products/openstack-drivers-and-plugins/fuel-plugins/
