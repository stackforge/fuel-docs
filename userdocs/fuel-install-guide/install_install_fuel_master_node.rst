.. _install_install_fuel_master_node:

Install the Fuel Master node
----------------------------

Before you install the Fuel Master node, complete the steps described in
:ref:`Before you install Fuel <install_before_you_install_fuel>`,
:ref:`Download the ISO image <install_download_iso>`, and
:ref:`Preparing an installation media <install_prepare_install_media>`.

**To install the Fuel Master node:**

#. Insert or mount through IPMI (or using any other remote control utility
   supported by your hardware) the media with the Fuel ISO on the server
   that will be your Fuel Master node.

#. Verify that the Fuel installation media is the first device in the boot
   order.

#. Power on the server. The `Welcome to Fuel Installer` screen appears.

#. Select the installation media. If necessary, modify the boot settings by
   pressing the Tab key to display the loader command line. Using this command
   line, configure the IP address, default gateway, and DNS server settings of
   the Fuel Master node.

#. Proceed to :ref:`Configure network parameters <install_set_up_fuel>`.

.. note::

   You can install the Fuel Master node on VMware vSphere. For more information,
   see: :ref:`Before you install Fuel on VMware vSphere <vsphere_intro>`.
