.. _install_prepare_install_media:

===============================
Preparing an installation media
===============================

After you :ref:`download the Fuel ISO image <install_download_iso>`, create
the Fuel installation media:

* :ref:`Create a DVD drive <create_dvd>`
* :ref:`Create a USB drive <create_usb>`

.. _create_dvd:

Create a DVD drive
------------------

Once you download the Fuel ISO image, use one of the following tools to
mount the ISO or burn a DVD drive:

* For a remote installation, use one of the below remote control
  utilities to mount the ISO image directly to the server's virtual DVD drive:

  * `IPMItool <http://sourceforge.net/projects/ipmitool/>`_
  * HP Integrated Lights Out (iLO)
  * Dell iDRAC

* For a bare-metal installation, burn the ISO image to a DVD drive using any
  standard software. For example:

  - **Linux**:

    * `Xfburn <https://apps.ubuntu.com/cat/applications/precise/xfburn/>`_
    * `Brasero <http://www.linuxfromscratch.org/blfs/view/svn/gnome/brasero.html>`_

  - **Mac OS X**:

    * Disk Utility (a commonly pre-installed application)
    * `Burn <http://burn-osx.sourceforge.net/Pages/English/home.html>`_

  - **Windows**:

    * `ImgBurn <http://www.imgburn.com/>`_
    * `InfraRecorder <http://infrarecorder.org/>`_

.. _create_usb:

Create a USB drive on a UNIX system
-----------------------------------

Once you download the Fuel ISO image, use a USB flash drive to install Fuel
on your machine.

.. note:: Write the Fuel ISO image to the USB drive itself, and not to one of
   its partitions if any. For example, if you have a USB ``/dev/sdc`` with
   the ``/dev/sdc1`` and ``/dev/sdc2`` partititions, write the ISO to
   ``/dev/sdc``.

#. Plug in a USB drive to your machine.
#. Run the following command:

   .. code-block:: console

      # dd if=/way/to/your/ISO of=/way/to/your/USB/stick

   where:

   * ``/way/to/your/ISO`` is the path to your Fuel ISO
   * ``/way/to/your/USB/stick`` is the path to your USB drive

   For example, if the Fuel ISO is located in the ``/home/user/fuel-isos/``
   folder and your USB drive is at ``/dev/sdc``, run the following command:

   .. code-block:: console

      # dd if=/home/user/fuel-isos/fuel-7.0.iso of=/dev/sdc

   .. warning:: This operation wipes all the data you have on
                on the USB drive and places a bootable Fuel ISO
                on it.
