.. _install_prepare_install_media:

Prepare an installation media
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

After downloading the :ref:`Fuel ISO image <install_download_iso>`, you must
prepare the installation media by mounting the ISO or burning a DVD/USB
drive.


.. _install_create_dvd:

Create a DVD drive
------------------

You can create a DVD with the Fuel ISO to install Fuel on a virtual or
bare-metal hardware.

**To create a DVD drive:**

#. Select from the following options:

   * For a remote installation, use a remote control utility to mount the
     ISO image directly to the server's virtual DVD drive. For example:

     * `IPMItool <http://sourceforge.net/projects/ipmitool/>`_
     * HP Integrated Lights Out (iLO)
     * Dell iDRAC

   * For a bare-metal installation, burn the ISO image to a DVD drive using any
     standard software. For example:

     - *Linux*:

       * `Xfburn <https://apps.ubuntu.com/cat/applications/precise/xfburn/>`_
       * `Brasero <http://www.linuxfromscratch.org/blfs/view/svn/gnome/brasero.html>`_

     - *Mac OS X*:

       * Disk Utility (a commonly pre-installed application)
       * `Burn <http://burn-osx.sourceforge.net/Pages/English/home.html>`_

     - *Windows*:

       * `ImgBurn <http://www.imgburn.com/>`_
       * `InfraRecorder <http://infrarecorder.org/>`_

#. Proceed to the
   :ref:`Fuel Master node installation <install_install_fuel_master_node>`.


.. _install_create_usb:

Create a USB drive with the Fuel ISO on a UNIX system
-----------------------------------------------------

After downloading the Fuel ISO image, you can use a USB flash drive to
install Fuel on your machine.

.. note:: Write the Fuel ISO image to the USB drive itself and not to one of
   its partitions, if any. For example, if you have a USB ``/dev/sdc`` with
   the ``/dev/sdc1`` and ``/dev/sdc2`` partititions, write the ISO to
   ``/dev/sdc``.

**To create a USB drive on a UNIX system:**

#. Plug in a USB drive to your machine.
#. Run the following command:

   .. code-block:: console

      # dd if=/path-to-your-ISO of=/path-to-your-USB

   **Example:**

   .. code-block:: console

      # dd if=/home/user/fuel-isos/fuel-7.0.iso of=/dev/sdc

   .. warning:: This operation wipes all the data you have
                on the USB drive and places a bootable Fuel ISO
                on it.

#. Proceed to
   :ref:`Install the Fuel Master node <install_install_fuel_master_node>`.
