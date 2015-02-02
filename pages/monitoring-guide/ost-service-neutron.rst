.. _Monitoring-Ost-neutron:

Neutron
-------

Health Check
````````````
Check existence of processes and if ports are open.

+------------------------------+----------------+-------------------+----------------------------+--------------------------+
| processes                    | TCP Port       | location          | logs **                    | links \*\*\*             |
+==============================+================+===================+============================+==========================+
| neturon-server               | 9696           | controllers       | neutron/                   | db, amqp                 |
+------------------------------+----------------+-------------------+----------------------------+--------------------------+
| neutron-dhcp-agent           |                | active controller | neutron/                   | amqp,dnsmasq             |
+------------------------------+----------------+-------------------+----------------------------+--------------------------+
| neutron-l3-agent             |                | active controller | neutron/                   | db, iptables             |
+------------------------------+----------------+-------------------+----------------------------+--------------------------+
| neutron-metadata-agent       |                | computes          | neutron/                   | db                       |
+------------------------------+----------------+-------------------+----------------------------+--------------------------+
| neutron-ns-metadata-proxy    |                | controllers       | neutron/                   | db                       |
+------------------------------+----------------+-------------------+----------------------------+--------------------------+
| neutron-openvswitch-agent    |                | all nodes         | neutron/                   | ovs                      |
+------------------------------+----------------+-------------------+----------------------------+--------------------------+

** logs are relative to */var/log/*

\*\*\* links between external component(s)

Namespaces
::::::::::

The active *network* node must have as many linux network *namespace* named
qrouter-xxx as the number of routers managed by **neutron**.

DHCP agent
::::::::::

The neutron-dhcp-agent relies on **dnsmasq** to handle DHCP requests, which at
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

It's interesting to monitor response time and rate of these operations:

- network CRUD
- subnet CRUD
- port CRUD
- router CRUD
- floating-ip CRUD

Operations rate and response time can be gathered by enabling Neutron notifications.

Resource usage
``````````````
Monitor floating IP pool usage to detect pool exhaustion
an 
