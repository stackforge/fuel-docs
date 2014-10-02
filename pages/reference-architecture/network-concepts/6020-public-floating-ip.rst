
.. _public-floating-ips-arch:

Public and Floating IP address requirements
-------------------------------------------

This section describes the OpenStack requirements
for Public and Floating IP addresses that are available.
Each network type (Nova-Network and Neutron)
has distinct requirements.

.. note:: Public and Floating IP ranges must not intersect!

Nova-Network requirements
+++++++++++++++++++++++++

Both Public and Floating IP ranges
should be defined within the same network segment (CIDR).
If this is not possible,
additional routing settings between these ranges
are required on your hardware router to connect the two ranges.

**Public range with Nova-Network requirements:**

  * Each deployed node
    requires one IP address from the Public IP range.

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


**Public range with Neutron requirements:**

  * Each deployed Controller node and each deployed Zabbix node
    requires one IP address from the Public IP range.

  * This IP address goes to the node's bridge to the external network ("br-ex").

  * For HA environments, an additional IP address is required
    for the environment's Virtual IP.

Note the following:

*   Public IP addresses can still be allocated to all nodes
    in a 5.1 Neutron environment.
    This can be enabled under the "Settings" tab
    by selecting **Public network assignment ->
    Assign public network to all nodes**.
    This setting is absent when using Nova-Net
    because a public IP address is always allocated to each node.

*   When using Fuel 5.1 to manage 5.0.x environments,
    the environment must conform to the 5.0.x practice,
    so each target node must have a public IP assigned to it,
    even when using Neutron.

*   Default gateways on nodes that do not have public IP addresses
    point to the master node's IP address for Fuel 5.1;
    this behavior is expected to change in future releases.


**Floating range with Neutron requirements:**

  * Each defined tenant, including the Admin tenant,
    requires one IP address from the Floating range.
  * This IP address goes to the virtual interface of the tenant's virtual router.
    Therefore, one Floating IP is assigned to the Admin tenant automatically
    as part of the OpenStack deployment process.

  * Each VM (instance) connected to the external network
    requires one IP address from the Floating IP range.
    These IP addresses are assigned on demand
    and may be released from the VM
    and returned back to the pool of non-assigned Floating IP addresses.

Example
~~~~~~~

A little example may clarify this.
Consider the following environment:

* You have X Controller nodes, Y Zabbix nodes,
  and Z other nodes (Compute, Storage, and MongoDB).
* You want to establish no more than K tenants.
* You want to provide direct external access
  to no more than M virtual instances.

Calculate the required number of Public and Floating IP addresses as follows:

:Nova-Network with HA:
       The Public range must have [(X+Y+Z) + 1] IP addresses
       (one for each  node in the environment
       plus one for the environment's Virtual IP address;
       the Floating range must have M IPs.

:Neutron with HA:
        The Public range must have [(X+Y) +1] IP addresses
        (one for each Controller and Zabbix node
        plus one for the environment's Virtual IP address);
        the Floating range must have K+M IP addresses.

:If you are not using the HA deployment:
         You may decrease the Public range by one IP address 
         (which would be allocated for the Virtual IP in HA mode).


.. note::  All 5.0.x environments and 5.1 Neutron environments
           for which **Public network assignment -> Assign public network to all nodes**
           is set have the same requirements as those shown for Nova-Network.


