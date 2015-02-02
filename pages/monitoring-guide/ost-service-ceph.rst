.. _Monitoring-Ost-ceph:

Ceph
----

Health checks
`````````````
Check existence of processes and if ports are open.

+------------------------------+---------------+---------------------------+--------------------------+
| processes                    | location      | logs                      | links                    |
+==============================+===============+===========================+==========================+
| ceph-mon                     | all nodes     | ceph/ceph.log             | ampq                     |
+------------------------------+---------------+---------------------------+--------------------------+
| ceph-osd                     | storage nodes |                           | amqp                     |
+------------------------------+---------------+---------------------------+--------------------------+

To show cluster health, ceph provide a command:

   ::

    # ceph health
    HEALTH_OK

Metrics
```````
??

Resource usage
```````````````
