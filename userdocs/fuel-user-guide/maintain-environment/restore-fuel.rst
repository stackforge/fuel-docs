.. _restore-fuel:

============================
Restore the Fuel Master node
============================

You can restore the Fuel Master node from the backup archives. You may
require to restore in case of a hardware failure or other system
malfunction, or as a part of the upgrade of the Fuel Master node
procedure.

**To restore the Fuel Master node:**

#. Reinstall the Fuel Master node using the respective version of the ISO
   image as described in :ref:`install_intro`.

   .. warning:: The new Fuel Master node must have the same IP address
      and the same administrator password as the original Fuel Master node.
      Otherwise, you cannot restore the configuration from the backup files.

#. Copy the corresponding backup archives to the Fuel Master node.
   For example, in the ``/tmp`` directory.

#. Log in to the new Fuel Master node.

#. Download and install the ``fuel-octane`` package:

   .. code-block:: console

      $ yum install fuel-octane

#. Restore the configuration state of the Fuel Master node from the backup
   archive:

   .. code-block:: console

      $ octane fuel-restore --from <base-archive-name>.tar.gz --admin-password <admin-password>

   The ``--admin-password`` option is the password that is stored
   in a backup file, and is not the current Administrator password.

#. Restore package repositories, base images, and other data from the archive:

   .. code-block:: console

      $ octane fuel-repo-restore --from <repo-archive-name>.tar.gz \
        --admin-password <admin-password>

   .. warning:: The Fuel Master node must have at least 2 GB of RAM
                to decompress the archive.

#. In case of multiple cluster networks, forward DHCP requests to
   the Fuel Master node using one of the following methods:

   * Configure switches to relay DHCP
   * Use a relay client, such as ``dhcp-helper``

.. seealso::

   * :ref:`back-up-fuel`
   * :ref:`upgrade-patch-top-ug`