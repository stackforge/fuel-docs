.. raw:: pdf

   PageBreak

.. index:: Reference Architectures: RHOS, Red Hat OpenStack Architecture

Red Hat OpenStack Architectures
===============================

.. contents :local:

Red Hat has partnered with Mirantis to offer an end-to-end supported
distribution of OpenStack powered by Fuel. Because Red Hat offers support
for a subset of all available open source packages, the reference architecture
has been slightly modified to meet Red Hat's support requirements to provide
a highly available OpenStack environment.

Below is the list of modifications:

**Database backend:**
  MySQL with Galera has been replaced with native replication in a
  Master/Slave configuration. MySQL master is elected via Corosync
  and master and slave status is managed via Pacemaker.

**Messaging backend:**
  RabbitMQ has been replaced with QPID. Qpid is an AMQP provider that Red
  Hat offers, but it cannot be clustered in Red Hat's offering. As a result,
  Fuel configures three non-clustered, independent QPID brokers. Fuel still
  offers HA for messaging backend via virtual IP management provided by
  Corosync.

**Nova networking:**
  Neutron (Quantum) is not available for Red Hat OpenStack because the Red Hat kernel
  lacks GRE tunneling support for OpenVSwitch. This issue should be
  fixed in a future release. As a result, Fuel for Red Hat OpenStack
  Platform will only support Nova networking.

.. index:: Reference Architectures: RHOS Multi-node

.. _RHOS_Multi-node:

Multi-node Red Hat OpenStack Deployment
--------------------------------------------

In a production environment, it is not likely you will ever have a Multi-node
deployment of OpenStack, partly because it forces you to make a number
of compromises as to the number and types of services that you can
deploy. It is, however, extremely useful if you just want to see how
OpenStack works from a user's point of view.

.. image:: /_images/deployment-simple-red-hat.*
  :width: 60%
  :align: center

More commonly, your OpenStack installation will consist of multiple
servers. Exactly how many is up to you, of course, but the main idea
is that your controller(s) are separate from your compute servers, on
which your users' VMs will actually run. One arrangement that will
enable you to achieve this separation while still keeping your
hardware investment relatively modest is to house your storage on your
controller nodes.

.. index:: Reference Architectures: RHOS Multi-node with HA

.. _RHOS_Multi-node_HA:

Multi-node with HA Red Hat OpenStack Deployment
-----------------------------------------------

Production environments typically require high availability, which
involves several architectural requirements. Specifically, you will
need at least three controllers, and
certain components will be deployed in multiple locations to prevent
single points of failure. That's not to say, however, that you can't
reduce hardware requirements by combining your storage, network, and controller
nodes:

.. image:: /_images/deployment-ha-compact-red-hat.*
  :width: 80%
  :align: center

OpenStack services are interconnected by RESTful HTTP-based APIs and AMQP-based
RPC messages. So redundancy for stateless OpenStack API services is implemented
through the combination of Virtual IP (VIP) management using Corosync and load
balancing using HAProxy. Stateful OpenStack components, such as the state database
and messaging server, rely on their respective active/passive modes for high
availability. For example, MySQL uses built-in replication capabilities (plus
the help of Pacemaker), while QPID is offered in three independent brokers with
virtual IP management to provide high availability.

.. image:: /_images/ha-overview-red-hat.*
  :width: 100%
  :align: center
