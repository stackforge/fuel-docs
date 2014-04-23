.. _Install_Automatic:

Installing using automated scripts
==================================

When you unpack VirtualBox scripts,
you will see the following important files and folders:

`iso`
  Contains the ISO image used to install Fuel.
  You should download the ISO from the portal to this directory
  or copy it into this directory after it is downloaded.
  If this directory contains more than one ISO file,
  the installation script uses the most recent one.

`config.sh`
  Configuration file that allows you to specify parameters
  that automate the Fuel installation.
  For example, you can select how many virtual nodes to launch,
  as well as how much memory, disk, and processing to allocate for each.

`launch.sh`
  This is the script you run to install Fuel.
  It uses the ISO image from the ``iso`` directory,
  creates a VM, mounts the image,
  and automatically installs the Fuel Master node.
  After installing the Master node,
  the script creates Slave nodes for OpenStack
  and boots them via PXE from the Master node.
  When Fuel is installed,
  the script gives you the IP address to use
  to access the Web-based UI for Fuel.
  Use this address to deploy your OpenStack environment.
