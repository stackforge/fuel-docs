.. _upgrade-patch-top-ug:

============================
Upgrade the Fuel Master node
============================

You can upgrade the Fuel Master node to the latest Fuel version.
After you upgrade Fuel, you can only deploy new environments of the
corresponding Fuel version. Environments deployed using older versions
of Fuel will remain operational.

**To upgrade the Fuel Master node:**

#. Verify that no installations are in progress in any of your OpenStack
   environments.

#. Back up the Fuel Master node as described in :ref:`back-up-fuel`.

#. Restore the Fuel Master node to the latest version as described in
   :ref:`restore-fuel`.

#. If you want to use CentOS-based bootstrap, rebuild the bootstrap image:

   .. code-block:: console

      $ octane update-bootstrap-centos

#. Reboot all nodes that are in the ``Discover`` status.

When Fuel completes the upgrade procedure, the *New Release available*
message appears in the :guilabel:`Releases` tab.

.. seealso::

   * :ref:`install_configure_bootstrap`