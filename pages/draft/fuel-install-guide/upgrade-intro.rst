.. _upgrade_intro:

Introduction
============

If you are running Fuel 6.x, you can upgrade the Fuel Master node to
version 7.0.

.. note:: During the upgrade, virtual machines and other resources
          might experience temporary network disconnects. Schedule
          the upgrade during a maintenance window.

There are two possible scenarios:

* With the Internet connection -- a regular Fuel upgrade process.
  
 * See: :ref:`upgrade_major_versions`.

* Without the Internet connection -- first create a local repository,
  then run a regular Fuel upgrade process from the created local
  repository. See:

 * :ref:`upgrade_local_repo`.
 * :ref:`upgrade_major_versions`.

.. note:: Fuel does not support upgrades for plugins. The old plugin
          versions may not be compatible with the new version of Fuel.
          Therefore, you must uninstall the Fuel plugins before
          upgrading Fuel.

.. seealso::

     - :ref:`upgrade-internals`
