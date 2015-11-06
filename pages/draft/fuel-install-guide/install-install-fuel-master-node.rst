.. _install_install_fuel_master_node:

Install the Fuel Master node
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To install the Fuel Master node, first download the Fuel ISO image and
:ref:`prepare the installation media <install_prepare_install_media>`.

#. Insert or mount through IPMI (or using any other remote control utility
   supported by your hardware) the media with the ISO on the server
   that will be your Fuel Master node.

#. Power the machine on just as you would for any operating system
   installation.

#. Set the boot order for the system with the installation media as the first
   device. Alternatively, set the hard drive as the first device, then select
   the location of the media that contains the installation file to install
   the software.

   .. note::

      The steps for modifying the boot order may vary depending on your server
      or virtual system.

The `Welcome to Fuel Installer` screen appears and boot starts automatically.
If necessary, modify the boot settings from this screen. For this, press the
Tab key to display the loader command line and configure the IP address,
default gateway, or DNS server for the Fuel Master node.

.. note::

   It is possible to install the Fuel Master node on vSphere.

.. TODO(MZ): add a text-link saying: For more details, see Installing Fuel
             Master Node on vSphere.