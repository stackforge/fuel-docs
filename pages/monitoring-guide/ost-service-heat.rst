.. _Monitoring-Ost-heat:

Heat
----

Health checks
`````````````

Check existence of processes and if ports are open.

+------------------------------+----------------+---------------+---------------------------+--------------------------+
| processes                    | TCP Port       | location      | logs                      | links                    |
+==============================+================+===============+===========================+==========================+
| heat-api                     | 8004           | controllers   | heat/heat-api.log         | db,amqp                  |
+------------------------------+----------------+---------------+---------------------------+--------------------------+
| heat-api-cfn                 | 8000           | controllers   | heat/heat-api-cfn.log     | db,amqp                  |
+------------------------------+----------------+---------------+---------------------------+--------------------------+
| heat-engine                  |                | controllers   | heat/heat-engine.log      | db,amqp, OSt services    |
+------------------------------+----------------+---------------+---------------------------+--------------------------+

.. note:: Cloudwatch not listed since it's not the project priority

Metrics
```````

These metrics can be retrieved through API:

- number of active stacks
- number of stacks in error
- number of stacks in progress

Error events must be collected from logs.
