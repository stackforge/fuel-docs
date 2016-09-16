.. _plugins_update_userguide:

Update a Fuel plugin
---------------------

The update procedure is common for all plugins hosted
in the pre-populated repository.

**To update a Fuel plugin:**

#. Run the :command:`yum update` command:

   .. code-block:: console

      yum update {FUEL_PLUGIN_NAME}

#. Register the plugin in Nailgun:

   .. code-block:: console

      fuel plugins --sync