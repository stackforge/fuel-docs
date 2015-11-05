.. _install_change_admin_network_interface:

Change the Admin (PXE) network interface
----------------------------------------

By default, Fuel assigns ``eth0`` as a network interface for the Admin (PXE)
network. If you want to use the default network settings, skip this section.

However, some environments may require you to configure other network
interfaces for the Admin (PXE) network. If you plan to use a network interface
that is differnt from the default setting, change it before you install the
Fuel Master node.

.. warning::
   Do not change the network interface assigned for the Admin (PXE) network
   after you install the Fuel Master node.

**To change the Admin (PXE) network interface:**

#. In the Fuel Setup screen, select **Network Setup**.
#. Select ``eth0``.
#. Change **Enable interface** to **No**.
#. Click **Apply**.

   Fuel disables ``eth0``.

#. Select a network interface that you want to use for Admin (PXE) network
   traffic.

   For example: ``eth1``.

#. Change **Enable interface** to **Yes**.
#. Configure network parameters for ``eth1``.

   Default network parameters are:

   * IP address: 10.20.0.2
   * Netmask: 255.255.255.0
   * Gateway: 10.20.0.1

#. Click **Apply**.

   Fuel will now use ``eth1`` as a network interface for the Admin (PXE)
   network.

#. In Menu, select **PXE Setup**.
#. Set the DHCP pool range and gateway.
#. Verify your configuration by clicking **Check**.
#. Proceed to :ref : `install_boot_fuel_master_node`

.. seealso::

   - :ref : `install_configure_a_network_interface_for_fuel_web_ui`


.. _install_configure_a_network_interface_for_fuel_web_ui:

Configure a network interface for the Fuel web UI
-------------------------------------------------

You can configure a specific network interface through which users will access
the Fuel web UI.

**To configure a network interface for the Fuel web UI:**

#. In the Fuel Setup screen, select **Network Setup**.
#. Select an unassigned network interface.
#. Change **Enable interface** to **Yes**.
#. Enable DHCP.
#. Verify that the IP address, netmask, and gateway fields are empty.
#. Click **Apply**.

   Fuel now uses the selected interface for the Fuel web UI.

#. Proceed to :ref : `install_boot_fuel_master_node`

.. seealso::

   - :ref : ` install_change_admin_network_interface`
