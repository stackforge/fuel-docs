
.. _Network_Install:

Changing PXE Network Parameters During Installation
===================================================

You may also need to customize the network settings for the Admin
(PXE) logical network.

.. note::  The VirtualBox automated scripts
   depend on the network configuration in the *config.sh* file
   so the virtual Fuel Master Node can connect to the virtual nodes correctly.
   Do not use Fuel Setup to configure the Admin network interface
   when using VirtualBox;
   however, you can view this Fuel Setup screen
   by modifying the ``vm_master_ip`` parameter in the *config.sh* file.

By default, ``eth0`` on the Fuel Master node listens to PXE requests
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
the master node early, which is useful if the master node installation fails.

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
(the one that says "Welcome to Fuel Installer!") and update the kernel option
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
* Fuel password
* DNS options
* Launch shell for optional pre-deployment tasks

.. image:: /_images/fuelmenu_Network_Setup.jpg
  :width: 50%

Use the arrow keys to navigate through the tool and Space or Enter key to select
an item.

Network Setup
-------------

.. Warning::

  This section must be configured only in scope of Fuel Master node first boot!
  Setting new network settings for the already installed master node requires
  that all Docker containers be rebuilt and possibly further manual reconfiguration!

This section is used to set network interface settings. It shows all network
interfaces currently available. During the first boot, it shows only available
ethX NICs and docker0 bridge; if you run Fuel Setup on already deployed master
node it will additionally present you vethXXX interfaces.
You may set configuration for each interface, enable or disable particular NICs.

Unlike the other tabs, this tab has the ability to immediately apply only changes
related to this tab.

.. Warning::

  All the settings on this tab may be performed manually with standard Linux
  IP tools. Actually, Fuel Setup use these tools as well.
  So, if complex network setup required before Fuel Setup,
  there is possibility to use Shell Login from Fuel Setup
  during the first boot, perform necessary network settings with proper care,
  return back to the Fuel Setup and continue with master node installation.


About the Docker0 bridge.

.. image:: /_images/fuelmenu_Network_Docker.jpg
  :width: 50%

This virtual bridge connects external physical
interfaces with the internal Docker virtual network.
It has default 172.17.42.0/16 CIDR but, as Docker chooses this network automatically,
this CIDR may vary from installation to installation. This virtual network
exists inside the master node only.
Be sure this CIDR does not intersect with Admin(PXE) one in case you are going to
customize this network.


Configuring Network settings

Network settings has 2 parts - editable Network settings  and non-editable
Network Interface current status.
NIC current status area shows the current network interface status,
including name, Link Status, current IP address, MAC address,
Netmask and Gateway.

Network Settings from the editable Network Setup part become effective only
after they are applied with the Apply button.

Network Setup includes the following configurable sections:

* Network Interface Selector - Shows all available network interfaces, physical
  and virtual.
  Select the interface you want to configure with arrow keys and click Space or
  Enter to show its configuration.
* Interface name - Here you may rename the selected network interface.
* Enable interface - Here you may turn the selected network interface ON or OFF.
* Configuration via DHCP - You may set interface to get settings from the
  existing external DHCP server.
  Do not set DHCP=Yes for the network interface you are going to use for
  Admin (PXE) network!
* IP Address - allows to set static IP address for selected NIC.
* Netmask - allows to set network mask for selected NIC.
* Default gateway - allows to set the gateway for selected NIC.
* Button Check - Validates the unsaved settings on the Network Setup section
  without applying.
* Button Apply - Validates the unsaved settings on the Network Setup section
  and makes the new settings effective.


.. image:: /_images/fuelmenu_Network_Setup.jpg
  :width: 50%

Assume you are going to change PXE NIC from eth0 to eth1. eth0 is already up and
its IP address is 10.20.0.2, set via kernel options. You want eth1 to use
the same IP address.
Additionally, you want to set eth2, connected to your corporate network as
the interface where Fuel web UI will be accessible. eth2 should use DHCP.

Your actions:

1. Select eth0 on the Network Setup tab. Change Enable interface option from Yes
   to No.
2. Apply settings. It will turn off eth0. You need this since we do not want
   the same IP address configured on both eth0 and eth1 at the same time.
3. Select eth1 on the Network Setup tab. Change Enable interface option to Yes.
   Set IP address to 10.20.0.2, set the proper netmask and gateway.
4. Apply settings. Now you have set eth1 ready to be used as PXE interface.
5. Select eth2 on the Network Setup tab. Change Enable interface option to Yes.
   Set Configuration via DHCP=yes. Leave IP address, Netmask and gateway blank.
6. Apply settings. Now you have eth2 available in your corporate network.

And do not hesitate to use Check button to verify your future network settings
in advance.

.. warning::
  To set the master node network interfaces properly, one must set and APPLY
  correct network settings on the Network Setup tab BEFORE proceeding with PXE setup.

.. image:: /_images/fuelmenu_Network_Customized_Setup.jpg
  :width: 50%

Once you have finished with the network Setup you may proceed to PXE Setup tab.

PXE Setup
---------

.. image:: /_images/fuelmenu_PXE_Setup.jpg
  :width: 50%

.. Warning::

  This section must be configured only in scope of Fuel Master node first boot!
  Setting new network settings for the already installed master node requires
  that all Docker containers be rebuilt and possibly further manual reconfiguration!


Here you may select the network interface you are going to use for PXE/Admin
network and set Static and DHCP pools ranges.

PXE Setup has 2 parts - editable PXE settings  and non-editable
selected Network Interface current status.
NIC current status area shows the current network interface status,
including name, Link Status, current IP address, MAC address,
Netmask and Gateway. It also shows warnings, related to the currently selected
NIC misconfiguration.

PXE setup includes the following options:

* Network Interface Selector - Shows all available network interfaces, physical
  and virtual.
  Select the interface you want to configure with arrow keys and click Space or
  Enter to show it's configuration.

.. warning::
  Do not use docker0 bridge as PXE interface!

* Static Pool Range - Here you may define Static Pool Start and End IP addresses
  These addresses should be located inside the CIDR, configured for the
  currently selected NIC.
* DHCP Pool for node discovering - Here you may define DHCP Pool Start and End
  IP addresses. These addresses should be located inside the CIDR, configured
  for the currently selected NIC. DHCP Pool range should not overlap with
  Static Pool range!
* Check button - verifies the current unsaved settings against the currently
  selected NIC without applying.

Let us continue the example we started in the Network Settings section:

1. Use the Space or Enter key to mark and select the network interface you have
   configured for PXE on the Network Setup tab. The default PXE interface is eth0.
   If you follow the example from Network Setup part of this guide, you have
   to select eth1.
2. Set the proper Static Pool range and DHCP Pool range values. These ranges
   must not intersect and both should fit the Admin network CIDR.

As usual - use Check button to verify the current unsaved settings.

.. warning::
  Setting the PXE NIC with Fuel Setup when the master node is already deployed
  may lead to non-working PXE boot functionality. In order to get PXE working,
  one must rebuild all Docker containers and set the remaining related settings
  manually.

.. image:: /_images/fuelmenu_PXE_CustomizedSetup.jpg
  :width: 50%


DNS & Hostname
--------------

Use this section to configure the remained master node network settings.
These settings may be reconfigured after the master node has been deployed.

.. image:: /_images/fuelmenu_DNS.jpg
  :width: 50%

Details on settings:

* Hostname - master node host name (without domain)
* Domain - master node domain name. If the master node has several network
  interfaces, you may connect non-PXE one to the existing corporate network
  and set the real domain name. Otherwise, use default or any valid stub name.
* Search domain - in most cases, should match the Domain field, unless you know
  what you are doing.
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

Use this section to set NTP server names in order to get proper time synchronization.
Synchronized time is mandatory for OpenStack services.

.. image:: /_images/fuelmenu_TimeSync.jpg
  :width: 50%

If you have access from master node to the external or corporate network -
it is strongly recommended to set proper NTP server names or IP addresses.

If your master node currently has no access to the external or corporate
network - leave all 3 fields blank. You may set these later.

If you set NTP server names blank and enable NTP - master node will serve your
OpenStack installations as NTP server, but will not synchronize time with NTP.
It may lead to a time shift between your OpenStack installations and the rest
of the world.

If you disable NTP completely - your deployed OpenStack will not use NTP and most
probably will end with the timing errors, unless you have an external solution to
synchronize clocks between the nodes.

Please do not hesitate to use Check button to verify your future network settings
in advance.

Root password
-------------

Here you may set new root password for your master node.
This password serves as the default root password for all future OpenStack nodes.
Already existing OpenStack nodes will keep the existing password.
Leave these fields blank in order to keep default root/r00tme credentials.

Button Check verifies if both password fields match and has correct data.

Shell login
-----------

This section gives you the ability to log in to the master node console as root.
You will be redirected back to the Fuel Setup after exit from shell.

.. _fuel-passwd-ug:

Fuel login
----------

This section enables you to modify the password
used to log into the Fuel Dashboard:

.. image:: /_images/authx/f_menu_pass.png
  :width: 50%

Changing this password here
changes the password value in the *astute.yaml* file,
which is necessary for the upgrade facilities to work.
You can also modify the password from the Fuel UI screens
and the Fuel CLI, but that only modifies the password in Keystone
and may prevent upgrade from running.
See :ref:`fuel-passwd-ops` for more information
about Fuel passwords.

Quit Setup
----------

Options:

* Save and Continue - runs built-in tests. If tests passed successfully -
  saves the current settings from all sections, except the first one,
  Network Setup, which has its own Apply button.
  Gives you the ability to check settings and save intermediate changes.
* Save and Quit - runs built-in tests first. If test passed successfully -
  saves the current settings from all sections, except the first one,
  Network Setup, which has its own Apply button. After the settings saved,
  it quits Fuel Setup and, if it is first boot,
  continues with Fuel master node installation.
* Quit without Save - discards all the current settings from all sections,
  except the first one, Network Setup, which has its own Apply button and quits
  the Fuel Setup.


Once you have made your changes,
go to Save & Quit.

You can run ``fuelmenu`` from a root shell on the Fuel Master node
after deployment to make minor changes
to network interfaces, DNS, Time Sync and the gateway.
The PXE settings, however,
must not be changed after deployment as it will lead to master node failure.
Option to change PXE settings remains active for those who are familiar with
master node manual settings

.. warning::

  Once IP settings are set at boot time for Fuel Master node,
  they **should not be changed during the entire lifecycle of Fuel.**


