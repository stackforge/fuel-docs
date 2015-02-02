.. _Monitoring-Ost-swift:

Swift
-----

Health checks
`````````````

Check existence of processes and if ports are open.

+------------------------------+----------------+---------------+---------------------------+
| processes                    | TCP Port       | location      | logs                      |
+==============================+================+===============+===========================+
| swift-proxy-server           | 8080           | controllers   | syslog                    |
+------------------------------+----------------+---------------+---------------------------+
| swift-object-replicator      |                | controllers   | syslog                    |
+------------------------------+----------------+---------------+---------------------------+
| swift-object-server          |                | controllers   | syslog                    |
+------------------------------+----------------+---------------+---------------------------+
| swift-container-server       | 6001           | controllers   | syslog                    |
+------------------------------+----------------+---------------+---------------------------+
| swift-container-replicator   |                | controllers   | syslog                    |
+------------------------------+----------------+---------------+---------------------------+
| swift-account-server         | 6002           | controllers   | syslog                    |
+------------------------------+----------------+---------------+---------------------------+
| swift-account-replicator     |                | controllers   | syslog                    |
+------------------------------+----------------+---------------+---------------------------+

Check simple API calls:

- create container
- upload small objects
- delete container and objects


Metrics
```````

- number of accounts
- number of containers
- number of objects

Furthermore, **Swift** is the only OpenStack project which had instrumented its code
to report metrics to an external system statsd_. See how to enable `statsd metrics`_
in the swift developer documentation.
This provide a real-time operational metrics of cluster activity and errors across all components.

.. _statsd: https://github.com/etsy/statsd/
.. _statsd metrics: http://docs.openstack.org/developer/swift/admin_guide.html#reporting-metrics-to-statsd

Resource usage
```````````````

- cluster current size
- cluster total size
- number of cluster member

