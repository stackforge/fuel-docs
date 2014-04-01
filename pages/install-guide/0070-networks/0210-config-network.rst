Configuring the network
-----------------------

Once you choose a networking mode (FlatDHCP/VLAN), you must configure equipment 
accordingly. The diagram below shows an example configuration.

.. image:: /_images/physical-network.png
  :width: 100%
  :align: center

Fuel operates with following logical networks:

**Fuel** network 
  Used for internal Fuel communications only and PXE booting (untagged on the scheme);

**Public** network 
  Is used to get access from virtual machines to outside, Internet or office 
  network (VLAN 101 on the scheme);

**Floating** network 
  Used to get access to virtual machines from outside (shared L2-interface with 
  Public network; in this case it's VLAN 101);

**Management** network 
  Is used for internal OpenStack communications (VLAN 100 on the scheme);
  
**Storage** network 
  Is used for Storage traffic (VLAN 102 on the scheme);

**Fixed** network
  One (for flat mode) or more (for VLAN mode) virtual machines 
  networks (VLANs 103-200 on the scheme).
