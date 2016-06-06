.. _cli-vip:

Virtual IP management commands
------------------------------

The following table describes virtual IP management commands
available in the Fuel CLI.

.. list-table:: **Virtual IP management commands**
   :widths: 10 10 20
   :header-rows: 1

   * - Description
     - Command
     - Example
   * - Download a virtual IP (VIP) configuration for a specific environment
       to a specified file.

       Variables:

       * ``<ENV_ID>`` - an environment ID
       * ``<FILE_NAME>`` - a name of the ``yaml`` file where to save a VIP
         configuration (optional).

     - ``fuel --env <ENV_ID> vip --download --file <FILE_NAME>``
     - .. code-block:: console

        fuel --env 1 vip --download --file vip.yaml
   * - Upload a VIP configuration for a specific environment from a
       specified file.
     - ``fuel --env <ENV_ID> vip --upload --file <FILE>``
     - .. code-block:: console

        fuel --env 1 vip --upload --file vip.yaml
