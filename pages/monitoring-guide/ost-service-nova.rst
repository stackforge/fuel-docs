.. _Monitoring-Ost-nova:

Nova
----

Health checks
`````````````
+------------------------------+----------------+---------------+---------------------------+--------------------------+
| processes                    | TCP Port       |location       | logs **                   | links \*\*\*             |
+==============================+================+===============+===========================+==========================+
| nova-api                     |8774,8775       |controller     |nova/nova-api.log          | amqp                     |
+------------------------------+----------------+---------------+---------------------------+--------------------------+
| nova-scheduler               |                |controller     | nova/nova-scheduler.log   | ampq                     |
+------------------------------+----------------+---------------+---------------------------+--------------------------+
| nova-conductor               |                |controller     | nova/nova-conductor.log   | db, amqp                 |
+------------------------------+----------------+---------------+---------------------------+--------------------------+
| nova-compute                 |                |compute        | nova/nova-compute.log     | amqp                     |
+------------------------------+----------------+---------------+---------------------------+--------------------------+
| nova-consoleauth             |                |controller     | nova/nova-consoleauth.log | amqp                     |
+------------------------------+----------------+---------------+---------------------------+--------------------------+
| nova-console                 |                |controller     | nova/nova-console.log     | amqp                     |
+------------------------------+----------------+---------------+---------------------------+--------------------------+
| nova-novncproxy              |                |controller     | nova/nova-novncproxy.log  | amqp                     |
+------------------------------+----------------+---------------+---------------------------+--------------------------+
| nova-cert                    |                |controller     | nova/nova-cert.log        | amqp                     |
+------------------------------+----------------+---------------+---------------------------+--------------------------+
| nova-objectstore [1]_        |                |compute        | nova/nova-objectstore.log | amqp                     |
+------------------------------+----------------+---------------+---------------------------+--------------------------+
| nova-network [2]_            |                |compute        | nova/nova-network.log     | amqp                     |
+------------------------------+----------------+---------------+---------------------------+--------------------------+

** logs are relative to */var/log/*

\*\*\* links between external component(s)

.. [1] nova-objectstore is often replaced by **Swift**
.. [2] nova-network is often replaced by **Neutron**


Metrics
```````

Number of instances running and in error state:

  ::

    select count(*) from instances where deleted=0 and vm_state='active'

    select count(*) from instances where vm_state='error' and deleted=0


Number of services available:

  ::

     select count(*) from services where disabled=0 and deleted=0 and timestampdiff(SECOND,updated_at,utc_timestamp())>60


It's interresting to monitor responses time and rate of these operations :

- instances CRUD
- certificat CRUD

Operations rate and responses time can be gathered by enabling `Nova notifications`_,

.. warning:: not all operations emit a notificaiton.

For example, in order to get instance creation times, notifications
*compute.instance.create.end* emitted by *nova-compute* provide attributes
*launched_at* and *created_at*.

.. note:: The caluclated time doesn't include the boot time of the guest
          operating system.

Error events must be collected from:

- respective services logs
- in some cases an error notification is sent when instance creation or
  update fail


.. _Nova notifications: https://wiki.openstack.org/wiki/SystemUsageData#Event_Types_and_Payload_data
