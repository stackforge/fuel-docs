Router
++++++

To make it possible for VMs to access the outside world, you must have an IP 
address set on a router in the Public network. In the examples provided, 
that IP is 12.0.0.1 in VLAN 101.

Fuel UI has a special field on the networking tab for the gateway address. As 
soon as deployment of OpenStack is started, the network on nodes is 
reconfigured to use this gateway IP as the default gateway.

If Floating addresses are from another L3 network, then you have to configure the 
IP address (or even multiple IPs if Floating addresses are from more than one L3 
network) for them on the router as well.

Otherwise, Floating IPs on nodes will be inaccessible.
