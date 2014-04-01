FlatDHCPManager (multi-host scheme)
-----------------------------------

The main ingredient in FlatManager is to configure a bridge 
(i.e. **br100**) on every Compute node and have one of the machine's physical 
interfaces connect to it. Once the virtual machine is launched, its virtual 
interface connects to that bridge as well.
The same L2 segment is used for all OpenStack projects, which means that there 
is no L2 isolation between virtual hosts, even if they are owned by separate 
projects. Additionally, there is only one flat IP pool defined for the entire 
environment. For this reason, it is called the *Flat* manager.

The simplest case here is as shown on the following diagram. Here the *eth1* 
interface is used to give network access to virtual machines, while *eth0* 
interface is the management network interface.

.. image:: /_images/flatdhcpmanager-mh_scheme.jpg
  :align: center

Fuel deploys OpenStack in FlatDHCP mode with the **multi-host** 
feature enabled. Without this feature enabled, network traffic from each VM 
would go through the single gateway host, which inevitably creates a single 
point of failure. In **multi-host** mode, each Compute node becomes a gateway 
for all the VMs running on the host, providing a balanced networking solution. 
In this case, if one of the Computes goes down, the rest of the environment 
remains operational.

The current version of Fuel uses VLANs, even for the FlatDHCP network 
manager. On the Linux host, it is implemented in such a way that it is not 
the physical network interfaces that connects to the bridge, but the 
VLAN interface (i.e. *eth0.102*).
