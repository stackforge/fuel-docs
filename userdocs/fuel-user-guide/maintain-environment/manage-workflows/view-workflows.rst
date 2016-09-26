.. _view_workflows:

================================================
View an environment deployment workflows details
================================================

You can view the deployment details of a specific environment through
the Fuel web UI or Fuel CLI.

**To view the workflows details using the Fuel web UI:**

#. Log in to the Fuel web UI.
#. Select the :guilabel:`Workflows` tab.

**To view the workflows details using the Fuel CLI:**

#. Log in to the Fuel Master node.
#. Type:

   .. code-block:: console

      fuel2 graph list --env <ENV_ID>

   The system response of the :command:`fuel2 graph list` command shows
   the table with workflows, their relations, names, and types.

   The ``name`` parameter defines additional information about the workflow
   and has no impact on business logic.