VirtualBox
----------

If you would like to evaluate Fuel on VirtualBox, you can take advantage of the 
included set of scripts that create and configure all the required VMs for a 
test environment, including the Master node and Slave nodes for OpenStack 
itself. It is a simple, single-click installation.

.. note:: 

  These scripts are not supported on Windows directly, but you can still test on
  Windows VirtualBox by running scripts on Cygwin or by creating the VMs by yourself.
  See :ref:`Install_Manual` for more details.

The requirements for running Fuel on VirtualBox are:

  A host machine with Linux, Windows or Mac OS. We recommend 64-bit host OS.
  The scripts have been tested on Mac OS 10.7.5, Mac OS 10.8.3, Ubuntu 12.04,
  Ubuntu 12.10, Fedora 19, OpenSUSE 12.2/12.3, and Windows 7 x64 + Cygwin_x64.

VirtualBox 4.2.16 (or later) is required, along with the extension pack. 
Both can be downloaded from `<http://www.virtualbox.org/>`_.

8 GB+ of RAM
  Will support 4 VMs for Multi-node OpenStack installation (1 Master node, 
  1 Controller node, 1 Compute node, 1 Cinder node) with reduced to 1536 MB VM RAM.
  For dedicated Cinder node 768 MB of RAM is enough.

  or

  Will support 5 VMs for Multi-node with HA OpenStack installation (1 Master
  node, 3 combined Controller + Cinder nodes, 1 Compute node) with reduced
  to 1280 MB RAM amount per VM.
  Such RAM amount per node is below the recommended requirements for HA
  configurations (2048+ MB per controller) and may lead to unwanted issues.
