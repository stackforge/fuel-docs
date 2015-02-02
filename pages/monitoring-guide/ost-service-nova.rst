.. _Monitoring-Ost-nova:

Nova
----

Health checks
`````````````

+------------------------------+----------------+---------------+---------------------------+--------------------------+
| processes                    | TCP Port       | location      | logs \*                   | links \*\*               |
+==============================+================+===============+===========================+==========================+
| nova-api                     | 8774,8775      | controllers   | nova/nova-api.log         | amqp                     |
+------------------------------+----------------+---------------+---------------------------+--------------------------+
| nova-scheduler               |                | controllers   | nova/nova-scheduler.log   | amqp                     |
+------------------------------+----------------+---------------+---------------------------+--------------------------+
| nova-conductor               |                | controllers   | nova/nova-conductor.log   | db, amqp                 |
+------------------------------+----------------+---------------+---------------------------+--------------------------+
| nova-compute                 |                | computes      | nova/nova-compute.log     | amqp                     |
+------------------------------+----------------+---------------+---------------------------+--------------------------+
| nova-consoleauth             |                | controllers   | nova/nova-consoleauth.log | amqp                     |
+------------------------------+----------------+---------------+---------------------------+--------------------------+
| nova-console                 |                | controllers   | nova/nova-console.log     | amqp                     |
+------------------------------+----------------+---------------+---------------------------+--------------------------+
| nova-novncproxy              |                | controllers   | nova/nova-novncproxy.log  | amqp                     |
+------------------------------+----------------+---------------+---------------------------+--------------------------+
| nova-cert                    |                | controllers   | nova/nova-cert.log        | amqp                     |
+------------------------------+----------------+---------------+---------------------------+--------------------------+
| nova-objectstore [1]_        |                | computes      | nova/nova-objectstore.log | amqp                     |
+------------------------------+----------------+---------------+---------------------------+--------------------------+
| nova-network [2]_            |                | computes      | nova/nova-network.log     | amqp                     |
+------------------------------+----------------+---------------+---------------------------+--------------------------+

\* logs are relative to */var/log/*

\*\* links between external component(s)

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


It's interesting to monitor *response times* and *rate* of these operations:

+------------------+--------------+
| Metric           | Source       |
+==================+==============+
| instance CRUD    | notification |
+------------------+--------------+
| keypair CRD      | notification |
+------------------+--------------+

flavor

quotas

Operations rate and responses time can be gathered by enabling `Nova notifications`_.

For example, in order to get instance creation times, notifications
*compute.instance.create.end* emitted by *nova-compute* provide attributes
*launched_at* and *created_at*.

.. note:: The caluclated time doesn't include the boot time of the guest
          operating system.

Error events must be collected from:

- respective services logs
- in some cases an error notification is sent when instance creation or
  update fails

.. _Nova notifications: https://wiki.openstack.org/wiki/SystemUsageData#Event_Types_and_Payload_data

Resource
````````

quotas

The command *nova-manage service list* can provide these informations:

- how many compute nodes are operational and their capacity
- how many compute nodes are not operational

   ::

      # nova-manage service list|grep compute|grep enabled
      nova-compute     node-9                               nova             enabled    :-)   2015-02-11 13:46:43
      nova-compute     node-8                               nova             enabled    :-)   2015-02-11 13:46:42

      # nova-manage service  describe_resource node-9
      HOST                              PROJECT     cpu mem(mb)     hdd
      node-9          (total)                         1    1497      45
      node-9          (used_now)                      0     512       0
      node-9          (used_max)                      0       0       0

