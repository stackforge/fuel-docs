.. _qs_config_network:

Configuring the Network
-----------------------

Configure the VirtualBox Host-Only Ethernet Adapters for the Fuel 
Master node and Fuel Slave nodes.

**Procedure:**

1. In VirtualBox, click **File > Preferences > Network**.
2. Select **Host-only Networks**.
3. Create three VirtualBox Host-Only Ethernet Adapters by clicking 
   the **Create** icon.

   VirtualBox creates new Ethernet adapters. 
   For the purpose of example, Ethernet adapters’ names are:

   * vboxnet0 
   * vboxnet1 
   * vboxnet2 

4. Modify the settings of the vboxnet0 adapter:

   * IPv4 Address: 10.20.0.1
   * IPv4 Network mask: 255.255.255.0
   * DHCP Server: disabled

5. Modify the settings of the vboxnet1 adapter:

   * IPv4 Address: 172.16.0.254
   * IPv4 Network mask: 255.255.255.0
   * DHCP Server: disabled

6. Modify the settings for the vboxnet2 adapter: 

   * IPv4 Address: 172.16.1.1
   * IPv4 Network mask: 255.255.255.0
   * DHCP Server: disabled

7. Proceed to :ref:`qs_create_vms`.
