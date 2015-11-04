.. _install_login_fuel_master_node_multiple_nics:

Log in to the Fuel Master node with multiple NICs
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If the server on which the Fuel Master node is installed has more than one
network interface card (NIC), you can access the Fuel web UI with a particular
NIC.

**To access the Fuel web UI with a particular NIC:**

#. Connect the NIC to the appropriate switch.
#. Set an IP address for the NIC from :menuselection:`Fuel Setup >
   Network Setup` during the setup stage.
#. Boot the Fuel Master node.
#. Use the IP address that you assigned to the Fuel web UI.

.. note::

   The tasks above do not change the default administrator network settings.
   You can access the Fuel web UI using the URL displayed on the Fuel boot
   screen.

.. seealso::

   - `install_login_fuel_master_node_first_time`

