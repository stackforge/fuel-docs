
.. _boot-fuel-master-ug:

Boot the Fuel Master Node
=========================

When installation is complete,
remove the installation media from your system.
This is especially important if you set the boot order
so that this device is ahead of the hard disk,
to avoid accidentally booting on the ISO or IMG file.

Press "Enter" to initialize Fuel.
The boot messages display on your screen as Fuel boots up:

.. image:: /_images/user_screen_shots/fuel-post-boot.png
   :width: 50%

Use the URL, administrator login name and password
that are displayed on the boot screen.
The default URL is http://10.20.0.2:8000/;
this will be your URL unless you modified the IP address
during installation.

Alternately, if the server on which the Fuel Master is installed
has more than one NIC, you can use that to access the Fuel web interface:

- Connect the NIC to the appropriate switch
- Set the IP address for this NIC to 10.24.42.133
- Use the http://10.24.42.133:8080 to access the Fuel UI.

Note that doing this does not change the  Admin network settings;
the URL displayed on the Fuel boot screen is unchanged and can still be used.

