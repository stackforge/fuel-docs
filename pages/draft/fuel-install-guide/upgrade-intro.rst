.. _upgrade_intro:

Introduction
============

If you are running Fuel 6.x, you can upgrade the Fuel Master node to
version 7.0.

There are two possible scenarios:

* With the Internet connection -- a regular Fuel upgrade process.
  See: :ref:`upgrade_major_versions`.
* Without the Internet connection -- first create a local repository,
  then run a regular Fuel upgrade process from the created local
  repository. See:

   #. :ref:`upgrade_local_repo`.
   #. :ref:`upgrade_major_versions`.

.. note:: Fuel plugins cannot be upgraded. See `Fuel Plugin Wiki <https://wiki.openstack.org/wiki/Fuel/Plugins>`_
          For information on how to uninstall a plugin see :ref:`upgrade_uninstall_plugin`.


.. seealso::

     - :ref:`upgrade-internals`
