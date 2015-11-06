.. _vsphere_configure_network:

Configure the networks
======================

Configure network for Fuel Admin (PXE) traffic
----------------------------------------------

You must configure a network for the Fuel Admin (PXE) traffic
and enable Promiscuous mode.

**To configure a network for the Fuel Admin (PXE) traffic:**

 #. Go to the vCenter screen.
 #. Choose **Hosts**.
 #. Select the host on which you want to run the Fuel Master node.
 #. Click the **Networking** button.
 #. Click the **Add Host Networking** icon.

Create a vCenter Port Group network
-----------------------------------

You must create a Port Group with Promiscuous mode.

**To create a vCenter Port Group network:**

#. Choose a Port Group connection type.
#. Choose a switch.
#. Name your network and set the VLAN number. This is optional
   and depends on your underlying network infrastructure.
#. After the network is created, select the network on the network map;
   then click the **Edit Settings** icon.
#. Click **Security**.
#. Verify that the **Promiscous mode** is set to **Accept**.
#. Click "OK".
#. Proceed to :ref:`vsphere_create_vm`.
