
.. _Network_Install:

Changing PXE Network Parameters During Installation
===================================================

You may also need to customize the network settings for the Admin
(PXE) logical network.

By default, `eth0` on the Fuel Master node listens to PXE requests
from the Fuel Admin (PXE booting) network, which has a default
network of ``10.20.0.2/24`` and the gateway ``10.20.0.1``.

PXE network settings may be changed with two ways - via kernel options (for
eth0 interface only) and via the console-based Fuel Setup.

.. Warning::

  Settings made with console-based Fuel Setup take precedence over 
  the kernel options!


Note that,

- Changing the IP address in the kernel options
  also changes the CIDR for the Admin network.
- Changing the IP address on the Admin network interface
  requires changes to the DHCP range values
  in the PXE Settings screen.
- New default DHCP values that fit into this range are auto-populated,
  but be sure that the range does not conflict
  with other devices on the network.

Kernel options allow you to customize eth0 network settings, which will be used
for Admin (PXE) network if you will not change these later with Fuel Setup.
Customizing eth0 interface via kernel options also gives the ability to connect to 
the master node early, in case master node installation failed.

Fuel Setup
----------

The console-based Fuel Setup allows you to customize the Admin (PXE)
logical network if you want to use a different network interface.
See :ref:`logical-networks-arch` for more information about
the Admin (PXE) logical network.

This tool provides a simple way to configure Fuel
for your particular networking environment,
while helping to detect errors early
so you do not need to troubleshoot individual configuration files.

In order to get to the Fuel Setup, press the <TAB> key on the very first installation screen
(the one that says "Welcome to Fuel Installer!")and update the kernel option
``showmenu=no`` to ``showmenu=yes``. Alternatively, you can press a key to
start Fuel Setup during the first boot after installation.

.. image:: /_images/fuel_welcome_customized_settings.jpg
  :width: 50%

Within Fuel Setup, you can configure the following parameters:

* DHCP/Static configuration for each network interface
* Docker internal network configuration
* Select interface for Fuel Admin network
* Define DHCP pool (bootstrap) and static range (installed nodes)
* Set NTP servers for Time settings
* Root password
* DNS options
* Run shell before master node installation

The main function of this tool is to provide a simple way to configure Fuel for
your particular networking environment, while helping to detect errors early
so you need not waste time troubleshooting individual configuration files.

If you are using the VirtualBox automated scripts to deploy Fuel
you can modify the `vm_master_ip` parameter in the *config.sh* file
to get to this functionality.

.. image:: /_images/fuelmenu_PXE_CustomizedSetup.jpg
  :width: 50%

Use the arrow keys to navigate through the tool and Space or Enter key to select
an item.

Network Setup
-------------

.. Warning::

  This section must be configured only in scope of Fuel Master node first boot!
  Setting new network settings on to the already installed master node requires
  all docker containers rebuild and possible manual re-configuration!

This section allows to set network interface settings. It shows all network 
interfaces currently available. During the first boot it shows only available
ethX NICs and docker0 bridge, if you run Fuel Setup on already deployed master
node it will additionally present you vethXXX interfaces.
You may set configuration for each interface, enable or disable particular NICs.

Unlike the other tabs, this tab has the ability to immediately apply only changes 
related to this tab.

.. Warning::

  All the settings on this tab may be performed manually with standard Linux
  IP tools. Actually, Fuel Setup use these tools as well.
  So, in complex network setup cases one may run Shell Login from Fuel Setup
  during the first boot, perform necessary network settings with proper care,
  return back to the Fuel Setup and continue with master node installation.


About the Docker0 bridge. 

This virtual bridge connects external physical
interfaces with the internal Docker virtual network.
It has default 172.17.42.0/16 CIDR, but as Docker chooses this network automatically,
this CIDR mat vary from installation to installation. This virtual network
exists inside the master node only.
Please make this CIDR not intersecting with Admin(PXE) in case you are going to
customize this network.

Network Setup includes the following configurable sections:

TODO: Describe the sections.


Assume you are going to change PXE NIC from eth0 to eth1. eth0 is already up and
its IP address is 10.20.1.2, set via kernel options. You want eth1 to use
the same IP address.

Your actions:

1. Select eth0 on the Network Setup tab. Change Enable interface option from Yes
   to No. 
2. Apply settings. It will turn off eth0. You need this since we do not want 
   the same IP address configured on both eth0 and eth1 at the same time.
3. Select eth1 on the Network Setup tab. Change Enable interface option to Yes.
   Set IP address to 10.20.0.2, set the proper netmask and gateway.
4. Apply settings. Now you have set eth1 ready to be used as PXE interface.

And do not hesitate to use Check button to verify your future network settings
in advance.

.. warning::
  To set the master node network interfaces properly one must set and APPLY
  correct network settings on the Network Setup tab BEFORE proceeding with PXE setup.

.. image:: /_images/fuelmenu_Network_Setup.jpg
  :width: 50%

Once you have finished with the network Setup you may proceed to PXE Setup tab.

PXE Setup
---------

.. Warning::

  This section must be configured only in scope of Fuel Master node first boot!
  Setting new network settings on to the already installed master node requires
  all docker containers rebuild and possible manual re-configuration!


Here you may select the network interface you are going to use for PXE/Admin 
network and set Static and DHCP pools ranges.

.. warning::
  Do not use docker0 as PXE interface!

Let us continue the example we started in the Network Settings section:

1. Mark and select with the Space or Enter key the network interface you have 
   configured for PXE on the Network Setup tab. Default PXE interface is eth0, 
   if you follow the example from Network Setup part of this guide, you have 
   to select eth1.
2. Set the proper Static Pool range and DHCP Pool range values. These ranges 
   not intersect and both should fit the Admin network CIDR.

As usual - use Check button to verify the current non-saved settings.

.. warning::
  Setting PXE NIC with Fuel Setup when the master node is already deployed
  may lead to non-working PXE boot functionality at all. In order to get PXE working 
  one must rebuild all Docker containers and set the remained related settings 
  manually.

DNS & Hostname
--------------

This section allows to configure the remained master node network settings.
These setting may be reconfigured after the master node already deployed.

Details on settings:

* Hostname - master node host name (without domain)
* Domain - master node domain name. In case master node has several network
  interfaces, you may connect non-PXE one to the existing corporate network
  and set the real domain name. Otherwise use default or any valid stub name.
* Search domain - in most cases should match with Domain field, unless you know
  what you do.
* External DNS - Point it to the corporate or Internet-based DNS server if your
  master node is connected to the corporate network by Non-PXE network interface.
  Otherwise - leave blank, since it may block Fuel Setup from network settings
  save due to failed DNS test.
* Hostname to test DNS - any existing host name, which Fuel Setup may ping
  in order to check DNS settings.

Please do not hesitate to use Check button to verify your future network settings
in advance.

Time sync
---------

This section allows to set NTP server names in order to get proper time synchronization.
Synchronized time is mandatory for OpenStack services.

In case you have access from master node to the external or corporate network - 
it is greatly recommended to set proper NTP server names or IP addresses.

In case your master node currently has no access to the external or corporate
network - leave all 3 fields blank. You may set these later.

If you set NTP server names blank and enable NTP - master node will serve your
OpenStack installations as NTP server, but will not synchronize time with NTP.
It may lead to the time shift between your OpenStack installations and the rest 
of the world.

If you disable NTP at all - your deployed OpenStack will not use NTP and most
probably will end with the timing errors, unless you have an external solution to
synchronize clocks between the nodes.

Please do not hesitate to use Check button to verify your future network settings
in advance.

Root password
-------------

Here you may set new root password for your master node.
This password also serves as default root password for all future OpenStack nodes.
Already existing OpenStack nodes will keep the existing password.
Leave these fields blank in order to keep default root/r00tme credentials.

Button Check verifies if both password fields match and has correct data.

Shell login
-----------

This section gives you ability to log in to the master node console as root.
You will be redirected back to the Fuel Setup after exit from shell.

Quit Setup
----------

Options:

* Save and Continue - performs built-in tests and , if test passed sussessfully,
  saves all the current settings from all sections, except the first one, 
  Network Setup, which has its own Apply button.
  Intended to check settings and save intermediate changes.
* Save and Quit - performs built-in tests and , if test passed sussessfully,
  saves all the current settings from all sections, except the first one, 
  Network Setup, which has its own Apply button.
  After the settings saved, it quits Fuel Setup and, in case of first boot,
  continues with Fuel master node installation.
* Quit without Save - discards all all the current settings from all sections, 
  except the first one, Network Setup, which has its own Apply button and quits
  the Fuel Setup.


Once you have made your changes,
go to Save & Quit.

You can run "fuelmenu" from a root shell on the Fuel Master node
after deployment to make minor changes
to network interfaces, DNS, Time Sync and the gateway.
The PXE settings, however,
must be changed after deployment as it will lead to master node failure.
Option to change PXE settings remains active for whose who familiar with 
master node manual settings

.. warning::

  Once IP settings are set at boot time for Fuel Master node,
  they **should not be changed during the entire lifecycle of Fuel.**
  
.. note::  The VirtualBox automated scripts
   depend on the network configuration in the *config.sh* file
   so it can connect to the virtual nodes correctly.
   Do not use Fuel Setup to configure the Admin network interface
   when using VirtualBox,
   but you can view this Fuel Setup screen
   by modifying the `vm_master_ip` parameter in the *config.sh* file.

.. image:: /_images/fuel-menu-interfaces.jpg
  :width: 60%

