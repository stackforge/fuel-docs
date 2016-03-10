.. _install_login_fuel_master_node_multiple_nics:

Log in to the Fuel Master node with multiple NICs
-------------------------------------------------

If the server on which the Fuel Master node is installed has more than one
network interface card (NIC), you can access the Fuel web UI with a particular
NIC.

**To access the Fuel web UI with a particular NIC:**

#. Connect the NIC to the appropriate switch.
#. On the Fuel Master node, set an IP address for the NIC.
#. Use the IP address that you assigned to log in to the Fuel web UI.
   For example: ``https://IP_YOU_ASSIGN:8443/``

.. note::

   The tasks above do not change the default administrator network settings.
   You can access the Fuel web UI using the URL displayed on the Fuel boot
   screen.

.. seealso::

   - :ref:`install_login_fuel_master_node`

