.. _Monitoring-Ost-ceilometer:

Ceilometer
----------

Health checks
`````````````
Check existence of processes and if ports are open.

+------------------------------+----------------+---------------+----------------------------------+--------------------------+
| processes                    | TCP Port       | location      | logs                             | links                    |
+==============================+================+===============+==================================+==========================+
| ceilometer-api               | 8777           | controller    | ceilometer-api.log               | storage                  |
+------------------------------+----------------+---------------+----------------------------------+--------------------------+
| ceilometer-agent-central     |                | controller    | ceilometer-agent-central.log     | amqp                     |
+------------------------------+----------------+---------------+----------------------------------+--------------------------+
| ceilometer-agent-compute     |                | controller    | ceilometer-agent-compute.log     | amqp                     |
+------------------------------+----------------+---------------+----------------------------------+--------------------------+
| ceilometer-agent-notification|                | controller    | ceilometer-agent-notification.log| amqp                     |
+------------------------------+----------------+---------------+----------------------------------+--------------------------+
| ceilometer-collector         |                | controller    | ceilometer-collector.log         | amqp,storage             |
+------------------------------+----------------+---------------+----------------------------------+--------------------------+
| ceilometer-alarm-evaluator   |                | controller    | ceilometer-alarm-evaluator.log   | api,storage              |
+------------------------------+----------------+---------------+----------------------------------+--------------------------+
| ceilometer-alarm-notifier    |                | controller    | ceilometer-alarm-notifier.log    | amqp, external system    |
+------------------------------+----------------+---------------+----------------------------------+--------------------------+

.. note:: *ceilometer-agent-central* and *ceilometer-agent-compute* are replaced by a single command *ceilometer-polling*

.. note:: Several back ends can be used for Ceilometer, each must be monitored. See `Ceilometer back ends list`_

Check simple API calls:

- list samples
- list resources

.. _Ceilometer back ends list: http://docs.openstack.org/developer/ceilometer/install/dbreco.html
