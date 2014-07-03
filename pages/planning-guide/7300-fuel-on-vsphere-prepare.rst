
.. _fuel-on-vsphere-plan:

Preparing to run Fuel on vSphere
================================


Installation of Mirantis OpenStack 5.0 on vCenter
Example of Network topology
Step by step installation guide


Installation of Mirantis OpenStack 5.0 on vSphere
If you want to install the Fuel Master node on  the vCenter cluster you need:
1) Download the Mirantis OpenStack (MOS) ISO.
2) Upload the ISO to the vCenter Datastore.
3) Create a vCenter Port Group network with the Promiscuous mode enabled.
4) Create a Virtual Machine connected to that Port Group and with the ISO mounted to the DVD drive.
5) Install Mirantis OpenStack on that Virtual Machine.
6) (Optional) Verify the installation by launching another Virtual Machine in that Port Group and wait until it occurs in the Fuel Web UI.

Example of Network topology



Step by step installation guide

1) Go to the Mirantis OpenStack download page http://software.mirantis.com/ and download the fresh Mirantis OpenStack ISO (in our case it’s 5.0 release).

2) Upload the ISO to the vCenter Datastore.
2.1) Login to the vSphere web client and click to the vCenter item in the left menu.


2.2) Go to the Datastores and choose your datastore (‘datastore1’ in our example).



2.3) Go to the Actions menu and choose the ‘Browse Files’ item.


2.4) Click to the ‘Upload Files’ icon then browse your filesystem and select the Mirantis OpenStack image.



3) Create a network for Fuel PXE traffic and enable Promiscuous mode on it.
3.1) Go back to the vCenter screen and choose the ‘Hosts’ item in the left menu.


3.2) Click to the host you want to run the Fuel Master node on.


3.3) Click to the ‘Networking’ button.


3.4) Click to the ‘Add Host Networking’ icon.


3.5) Choose a Port Group connection type.


3.6) Choose a switch.


3.7) Name your network and set the VLAN number (optional and depends on your underlying network infrastructure).


3.8) After the network is created select the network on the network map by clicking to its name. Then click to the ‘Edit Settings’ icon.


3.9) In the opened window click the ‘Security’ item in the left menu and ensure that Promiscuous mode is set to Accept. Then click the ‘OK’ button.



4) Create a VM with the MOS ISO mounted to it.
4.1) Go back to the vCenter screen and choose the ‘Virtual Machines’ item in the left menu.


4.2) Click to the ‘Create a Virtual Machine’ icon.


4.3) We will create a VM from scratch with no templates used:


4.4) Name your new VM and choose the Datacenter where the MOS ISO is located in:


4.5) Select a compute resource (ESXi host), storage, and compatibility for the VM.






4.6) Select a guest OS as RHEL 6 64-bit.


4.7) Set the memory size to at least 2GB and HDD size at least 50 GB. Fuel Master node hardware recomendations are described here: http://docs.mirantis.com/fuel/fuel-5.0/pre-install-guide.html#master-node-hardware-recommendations
A network adapter must be connected to the Fuel PXE network created on a previous step.


4.8) For CD/DVD drive choose the ‘Datastore ISO File’ item from the dropdown menu on the right.


4.9) Navigate through the Datastore and choose the previously uploaded MOS ISO image.


4.10) Then enable the CD/DVD drive by clicking to the ‘Connect...’ checkbox opposite to the drive. Finally, the Virtual Machine hardware settings should look like that:


4.11) Go to the ‘VM Options’ tab and expand the ‘Boot Options’ submenu. Then enable the ‘Force BIOS setup’ item.


4.12) Click the ‘Next’ button, verify the new Virtual Machine settings and proceed.

You are now ready to install Fuel on vSphere,
following the instructions in :ref:`fuel-on-vsphere-ug`.
