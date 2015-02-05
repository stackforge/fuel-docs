

.. _controller-arch:

Controller Nodes
----------------

The first order of business in achieving high availability (HA) is
redundancy, so the first step is to provide multiple controller nodes.

The MySQL database uses Galera to achieve HA, and Galera is
a quorum-based system. That means that you should have at least 3
controller nodes.

.. image:: /_images/logical-diagram-controller.*
  :width: 80%
  :align: center

Every OpenStack controller runs HAProxy, which manages a single External
Virtual IP (VIP) for all controller nodes and provides HTTP and TCP load
balancing of requests going to OpenStack API services, RabbitMQ, and MySQL.

.. note:: OpenStack services with the latest
  `Oslo messaging <https://wiki.openstack.org/wiki/Oslo/Messaging>`_ are
  directly connected to the RabbitMQ nodes and do not use HAProxy.

.. note:: Fuel deploys HAProxy inside its own dedicated network namespace.
  In order to achieve this goal, custom resource agent scripts for Pacemaker
  are used instead of classic heartbeat provider for VIP addresses.

When an end user accesses the OpenStack cloud using Horizon or makes a
request to the REST API for services such as nova-api, glance-api,
keystone-api, neutron-api, nova-scheduler or MySQL, the
request goes to the live controller node currently holding the External VIP,
and the connection gets terminated by HAProxy. When the next request
comes in, HAProxy handles it, and may send it to the original
controller or another in the environment, depending on load conditions.

Each of the services housed on the controller nodes has its own
mechanism for achieving HA:

* OpenStack services, such as nova-api, glance-api, keystone-api, neutron-api,
  nova-scheduler, cinder-api are stateless services that do not require any special
  attention besides load balancing.
* Horizon, as a typical web application, requires sticky sessions to be enabled
  at the load balancer.
* RabbitMQ provides active/active high availability using mirrored queues and is
  deployed with custom resource agent scripts for Pacemaker.
* MySQL high availability is achieved through Galera deployment and custom resource
  agent scripts for Pacemaker. Please, note that HAProxy configures MySQL backends as
  active/passive because OpenStack support for multi-node writes to Galera nodes is
  not production ready yet.
* Neutron agents are active/passive and are managed by custom resource agent scripts
  for Pacemaker.
* Ceph monitors implement their own quorum based HA mechanism and
  require time synchronization between all nodes. Clock drift higher
  than 50ms may break the quorum or even crash the Ceph service.

