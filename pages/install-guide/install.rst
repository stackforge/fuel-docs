.. raw:: pdf

   PageBreak

.. index:: Installing Fuel Master Node

Installing Fuel Master Node
===========================

.. contents :local:

Fuel is distributed via both ISO and IMG images. Each contains an installer for 
Fuel Master node. The ISO image is used for CD media devices, iLO (HP) or 
similar remote access systems. The IMG file is used for USB memory stick-based
installation.

Once installed, Fuel can be used to deploy and manage OpenStack environments. 
It will assign IP addresses to the nodes, perform PXE boot and initial 
configuration, and provision of OpenStack nodes according to their roles in 
the environment.

.. _Install_Bare-Metal:

Bare-Metal Environment
----------------------

To install Fuel on bare-metal hardware, you need to burn the provided ISO to 
a writeable DVD or create a bootable USB stick. You would then begin the 
installation process by booting from that media, very much like any other OS
install process.

Burning an ISO to optical media is a commonly supported function on all OSes. 
On Linux, there are several programs available, such as `Brasero` or `Xfburn`, 
two commonly pre-installed desktop applications. There is also
a number for Windows such as `ImgBurn <http://www.imgburn.com/>`_ and the 
open source `InfraRecorder <http://infrarecorder.org/>`_.

Burning an ISO in Mac OS X is quite simple. Open `Disk Utility` from 
`Applications > Utilities`, drag the ISO into the disk list on the left side 
of the window and select it, insert blank DVD, and click `Burn`. If you prefer 
a different utility, check out the open source `Burn 
<http://burn-osx.sourceforge.net/Pages/English/home.html>`_.

Installing the ISO to a bootable USB stick, however, is an entirely different 
matter. Canonical suggests `PenDriveLinux` which is a GUI tool for Windows.

On Windows, you can write the installation image with a number of different 
utilities. The following list links to some of the more popular ones and they 
are all available at no cost:

- `Win32 Disk Imager <http://sourceforge.net/projects/win32diskimager/>`_.
- `ISOtoUSB <http://www.isotousb.com/>`_.

After the installation is complete, you will need to make your bare-metal nodes
available for your OpenStack environment. Attach them to the same L2 network
(broadcast domain) as the Master node, and configure them to automatically
boot via network. The UI will discover them and make them available for 
installing OpenStack.

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

.. _Install_Manual:

Manual Installation
+++++++++++++++++++

.. note::

  The following steps are only suitable for setting up a vanilla OpenStack 
  environment for evaluation purposes only.

If you cannot or would rather not run our helper scripts, you can still run 
Fuel on VirtualBox by following these steps.

Master Node Deployment
^^^^^^^^^^^^^^^^^^^^^^

First, create the Master node VM.

1. Configure the host-only interface vboxnet0 in VirtualBox by going to 
   `File -> Preferences -> Network` and clicking the screwdriver icon.

* IP address: 10.20.0.1
* Network mask: 255.255.255.0
* DHCP Server: disabled

2. Create a VM for the Master node with the following parameters:

* OS Type: Linux
* Version: CentOS (64bit)
* RAM: 1536+ MB (2048+ MB recommended)
* HDD: 50 GB with dynamic disk expansion

3. Modify your VM settings:

* Network: Attach `Adapter 1` to `Host-only adapter` ``vboxnet0``

4. Power on the VM in order to start the installation. Choose your Fuel ISO 
   when prompted to select start-up disk.

5. Wait for the Welcome message with all information needed to login into the UI 
   of Fuel.

Adding Slave Nodes
^^^^^^^^^^^^^^^^^^

Next, create Slave nodes where OpenStack needs to be installed.

1. Create 3 or 4 additional VMs depending on your wish with the following parameters:

* OS Type: Linux, Version: CentOS or Ubuntu (64bit)
* RAM: 1536+ MB (2048+ MB recommended)
* HDD: 50+ GB, with dynamic disk expansion
* Network 1: host-only interface vboxnet0, PCnet-FAST III device

2. Set Network as first in the boot order:

.. image:: /_images/vbox-image1.jpg
  :align: center

3. Configure two or more network adapters on each VM (in order to use single network
   adapter for each VM you should choose "Use VLAN Tagging" later in the Fuel UI):

.. image:: /_images/vbox-image2.jpg
  :align: center

4. Open "advanced" collapse, and check following options:

* Promiscuous mode is a "Allow All"
* Adapter type is a "PCnet-FAST III"
* Cable connected is a On


.. _Network_Install:

Changing Network Parameters During Installation
-----------------------------------------------

The console-based Fuel Setup allows you to customize the Fuel Admin (PXE booting)
network, which has a default network of ``10.20.0.2/24``, gateway 
``10.20.0.1``.

In order to do so, press the <TAB> key on the very first installation screen 
which says "Welcome to Fuel Installer!" and update the kernel option 
``showmenu=no`` to ``showmenu=yes``. Alternatively, you can press a key to 
start Fuel Setup during the first boot after installation.

Within Fuel Setup you can configure the following parameters:

* DHCP/Static configuration for each network interface
* Select interface for Fuel Admin network
* Define DHCP pool (bootstrap) and static range (installed nodes)
* Root password
* DNS options

The main function of this tool is to provide a simple way to configure Fuel for
your particular networking environment, while helping to detect errors early 
so you need not waste time troubleshooting individual configuration files.
Please change `vm_master_ip` parameter in config.sh accordingly in case you use 
VirtualBox automated scripts to deploy Fuel.

.. image:: /_images/fuel-menu-interfaces.jpg
  :align: center

Use the arrow keys to navigate through the tool. Once you have made your 
changes, go to Save & Quit.


Changing Network Parameters After Installation
----------------------------------------------

It is possible to run "fuelmenu" from a root shell on Fuel Master node after 
deployment to make minor changes to network interfaces, DNS, and gateway. The 
PXE settings, however, cannot be changed after deployment as it will lead to 
deployment failure.

.. warning::

  Once IP settings are set at the boot time for Fuel Master node, they 
  **should not be changed during the whole lifecycle of Fuel.**

PXE Booting Settings
--------------------

By default, `eth0` on Fuel Master node serves PXE requests. If you are planning 
to use another interface, you configure this in :ref:`Network_Install`.

If you want to install Fuel on virtual machines, then you need to make sure
that dnsmasq on the Master node is configured to support the PXE client used by 
your virtual machines. We enable *dhcp-no-override* option because without it,
dnsmasq tries to move ``PXE filename`` and ``PXE servername`` special fields 
into DHCP options. Not all PXE implementations can recognize those options and 
therefore they will not be able to boot. For example, libvirt in CentOS 6.4 
uses gPXE implementation, instead of more advanced iPXE by default, and 
therefore requires *dhcp-no-override*

When Master Node Installation is Done
-------------------------------------

Once the Master node is installed, power on all slave nodes and log in to the 
Fuel UI. The login prompt on the console of the master node will show you the
URL you need to use. The default address is http://10.20.0.2:8000/

Slave nodes will automatically boot into bootstrap mode (CentOS based Linux 
in memory) via PXE and you will see notifications in the user interface about 
discovered nodes. At this point, you can create an environment, add nodes into 
it, and start configuration.

Networking configuration is the most complicated part, so please read the 
networking section of the documentation carefully.
