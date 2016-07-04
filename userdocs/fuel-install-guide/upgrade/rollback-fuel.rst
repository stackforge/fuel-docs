.. _rollback-fuel:

==============================
Roll back the Fuel Master node
==============================

You can restore the Fuel Master node from the backup archives using Octane
tooling. You may require to perform a rollback in case of a hardware failure,
for example.

**To roll back the Fuel Master node:**

#. Destroy the Fuel Master node and reinstall it using the respective version
   of the ISO image.

#. Copy the corresponding backup archives to the Fuel Master node.

#. Download and install the ``fuel-octane`` package:

   .. code-block:: console

      $ yum install fuel-octane

#. Restore the configuration state of the Fuel Master node from the archive:

   .. code-block:: console

      $ octane fuel-restore --from <base-archive-name>.tar.gz --admin-password <admin-password>

   .. note::

      The ``--admin-password`` option is the password that is stored
      in a backup file, and is not the current Administrator password.

#. Restore package repositories, base images, and other data from the archive:

   .. code-block:: console

      $ octane fuel-repo-restore --from <repo-archive-name>.tar.gz \
        --admin-password <admin-password>

.. seealso::

   :ref:`back-up-fuel`