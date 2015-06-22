Deploying the Master Node Manually
----------------------------------

First, create the Master node VM.

#. Configure the host-only interface vboxnet0 in VirtualBox by going to
   *File -> Preferences -> Network*, then on the *Host-only Networks*
   tab click the screwdriver icon:

   * IP address: 10.20.0.1
   * Network mask: 255.255.255.0
   * DHCP Server: disabled

   .. image:: /_images/host-only-networks-preferences.png

   .. image:: /_images/host-only-networks-details.png

  
#. Create a VM for the Fuel Master node with the following parameters:

   * OS Type: Linux
   * Version: Ubuntu (64bit)
   * RAM: 1536+ MB (2048+ MB recommended)
   * HDD: 50 GB with dynamic disk expansion

#. Modify your VM settings:

   * Network: Attach *Adapter 1* to *Host-only adapter* *vboxnet0*

#. Power on the VM in order to start the installation. Choose your Fuel ISO
   when prompted to select start-up disk.

#. Wait for the Welcome message with all information needed to login into the UI
   of Fuel.
