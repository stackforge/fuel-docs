Reference Network Model in Neutron
----------------------------------

The FuelWeb UI uses the following per-node network model:

* Create an OVS bridge for each NIC except for the NIC with Admin network
  (for example, **br-eth0** bridge for **eth0** NIC) and put NICs into their bridges
* Create a separate bridge for each OpenStack network:

  * **br-ex** for the Public network
  * **br-prv** for the Private network
  * **br-mgmt** for the Management network
  * **br-storage** for the Storage network

* Connect each network's bridge with an appropriate NIC bridge using an OVS patch with
  an appropriate VLAN tag.
* Assign network IP addresses to the corresponding bridges.

Note that the Admin network IP address is assigned to its NIC directly.

This network model allows the cluster administrator to manipulate cluster
network entities and NICs separately, easily, and on the fly during the cluster
life-cycle.

