.. _workflows-skip-task:

Skip a deployment task
----------------------

You can skip a deployment task using the type or condition parameter
of the task, or through an API request.

When using API requests, you can specify the list of tasks to skip or
indicate the first and the last task to skip.

**To skip a deployment task:**

#. Select from the following options:

   * Specify the ``type`` parameter:

     **Example:**

     .. code-block:: console

     - id: horizon
       type: skipped
       role: [primary-controller]
       requires: [post_deployment_start]
       required_for: [post_deployment_end]

   * Specify a ``false`` condition:

     **Example:**

     .. code-block:: console

        - id: horizon
          type: puppet
          role: [primary-controller]
          requires: [post_deployment_start]
          required_for: [post_deployment_end]
          condition: 'true != false'

   * Using an API request:

     * Specify a list of tasks to skip:

       **Example:**

       .. code-block:: console

       fuel node --node <node_ID1>, <node_ID2>, <node_ID3> --skip horizon

       This command skips the ``horizon`` task.

     * Stop deployment after the specified task:

       **Example:**

       .. code-block:: console

          fuel node --node <node_ID1>, <node_ID2>, <node_ID3> --end netconfig

       This command deploys all tasks up to the ``netconfig`` task, including
       it.
       In the default workflow, this command will deploy all tasks in the
       ``pre_deployment`` stage, including keys generation, rsync manifests,
       sync time, upload repos, hiera setup, globals computation, and so on.

     * Start deployment from the specified task:

       **Example:**

       .. code-block:: console

          fuel node --node <node_ID1>, <node_ID2>, <node_ID3> --start
          netconfig

       This command deploys all tasks starting from the ``netconfig`` task,
       including it. In the default workflow, Fuel deploys all the tasks
       that are a part of the ``post_deployment`` stage.

     * Execute only one task:

       **Example:**

       .. code-block:: console

          fuel node --node <node_ID1>, <node_ID2>, <node_ID3> --start
          netconfig --skip netconfig

       This command will run only the ``netconfig`` task.

     * Specify start and end task:

       **Example:**

       .. code-block:: console

          fuel node --node <node_ID1>, <node_ID2>, <node_ID3> --start
          netconfig --end upload_cirros

       This command executes all tasks between the ``netconfig`` and
       ``upload_cirros`` tasks, including them.
