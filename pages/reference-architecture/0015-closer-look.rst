.. index:: Reference Architectures: Multi-node with HA Details

.. _Close_look_Multi-node_HA:

Details of Multi-node with HA Deployment
========================================

OpenStack services are interconnected by RESTful HTTP-based APIs and
AMQP-based RPC messages. So redundancy for stateless OpenStack API
services is implemented through the combination of Virtual IP (VIP)
management using Pacemaker and load balancing using HAProxy. Stateful
OpenStack components, such as the state database and messaging server,
rely on their respective active/active and active/passive modes for high availability.
For example, RabbitMQ uses built-in clustering capabilities, while the
database uses MySQL/Galera replication.

.. image:: /_images/ha-overview.*
  :width: 100%
  :align: center

Lets take a closer look at what an OpenStack deployment looks like, and
what it will take to achieve high availability for an OpenStack deployment.

