.. _0050-add-task:

Skipping task by api or by configuration
-----------------------------------------

There is several mechanism to skip certain task.

It can be disabledin configuration, by changing its type to void

::

  type: void

Or adding condition that is always false

::

  condition: 'true != false'

And by API request:

::
  fuel node --node 1,2,3 --skip horizon
