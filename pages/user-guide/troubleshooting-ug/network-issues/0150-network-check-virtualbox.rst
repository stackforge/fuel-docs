On VirtualBox
-------------

The scripts provided for quick Fuel setup create 3 host-interface adapters.
Basically, networking works as if you have 3 switches, with one connected
to a VM network interface. It means that there is only L2 connectivity between 
VMs on interfaces with the same name. If you try to move, for example, 
the management network to `eth1` on Controller node, and the 
same network to `eth2` on the Compute, then there will be no connectivity 
between OpenStack services, despite being configured to exist on the same 
VLAN. It is very easy to validate network settings prior to deployment by 
clicking the "Verify Networks" button.
If you need to access the OpenStack REST API over Public network, VNC console 
of VMs, Horizon in HA mode or VMs, refer to this section: 
:ref:`access_to_public_net`.
