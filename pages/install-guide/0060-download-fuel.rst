.. raw:: pdf

   PageBreak

.. index:: Download Fuel

Before You Download and Install Fuel
====================================

Before downloading and installing Fuel:

- Be sure that you your hardware configuration is adequate;
  check the `Prerequisites information <http://docs.mirantis.com/fuel/fuel-4.0/install-guide.html#prerequisites>`_.

- Understand the networking architecture and define your networking configuraion;
  see `Understanding and Configuring the Network <http://docs.mirantis.com/fuel/fuel-4.0/install-guide.html#understanding-and-configuring-the-network>`_
  and `Network Architecture <http://docs.mirantis.com/fuel/fuel-4.0/reference-architecture.html#network-architecture>`_.

Downloading the installable image
=================================

1. Go to the
`Mirantis Software Download Page <http://software.mirantis.com/>`_
and fill out the information to opt in to the Mirantis community.

2. You should receive a response from Mirantis within the hour;
this mail includes credential you can use to download Fuel.
If you do not receive the acknowledgement from Mirantis,
write to to: sw-access@mirantis.com.

Fuel provides the following installation options: 

* **ISO image**
  Use as a file to install the virtualized deployment;
  cut to DVD to install from DVD media devices.

* **Raw sector file (IMG)**
  For installation from flash media devices (USB).

Both installation images contain the installer for Fuel Master node.

.. seealso:: `Downloads <http://fuel.mirantis.com/your-downloads/>`_  

Setting up a Virtualized Deployment with the Virtual Box Scripts
----------------------------------------------------------------

Mirantis provides the Virtual Box Scripts that enable you
to deploy Fuel and an OpenStack environment
in VMs running on another computer.
The Virtual Box Scripts provide a simple, single-click installation
that creates and configures
all the VMs needed for a test environment,
including the Fuel Master node and Slave nodes for OpenStack itself.
This deployment is appropriate for evaluation and demo purposes
and is an easy way to start to explore Fuel and OpenStack.

Operating System Requirements
+++++++++++++++++++++++++++++

The Virtual Box Scripts can be run on 64-bit versions of the following operating systems:

Linux
  The scripts have been tested on Ubuntu 12.04,
  Ubuntu 12.10, Fedora 19, and OpenSUSE 12.2/12.3.

Mac OS X
  The scripts have been tested on Mac OSX 10.7.5 and Mac OSX 10.8.3.

Windows
  The scripts have been tested on Windows 7 x64 + Cygwin_x64.

Hardware Requirements
+++++++++++++++++++++

You should have at least 8GB of RAM available for the Virtualized Deployment.
This is adequate for either of the following deployments:

Multi-node deployment
  1 Master node, 1 Controller node, and 1 Compute node,
  (using a 1536 MB VM RAM for each).
  plus 1 Cinder storage node (using 768 MB of RAM).

Multi-node with HA OpenSack installation
  1 Master node; 3 combined Controller + Cinder nodes; 1 Compute node
  using 1280 MB RAM amount per VM.
  Note that the amount of RAM per node is below the recommended requirements for HA
  configurations (2048+ MB per controller) and may lead to unwanted issues.

If you have enough memory and want to create a virtualized environment
that contains more nodes,
you can edit the *config.sh* file.

**Download and Install**

1. Opt into the Mirantis community as described above.

2. Download the `Virtual Box Scripts <http://software.mirantis.com/#fancyboxID-1>`_
   into a directory on your computer.
   This creates the following files and directories:

   `iso`
     This folder needs to contain a single ISO image for Fuel. Once you have
     downloaded the ISO from the portal, copy or move it into this directory.

   `config.sh`
     This file allows you to specify parameters used for automating Fuel
     installation. For example, you can select how many virtual nodes to launch,
     as well as how much memory, disk, and processing to allocate for each.

   `launch.sh`
     Shell script that installs Fuel.

3. Download the *.iso* file by clicking on the "Download Mirantis OpenStack 4.0" button
   on the `Mirantis software page <http://software.mirantis.com/>`_;
   place it in the *iso* directory created above.

4. Execute **./launch.sh**.
   This script uses the ISO image from the ``iso`` directory,
   creates a VM, mounts the image, and automatically installs the Fuel Master node.
   The script then creates Slave nodes for OpenStack
   and boots them from the Master node using PXE.
   When complete, the script gives you the link to use to access the web-based UI
   for the Fuel Master node.
   
5. Open a browser and use the IP address that *launch.sh* gave you
   to open the Fuel console.
 
