
.. _debug-level-ug:

Setting debug level for the environment
+++++++++++++++++++++++++++++++++++++++

Use this field to set DEBUG level logging
for all services in the environment:

.. image:: /_images/user_screen_shots/debug-logging.png
   :width: 50%

Debug logging consumes massive amounts of disk space
as well as memory and CPU resources
on the Fuel Master node and all OpenStack nodes in the environment.
It should not normally be run unless you are attempting to diagnose a problem,
and you may want to offload or delete the logs generated
when you are finished with them.
