.. index:: Reference Architectures: Multi-node with HA

.. _Multi-node_HA:

Multi-node with HA Deployment
=============================

High availability is recommended for production environments.
This provides replicated servers to prevent single points of failure.
An HA deployment must have at least three controllers
as well as replicas of other servers.
You can combine compute, storage, and network nodes
to reduce the hardware requirements for the environment,
although this may degrade the performance and robustness of the environment.

.. image:: /_images/deployment-ha-compact.*
  :width: 80%
  :align: center

