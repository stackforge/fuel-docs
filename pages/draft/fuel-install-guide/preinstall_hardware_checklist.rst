.. index:: Hardware configuration, confirm

.. _preinstall_chklist_hardware_checklist:

Hardware checklist
~~~~~~~~~~~~~~~~~~

Before you install the Fuel Master node, verify that you have configured your
hardware correctly. If you install Fuel on virtual hardware for testing
purposes, skip this section.

You must configure all items from the list below before you install Fuel.

**Hardware checklist**

+--------------------------------------------------------+--------------+
| Item to confirm                                        | Status [tick |
|                                                        | if done]     |
+========================================================+==============+
| The Fuel server has an IPMI or out-of-band management  |              |
| system that you can access.                            |              |
+--------------------------------------------------------+--------------+
| The Fuel server hardware can boot the Fuel ISO         |              |
| from a DVD, USB flash drive, or IPMI remote media.     |              |
+--------------------------------------------------------+--------------+
| The server on which you plan to install the Fuel Master|              |
| node can access all nodes through the L2 management    |              |
| network.                                               |              |
+--------------------------------------------------------+--------------+
| The Admin (PXE) network does not have a configured DHCP|              |
| server. Fuel acts as a DHCP server for Fuel Slave      |              |
| nodes configured to boot using PXE.                    |              |
+--------------------------------------------------------+--------------+
| The Spanning Tree Protocol (STP) is disabled on switch |              |
| ports connected                                        |              |
| to the node servers’ ports or the switch ports are set |              |
| to the edge/portfast mode. The edge/portfast mode is   |              |
| the preferred configuration. It allows the ports to    |              |
| forward immediately when they are linked up, but       |              |
| listens for network loops for 15 seconds.              |              |
+--------------------------------------------------------+--------------+
| The switch assigned for the Admin network does not have|              |
| any tagged VLANs configured.                           |              |
+--------------------------------------------------------+--------------+
| The node servers are set to network boot using PXE.    |              |
+--------------------------------------------------------+--------------+
| The node servers have hardware virtualization          |              |
| enabled in BIOS.                                       |              |
+--------------------------------------------------------+--------------+
| You have a method to reboot node servers (remotely or  |              |
| on-site).                                              |              |
+--------------------------------------------------------+--------------+
| The network equipment supports VLANs.                  |              |
+--------------------------------------------------------+--------------+
| Your network switches support tagged ports.            |              |
| You need tagged ports in order to                      |              |
| use the nova-network VLAN Manager or Neutron with      |              |
| VLAN segmentation.                                     |              |
+--------------------------------------------------------+--------------+
| You have permit rules on TCP ports 22 and 8000 on the  |              |
| firewall for the Fuel server’s IP address (to access   |              |
| the Fuel server from your PC).                         |              |
+--------------------------------------------------------+--------------+
