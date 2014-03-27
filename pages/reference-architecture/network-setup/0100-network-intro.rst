.. raw:: pdf

   PageBreak

.. index:: Network Architecture

Network Architecture
====================

.. contents :local:

For better network performance and manageability, Fuel place different types 
of traffic into separate networks. This section describes how to distribute 
the network traffic in an OpenStack cluster. 

.. index:: Admin (PXE) Network

This network is reserved for communcation with Fuel master for provisioning
and orchestration of OpenStack deployment. It is used during installation to
provide DNS, DHCP, and gateway services to a node if it requires it before
provisioning. Nodes retrieve their network configuration via DHCP from Fuel
Master node. This is why it is important that this network is isolated from
your network and has no DHCP server (except Fuel Master) running on it.
