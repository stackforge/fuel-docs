.. _install_login_fuel_master_node_first_time:

Log in to the Fuel Master node for the first time
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When Fuel completes the installation of the Fuel Master node, the Fuel Master
node boots automatically and the *Welcome to the Fuel server* message displays.
The message contains Fuel Web UI and Fuel command-line interface login
credentials.

.. warning::

   Remove the installation media before booting the system.
   You may damage or delete the entire environment
   by booting the installation media once again accidentally.
   This is especially important if you set the boot order
   so that the USB or DVD drive boots before the hard disk.

Log in to the Fuel Master node for further configuration using one of
the following options:
   
* Log in to the Fuel Web UI.
* Log in to the Fuel CLI.

You can perform most of the operations in both Fuel Web UI and Fuel CLI.
However, for your convenience, we recommend that you use the Fuel Web UI for
initial configuration. 

**To log in to the Fuel Web UI:**

#. In a web browser, type the IP address and port number that you have
   assigned for the Fuel Web UI in :ref:`install_set_up_fuel`.

   Fuel prompts you for the login credentials.

#. In a web browser, enter the Fuel UI login and password that you have
   set for the Fuel Web UI in :ref:`install_set_up_fuel`
 
   If you use the default network settings, use the following values: 
     
   * IP address: ``http://10.20.0.2:8000``
   * Fuel UI login: ``admin``
   * Fuel UI password: ``admin``
   
   The Fuel Web UI initial screen displays. 

#. Proceed to :ref:`install_boot_the_fuel_slave_nodes`.

**To log in to the Fuel CLI:**

#. In console, type the root login and password that you have
   assigned in :ref:`install_set_up_fuel`.

   If you use the default settings, type the following login credentials:

   * Login: ``root``
   * Password: ``r00tme``

   You can change the password using the :command:`passwd` command after
   you log in.

#. Proceed to `install_boot_the_fuel_slave_nodes`.

.. seealso::

   - :ref:`install_login_fuel_master_node_multiple_nics`
   - :ref:`ug_create_new_env`

