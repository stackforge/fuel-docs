.. _install_login_fuel_master_node:

Log in to the Fuel Master node
------------------------------

When Fuel completes the installation of the Fuel Master node, the Fuel Master
node boots automatically and the *Welcome to the Fuel server* message displays.
The message contains Fuel web UI and Fuel command-line interface default login
credentials.

.. warning::

   Remove the installation media before booting the system.
   You may damage or delete the entire environment
   by booting the installation media once again accidentally.
   This is especially important if you set the boot order
   so that the USB or DVD drive boots before the hard disk.

Log in to the Fuel Master node for further configuration using one of
the following options:

* Log in to the Fuel web UI.
* Log in to the Fuel CLI.

You can perform most of the operations in both Fuel web UI and Fuel CLI.
However, for your convenience, we recommend that you use the Fuel web UI for
initial configuration.

**To log in to the Fuel web UI:**

#. In a web browser, type the IP address and port number that you have
   assigned for the Fuel web UI in :ref:`Set up Fuel <install_set_up_fuel>`.

   Fuel prompts you for the login credentials.

#. In a web browser, enter the Fuel UI login and password that you have
   set for the Fuel web UI in :ref:`Set up Fuel <install_set_up_fuel>`.

   If you use the default network settings, use the following values:

   * IP address: ``https://10.20.0.2:8443/``
   * Fuel UI login: ``admin``
   * Fuel UI password: ``admin``

   .. note::

      The IP address must be reachable from the machine on which you open
      the Fuel web UI URL.

   .. warning::

      For security reasons, change the default credentials for
      the administrator account.

   The Fuel web UI initial screen displays.

#. Proceed to :ref:`Boot the Fuel Slave nodes <install_boot_nodes>`.

**To log in to the Fuel CLI:**

#. In the Fuel Master node console, type the root login and password that you
   have assigned in :ref:`Set up Fuel <install_set_up_fuel>`.

   If you use the default settings, type the following login credentials:

   * Login: ``root``
   * Password: ``r00tme``

   You can change the password using the :command:`passwd` command after
   you log in.

   .. warning::

      For security reasons, change the default credentials for the root
      account.

#. Alternatively, connect to the Fuel Master node using SSH.

#. Proceed to :ref:`Boot the Fuel Slave nodes <install_boot_nodes>`.

.. seealso::

   - :ref:`Log in to the Fuel Master node with multiple NICs <install_login_fuel_master_node_multiple_nics>`
