.. raw:: pdf

   PageBreak

.. index:: Neutron vs. nova-network, Quantum vs. nova-network

.. _neutron-topologies-arch:

Neutron Network Topologies
==========================

Neutron (formerly Quantum) is a service which provides Networking-as-a-Service
functionality in OpenStack. It has a rich tenant-facing API for defining
network connectivity and addressing in the cloud, and gives operators the
ability to leverage different networking technologies to power their cloud
networking.

There are various deployment use cases for Neutron. Fuel supports the most
common of them, called Per-tenant Routers with Private Networks.
Each tenant has a virtual Neutron router with one or more private networks,
which can communicate with the outside world.
This allows full routing isolation for each tenant private network.

Neutron is not, however, required in order to run an OpenStack environment. If
you don't need (or want) this added functionality, it's perfectly acceptable to
continue using nova-network.

In order to deploy Neutron, you need to enable it in the Fuel configuration.
Fuel sets up Neutron components on each of the controllers
to act as a virtual Neutron router in HA (if deploying in HA mode).


.. include:: /pages/reference-architecture/neutron-intro/0200-neutron-tech-intro.rst
.. include:: /pages/reference-architecture/neutron-intro/0210-vlan.rst
.. include:: /pages/reference-architecture/neutron-intro/0220-gre.rst
.. include:: /pages/reference-architecture/neutron-intro/0300-neutron-limits.rst
.. include:: /pages/reference-architecture/neutron-intro/0500-nic-usage.rst

