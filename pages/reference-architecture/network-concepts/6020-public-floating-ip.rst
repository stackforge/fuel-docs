
.. _public-floating-ips-arch:

Public and Floating IP address requirements
-------------------------------------------

This section describes the OpenStack requirements
for Public and Floating IP addresses that are available.
Each network type (Nova-Network and Neutron)
has distinct requirements.

.. note:: Public and Floating IP ranges must not intersect!

Nova-Network requirements
~~~~~~~~~~~~~~~~~~~~~~~~~

Both Public and Floating IP ranges
should be defined within the same network segment (CIDR).
If this is not possible,
additional routing settings between these ranges
are required on your hardware router to connect the two ranges.

**Public range with Nova-Network requirements:**

* Each deployed node requires one IP address from the Public IP range.

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

* For HA environments, an additional IP address is required for the environment's
  Virtual IP.

.. note::

  * Beginning with 5.1 Neutron environment, public IP addresses
    can be allocated to all nodes. This can be enabled under
    the `Settings` tab by selecting **Public network assignment ->
    Assign public network to all nodes**.
    This setting is absent when using Nova-Network,
    because a public IP address is always allocated to each node.

  * When using Fuel 6.1 to manage 6.0 environments,
    the environment must conform to the 6.0 practice,
    so each target node must have a public IP assigned to it,
    even when using Neutron.

  * For Fuel 5.1, default gateways on nodes that do not have public
    IP addresses point to the master node's IP address.


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

:Nova-Network:

       The Public range must have [(X+Y+Z) + 2] IP addresses
       (one for each node in the environment plus two for the
       environment's Virtual IP addresses; the Floating range
       must have M IPs.

:Neutron:

        The Public range must have [(X+Y) +2] IP addresses
        (one for each Controller and Zabbix node plus two for
        the environment's Virtual IP addresses); the Floating
        range must have K+M IP addresses.

.. note::
   All 6.1 Neutron environments, for which **Public network assignment ->
   Assign public network to all nodes** is set, have the same requirements
   as those shown for Nova-Network.
