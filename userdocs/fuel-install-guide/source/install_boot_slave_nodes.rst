.. _install_boot_nodes:


Boot the Fuel Slave nodes
-------------------------

Before you boot the Fuel Slave nodes, verify that you have completed
the following tasks:

#. :ref:`Install the Fuel Master node <install_install_fuel_master_node>`.

#. If you plan using RAID arrays, configure you RAID-attached devices first.

#. Configure the network:

   * If you use bare-metal servers, verify that the Fuel Slave nodes are
     physically connected to the same network as the Fuel Master node.

   * If you use virtual servers, verify that the Fuel Slave nodes
     are bridged to the same network as the Fuel Master node.
     The Fuel Master node and the Fuel Slave nodes must be in
     the same L2 network segment.

**To boot the Fuel Slave nodes:**

#. Power on a Fuel Slave node.

#. Boot the Fuel Slave node through PXE using one of the following options:

   * Modify the boot order in BIOS to PXE boot.
   * Press the appropriate key to initiate a PXE boot.

   .. warning::

      If the Fuel Slave node has several network interfaces, enable
      the PXE boot on the interface that is on the same network
      as Admin (PXE) network on the Fuel Master node.

#. Repeat the procedure for all the Fuel Slave nodes you will use for your
   OpenStack environment.

Boot workflow of a Fuel Slave node
----------------------------------

The boot workflow of a Fuel Slave node does not require any user interaction.
For general understanding of the processes that take place in the system when
the Fuel Slave node is booting, get acquainted with the boot procedure:

#. The Fuel Slave node sends out a DHCP discovery request and gets the response
   from the Fuel Master node that runs the DHCP server.

#. On receiving the response, the Fuel Slave node fetches the PXELINUX
   bootloader and the bootstrap image from the Fuel Master node's TFTP
   server, and boots into it.

#. On loading the image, the Fuel Slave node reports readiness and
   configuration to the Fuel Master node.

The number of discovered Fuel Slave nodes appears in the Fuel web UI.
When all nodes boot, you can create an OpenStack environment.


