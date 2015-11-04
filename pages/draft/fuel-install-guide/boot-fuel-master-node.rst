.. _install_boot_fuel_master_node:

=========================
Boot the Fuel Master node
=========================

When the installation of the Fuel Master node is complete, you can
boot your Fuel Master node.

.. warning::

   Remove the installation media before booting the system.
   You may damage or delete the entire environment
   by booting the installation media once again accidentally.
   This is especially important if you set the boot order,
   so that the USB or DVD drive boots before the hard disk.

Log into the Fuel Master node
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

As the Fuel Master node boots up, the *Welcome to the Fuel server* message
displays on your screen. Use the default information included in it to access
Fuel Web UI and Fuel Master node shell:

* Fuel UI URLs to launch the Fuel Web UI.
* Fuel UI login and password to log into the Fuel Web UI.
* Administrator login and password to log into the node's shell.

Configure default login settings
--------------------------------

To modify the default Fuel Web UI login settings:

* For **the Fuel UI URL** change the IP address on the Fuel Setup installation
  stage.

* For **the Fuel UI password:**

  * Change the password on the Fuel Setup installation stage.

    .. TODO(OG): add the link to :ref:`fuel-passwd-ug`.

  * Change the password from the Fuel Web UI after the installation is
    complete.

    .. TODO(OG): add the link to :ref:`change-fuel-passwd-ug`.

To change the default password to the Fuel Master node's shell:

* Use the :command:`passwd` command after you log in using the default
  credentials.

Log into the Fuel Master node with multiple NICs
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If the server on which the Fuel Master node is installed has more than one
NIC, you can access the Fuel Web UI using a specific NIC.

To access the Fuel Web UI:

#. Connect the NIC to the appropriate switch.
#. Set an IP address for the NIC.
#. Use the IP address you have set to access the Fuel Web UI.

.. note::

   The tasks above does not change the administrator network settings.
   The URL displayed on the Fuel boot screen is unchanged and can still be
   used.

