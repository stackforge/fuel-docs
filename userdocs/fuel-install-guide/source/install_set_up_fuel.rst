.. _install_set_up_fuel:

Set up Fuel
-----------

During installation, Fuel prompts you to access the Fuel setup screen where you
can modify the default network and authentication parameters.

.. image:: /_images/deliverables/scr_fuel_setup.png
   :width: 60%
   :align: center

Typically, you want to modify network settings to meet the requirements of
your existing network infrastructure. Also, you must change the default Fuel
administrator password. Although you can change some of the network interface
settings after you install the Fuel Master node, we recommend that you
finalize network configuration before you install the Fuel Master node.

.. warning::
   Do not modify settings of the Admin (PXE) network after you deploy the Fuel
   Master node, because Fuel will lose the ability to PXE boot and manage
   OpentStack environments.

If you are installing Fuel for testing purposes, you can keep the default
settings and proceed to :ref:`install_install_fuel_master_node`.

**To set up Fuel:**

#. Configure the following settings as required:

   +--------------------------------------+----------------------------------+
   | 1. Change the Fuel administrator     | For security purposes, we        |
   |    password.                         | strongly recommend that you      |
   |                                      | change the Fuel administrator    |
   |                                      | password during installation.    |
   +--------------------------------------+----------------------------------+
   | 2. Modify the network interface      | By default, Fuel assigns the     |
   |    settings.                         | following network parameters to  |
   |                                      | the Admin (PXE) network          |
   |                                      | (``eth0``):                      |
   |                                      |                                  |
   |                                      | * Subnetwork: 10.20.0.2/24       |
   |                                      | * Gateway: 10.20.0.1             |
   |                                      |                                  |
   |                                      | Modify these settings            |
   |                                      | according to the requirements of |
   |                                      | your existing network            |
   |                                      | infrastructure.                  |
   +--------------------------------------+----------------------------------+
   | 3. Configure the Admin (PXE) network | By default, Fuel configures the  |
   |    and a DHCP pool for the Fuel Slave| Admin (PXE) network on `eth0` and|
   |    nodes.                            | configures the following DHP pool|
   |                                      | settings:                        |
   |                                      |                                  |
   |                                      | * DHCP pool start: 10.20.0.3     |
   |                                      | * DHCP pool end: 10.20.0.254     |
   |                                      | * DHCP gateway: 10.20.0.2        |
   |                                      |                                  |
   |                                      | Modify these settings as needed. |
   +--------------------------------------+----------------------------------+
   | 4. Configure DNS and hostname.       | Configure the DNS and hostname   |
   |                                      | settings, if needed. If your Fuel|
   |                                      | Master node is not connected to  |
   |                                      | the Internet, leave the External |
   |                                      | DNS field blank.                 |
   +--------------------------------------+----------------------------------+
   | 5. Configure the bootstrap image that| Fuel ISO includes the CentOS     |
   |    Fuel will use to discover the Fuel| bootstrap image that Fuel uses   |
   |    Slave nodes through PXE.          | to discover the Fuel Slave nodes.|
   |                                      | Although CentOS is the default   |
   |                                      | and preferred option, it may not |
   |                                      | include drivers for your         |
   |                                      | hardware, therefore, you may want|
   |                                      | to use the Ubuntu bootstrap image|
   |                                      | instead.                         |
   |                                      |                                  |
   |                                      | Some organizations may           |
   |                                      | configure the Fuel Master node in|
   |                                      | a network protected by a         |
   |                                      | firewall,                        |
   |                                      | so that the Fuel Master node may |
   |                                      | not have an access to the        |
   |                                      | Internet. In this case, you can  |
   |                                      | specify a repository located in  |
   |                                      | the accessible network, HTTP or  |
   |                                      | HTTPS, by adding proxy           |
   |                                      | parameters in the Ubuntu         |
   |                                      | repository field. To configure   |
   |                                      | the Ubuntu repository mirror     |
   |                                      | on a local host, use the         |
   |                                      | ``fuel-createmirror`` script     |
   |                                      | shipped with the Fuel ISO.       |
   |                                      |                                  |
   |                                      | For more information, see:       |
   |                                      | :ref :`Set up local repository`. |
   +--------------------------------------+----------------------------------+
   | 6. Configure the network time        | To avoid issues with the time    |
   |    protocol.                         | settings inconsistency on the    |
   |                                      | Fuel Master node and other       |
   |                                      | servers in your IT environment,  |
   |                                      | verify that the Fuel Master node |
   |                                      | uses correct NTP settings.       |
   +--------------------------------------+----------------------------------+
   | 7. Change the root password.         | For security reasons, change the |
   |                                      | default root password. Fuel will |
   |                                      | apply this password to all new   |
   |                                      | OpenStack nodes. Existing        |
   |                                      | OpenStack nodes will continue to |
   |                                      | use the old password.            |
   +--------------------------------------+----------------------------------+
   | 8. Configure network settings using  | You can configure all settings   |
   |    shell.                            | available on the Fuel Setup      |
   |                                      | screen using shell.              |
   |                                      | Particularly, use shell to       |
   |                                      | apply complex network            |
   |                                      | configurations.                  |
   +--------------------------------------+----------------------------------+

2. Proceed to :ref:`install_install_fuel_master_node`.


   - :ref:`Configure a network interface for the Fuel web UI
     <install_configure_a_network_interface_for_fuel_web_ui>`
   - :ref:`Change the Admin (PXE) network interface <install_change_admin_network_interface>`
