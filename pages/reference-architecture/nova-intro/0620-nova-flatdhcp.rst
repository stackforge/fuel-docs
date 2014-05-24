

.. _nova-flatdhcp-arch:

Nova-network FlatDHCP Manager
-----------------------------

In this topology, a bridge (i.e. **br100**)
is configured on every Compute node
and one of the machine's physical interfaces is connected to it.
Once the virtual machine is launched,
its virtual interface connects to that bridge as well.
The same L2 segment is used for all OpenStack projects,
which means that there is no L2 isolation between virtual hosts,
even if they are owned by separate projects.
Additionally, only one flat IP pool is defined
for the entire environment.
For this reason, it is called the *Flat* manager.

The simplest case here is as shown on the following diagram
of the FlatDHCPManager used with the multi-host scheme.
Here the *eth1* interface is used
to give network access to virtual machines,
while the *eth0* interface is the management network interface.

.. image:: /_images/flatdhcpmanager-mh_scheme.jpg
  :width: 60%

Fuel deploys OpenStack in FlatDHCP mode
with the **multi-host** feature enabled.
Without this feature enabled,
network traffic from each VM would go through the single gateway host,
which creates a single point of failure.
In **multi-host** mode, each Compute node becomes a gateway
for all the VMs running on the host,
providing a balanced networking solution:
if one of the Compute nodes goes down,
the rest of the environment remains operational.

The current version of Fuel uses VLANs,
even for the FlatDHCP network manager.
On the Linux host, it is implemented in such a way
that it is not the physical network interfaces
that connects to the bridge,
but the VLAN interface (i.e. *eth0.102*).

The following diagram illustrates FlatDHCPManager
used with the single-interface scheme:

.. image:: /_images/flatdhcpmanager-sh_scheme.jpg
  :width: 50%

In order for FlatDHCPManager to work,
one designated switch port
where each Compute node is connected
needs to be configured as a tagged (trunk) port
with the required VLANs allowed (enabled, tagged).
Virtual machines communicate with each other on L2
even if they are on different Compute nodes.
If the virtual machine sends IP packets to a different network,
they are routed on the host machine according to the routing table.
The default route points to the gateway
specified on the :ref:`network-settings-ug` tab in the UI
as the gateway for the Public network.

The following diagram describes network configuration when you use
Nova-network with FlatDHCP Manager:

.. image:: /_images/preinstall_d_flat_dhcp.jpg
   :align: center
   :width: 60%


