.. _run_workflows:

=========================
Run a deployment workflow
=========================

Fuel enables you to execute deployment workflows using the Fuel web UI
or Fuel CLI.

**To execute a deployment workflow using the Fuel web UI:**

#. Log in to the Fuel web UI.
#. Select the required OpenStack environment.
#. Verify that online nodes are added to the environment.
#. Select from the following options:

   * To run the default deployment workflow:

     #. Go to the :guilabel:`Dashboard` tab.
     #. Click :guilabel:`Deploy changes`.

   * To run a custom deployment workflow:

     #. Upload a custom deployment workflow as described in
        :ref:`upload_workflows`.
     #. Go to the :guilabel:`Dashboard` tab.
     #. Change the deployment mode to :guilabel:`Custom Workflow`
     #. Select a particular workflow to run and specify the nodes
        the workflow should be executed on.

**To execute a deployment workflow using the Fuel CLI:**

#. Log in to the Fuel CLI.
#. Execute the required workflow using the :command:`fuel2 graph execute`
   command.

   **Example:**

   .. code-block:: console

      fuel2 graph execute --env 1

.. seealso::

   * :ref:`cli-workflows`