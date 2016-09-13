.. _download_workflows:

==============================
Download a deployment workflow
==============================

Fuel enables you to download deployment workflows using the Fuel web UI or
Fuel CLI.

**To download a deployment workflow using the Fuel web UI:**

#. Log in to the Fuel web UI.
#. Select the required OpenStack environment.
#. Go to the :guilabel:`Workflows` tab.
#. In the :guilabel:`Download` column, click on one of the available formats
   of the required graph file to download. 

**To download a deployment workflow using the Fuel CLI:**

#. Log in to the Fuel master node.
#. Download the required workflow using the :command:`fuel2 graph download`
   command.

   **Example:**

   .. code-block:: console

      fuel2 graph download --env 1 --all

.. seealso::

   * :ref:`cli-graphs`