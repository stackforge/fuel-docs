.. _Install_Automatic:

Installing Using Automated Scripts
==================================

#. Extract Mirantis VirtualBox scripts. The package should include the
   following:

   `iso`
     The directory containing the ISO image used to install Fuel.
     You should download the ISO from the portal to this directory
     or copy it into this directory after it is downloaded.
     If this directory contains more than one ISO file,
     the installation script uses the most recent one.

   `config.sh`
     Configuration file that allows you to specify parameters
     that automate the Fuel installation.
     For example, you can select how many virtual nodes to launch,
     as well as how much memory, disk, and processing to allocate for each.

   `launch.sh`
     This is the script you run to install Fuel.
     It uses the ISO image from the ``iso`` directory,
     creates a VM, mounts the image,
     and automatically installs the Fuel Master node.
     After installing the Master node,
     the script creates Slave nodes for OpenStack
     and boots them via PXE from the Master node.
     When Fuel is installed,
     the script gives you the IP address to use
     to access the Web-based UI for Fuel.
     Use this address to deploy your OpenStack environment.

#. Add Mirantis OpenStack IMG or Community ISO to the extracted VirtualBox
   ``iso`` folder.

#. Run the ``launch.sh`` script to install Fuel.

   For the Windows users:

   * Navigate to directory with the ``launch.sh`` file in Cygwin prompt,
     for example: ``cd /cygdrive/c/Users/{name}/Desktop/virtualbox``

   * Use the :command:`sh {shell script}` command to run a shell script in
     Cygwin::

       sh launch.sh

   .. note:
      Depending on your system resources, the Fuel installation process can take
      up to an hour to complete.


   The Fuel installation is complete when the VirtualBox fuel-master node shows
   the following details about your environment:

   .. image:: /_images/fuel_master_install.png
      :align: center

#. See the :ref:`start-create-env-ug` for the instructions on how to log
   in to the Fuel UI and set up your first environment.
