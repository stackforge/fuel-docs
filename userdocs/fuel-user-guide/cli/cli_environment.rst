.. _cli-environment:

====================
Environment commands
====================

.. include:: /userdocs/snippets/notes/deprecated-cli-v1.rst

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
     - ``fuel env create --name <ENV_NAME> --rel <RELEASE_NUMBER>``
     - By default, Fuel creates an OpenStack environment in the
       ``multinode`` mode, and the ``nova`` network mode.
       To specify other modes, you can add optional arguments:

       .. code-block:: console

        fuel env create --name <ENV_NAME> --rel <RELEASE_NUMBER> \
        --mode ha --network-mode neutron --net-segment-type vlan

       Use the ``set`` action to change the name, mode, or network mode
       for an OpenStack environment:

       .. code-block:: console

        fuel --env <ENV_ID> env set --name <NEW_ENV_NAME> --mode ha_compact

   * - Delete an OpenStack environment.
     - ``fuel --env <ENV_ID> env delete``
     -
   * - Update the OpenStack environment to a newer version. To roll back a
       failed update, use the same command with the previous release number.
     - ``fuel env --update --env <ENV_ID> --rel <RELEASE_NUMBER>``
     -
