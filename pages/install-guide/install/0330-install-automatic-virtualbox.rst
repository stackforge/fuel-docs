.. _Install_Automatic:

Automatic Mode
++++++++++++++

When you unpack VirtualBox scripts, you will see the following 
important files and folders:

`iso`
  This folder needs to contain a single ISO image for Fuel. Once you have
  downloaded the ISO from the portal, copy or move it into this directory.

`config.sh`
  This file allows you to specify parameters used for automating Fuel 
  installation. For example, you can select how many virtual nodes to launch, 
  as well as how much memory, disk, and processing to allocate for each.

`launch.sh`
  Once executed, this script will use the ISO image from the ``iso`` directory,
  create a VM, mount the image, and automatically install the Fuel Master node.
  After installation of the Master node, the script will create Slave nodes for 
  OpenStack and boot them via PXE from the Master node.
  Finally, the script will give you the link to access the Web-based UI for the 
  Master node so you can start installation of an OpenStack environment.
