.. _cli-network-template:

====================================
Network template management commands
====================================

.. include:: /userdocs/snippets/notes/deprecated-cli-v1.rst

The following table describes network template management commands
available in the Fuel CLI.

.. list-table:: **Network template management commands**
   :widths: 10 10 20
   :header-rows: 1

   * - Description
     - Command
     - Example
   * - Upload a network template.
     - ``fuel --env <ENV_ID> network-template --upload --dir <PATH>``
     - .. code-block:: console

        fuel --env 1 network-template --upload --dir /home/stack/

   * - Download a network template to the current directory.
     - ``fuel --env <ENV_ID> network-template --download``
     - .. code-block:: console

        fuel --env 1 network-template --download
   * - Delete a network template.
     - ``fuel --env <ENV_ID> network-template --delete``
     - .. code-block:: console

        fuel --env 1 network-template --delete
