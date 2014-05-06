NIC usage
---------

The current architecture assumes the presence of 3 NICs, but it can be
customized for two or 4+ network interfaces.
Most servers are built with at least two network interfaces.
In this case, let's consider a typical example of three NIC cards.
They are utilized as follows:

**eth0**:
  The Admin (PXE) network, used for communication with Fuel Master for
  deployment.

**eth1**:
  The public network and floating IPs assigned to VMs

**eth2**:
  The private network, for communication between OpenStack VMs, and the
  bridge interface (VLANs)

The figure below illustrates the relevant nodes and networks in Neutron VLAN mode.

.. image:: /_images/080-networking-diagram.*
  :width: 75%
  :align: center

