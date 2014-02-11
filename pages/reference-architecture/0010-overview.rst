.. raw:: pdf

   PageBreak

.. index Reference Architectures

Overview 
========

.. contents :local:

This document provides in-depth architectural information
about the various OpenStack components, projects, and technologies
that Fuel can deploy.
This can help you understand the deployment options you have
so you can choose the components that are most appropriate.

This material is organized into the following sections:

**Deployment Architecture**
  Fuel supports a number of different deployment models out of
  the box, including:
  
  * **Virtualized Multi-node mode** -- Mirantis OpenStack deployed in VMs
    on a non-dedicated machine.
    This is a relatively easy deployment that is appropriate
    for evaluations and demos.
    This mode does not provide either the robustness or the performance
    that is required for a production system.
  * **Bare-metal Multi-node** -- OpenStack features deployed on bare-metal hardware.
    Either Mirantis OpenStack or Red Hat OpenStack can be deployed in this mode.
    This deployment is appropriate for more in-depth demos and evaluations
    and some functional unit testing.
    It does not provide either the robustness
    that is required for a production system;
    performance levels are determined by the hardware used.
  * **Multi-node with HA** -- Adds High-Availability features
    such as failover to the Multi-node features
    to create a production quality deployment.
    Either Mirantis OpenStack or Red Hat OpenStack can be deployed in this mode
    but some details are different fort the different distros.
  * **Murano Cluster** -- A deployment that uses Microsoft Windows
    as the operating system for OpenStack features.
    Fuel can deploy a Dashboard, the Conductor orchestration engine,
    and a Metadata Repository on top of a Murano deployment.
  * **Hadoop Cluster** -- An OpenStack deployment appropriate
    for running Hadoop.

**Compute:**
  Compute servers are the workhorses of your installation; they're 
  the servers on which your users' virtual machines are created. 
  `nova-compute` controls the life cycle of these VMs.

**Networking:**
  Typically, an OpenStack environment includes multiple servers that
  need to communicate with each other and to outside world.
  Fuel supports both old `nova-network` and new `neutron` based
  OpenStack Networking implementations:

  * With `nova-network`, Flat-DHCP and VLAN modes are available.

  * With `neutron`, GRE tunnels or VLANs can be used for network
    segmentation.  The Red Hat OpenStack Platform
    does not currently support this option.

**Storage:**
  OpenStack requires block and object storage to be provisioned. Fuel
  provides the following storage options out of the box:

  * Cinder LVM provides persistent block storage to virtual machines
    over iSCSI protocol

  * Swift object store can be used by Glance to store VM images and
    snapshots, it may also be used directly by applications

  * Ceph combines object and block storage and can replace either one or
    both of the above.
