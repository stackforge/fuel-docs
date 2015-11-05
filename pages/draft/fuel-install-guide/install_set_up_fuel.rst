.. _install_configure_network_parameters:

Set up Fuel 
~~~~~~~~~~~

During the installation, Fuel prompts you to the Fuel setup screen where you
can modify the default network and authentication parameters.

.. image:: /_images/fig/scr_fuel_setup.png
   :width: 60%
   :align: center

Typically, you want to modify network settings to meet the requirements of
your existing network infrastructure. Also, you must change the default Fuel
administrator password.

.. warning::
   Though you can change some of the network interface settings after you
   install the Fuel Master node, we recommend that you finalize network
   configuration before you install the Fuel Master node. Do not modify
   settings of the Admin (PXE) network after you deploy the Fuel Master node,
   because Fuel will lose the ability to PXE boot and manage OpentStack
   environments.

If you are installing Fuel for testing purposes, you can keep the default
settings and proceed to :ref:`<install_boot_fuel_master_node>`.

Alternatively, you can complete the following tasks:

+-----------------------------------------+----------------------------------+
| Change the Fuel administrator password. | For security purposes, we        |
|                                         | strongly recommend that you      |
|                                         | change the Fuel administrator    |
|                                         | password during the installation.|
+-----------------------------------------+----------------------------------+
| Modify the network interface settings.  | By default, Fuel assigns the     |
|                                         | following network parameters to  |
|                                         | the Admin (PXE) network          |
|                                         | (``eth0``):                      |
|                                         |                                  |
|                                         | * Subnetwork: 10.20.0.2/24       |
|                                         | * Gateway: 10.20.0.1             |
|                                         |                                  |
|                                         | Modify these settings            |
|                                         | according to the requirements of |
|                                         | your existing network            |
|                                         | infrastructure.                  |
+-----------------------------------------+----------------------------------+
| Configure the Admin (PXE) network and a | By default, Fuel configures the  |
| DHCP pool for the Fuel Slave nodes.     | Admin (PXE) network on `eth0` and|
|                                         | configures the following DHP pool|
|                                         | settings:                        |
|                                         |                                  |
|                                         | * DHCP pool start: 10.20.0.3     |
|                                         | * DHCP pool end: 10.20.0.254     |
|                                         | * DHCP gateway: 10.20.0.2        |
|                                         |                                  |
|                                         | Modify these settings as needed. |
+-----------------------------------------+----------------------------------+
| Configure DNS and hostname.             | Configure the DNS and hostname   |
|                                         | settings, if needed. If your Fuel|
|                                         | Master node is not connected to  |
|                                         | the Internet, leave the External |
|                                         | DNS field blank.                 |
+-----------------------------------------+----------------------------------+
| Configure repository mirrors.           | Fuel provides the default        |
|                                         | repository mirrors that Fuel uses|
|                                         | to bootstrap an operating system |
|                                         | for the Fuel Master node, as well|
|                                         | as for the Fuel installation     |
|                                         | packages.                        |
+-----------------------------------------+----------------------------------+
| Configure the network time protocol.    | To avoid issues with the time    |
|                                         | settings inconsistency on the    |
|                                         | Fuel Master node and other       |
|                                         | servers in your IT environment,  |
|                                         | verify that the Fuel Master node |
|                                         | uses the correct NTP settings.   |
+-----------------------------------------+----------------------------------+
| Change the root password.               | For security reasons, change the |
|                                         | default root password. Fuel will |
|                                         | apply this password to all new   |
|                                         | OpenStack nodes. Existing        |
|                                         | OpenStack nodes will continue to |
|                                         | use the old password.            |
+-----------------------------------------+----------------------------------+
| Configure network settings using shell. | You can configure all settings   |
|                                         | available on the Fuel Setup      |
|                                         | screen using shell. You can also |
|                                         | Use shell to                     |
|                                         | apply complex network            |
|                                         | configurations.                  |
+-----------------------------------------+----------------------------------+
