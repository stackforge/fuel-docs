Adding Slave Nodes
^^^^^^^^^^^^^^^^^^

Next, create Slave nodes where OpenStack needs to be installed.

1. Create 3 or 4 additional VMs depending on your wish with the following parameters:

* OS Type: Linux, Version: Ubuntu (64bit)
* RAM: 1536+ MB (2048+ MB recommended)
* HDD: 50+ GB, with dynamic disk expansion
* Network 1: host-only interface vboxnet0, PCnet-FAST III device

2. Set Network as first in the boot order:

.. image:: /_images/vbox-image1.jpg
  :align: center

3. Configure two or more network adapters on each VM (in order to use single network
   adapter for each VM you should choose "Use VLAN Tagging" later in the Fuel UI):

.. image:: /_images/vbox-image2.jpg
  :align: center

4. Open "advanced" collapse, and check following options:

* Promiscuous mode is a "Allow All"
* Adapter type is a "PCnet-FAST III"
* Cable connected is a On
