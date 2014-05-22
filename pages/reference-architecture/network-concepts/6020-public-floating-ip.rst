
.. _public-floating-ips-arch:

Public and Floating IP address requirements
-------------------------------------------

This section describes the OpenStack requirements
for Public and Floating IP addresses that are available.
Each network type (Nova-Network and Neutron)
has distinct requirements.

Nova-Network requirements
~~~~~~~~~~~~~~~~~~~~~~~~~

Both Public and Floating IP ranges
should be defined within the same network segment (CIDR).
If this is not possible,
additional routing settings between these ranges
are required on your hardware router to connect the two ranges.

Public and Floating IP ranges must not intersect!

**Public range with Nova-Network requirements:**

  * Every deployed node requires one IP address from the Public IP range.

  * For HA environments, one extra IP address is required
    for the environment's Virtual IP.

**Floating range with Nova-Network requirements:**

  * Every VM (instance) connected to the external network
    requires one IP address from the Floating IP range.
    These IP addresses are assigned on demand
    and may be released from the VM
    and returned back to the pool of non-assigned Floating IP addresses.

Neutron requirements
~~~~~~~~~~~~~~~~~~~~

Both Public and Floating IP ranges
must be defined inside the same network segment (CIDR)!
Fuel cannot configure Neutron with external workarounds at this time.

.. note:: Public and Floating IP ranges must not intersect!

**Public range with Neutron requirements:**

  * Each deployed node requires one IP address from Public network.
    This IP goes to the node's virtual router.
    Public IPs for virtual routers are taken from the Floating range.
    So, a Controller on which the Neutron L3 daemon runs
    has two Public IPs: one from the Public range
    assigned on the `br-ex` interface,
    and another one from the Floating range
    assigned on the qg-XXXXX` interface.

  * For HA environments, an additional IP address is required
    for the environment's Virtual IP.

**Floating range with Neutron requirements:**

  * Each defined tenant, including the Admin tenant,
    requires one IP from the Floating range.
    This IP goes to the virtual interface of the tenant's virtual router.
    So, one Floating IP is assigned to the Admin tenant automatically
    as part of the OpenStack deployment process.

  * Each VM (instance) that is connected to the external network
    requires one IP address from the Floating IP range.
    These IP addresses are assigned on demand
    and may be released from the VM
    and returned back to the pool of non-assigned Floating IP addresses.

Example
~~~~~~~

A little example may clarify this.
Consider the following:

* Your environment has N nodes.
* You want to establish no more than K tenants.
* You want to provide direct external access
  to no more than M virtual instances.

Calculate the required number of Public and Floating IP addresses as follows:

Nova-Network with HA
	The Public range must have N+1 IPs; the Floating range must have M IPs.
Neutron with HA
	The Public range must have N+1 IPs; the Floating range must have K+M IPs.
If you are not using HA
	You may decrease the Public range by one IP address
	(which would be allocated for the Virtual IP in HA mode).

