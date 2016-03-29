
.. _upgrade-patch-top-ug:

Upgrade the Fuel Master node
----------------------------

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

#. Download and install the ``fuel-octane`` package using the ``yum install``
   command:

   .. code-block:: console

    $ yum install fuel-octane

#. Back up the configuration of
   the Fuel Master node to an archive:

   .. code-block:: console

     octane fuel-backup --to <path-to-archive> --admin-password <admin-password>

   **Example:**

   .. code-block:: console

    $ octane fuel-backup --to /tmp/fuel-backup.7.0.tar.gz --admin-password admin

#. Back up package repositories and other binary artifacts from the Fuel
   Master node:

   **Example:**

   .. code-block:: console

    $ octane fuel-repo-backup --to /tmp/fuel-repo-backup.7.0.tar.gz

#. Copy the backup files to a secure external location, such as
   a removable USB drive or network server. If you copy the files to
   a network server, use SSH.

   .. note::

    When you reinstall the Fuel Master node, all configuration files are
    deleted. Therefore, if you fail to back up the Fuel Master node and
    repository configuration files, you will not be able to manage the
    OpenStack environments created by the old version of Fuel.

#. Power off the Fuel Master node.

#. Install the latest version of the Fuel Master node as described in
   :ref:`install_intro`.

   .. note::

    The new Fuel Master node must have the same IP address as the original
    Fuel Master node. Otherwise, you cannot restore the configuration from
    the backup.


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

    - :ref:`Configure a bootstrap image <install_configure_bootstrap>`.
