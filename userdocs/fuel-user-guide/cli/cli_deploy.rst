.. _cli-deploy:

===================
Deployment commands
===================

.. include:: /userdocs/snippets/notes/deprecated-cli-v1.rst

The following table describes the usage of the :command:`fuel deployment`
command available in the Fuel CLI.

.. list-table:: **Deployment commands**
   :widths: 7 10
   :header-rows: 1

   * - Description
     - Command
   * - Delete current deployment data
     - ``fuel --env <ENV> deployment --delete``
   * - Download current deployment data
     - ``fuel --env <ENV> deployment --download``
   * - Download default deployment data
     - ``fuel --env <ENV> deployment --default``
   * - Get default deployment information for specific nodes
     - ``fuel --env <ENV> deployment --default --node <NODE_ID [NODE_ID ...]>``
   * - Upload provisioning deployment to a specific directory
     - ``fuel --env <ENV> deployment -u --dir path/to/directory``
   * - Download deployment information to a specific directory
     - ``fuel --env <ENV> deployment -d --dir path/to/directory``


