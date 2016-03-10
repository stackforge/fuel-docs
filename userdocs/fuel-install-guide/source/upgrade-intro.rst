.. raw:: pdf

   PageBreak oneColumn

.. _upgrade_intro:

Upgrade Fuel
~~~~~~~~~~~~

If you are running Fuel 6.x, you can upgrade the Fuel Master node to
the latest Fuel version.

There are two possible scenarios:

* With an Internet connection -- a regular Fuel upgrade process. See:

  * :ref:`upgrade_prerequisites`.

* Without an Internet connection -- first create a local repository,
  then run a regular Fuel upgrade process from the created local
  repository. See:

  * :ref:`upgrade_local_repo`.
  * :ref:`upgrade_prerequisites`.

.. note:: Fuel does not support upgrades for plugins. The old plugin
          versions may not be compatible with the new version of Fuel.
          Therefore, you must uninstall the Fuel plugins before
          upgrading Fuel. See :ref:`plugins_upgrade_uninstall_plugin`.

.. see::

     - :ref:`upgrade-internals`
