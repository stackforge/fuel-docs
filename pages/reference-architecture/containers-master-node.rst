.. _containers-master-node:

The Fuel Master node containers structure
=========================================

Most services hosted on the Fuel Master node,
require connectivity to PXE network.
The services used only for internal Fuel
processes (such as Nailgun and Postgres) 
are limited to local connections only.

Containers structure
--------------------

.. image:: /_images/fuel-master-node-containers.png
  :width: 70%


+=============+=================+============================+
| Container	  | Ports           | Allow connections from     |
+=============+=================+============================+
| Cobbler     | TCP  80, 443    | PXE network only           |
|             | UDP  53, 69     |                            |
+-------------+-----------------+----------------------------+
| Postgres    | TCP  5432       | the Fuel Master node only  |
+-------------+-----------------+----------------------------+
| RabbitMQ    | TCP  5672,4369  | PXE network only           |
|             | 15672,61613     |                            |
+-------------+-----------------+----------------------------+
| Rsync       | TCP  873        | PXE network only           |
+-------------+-----------------+----------------------------+
| Astute      | none            | N/A                        |
+-------------+-----------------+----------------------------+
| Nailgun     | TCP  8001       | the Fuel Master node only  |
+-------------+-----------------+----------------------------+
| OSTF        | TCP  8777       | the Fuel Master node only  |
+-------------+-----------------+----------------------------+
| Nginx       | TCP  8000,8080  | the Fuel Master node only  |
+-------------+-----------------+----------------------------+
| Rsyslog     | TCP  8777,25150 | PXE network only           |
|             | UDP 514         |                            |
+-------------+-----------------+----------------------------+
| MCollective | none            | N/A                        |
+-------------+-----------------+----------------------------+
| Keystone    | TCP 5000,35357  | PXE network only           |
+-------------+-----------------+----------------------------+


