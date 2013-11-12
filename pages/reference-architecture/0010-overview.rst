.. raw:: pdf

   PageBreak

.. index Reference Architectures

Overview 
========

.. contents :local:

Before you install any hardware or software, you must know what 
you're trying to achieve. This section looks at the basic components of
an OpenStack infrastructure and organizes them into one of the more
common reference architectures. You'll then use that architecture as a
basis for installing OpenStack in the next section.

As you know, OpenStack provides the following basic services:

**Compute:**
  Compute servers are the workhorses of your installation; they're 
  the servers on which your users' virtual machines are created. 
  `nova-compute` controls the life cycle of these VMs.

**Networking:**
  Typically, an OpenStack environment includes multiple servers that
  need to communicate to each other and to outside world. Fuel supports
  both old `nova-network` and new `neutron` based OpenStack Networking
  implementations:

  * With `nova-network`, Flat-DHCP and VLAN modes are available.

  * With `neutron`, GRE tunnels or VLANs can be used for network
    segmentation.

**Storage:**
  OpenStack requires block and object storage to be provisioned. Fuel
  provides the following storage options out of the box:

  * Cinder LVM provides persistent block storage to virtual machines
    over iSCSI protocol

  * Swift object store can be used by Glance to store VM images and
    snapshots, it may also be used directly by applications

  * Ceph combines object and block storage and can replace either one or
    both of the above.

Compute, Networking, and Storage services can be combined in many
different ways. Out of the box, Fuel supports the following deployment
configurations:

- :ref:`Multi-node <Multi-node>`
- :ref:`Multi-node with HA <Multi-node_HA>`
- :ref:`RHOS Multi-node <RHOS_Multi-node>`
- :ref:`RHOS Multi-node with HA <RHOS_Multi-node_HA>`
