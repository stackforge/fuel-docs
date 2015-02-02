.. _Monitoring-Ost-heat:

Heat
----

Health checks
`````````````

Check existence of processes and if ports are open.

+------------------------------+----------------+---------------+---------------------------+--------------------------+
| processes                    | TCP Port       |location       | logs                      | links                    |
+==============================+================+===============+===========================+==========================+
| heat-api                     |8004            |controller     | heat/heat-api.log         | db,amqp                  |
+------------------------------+----------------+---------------+---------------------------+--------------------------+
| heat-api-cfn                 |8000            |controller     | heat/heat-api-cfn.log     | db,amqp                  |
+------------------------------+----------------+---------------+---------------------------+--------------------------+
| heat-engine                  |                |controller     | heat/heat-engine.log      | db,ampq, OSt services    |
+------------------------------+----------------+---------------+---------------------------+--------------------------+

.. note:: Cloudwatch not listed since it's not the priority of the project

Metrics
```````

These metrics can be retrieve through API:

- number of stacks active
- number of stacks in error
- number of stacks in progress

Error events must be collected from logs.
