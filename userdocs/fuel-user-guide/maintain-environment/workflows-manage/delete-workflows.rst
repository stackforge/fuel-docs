.. _delete_workflows:

============================
Delete a deployment workflow
============================

Fuel stores the information about all deployment workflows associated with
each deployment of an environment as well as custom workflows if any.
You can delete deployment workflows using the Fuel web UI or
Fuel CLI.

**To delete a deployment workflow using the Fuel web UI:**

#. Log in to the Fuel web UI.
#. Select the required OpenStack environment.
#. Go to the :guilabel:`Workflows` tab.
#. Click :guilabel:`Delete` in the required workflow field.

**To delete a deployment workflow using the Fuel CLI:**

#. Log in to the Fuel Master node CLI.
#. Delete the required workflow using the :command:`fuel2 graph delete`
   command.

   **Example:**

   .. code-block:: console

      fuel2 graph delete -e 1

.. seealso::

   * :ref:`cli-graphs`
