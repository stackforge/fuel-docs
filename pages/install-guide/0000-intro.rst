.. index:: Introduction

.. _Introduction:

Introduction
================================
This section introduces Fuel for OpenStack and its components. 


Introducing Fuel for OpenStack
--------------------------------

Mirantis Fuel for OpenStack is a set of deployment tools that helps you to 
quickly deploy your cloud environment. Fuel includes the scripts that 
dramatically facilitate and speed up the process of cloud deployment. 
Typically, OpenStack installation requires you familiarize yourself 
with the processes of installation of OpenStack environment components.
Fuel eliminates the need to study these processes. With Fuel, system 
administrators can provision an OpenStack single node, as well as 
clustered cloud in terms of minutes.

Deployment Modes
-----------------------------

You can use Fuel for OpenStack to create virtually any OpenStack 
configuration. However, Mirantis provides several pre-defined 
architectures for your convenience. 
The pre-defined architectures include:
 
* **Multi-node**
  The Multi-node environment provides an easy way 
  to install an entire OpenStack environment without requiring the degree 
  of increased hardware involved in ensuring high availability.
  Mirantis recommends that you use this architecture for testing
  purposes.
  
* **Multi-node HA**
  The Multi-node with HA environment is dedicated for highly available
  production deployments. Using Multi-node with HA you can deploy
  additional services, such as Cinder, Neutron, and Ceph.
  You can create the following multi-node environments: 

With Fuel, you can create your own cloud environment that includes
additional components. 

For more information, contact `Mirantis <http://www.mirantis.com/contact/>`_.

.. seealso:: `Reference Architecture<ref-arch>`_

About Fuel and OpenStack Components
-----------------------------------

You can use Fuel to quickly deploy and manage the OpenStack environment.

Fuel includes the following components:

* **Master Node**
   The Fuel Master Node is the lifecycle management application for
   deployment and managing OpenStack. It sits outside the OpenStack
   environment and services as a control plane for multiple OpenStack
   envionments. 

* **Controller Node**
   A controller node that manages the OpenStack environment including
   deployment of additional controller and compute nodes, configuring
   network settings, and so on. For HA deployments, Mirantis recommends
   to deploy at least 3 controller nodes.

* **Compute Node(s)**
   A compute node is a server where you run virtual machines and 
   applications.
  
* **Storage Node(s)**
   Optional component. You can deploy a separate Swift or Ceph storage
   node. Mirantis recommends to deploy standalone storage nodes for high 
   availability environments. 

Supported Software
------------------

* **Operating Systems**

  * CentOS 6.4 (x86_64 architecture only)
  * RHEL 6.4 (x86_64 architecture only)
  * Ubuntu 12.04 (x86_64 architecture only)

* **Puppet (IT automation tool)** 2.7.23

* **MCollective** 2.3.3

* **Cobbler (bare-metal provisioning tool)** 2.2.3

* **OpenStack Core Projects**

  * Havana release 2013.2.1

    * Nova (OpenStack Compute)
    * Swift (OpenStack Object Storage)
    * Glance (OpenStack Image Service)
    * Keystone (OpenStack Identity)
    * Horizon (OpenStack Dashboard)
    * Neutron (OpenStack Networking)
    * Cinder (OpenStack Block Storage service)

* **OpenStack Core Integrated Projects**

  * Havana Release 2013.2.1

    * Ceilometer (OpenStack Telemetry)
    * Heat (OpenStack Orchestration)

* **OpenStack Related Projects**

  * Savanna v0.3
  * Murano v0.4

* **Hypervisor**

  * KVM
  * QEMU

* **Open vSwitch** 1.10.2 (CentOS), 1.10.1 (Ubuntu)

* **HA Proxy** 1.4.19

* **Galera** 23.2.2

* **RabbitMQ** 2.8.7

* **Pacemaker** 1.1.8

* **Corosync** 1.4.3 (CentOS), 1.4.4 (Ubuntu)

* **Keepalived** 1.2.4

* **Ceph Dumpling** (v0.67)

Fuel Installation Procedures
----------------------------
You must complete the following tasks to use Fuel to deploy OpenStack
clouds:

1. Install the Fuel Master Node on physical or virtual hardware using 
   the Fuel installation image
2. Set the other nodes to boot from the network and power them on 
   to make them accessible for Fuel Master node
3. Assign your desired roles to the discovered nodes using Fuel
   UI or CLI.

Fuel is designed to maintain the OpenStack environment while providing
the flexibility to adapt it to your configuration.

.. image:: /_images/how-it-works.*
  :width: 80%
  :align: center
