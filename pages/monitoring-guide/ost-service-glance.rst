.. _Monitoring-Ost-glance:

Glance
------

Health checks
`````````````
Check existence of processes and if ports are open.

+------------------------------+----------------+---------------+----------------------------+--------------------------+
| processes                    | TCP Port       | location      | logs                       | links                    |
+==============================+================+===============+============================+==========================+
| glance-api                   | 9292           | controllers   | glance/glance-api.log      | db, amqp                 |
+------------------------------+----------------+---------------+----------------------------+--------------------------+
| glance-registry              | 9191           | controllers   | glance/glance/registry.log | db, amqp, storage**      |
+------------------------------+----------------+---------------+----------------------------+--------------------------+

** Glance can use different storage backends: file or object store like *swift*


Metrics
```````
It's interresting to monitor responses time and rate of these operations:

- image CRUD
- metadata CRUD

Operations rate and responses time can be gathered by enabling `Glance notifications`_,

The creation time of an image can be computed from notifications timestamp:

- image.prepare
- image.upload
- image.create
- image.activate

Error events must be collected from logs.

.. _Glance notifications: http://docs.openstack.org/developer/glance/notifications.html

Resource usage
``````````````

Number of images public/private

Space used for all images
