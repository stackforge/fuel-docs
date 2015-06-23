Adding Slave Nodes Manually
---------------------------

Configure the host-only interfaces.

#. In the VirtualBox main window, go to *File -> Preferences -> Network*.
   On the :guilabel:`Host-only Networks` tab, click the screwdriver icon.

   * Create network *vboxnet1*:

     - IP address: 172.16.0.254
     - Network mask: 255.255.255.0
     - DHCP Server: disabled

     .. image:: /_images/vboxnet1.png

   * Сreate network *vboxnet2*:

     - IP address: 172.16.1.1
     - Network mask: 255.255.255.0
     - DHCP Server: disabled

     .. image:: /_images/vboxnet2.png

Next, create Slave nodes where OpenStack needs to be installed.

#. Create 3 or 4 additional VMs with the following parameters:

   * OS Type: Linux, Version: Ubuntu (64bit)
   * RAM: 1536+ MB (2048+ MB recommended)
   * HDD: 50+ GB, with dynamic disk expansion
   * Network 1: host-only interface vboxnet0, Intel PRO/1000 MT desktop driver

#. Set Network as first in the boot order:

   .. image:: /_images/vbox-image1.png
      :align: center

#. Configure two or more network adapters on each VM (in order to use single network
   adapter for each VM you should choose :guilabel:`Use VLAN Tagging` later in the
   Fuel UI):

   .. image:: /_images/vbox-image2.png
      :align: center

#. Open :guilabel:`Advanced` collapse, and set the following options:

   * Set :guilabel:`Promiscuous mode` to :guilabel:`Allow All`
   * Set :guilabel:`Adapter Type` to :guilabel:`Intel PRO/1000 MT Desktop`
   * Check :guilabel:`Cable connected`

