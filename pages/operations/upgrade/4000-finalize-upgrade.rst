.. index:: Finalize Upgrade

.. _Upg_Final:

Finalize Upgrade
----------------

This chapter contains actions required to finalize the upgrade procedure on an
environment and on Fuel installer in general. Finalization involves the
following steps:

* Restore the source code of the components of the installer by reverting the
  patches that implement modifications to the installer's behavior.
* Delete the original 5.1.1 environment and release the original controller
  nodes.

See the sections below for the detailed description of how to do that and the
list of commands:

* :ref:`Revert patches <upgrade-cleanup-revert>`
* :ref:`Decommission environment <upgrade-cleanup-delete-env>`

.. _upgrade-cleanup-revert:

Revert Patches
++++++++++++++

The final goal of the upgrade procedure is to get the upgraded environment as
close as possible to the environment installed with the new release version and
retain the ability to manage it in the new version of Fuel installer. To
restore the original behavior of Fuel installer, you need to revert all changes
made to its source code and configurations. You also need to restore the
configuration of environment to the state installed by Fuel.

Commands to revert patches
__________________________

Run the following command to rever changes made to the source code and
configuration of components of the Fuel installer::

    octane cleanup-fuel

.. _upgrade-cleanup-delete-env:

Delete 5.1.1 environment
++++++++++++++++++++++++

Delete the original 5.1.1 environment to release Controller nodes and completely
switch to use 6.1 environment instead.

.. note::

    The following operation may cause data loss if your upgrade operation was
    not completed successfully. Proceed with caution.

::

    fuel env --env $ORIG_ID --delete
