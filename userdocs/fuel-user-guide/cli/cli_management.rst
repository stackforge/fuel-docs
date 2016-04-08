.. _cli-management:

Fuel management commands
------------------------

The following table describes basic management commands
available in the Fuel CLI.

.. list-table:: **Management and help commands**
   :widths: 10 10 20
   :header-rows: 1

   * - Description
     - Command
     - Example
   * - View the list of all global optional arguments and namespaces.
     - ``fuel --help``
     - View the list of actions and optional arguments for a namespace:

       .. code-block:: console

         fuel <namespace> --help
   * - View the list of all available releases
     - ``fuel release``

       ``fuel rel``
     - View the information about a specific release:

       .. code-block:: console

          fuel rel --rel <release_number>

   * - Get the information about the Fuel version.
     - ``fuel fuel-version``
     -
   * - Change the Fuel password. You can use the ``--user=admin`` and
       ``--password=test`` flags to provide user name and password with
       all Fuel CLI commands.
     - ``fuel user --change-password --new-pass=<new_password>``
     - 
