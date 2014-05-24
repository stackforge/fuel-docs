
.. _Network_Install:

Changing PXE Network Parameters During Installation
---------------------------------------------------

You may also need to customize the network settings for the Admin
(PXE) logical network.

By default, `eth0` on the Fuel Master node listens to PXE requests
from the Fuel Admin (PXE booting) network, which has a default
network of ``10.20.0.2/24`` and the gateway ``10.20.0.1``.

The console-based Fuel Setup allows you to customize the Admin (PXE)
logical network if you want to use a different network interface.
See :ref:`logical-networks-arch` for more information about
the Admin (PXE) logical network.

In order to do so, press the <TAB> key on the very first installation screen
which says "Welcome to Fuel Installer!" and update the kernel option
``showmenu=no`` to ``showmenu=yes``. Alternatively, you can press a key to
start Fuel Setup during the first boot after installation.

Within Fuel Setup, you can configure the following parameters:

* DHCP/Static configuration for each network interface
* Select interface for Fuel Admin network
* Define DHCP pool (bootstrap) and static range (installed nodes)
* Root password
* DNS options

The main function of this tool is to provide a simple way to configure Fuel for
your particular networking environment, while helping to detect errors early
so you need not waste time troubleshooting individual configuration files.

If you are using the VirtualBox automated scripts to deploy Fuel
you can modify the `vm_master_ip` parameter in the *config.sh* file
to get to this functionality.

.. image:: /_images/fuel-menu-interfaces.jpg
  :width: 60%

Use the arrow keys to navigate through the tool.
Once you have made your changes,
go to Save & Quit.

You can run "fuelmenu" from a root shell on the Fuel Master node
after deployment to make minor changes
to network interfaces, DNS, and the gateway.
The PXE settings, however,
cannot be changed after deployment as it will lead to deployment failure.

.. warning::

  Once IP settings are set at boot time for Fuel Master node,
  they **should not be changed during the entire lifecycle of Fuel.**

