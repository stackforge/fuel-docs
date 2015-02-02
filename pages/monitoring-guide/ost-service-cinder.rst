.. _Monitoring-Ost-cinder:

Cinder
------

Health checks
`````````````
Check existence of processes and if ports are open.

+------------------------------+----------------+---------------+---------------------------+--------------------------+
| processes                    | TCP Port       | location      | logs                      | links                    |
+==============================+================+===============+===========================+==========================+
| cinder-api                   | 8776           | controllers   | cinder/cinder-api.log     | db,amqp                  |
+------------------------------+----------------+---------------+---------------------------+--------------------------+
| cinder-scheduler             |                | controllers   | nova/nova-scheduler.log   | ampq                     |
+------------------------------+----------------+---------------+---------------------------+--------------------------+
| cinder-volume                |                | controllers   | nova/nova-conductor.log   | db, amqp, storage**      |
+------------------------------+----------------+---------------+---------------------------+--------------------------+

** Cinder can use different storage backends: file, Swift, Ceph

Metrics
```````
SQL query on database cinder to retrieve:

- number of snapshots in progress

  ::

    select count(*) from snapshots where progress NOT LIKE '100%'

- number of snapshots deleting

  ::

    select count(*) from snapshots where status='deleting'

- number of volumes deleting

  ::

     select count(*) from volumes where status='deleting'

- number of volumes stored

Operations rate and responses time can be gathered for all these operation
by enabling `Cinder notifications`_:

- volume.create
- volume.delete
- volume.resize
- volume.attach
- volume.detach
- volume.update
- snapshot.create
- snapshot.delete
- snapshot.update

For example, in order to get volume creation times, notifications
*volume.create.end* emitted by *cinder* provide attributes
*launched_at* and *created_at*.


Error events must be collected from service logs.

.. _Cinder notifications: https://wiki.openstack.org/wiki/SystemUsageData#volume.create.start.2F.end:


Resource usage
```````````````
Space used versus space left on the cluster
