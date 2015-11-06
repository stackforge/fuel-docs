.. _vsphere_configure_network:

Configure the networks
======================

Configure network for Fuel PXE traffic
--------------------------------------

#. Log into the vSphere web client and click on the vCenter item in the left menu.
#. Go to the Datastores and choose your datastore.
#. Go to the Actions menu and choose the "Browse Files" item.
#. Click on the "Upload Files" icon, browse your filesystem,
   and select your Mirantis ISO.
#. Create a network for Fuel PXE traffic and enable Promiscuous mode
   on it:
 #. Go back to the vCenter screen and choose the "Hosts" item in
    the left menu.
 #. Click on the host where you want to run the Fuel Master node.
 #. Click on the "Networking" button.
 #. Click on the "Add Host Networking" icon.

Create a vCenter Port Group network
-----------------------------------

#. Choose a Port Group connection type.
#. Choose a switch.
#. Name your network and set the VLAN number. This is optional
   and depends on your underlying network infrastructure.
#. After the network is created, select the network on the network
   map by clicking on its name, then click on the "Edit Settings" icon.
#. Click the "Security" item in the left menu and ensure that Promiscuous
   mode is set to Accept.
#. Click "OK".
