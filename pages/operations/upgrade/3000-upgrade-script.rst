.. index:: Upgrade Script

.. _Upg_Script:

Upgrade Script
--------------

In this chapter we explain how exactly we implement steps described in the
:ref:`Solution Overview<upg_sol>`. Sections of this chapter contain appendicies
with listings of commands and scripts that implement each particular action.

.. IMPORTANT::

    * All commands in this sections must be executed on the Fuel Master node,
      unless specified otherwise.
    * You must use ``bash`` shell to execute commands.
    * All commands must be executed one after another in a single continuous
      ``bash`` session. Otherwise, required variables won't be set, and most
      commands will fail miserably.

.. include:: /pages/operations/upgrade/3010-upgrade-prerequisites.rst
.. include:: /pages/operations/upgrade/3020-prepare-fuel-master.rst
.. include:: /pages/operations/upgrade/3030-clone-env-settings.rst
.. include:: /pages/operations/upgrade/3040-install-seed.rst
.. include:: /pages/operations/upgrade/3050-upgrade-cics.rst
.. include:: /pages/operations/upgrade/3060-upgrade-node.rst
