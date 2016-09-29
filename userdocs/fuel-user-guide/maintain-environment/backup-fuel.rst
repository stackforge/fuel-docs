.. _back-up-fuel:

============================
Back up the Fuel Master node
============================

Fuel enables you to back up the Fuel Master node. You may need to perform
the backup of the Fuel Master node as a part of the upgrade procedure or
use the backup archives to restore the Fuel Master node in case of a hardware
failure.

**To back up the Fuel Master node:**

#. Log in to the Fuel Master node CLI.

#. Download and install the ``fuel-octane`` package:

   .. code-block:: console

      $ yum install fuel-octane

#. Back up the configuration state of the Fuel Master node:

   .. code-block:: console

      $ octane fuel-backup --to <base-archive-name>.tar.gz

#. Back up package repositories and other binary artifacts from the Fuel
   Master node:

   .. code-block:: console

      $ octane fuel-repo-backup --full --to <repo-archive-name>.tar.gz

   **Example:**

   .. code-block:: console

      $ octane fuel-repo-backup --full --to /tmp/fuel-repo-backup.7.0.tar.gz

#. Copy the backup files to a secure external location, such as
   a removable USB drive or network server. If you copy the files to
   a network server, use SSH.

   .. note:: When you reinstall the Fuel Master node, all configuration files
    are deleted. Therefore, if you do not back up the Fuel Master node and
    repository configuration files, you will not be able to manage the
    OpenStack environments created by the old version of Fuel.

Now, you can upgrade or restore the Fuel Master node from the backup files.

.. seealso::

  * :ref:`restore-fuel`
  * :ref:`upgrade_liberty`