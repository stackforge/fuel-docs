.. _cgroups-modify-single-node:

Modify control groups for a single node
+++++++++++++++++++++++++++++++++++++++

If you want to change the control group settings on a single node, you must
edit the control groups configuration file ``/etc/cgconfig.conf``, as well
as create, if needed, and configure the ``/etc/cgrules.conf`` file.
You can modify control groups before or after you deploy an OpenStack
environment.

**To modify control groups for a single node:**

#. Log in to the CLI of corresponding node.
#. Open the ``/etc/cgconfig.conf`` file for editing.
#. Apply the required changes.
#. Save and exit.
#. Add the corresponding parameters to the ``/etc/cgrules.conf`` file.

   **Example:**

   .. code-block:: console

      * :keystone-api   cpu   keystone-api
      * :mysqld   cpu   mysqld

#. Restart ``cgconfigparser``:

   .. code-block:: console

      service cgconfigparser restart

#. For each running process, type:

   .. code-block:: console

      cgclassify 'pidof -x <name_of_process>'

#. Restart ``cgrulesengd``:

   .. code-block:: console

      service cgrulesengd restart
