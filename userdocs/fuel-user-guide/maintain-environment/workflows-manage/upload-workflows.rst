.. _upload_workflows:

============================
Upload a deployment workflow
============================

Fuel enables you to upload deployment workflows using the Fuel web UI or
Fuel CLI.

**To upload a deployment workflow using the Fuel web UI:**

#. Log in to the Fuel web UI.
#. Select the required OpenStack environment.
#. Go to the :guilabel:`Workflows` tab.
#. Click :guilabel:`Upload New Workflow`.
#. In the :guilabel:`Upload New Workflow` dialog, specify the :guilabel:`Name`
   and :guilabel:`Type` of the workflow and select the deployment task file from
   your file system to upload.
#. Click :guilabel:`Upload`.

**To upload a deployment workflow using the Fuel CLI:**

#. Log in to the Fuel Master node.
#. Upload the required workflow using the :command:`fuel2 graph upload` command.

   **Example:**

   .. code-block:: console

      fuel2 graph upload --env 1 --file tasks.yaml

.. seealso::

   * :ref:`cli-workflows`