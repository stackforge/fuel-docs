.. _Monitoring-Ost-neutron:

Neutron
-------

.. note:: Neutron plugins *loadbalancer*, *firewall*, *ipsec* are not discussed here.

Health Check
````````````
Check existence of processes and openness of network ports.

+------------------------------+----------------+-------------------+----------------------------+--------------------------+
| processes                    | TCP port       | location          | logs \*                    | links \*\*               |
+==============================+================+===================+============================+==========================+
| neturon-server               | 9696           | controllers       | neutron/                   | db, amqp                 |
+------------------------------+----------------+-------------------+----------------------------+--------------------------+
| neutron-dhcp-agent           |                | active controller | neutron/                   | amqp, dnsmasq            |
+------------------------------+----------------+-------------------+----------------------------+--------------------------+
| neutron-l3-agent             |                | active controller | neutron/                   | db, iptables             |
+------------------------------+----------------+-------------------+----------------------------+--------------------------+
| neutron-metadata-agent       |                | computes          | neutron/                   | db                       |
+------------------------------+----------------+-------------------+----------------------------+--------------------------+
| neutron-ns-metadata-proxy    |                | controllers       | neutron/                   | db                       |
+------------------------------+----------------+-------------------+----------------------------+--------------------------+
| neutron-openvswitch-agent    |                | all nodes         | neutron/                   | ovs                      |
+------------------------------+----------------+-------------------+----------------------------+--------------------------+

\* logs are relative to */var/log/*

\*\* links between external component(s)

Namespaces
::::::::::

The active *network* node must have as many linux network *namespace* named
*qrouter-xxx* as the number of routers managed by **neutron**.

DHCP agent
::::::::::

The *neutron-dhcp-agent* relies on **dnsmasq** to handle DHCP requests, which at
the end provides network configuration to instances.

Perform these checks to detect anomalies:

- the **neutron-dhcp-agent** process must run on an active controller
- must have a **dnsmasq** process per subnet with DHCP enabled
- too many *DHCPNAK* entries in logs could result in connectivity issue for
  instances.

L3 Agent
::::::::

The **neutron-l3-agent** process must run on an active controller.

Metrics
```````

+----------------------------+------------+--------------+----------------+----------------------------------+
| Metric                     | Collect    | Source       | Purpose        | Comment                          |
+============================+============+==============+================+==================================+
| number of network          | poll 5 min | API          | resource usage |                                  |
+----------------------------+------------+--------------+----------------+----------------------------------+
| number of subnet           | poll 5 min | API          | resource usage |                                  |
+----------------------------+------------+--------------+----------------+----------------------------------+
| number of port             | poll 5 min | API          | resource usage |                                  |
+----------------------------+------------+--------------+----------------+----------------------------------+
| number of router           | poll 5 min | API          | resource usage |                                  |
+----------------------------+------------+--------------+----------------+----------------------------------+
| number total of floating-  | poll 5 min | API          | resource usage | depends of the number of subnet  |
| ip **available**           |            |              |                | with gateway and their ip range  |
+----------------------------+------------+--------------+----------------+----------------------------------+
| number total of floating-  | poll 5 min | API          | resource usage | floating-ip associated or not to |
| ip                         |            |              |                | a VM                             |
+----------------------------+------------+--------------+----------------+----------------------------------+
| number of floating-ip      | poll 5 min | API          | resource usage |                                  |
| associated to a vm         |            |              |                |                                  |
+----------------------------+------------+--------------+----------------+----------------------------------+
| response time network CRUD | event      | notification | monit, trend   |                                  |
+----------------------------+------------+--------------+----------------+----------------------------------+
| response time subnet CRUD  | event      | notification | monit, trend   |                                  |
+----------------------------+------------+--------------+----------------+----------------------------------+
| response time port CRUD    | event      | notification | monit, trend   |                                  |
+----------------------------+------------+--------------+----------------+----------------------------------+
| response time router CRUD  | event      | notification | monit, trend   |                                  |
+----------------------------+------------+--------------+----------------+----------------------------------+
| response time floating-ip  | event      | notification | monit, trend   |                                  |
| CRUD                       |            |              |                |                                  |
+----------------------------+------------+--------------+----------------+----------------------------------+
| response time floating-ip  | event      | notification | monit, trend   |                                  |
| associate/disassociate     |            |              |                |                                  |
+----------------------------+------------+--------------+----------------+----------------------------------+
| rate of network CRUD       | event      | notification | monit, trend   |                                  |
+----------------------------+------------+--------------+----------------+----------------------------------+
| rate of subnet CRUD        | event      | notification | monit, trend   |                                  |
+----------------------------+------------+--------------+----------------+----------------------------------+
| rate of port CRUD          | event      | notification | monit, trend   |                                  |
+----------------------------+------------+--------------+----------------+----------------------------------+
| rate of router CRUD        | event      | notification | monit, trend   |                                  |
+----------------------------+------------+--------------+----------------+----------------------------------+
| rate of floating-ip CRUD   | event      | notification | monit, trend   |                                  |
+----------------------------+------------+--------------+----------------+----------------------------------+
| rate of floating-ip        | event      | notification | monit, trend   |                                  |
| associate/disassociate     |            |              |                |                                  |
+----------------------------+------------+--------------+----------------+----------------------------------+

Operations rate and response time can be gathered by enabling Neutron notifications.
For example in order to get network creation time, *timestamps* of both
notifications *network.create.start* and *network.create.end* allow to get the
total time of this asynchronous operation.

Resource usage
```````````````

Floating-IP pool usage

Bandwith saturation of the links
