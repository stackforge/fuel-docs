.. _cli-provision:

=====================
Provisioning commands
=====================

.. include:: /userdocs/snippets/notes/deprecated-cli-v1.rst

The following table describes the usage of the :command:`fuel provisioning`
command available in the Fuel CLI usage.

.. list-table:: **Provisioning commands**
   :widths: 7 10
   :header-rows: 1

   * - Description
     - Command
   * - Delete current provisioning data
     - ``fuel --env <ENV> provisioning --delete``
   * - Download current provisioning data
     - ``fuel --env <ENV> provisioning --download``
   * - Download default provisioning data
     - ``fuel --env <ENV> provisioning --default``
   * - Get default provisioning information for specific nodes
     - ``fuel --env <ENV> provisioning --default --node <NODE_ID [NODE_ID ...]>``
   * - Upload provisioning information to a specific directory
     - ``fuel --env <ENV> provisioning -u --dir path/to/directory``
   * - Download provisioning information to a specific directory
     - ``fuel --env <ENV> provisioning -d --dir path/to/directory``