Networking
==========

By default, the launch script for the VirtualBox deployment
creates three host-interface adapters.
Basically, networking works as if you have 3 switches,
one of which is connected to a VM network interface.
This means that you have L2 connectivity between VMs
on interfaces with the same name.
If, for example, you try to move
the management network to `eth1` on the Controller node,
and the same network to `eth2` on the Compute node,
then there will be no connectivity between OpenStack services,
despite being configured to exist on the same VLAN.
You can validate your network settings prior to deployment
by clicking the "Verify Networks" button.
If you need to access the OpenStack REST API over the Public network,
VNC console of VMs, Horizon in HA mode or VMs, refer to this section:
:ref:`access_to_public_net`.
