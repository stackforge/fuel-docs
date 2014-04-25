FAQ
~~~

Q:
   I tried to deploy a Fuel OpenStack environment on VirtualBox, but the
   deployment fails on Neutron setup. How do I fix this?
A:
   You should to choose ”Allow all” promiscuous mode on all network
   interfaces in VirtualBox and modify the network cards to use the PCnet
   PCI II model network card.
