.. _config-drive-format:

Change the configuration drive format
-------------------------------------

The default format of the configuration drive is ISO 9660. For legacy reasons,
Fuel uses the VFAT configuration drive format which is the default option for
live migration. But you can change the VFAT to the ISO 9660 format using the
``config_drive_format`` option.

**To change the configuration drive format using Fuel CLI:**

#. Log in to the Fuel Master node CLI.
#. Download the configuration files:

   .. code-block:: console

     fuel --env=<env_ID> deployment --default

   The default deployment information is downloaded to
   ``/<cwd>/deployment_<env_ID>``.

#. Edit *every* ``<node-id>.yaml`` file:

   #. Find or add the ``compute`` section to the ``<node-id>.yaml`` file.
   #. In this section, add the following parameter:

      .. code-block:: console

        compute:
         config_drive_format option: iso9660

#. Upload the updated configuration files to the ``/<cwd>/deployment_<env_ID>``
   directory:

   .. code-block:: console

     fuel --env=<env_ID> deployment --upload

   Now, you can proceed with the environment deployment.