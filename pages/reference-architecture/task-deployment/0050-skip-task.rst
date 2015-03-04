.. _0050-add-task:

Skipping task by API or by configuration
----------------------------------------

There are several mechanisms to skip a certain task.

To skip a task, you can use one of the following:

* Change the task's type to *void*:

  ::

    type: void

* Add a condition that is always false:

  ::

    condition: 'true != false'

* Do an API request:

  ::

    fuel node --node 1,2,3 --skip horizon
