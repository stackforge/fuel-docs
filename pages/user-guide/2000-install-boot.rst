
.. _download-install-ug:

Download and Install Fuel
=========================

Mirantis provides the images you will use to
install Fuel and Mirantis OpenStack.
Download the Fuel image from the
`Mirantis web-site <http://software.mirantis.com/>`_.
Depending on the speed of your Internet connection,
this could take a half hour or more.

.. _create-media-ug:

Create the Installation Media
-----------------------------
You can download an ISO file and,
for many modern servers,
use a remote control utility such as
`ipmitool <http://sourceforge.net/projects/ipmitool/>`_,
HP iLO, or Dell iDRAC
to mount the ISO image directly
to the server's virtual DVD drive.

For a bare-metal installation,
you can instead burn the ISO image to a DVD or
burn the IMG file to a USB drive,
then use that media to install the software.

.. note:: You can use the same ISO image
   to install Fuel and Mirantis OpenStack
   in VirtualBox.
   In that case, copy the ISO file to the approriate directory
   and boot directly from that disk file.
   See the `Quick Start Guide <http://software.mirantis.com/quick-start/>`_.
   and :ref:`virtualbox`.


Use any standard software to burn the ISO to a writable DVD.
Some popular options:

- **Linux** --
  `Brasero` and `Xfburn` are commonly pre-installed applications

- **Mac OS X** --
  Open `Disk Utility` from `Applications > Utilities`,
  drag the ISO into the disk list on the left side of the window and select it,
  insert a blank DVD, and click `Burn`.
  If you prefer a different utility,
  check out the open source
  `Burn <http://burn-osx.sourceforge.net/Pages/English/home.html>`_.

- **Windows** --
  Use `ImgBurn <http://www.imgburn.com/>`_ or the
  open source `InfraRecorder <http://infrarecorder.org/>`_

.. _initialize-fuel-ug:

.. _boot-fuel-ug:

Install Fuel Master Node
------------------------

Insert (or mount through IPMI) the media
you created in :ref:`download-install-ug`
on the server that will be your Fuel Master Node
and power the machine on,
just as you would for any operating system installation.
Set the boot order for the system
with the installation media as the first device.
Or you can set the hard drive as the first device,
then select the location of the media that contains
the installation file to install the software.
The following screen appears.

.. image:: /_images/user_screen_shots/fuel_starts.png
   :width: 50%

If necessary, you can modify the boot settings from this screen;
press the "Tab" key to display the **grub** command line
and edit that line.
This allows you to configure the IP address,
default gateway, and DNS server for the Fuel Master Node.

.. include:: /pages/user-guide/initialize-fuel/0400-pxe-config.rst

.. include:: /pages/user-guide/initialize-fuel/0500-fuel-boot.rst
.. include:: /pages/user-guide/initialize-fuel/0600-boot-nodes.rst

