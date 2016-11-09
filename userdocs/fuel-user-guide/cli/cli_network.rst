.. _cli-network:

================
Network commands
================

.. include:: /userdocs/snippets/notes/deprecated-cli-v1.rst

You can manage network configurations using the following command:

.. code-block:: console

   fuel --env <ENV_ID> network <action> --dir <PATH>

.. list-table::
   :widths: 10 10
   :header-rows: 0

   * - Value
     - Description
   * - ``<ENV_ID>``
     - ID of an OpenStack environment
   * - ``<PATH>``
     - Path to directory
   * - ``<action>``
     - Action that will be performed for the network configuration.

The following table describes network management commands
available in the Fuel CLI.

.. list-table:: **Network management commands**
   :widths: 10 10 20
   :header-rows: 1

   * - Command
     - Description
     - Example
   * - ``fuel --env <ENV_ID> network --download --dir <PATH>``
     - Download network configuration for a specific environment.
     - Download network configuration for
       the environment with ID ``1`` to the current directory:

       .. code-block:: console

          fuel --env 1 network --download

   * - ``fuel --env <ENV_ID> network --upload --dir <PATH>``
     - Upload network configuration for a specific environment.
     - Upload network configuration for the environment with
       ID ``1`` from the current directory:

       .. code-block:: console

          fuel --env 1 network --upload

       .. note::
         The :command:`fuel network` command can update configuration of
         all networks in an OpenStack environment, as well as corresponding
         Neutron parameters. However, you must update the related VIPs
         and network templates separately using the corresponding Fuel
         CLI commands.
   * - ``fuel --env <ENV_ID> network --verify --dir <PATH>``
     - Verify network configuration. Verification does not work for
       multiple cluster networks, when an environment has more than one
       node group.
     - Verify network configuration of the OpenStack environment with ID ``1``
       from the current directory:

       .. code-block:: console

          fuel --env 1 network --verify

To view interaction with the Nailgun API, run the corresponding command with
the :option:`--debug` option.

**Example:**

.. code-block:: console

   fuel --env <ENV_ID> network --download --dir <PATH> --debug
