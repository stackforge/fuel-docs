.. note::

   By default, the :command:`fuel2 task list` shows all deployment tasks.
   Though, you can filter the tasks in the command's output by:

   * Environment ID:
   
     .. code-block:: console

        fuel2 task list --env <ENV_ID>
   
   * Tasks statuses, that are ``pending``, ``error``, ``ready``, and ``running``:
   
     .. code-block:: console

        fuel2 task list --statuses ready

   * Tasks names:

     .. code-block:: console

        fuel2 task list --names <TASK_NAME>