.. _cli-environment:

Environment commands
--------------------

The following table describes environment management commands
available in the Fuel CLI.

.. list-table:: **Environment commands**
   :widths: 10 10 20
   :header-rows: 1

   * - Description
     - Command
     - Example
   * - View the list of environments.
     - ``fuel env``
     -
   * - Create an environment.
     - ``fuel env create --name <env_name> --rel <release_number>``
     - By default, Fuel creates an OpenStack environment in the
       ``multinode`` mode, and the ``nova`` network mode.
       To specify other modes, you can add optional arguments:

       .. code-block:: console

        fuel env create --name <env_name> --rel <release_number> \
        --mode ha --network-mode neutron --net-segment-type vlan

       Use the ``set`` action to change the name, mode, or network mode
       for an OpenStack environment:

       .. code-block:: console

        fuel --env <env_id> env set --name <NewEnvName> --mode ha_compact

   * - Delete an OpenStack environment.
     - ``fuel --env <env_id> env delete``
     -
   * - Update the OpenStack environment to a newer version. To roll back a
       failed update, use the same command with the previous release number.
     - ``fuel env --update --env <env_id> --rel <release_number>``
     -
