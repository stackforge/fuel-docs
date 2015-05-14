.. index:: Finalize Upgrade

.. _Upg_Final:

Finalize Upgrade
----------------

This chapter contains actions required to finalize the upgrade procedure
on an environment and on Fuel installer in general. Finalization
involves the following steps:

* Restore the source code of the components of the installer by
  reverting the patches that implement modifications to the
  installer's behavior.
* Delete the original 6.1 environment and release the original
  controller nodes.

See the sections below for the detailed description of how to do that
and the list of commands:

* :ref:`Uninstall upgrade-related components <upgrade-cleanup-revert>`
* :ref:`Decommission environment <upgrade-cleanup-delete-env>`

.. _upgrade-cleanup-revert:

Revert Patches
++++++++++++++

The final goal of the upgrade procedure is to get the upgraded
environment as close as possible to the environment installed with
the new release version and retain the ability to manage it in the new
version of Fuel installer.

To return the Fuel Master node into original state, we just need to uninstall
components that we installed for the upgrade purposes, specifically, extension
to ``fuelclient`` CLI command that is used to call Upgrade extension in the
Fuel API.

Commands uninstall components
_____________________________

Run the following command to revert the changes made to the source
code and configuration of components of the Fuel installer::

    octane cleanup-fuel

.. _upgrade-cleanup-delete-env:

Delete 6.1 environment
++++++++++++++++++++++++

Delete the original 6.1 environment to release the Controller nodes
and completely switch to use the 7.0 environment instead.

.. note::

    The following operation may cause data loss if your upgrade
    operation was not completed successfully. Proceed with caution.

::

    fuel env --env $ORIG_ID --delete
