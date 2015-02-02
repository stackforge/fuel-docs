.. _Monitoring-core-components:

OpenStack Core Components
=========================

LibVirt
-------

MySQL
-----

monitor error and Slow queries from logs.


Cluster Galera
______________

Health of cluster


RabbitMQ
--------

check if processes *epmd* and *beam* are running

check if these TCP port are open :

- 4369
- 41055
- 5673 ..

Cluster
_______

Open vSwitch
------------

Memcache
--------

check if process *memcached* is running

check if TCP port is open: 11211

Clustering
----------

Pacemaker
_________

Check Pacemaker resources status by running command ligne **pcs status**. All resources must be **Started**.
