Configuring the network
-----------------------

Once you choose a networking mode (FlatDHCP/VLAN), you must configure equipment 
accordingly. The diagram below shows an example configuration.

.. image:: /_images/physical-network.png
  :width: 100%
  :align: center

Fuel operates with a set of :ref:`logical networks<logical-networks-arch>`.
In this scheme, these logical networks are mapped as follows:

- **Admin (Fuel)** network: untagged on the scheme

- **Public** network: VLAN 101

- **Floating** network: VLAN 101

- **Management** network: VLAN 100
  
- **Storage** network: VLAN 102

- **Fixed** network: VLANs 103-200
