.. raw:: pdf

   PageBreak

.. index:: Reference Architectures: Multi-node

.. _Multi-node:

OpenStack Distributions
=======================

Fuel can deploy and manage either the
Mirantis OpenServer or Red Hat OpenServer distributions.
Both distros provide a stable build of the open source OpenStack technologies.
Mirantis OpenStack allows you to deploy an operating system
based on either the CentOS or Ubuntu Linux distribution;
Red Hat OpenStack allows you to deploy the Red Hat operating system.

The reference architecture has been modified slightly
to support the open source packages that are included in the Red Hat distro.

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


Virtualized Multi-node Deployment
=================================

Fuel can deploy a virtualized OpenStack environment
on your laptop or other system that is running
Linux, OSX, or Windows with Cygwin installed.
Tools are provided to quickly set up multiple VMs.
By default, the tools create four VMs:
one serves as the Fuel Master Node
and the other three can be defined
to be your controller, compute, and storage nodes.

The virtualizied deployment is appropriate for evaluation and demos
and is a quick way to familiarize yourself
with Fuel and OpenStack.  See the
`Fuel Quick Start Guide` <http://software.mirantis.com/quick-start/>`_.

Bare-metal Multi-node Deployment
================================

The bare-metal multi-node deployment mode
installs Fuel and OpenStack on a small number of commodity servers.
This can be used for evaluation, demos,
and some functional application unit testing.
This mode is not appropriate for a production environment
because it forces you to make a number of compromises
as to the number and types of services that you can deploy.
and it does not have the robustness or the performance
that is required for a production environment.

The software is installed from a DVD or thumb drive
that contains the *.iso* file you downloaded.
You need at least three servers:
one serves as the Fuel Master Node,
one serves as the controller node,
and one serves as the compute node where your users' VMs actually run.
You can configure multiple controller and compute nodes.

You must also have a storage node(s) and a networking node(s);
these can be located on their own servers
or can share either the controller node or compute node hardware.

.. image:: /_images/deployment-simple.*
  :width: 60%
  :align: center


Multi-node with HA Deployment
=============================

The high-availability (HA) deployment mode
is appropriate for a production environment.

Production environments typically require high availability, which
involves several architectural requirements. Specifically, you will
need at least three controllers, and
certain components will be deployed in multiple locations to prevent
single points of failure.
You can reduce hardware requirements by combining
your storage, network, and controller nodes.
For example, for Mirantis OpenStack:

.. image:: /_images/deployment-ha-compact.*
  :width: 80%
  :align: center

For Red Hat OpenStack:

.. image:: /_images/deployment-ha-compact-red-hat.*
  :width: 80%
  :align: center


OpenStack services are interconnected by RESTful HTTP-based APIs and
AMQP-based RPC messages.

Mirantis OpenStack implements redundancy for stateless OpenStack API services
through the combination of Virtual IP (VIP) management using Pacemaker
and load balancing using HAProxy.

.. image:: /_images/ha-overview.*
  :width: 100%
  :align: center

Red Hat OpenStack implements redundancy for stateless OpenStack API services
through the combination of Virtual IP (VIP) management using Corosync
and load balancing using HAProxy.

START HERE
For both Mirantis and Red Hat distributions,
stateful OpenStack components, such as the state database and messaging server,
rely on their respective active/active and active/passive modes for high availability.
For example, RabbitMQ uses built-in clustering capabilities, while the
database uses MySQL/Galera replication.

Stateful OpenStack components, such as the state database 
and messaging server, rely on their respective active/passive modes for high 
availability. For example, MySQL uses built-in replication capabilities (plus 
the help of Pacemaker), while QPID is offered in three independent brokers with 
virtual IP management to provide high availability.

.. image:: /_images/ha-overview-red-hat.*
  :width: 80%
  :align: center
