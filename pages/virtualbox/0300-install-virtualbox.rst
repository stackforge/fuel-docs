Introduction
============

You can install Fuel on VirtualBox
and use that to deploy a Mirantis OpenStack environment
for demonstration and evaluation purposes.
Mirantis provides scripts that create and configure
all the VMs required for a test environment,
including the Master node and Slave nodes.
See the `Quick Start Guide <http://software.mirantis.com/quick-start/>`_
for links and instructions.

This guide provides additional information
about running Fuel and Mirantis OpenStack on VirtualBox.

The requirements for running Fuel on VirtualBox are:

  A host machine with Linux, Windows or Mac OS. We recommend 64-bit host OS.
  The scripts have been tested on Mac OS 10.7.5, Mac OS 10.8.3, Ubuntu 12.04,
  Ubuntu 12.10, Fedora 19, OpenSUSE 12.2/12.3, and Windows 7 x64 + Cygwin_x64.

VirtualBox 4.2.16 (or later) is required, along with the extension pack.
Both can be downloaded from `<http://www.virtualbox.org/>`_.

.. note::

  To run these scripts on Windows directly,
  you must first install Cygwin on your system;
  see the `Cygwin installation page <http://www.cygwin.com/install.html>`_.
  You can also manually create the VMs to use for Fuel and the Slave nodes.

8 GB+ of RAM
  Supports 4 VMs for Multi-node OpenStack installation
  (1 Master node, 1 Controller node, 1 Compute node, 1 Cinder node).
  The size of each VM should be reduced to 1536 MB RAM.
  For dedicated Cinder node, 768 MB of RAM is enough.

  or

  Supports 5 VMs for Multi-node with HA OpenStack installation
  (1 Master node, 3 combined Controller + Cinder nodes, 1 Compute node).
  The size of each VM should be reduced to 1280 MB RAM.
  This is less that the recommended amount of RAM amount per node
  for HA configurations (2048+ MB per controller)
  and may lead to unwanted issues.
