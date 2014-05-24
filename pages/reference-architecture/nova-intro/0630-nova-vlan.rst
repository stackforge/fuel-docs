

.. _nova-vlan-arch:

Nova-network VLAN Manager
-------------------------

The Nova-network VLANManager topology
is more suitable for large scale clouds.
The idea behind this topology
is to separate groups of virtual machines
owned by different projects
into separate and distinct L2 networks.
In VLANManager, this is done by tagging IP frames,
identified by a given VLAN.
It allows virtual machines inside a specific project
to communicate with each other
and not to see any traffic from VMs of other projects.
Again, as with FlatDHCPManager,
switch ports must be configured as tagged (trunk) ports
to allow this scheme to work.

.. image:: /_images/vlanmanager_scheme.jpg
  :width: 60%


The following diagram describes network configuration when you use
Nova-network with VLAN Manager:

.. image:: /_images/preinstall_d_vlan.jpg
   :width: 65%

Fuel Deployment Schema
----------------------

OpenStack Compute nodes untag the IP packets
using VLAN tagging on a physical interface
packets and send them to the appropriate VMs.
Simplifying the configuration of VLAN Manager,
there is no known limitation
that Fuel could add in this particular networking mode.

Configuring the network
-----------------------

Once you choose a networking topology (Nova-network FlatDHCP or VLAN),
you must configure equipment accordingly.
The diagram below shows an example configuration.

.. image:: /_images/physical-network.png
  :width: 90%

Fuel operates with a set of :ref:`logical networks<logical-networks-arch>`.
In this scheme, these logical networks are mapped as follows:

- **Admin (Fuel)** network: untagged on the scheme

- **Public** network: VLAN 101

- **Floating** network: VLAN 101

- **Management** network: VLAN 100

- **Storage** network: VLAN 102

- **Fixed** network: VLANs 103-200
