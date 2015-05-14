.. index:: Upgrade Script

.. _Upg_Script:

Upgrade Script Explained
------------------------

In this chapter we explain how exactly we implement the steps described
in :ref:`Solution Overview<upg_sol>`. Sections of this chapter contain
appendices with listings of commands and scripts that implement each
particular action.

.. IMPORTANT::

    * All commands in this section must be executed on the Fuel Master
      node, unless specified otherwise.

    * You must use Bourne shell (``bash``) to execute commands.

.. include:: /pages/operations/upgrade/3010-upgrade-prerequisites.rst
.. include:: /pages/operations/upgrade/3020-prepare-fuel-master.rst
.. include:: /pages/operations/upgrade/3030-clone-env-settings.rst
.. include:: /pages/operations/upgrade/3040-install-seed.rst
.. include:: /pages/operations/upgrade/3050-upgrade-cics.rst
.. include:: /pages/operations/upgrade/3060-upgrade-node.rst
