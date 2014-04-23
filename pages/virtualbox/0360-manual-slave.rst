Adding Slave Nodes Manually
---------------------------

Next, create Slave nodes where OpenStack needs to be installed.

1. Create 3 or 4 additional VMs
   with the following parameters:

* OS Type: Linux, Version: Ubuntu (64bit)
* RAM: 1536+ MB (2048+ MB recommended)
* HDD: 50+ GB, with dynamic disk expansion
* Network 1: host-only interface vboxnet0, PCnet-FAST III device

2. Set Network as first in the boot order:

.. image:: /_images/vbox-image1.jpg
  :align: center
  :width: 75%

3. Configure two or more network adapters on each VM (in order to use single network
   adapter for each VM you should choose "Use VLAN Tagging" later in the Fuel UI):

.. image:: /_images/vbox-image2.jpg
  :align: center
  :width: 75%

4. Open "advanced" collapse, and check following options:

* Set Promiscuous mode to "Allow All"
* Set Adapter type to "PCnet-FAST III"
* Set Cable connected to On

In addition to using Promiscuous mode on all network interfaces,
you must modify the network cards to use the PCnet PCI II model network card
or the Neutron setup step of the deployment fails.
