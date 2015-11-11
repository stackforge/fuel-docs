.. _install_boot_nodes:

Boot the Fuel Slave nodes
~~~~~~~~~~~~~~~~~~~~~~~~~

Before you boot the Fuel Slave nodes, verify that you have completed
the following tasks:

#. : ref :`Install and boot the Fuel Master node <install_install_fuel_master_node>`.

#. Configure the network:

   * If you use bare-metal servers, ensure that the Fuel Slave nodes are
     physically connected to the same network as the Fuel Master node.

   * If you use virtual servers, ensure that the Fuel Slave nodes
     are bridged to the same network as the Fuel Master node:
     the Fuel Master node and the Fuel Slave nodes should be in
     the same L2 network segment.

**To boot the Fuel Slave nodes:**

#. Power up a Fuel Slave node.

#. Boot the Fuel Slave node through PXE using one of the following options:

   * Modify the BIOS boot order.
   * Press the appropriate key to initiate a PXE boot.

   If the Fuel Slave node has several network interfaces, enable the PXE-boot
   on the interface that is on the same network you configured for the PXE-boot
   on the Fuel Master node.

#. Repeat the procedure for all the Fuel Slave nodes you will be using for your
   OpenStack environment.

Boot workflow of a Fuel Slave node
----------------------------------

The boot workflow of a Fuel Slave node does not require any user interaction.
For general understanding of the processes that take place in the system when
the Fuel Slave node is booting, get acquanted with the boot procedure:

#. The Fuel Slave node sends out a DHCP discovery request and gets the response
   from the Fuel Master node that runs the DHCP server.

#. On receiving the response, the Fuel Slave node fetches the PXELINUX
   bootloader and the bootstrap image from the Fuel Master node's TFTP
   server, and boots into it.

#. On loading the image, the Fuel Slave node reports readiness and
   configuration to the Fuel Master node.

The count of the discovered nodes is available in the Fuel Web UI. Its value is
incremented as each new node is ready. When the count of the discovered
nodes becomes equal to the amount of the servers you have booted in the
network, proceed with the creation of your OpenStack environment.

.. seealso::

   - : ref : `create-env-ug`

