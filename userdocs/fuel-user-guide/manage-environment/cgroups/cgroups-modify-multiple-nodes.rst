.. _cgroups-modify-multiple-nodes:

Modify control groups for multiple nodes
++++++++++++++++++++++++++++++++++++++++

You can modify ``cgroups`` for a particular process on multiple nodes by
creating a separate file with the ``cgroups`` configuration, uploading
the new configuration file to fuel, and restarting the ``cgroups`` task.
You can modify control groups before or after you deploy an OpenStack
environment.

**To modify control groups for multiple nodes:**

#. Log in to the Fuel Master node CLI.
#. Download the Fuel configuration:

   .. code-block:: console

      fuel settings --env-id <id> --download

#. Open the ``settings.yaml`` file for editing.
#. Copy the ``cgroups`` section.
#. Create a ``.yaml`` file with the same name as the ``.yaml``
   file that you have downloaded in step 2.
#. Paste the copied ``cgroups`` configuration into the file.
#. Edit as required..

#. Upload the new configuration file to Fuel:

   .. code-block:: console

      fuel settings --dir <path_to_new_yaml> --env-id <env_id> --upload

#. Restart the ``cgroups`` task:

   .. code-block:: console

      fuel node --node-id <node_1> <node_2> <node_3> --tasks cgroups

.. seealso::

   - :ref:`cgroups-example`
