Controller Nodes
----------------

The first order of business in achieving high availability (HA) is
redundancy, so the first step is to provide multiple controller nodes.

As you may recall, the database uses Galera to achieve HA, and Galera is
a quorum-based system. That means that you should have at least 3
controller nodes.

.. image:: /_images/logical-diagram-controller.*
  :width: 80%
  :align: center

Every OpenStack controller runs HAProxy, which manages a single External
Virtual IP (VIP) for all controller nodes and provides HTTP and TCP load 
balancing of requests going to OpenStack API services, RabbitMQ, and MySQL.

When an end user accesses the OpenStack cloud using Horizon or makes a
request to the REST API for services such as nova-api, glance-api,
keystone-api, neutron-api, nova-scheduler, MySQL or RabbitMQ, the
request goes to the live controller node currently holding the External VIP,
and the connection gets terminated by HAProxy. When the next request
comes in, HAProxy handles it, and may send it to the original
controller or another in the environment, depending on load conditions.

Each of the services housed on the controller nodes has its own
mechanism for achieving HA:

* nova-api, glance-api, keystone-api, neutron-api and nova-scheduler are 
  stateless services that do not require any special attention besides load 
  balancing.
* Horizon, as a typical web application, requires sticky sessions to be enabled 
  at the load balancer.
* RabbitMQ provides active/active high availability using mirrored queues.
* MySQL high availability is achieved through Galera active/active multi-master 
  deployment and Pacemaker.
* Neutron agents are managed by Pacemaker.
* Ceph monitors implement their own quorum based HA mechanism and
  require time synchronization between all nodes. Clock drift higher
  than 50ms may break the quorum or even crash the Ceph service.
