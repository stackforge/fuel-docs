.. index:: Reference Architectures: Multi-node with HA

.. _Multi-node_HA:

Multi-node with HA Deployment
=============================

Production environments typically require high availability, which
involves several architectural requirements. Specifically, you will
need at least three controllers, and
certain components will be deployed in multiple locations to prevent
single points of failure. That's not to say, however, that you can't
reduce hardware requirements by combining your storage, network, and controller
nodes:

.. image:: /_images/deployment-ha-compact.*
  :width: 80%
  :align: center

We'll take a closer look at the details of this deployment configuration in 
:ref:`Close_look_Multi-node_HA` section.
