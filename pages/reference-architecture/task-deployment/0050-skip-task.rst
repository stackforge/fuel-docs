.. _0050-add-task:

Skipping task by API or by configuration
----------------------------------------

There are several mechanisms to skip a certain task.

To skip a task, you can use one of the following:

* Change the task's type to ``skipped``:

  ::

      - id: horizon
      type: skipped
      role: [primary-controller]
      requires: [post_deployment_start]
      required_for: [post_deployment_end]

* Add a condition that is always false:

  ::

       - id: horizon
      type: puppet
      role: [primary-controller]
      requires: [post_deployment_start]
      required_for: [post_deployment_end]
      condition: 'true != false'

* Do an API request:

  ::

      fuel node --node <1>,<2>,<3> --skip horizon
