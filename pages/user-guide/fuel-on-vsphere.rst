
.. _fuel-on-vsphere-ug:

Installing Fuel Master Node on vSphere
======================================

Before you follow this procedure to install
the Fuel Master Node on vSphere,
you should set up the vCenter Datastore
as described in :ref:`fuel-on-vsphere-plan`.

5.1) At the Virtual Machines screen select the Fuel VM and run it by clicking to the ‘Power on’ icon.


5.2) Click to the ‘Open a virtual machine console’ icon.


5.3) Click somewhere inside of the opened window, wait until BIOS occurs, and using arrow keys on your keyboard navigate to the ‘Boot’ tab. Then move the highlighted selection to the ‘CD-ROM drive’.


5.4) Using the ‘+’ button on the keyboard move the ‘CD-ROM Drive’ item to the top level.


5.5) Navigate to the ‘Exit’ tab, choose the ‘Exit Saving Changes’ item and confirm your decision.


5.6) When the MOS ISO boot menu occurs, press the ‘Tab’ key on the keyboard and modify the last kernel parameter ‘showmenu’ to ‘yes’. Then press the ‘Enter’ key.


5.7) Wait until the OS installation procedure is finished and Fuel menu occurs.


5.8) You can change some network parameters of the master node here. For more information see the Mirantis OpenStack User Guide: http://docs.mirantis.com/fuel/fuel-5.0/user-guide.html#modify-boot-settings-optional
If you want to use the default parameters just select the ‘Quit Setup’ item on the left and choose the ‘Quit without saving’ button.


5.9) Wait until the Fuel Master node complete the installation.

Note: To reach the Fuel Web UI you need to have an IP connectivity to the Fuel Master node IP through the IP gateway which is connected to the Port Group network we use. In this example it’s the ‘Fuel-PXE’ network which is connected to the only physical interface on the ESXi Host 10.20.123.190 with VLAN tag 200. The default network settings for the Fuel Master node are: node IP 10.20.0.2/24, gateway and DNS 10.20.0.1.

6) To test the operability of the Fuel Master node you can create another VM on the same ESXi Host and boot it via PXE (it’s a default boot option for VM). 2-5 minutes later the ‘Total Nodes’ counter in the upper right corner of the Fuel Web UI will increase its value.



6.1) To check if the  Fuel bootstrap node runs on the ESXi you can open the Node Info window in the Fuel Web UI and verify the ‘Manufacturer’ field:


