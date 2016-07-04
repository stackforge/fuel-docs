.. _upgrade-patch-top-ug:

============================
Upgrade the Fuel Master node
============================

If you have a functional Fuel installation, you can
upgrade the Fuel software to the latest version
without reinstalling your environments.

.. note::
   Upgrades are not supported for Fuel 4.x or earlier. If you use Fuel 4.x
   or earlier, you must install new instance of Fuel and deploy your
   environments from scratch.

After you upgrade Fuel, you can only deploy new environments of the
corresponding Fuel version. Environments deployed using older versions
of Fuel will remain operational.

**To upgrade the Fuel Master node:**

#. Verify that no installations are in progress in any of your OpenStack
   environments.

#. Back up the Fuel Master node as described in :ref:`back-up-fuel`.

#. Install the latest version of the Fuel Master node as described in
   :ref:`install_intro`.

   .. note::

      The new Fuel Master node must have the same IP address as
      the original Fuel Master node. Otherwise, you cannot restore
      the configuration from the backup.

#. Copy the backup files to the location on the new Fuel Master node.
   For example, in the ``/tmp`` directory.

#. Log in to the new Fuel Master node.

#. Install the ``fuel-octane`` package:

   .. code-block:: console

    $ yum install fuel-octane

#. Restore the configuration of the original Fuel Master node and the OpenStack
   environments:

   .. code-block:: console

    $ octane fuel-restore --from /tmp/fuel-backup.7.0.tar.gz
        --admin-password ADMIN_PASSWORD

#. Restore repositories and binary artifacts from the old version:

   **Example:**

   .. code-block:: console

        $ octane fuel-repo-restore --from /tmp/fuel-repo-backup.7.0.tar.gz

   .. warning::

        The Fuel Master node must have at least 2 GB of RAM
        to decompress the ``gzip`` upgrade archive.

   When Fuel completes the upgrade, the *New Release available* message appears
   in the :guilabel:`Releases` tab.

#. If you want to use CentOS-based bootstrap, rebuild the bootstrap image:

   .. code-block:: console

       $ octane update-bootstrap-centos

#. Reboot all nodes that are in the ``Discover`` status.

.. seealso::

   * :ref:`install_configure_bootstrap`