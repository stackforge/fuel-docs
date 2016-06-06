.. _cli_plugins:

Plugin management commands
--------------------------

The following table describes the plugin management commands
available in the Fuel CLI.

.. note::
   To view the list of all available options, use the
   ``fuel plugins --help`` command.

.. list-table:: **Plugin management commands**
   :widths: 10 10 20
   :header-rows: 1

   * - Description
     - Command
     - Example
   * - Install a Fuel plugin from an ``.fp`` package.
     - ``fuel plugins --install <fuel-plugin-file>``
     -
   * - Install a Fuel plugin from an ``.rpm`` package.
     - ``yum install <fuel-plugin-file>``
     -
   * - Register a Fuel plugin installed using 
       ``yum install`` from an ``.rpm`` package in Nailgun.
     - ``fuel plugins --register <fuel-plugin-name>==<fuel-plugin-version>``
     -
   * - View the list of installed plugins.
     - ``fuel plugins --list``
     - ::

         fuel plugins --list

       **System response:**

       ::

          id |    name                   | version  | package_version
          ---|---------------------------|----------|----------------
          1  | <fuel-plugin-name>        | 1.0.0    | 2.0.0

   * - Remove a plugin.
     - ``fuel plugins --remove <fuel-plugin-name>==<fuel-plugin-version>``
     -
   * - Upgrade a Fuel plugin installed from the ``.rpm`` package.

       .. note::
          Upgrades are not supported for major versions of plugins installed
          from the ``.rpm`` package, as well as for plugins installed from the
          ``.fp`` packages. For example, you can only upgrade a Fuel plugin
          installed from an ``.rpm`` package from version 
          1.0.0 to 1.0.1.
     - ``fuel plugins --update <fuel-plugin-file>``
     -
