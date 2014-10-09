
.. _boot-fuel-master-ug:

Boot the Fuel Master Node
=========================

When installation is complete,
**be sure to remove the installation media** from your system.
This is especially important if you set the boot order
so that the USB/DVD drive is before the hard disk;
you may accidentally boot the installation media again
and damage or delete your environment.

The boot messages display on your screen as Fuel boots up:

.. image:: /_images/user_screen_shots/fuel-post-boot.png
   :width: 50%

When the system has booted,
you can log in:

- Use the administrator login and password
  that are displayed on the boot screen
  to log into a shell on the Fuel Master node.
  After you log in, use the **passwd** command
  to change this password.

- Use the URL displayed on this screen
  to launch the Fuel UI;
  the default URL is http://10.20.0.2:8000/.
  This is your URL
  unless you modified the IP address on the Fuel Setup screens.

  Use the **admin** user name
  and the Fuel password you set in in the Fuel Setup screens
  (see :ref:`fuel-passwd-ug`)
  to log in.
  If you did not set a Fuel password during installation,
  log in using **admin/admin** as the username/password.
  You can change the password from the Fuel UI;
  see :ref:`change-fuel-passwd-ug`.
  
Alternately, if the server on which the Fuel Master is installed
has more than one NIC,
you can use the second NIC to access the Fuel UI:

- Connect the NIC to the appropriate switch
- Set the IP address for this NIC
- Use the IP address you set to access the Fuel UI.

Note that doing this does not change the  Admin network settings;
the URL displayed on the Fuel boot screen is unchanged and can still be used.

