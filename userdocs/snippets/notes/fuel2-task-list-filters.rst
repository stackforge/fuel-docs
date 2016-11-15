.. note::

   By default, the :command:`fuel2 task list` shows all deployment tasks.
   Although, you can filter the tasks in the command output by:

   * Environment ID:

     .. code-block:: console

        fuel2 task list --env <ENV_ID>

   * Tasks statuses:

     .. code-block:: console

        fuel2 task list --statuses ready

     The available tasks statuses are ``pending``, ``error``,
     ``ready``, and ``running``.

   * Tasks names:

     .. code-block:: console

        fuel2 task list --names <TASK_NAME>