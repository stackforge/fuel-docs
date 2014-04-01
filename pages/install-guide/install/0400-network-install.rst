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
