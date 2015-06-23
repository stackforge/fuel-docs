Introduction
============

You can install Fuel on VirtualBox and use that to deploy a Mirantis
OpenStack environment for demonstration and evaluation purposes.
Mirantis provides scripts that create and configure all the VMs required
for a test environment, including the Master node and Slave nodes.

This guide provides information on how to run Fuel and Mirantis OpenStack
on VirtualBox.


Prerequisites
-------------

Running Fuel and Mirantis OpenStack on VirtualBox has a number of prerequisites
and dependencies. Before proceding with the deployment steps, please
verify whether you meet these requirements:


#. Run VirtualBox on a stable host system; we recommend 64-bit host OS.
   The scripts have been tested on Mac OS 10.7.5, Mac OS 10.8.3,
   Ubuntu 12.04, Ubuntu 12.10, Ubuntu 14.04, Fedora 19, OpenSUSE 12.2/12.3,
   and Windows 7 x64 + Cygwin_x64.

#. Download and install
   `VirtualBox <https://www.virtualbox.org/wiki/Downloads>`__ 4.2.16 or later.

#. Download and install
   `VirtualBox extensions <https://www.virtualbox.org/wiki/Downloads>`_.

#. Download and extract
   `Mirantis VirtualBox scripts <https://software.mirantis.com/load/6-0-vbox/>`_

#. Download the `Mirantis OpenStack ISO <https://software.mirantis.com/openstack-downloads/>`_.

If you want to run these scripts on Windows directly, you should also:

#. Download and install Cygwin for 64-bit version of Windows.

#. Select ``expect``, ``openssh``, and ``procps`` packages to install.

   To do this, search by the names of the packages required
   in the :guilabel:`Select Packages` dialog of the Cygwin install wizard:

   .. image:: /_images/procps.png
      :align: center

|

**Hardware Recommendations: 8 GB+ of RAM**

* Supports 4 VMs for Multi-node OpenStack installation
  (1 Master node, 1 Controller node, 1 Compute node, 1 Cinder node).
  The size of each VM should be reduced to 1536 MB RAM.
  For dedicated Cinder node, 768 MB of RAM is enough.

or

* Supports 5 VMs for Multi-node with HA OpenStack installation
  (1 Master node, 3 combined Controller + Cinder nodes, 1 Compute node).
  The size of each VM should be reduced to 1280 MB RAM.
  This is less that the recommended amount of RAM amount per node
  for HA configurations (2048+ MB per controller)
  and may lead to unwanted issues.


Issue with some Linux distributions
-----------------------------------

In some of Linux distributions (at least in Fedora 20), you may encounter
an issue with the NetworkManager service interfering with VirtualBox host-only
network functionality.

NetworkManager service may interfere with VirtualBox IP addresses assigned
for host-only adapters and remove the IP addresses after DHCP timeout. This
may lead to different problems: for example, it will be impossible
to deploy an HA environment.

To avoid the problem, follow these steps:

#. Make sure the the initial installation of Fuel is completed.

#. Add the **NM_CONTROLLED=no** line at the beginning of all
   vboxnet interface configuration files.
   These files may be called differently, depending on
   your Linux distribution or configuration.
   Example:

   ::

      [user@system]$ ls -l /etc/sysconfig/network-scripts/ifcfg-*
      -rw-r--r--. 1 root root 254 Jan 14  2014 /etc/sysconfig/network-scripts/\
      ifcfg-lo
      -rw-r--r--. 1 root root 178 Feb 13 12:01 /etc/sysconfig/network-scripts/\
      ifcfg-p2p1
      -rw-r--r--. 1 root root 242 Feb 16 12:14 /etc/sysconfig/network-scripts/\
      ifcfg-Wired_connection_1
      -rw-r--r--. 1 root root 242 Feb 16 12:14 /etc/sysconfig/network-scripts/\
      ifcfg-Wired_connection_2
      -rw-r--r--. 1 root root 242 Feb 16 12:14 /etc/sysconfig/network-scripts/\
      ifcfg-Wired_connection_3

   Here, files **Wired_connection_1** through **Wired_connection_3** are the files
   that configure vboxnet interfaces and should be edited with the *NM_CONTROLLED=no** line.

#. Stop all VMs in VirtualBox.

#. Reboot the host.

#. Start the VMs.

#. Proceed with environment creation.

For more information, see `LP1421723 <https://bugs.launchpad.net/fuel/+bug/1421723>`_.
