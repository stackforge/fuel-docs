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

#. Synchronize deployment tasks:

     .. code-block:: console

        fuel rel --sync-deployment-tasks --dir <path-to-puppet-manifest>

     **Example:**

     .. code-block:: console

        fuel rel --sync-deployment-tasks --dir /etc/puppet/mitaka-9.0/

.. seealso::

   - :ref:`data-driven`
