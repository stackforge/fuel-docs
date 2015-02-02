.. _Monitoring-Ost-ceilometer:

Ceilometer
----------

Health checks
`````````````

Check existence of processes and if ports are open.

+------------------------------+----------------+---------------+----------------------------------+--------------------------+
| processes                    | TCP Port       |location       | logs                             | links                    |
+==============================+================+===============+==================================+==========================+
| ceilometer-api               |8777            |controller     | ceilometer-api.log               | storage                  |
+------------------------------+----------------+---------------+----------------------------------+--------------------------+
| ceilometer-agent-central     |                |controller     | ceilometer-agent-central.log     | amqp                     |
+------------------------------+----------------+---------------+----------------------------------+--------------------------+
| ceilometer-agent-compute     |                |controller     | ceilometer-agent-compute.log     | ampq                     |
+------------------------------+----------------+---------------+----------------------------------+--------------------------+
| ceilometer-agent-notification|                |controller     | ceilometer-agent-notification.log| ampq                     |
+------------------------------+----------------+---------------+----------------------------------+--------------------------+
| ceilometer-collector         |                |controller     | ceilometer-collector.log         | ampq,storage             |
+------------------------------+----------------+---------------+----------------------------------+--------------------------+
| ceilometer-alarm-evaluator   |                |controller     | ceilometer-alarm-evaluator.log   | api,storage              |
+------------------------------+----------------+---------------+----------------------------------+--------------------------+
| ceilometer-alarm-notifier    |                |controller     | ceilometer-alarm-notifier.log    | ampq, external system    |
+------------------------------+----------------+---------------+----------------------------------+--------------------------+

.. note:: *ceilometer-agent-central* and *ceilometer-agent-compute* are remplaced by uniq command *ceilometer-polling*

.. note:: Several backends can be used for Ceilometer, each must be monitored. See `Ceilometer backends list`_

Check simple API calls:

- list samples
- list ressources


.. _Ceilometer backends list: http://docs.openstack.org/developer/ceilometer/install/dbreco.html
