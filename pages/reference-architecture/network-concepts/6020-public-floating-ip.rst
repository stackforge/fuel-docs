
.. _public-floating-ips-arch:

Public and Floating IP address requirements
-------------------------------------------

This section describes the OpenStack requirements
for public and floating IP addresses that are available.
Each network type (Nova-Network and Neutron)
has distinct requirements.

.. note:: Public and Floating IP ranges must not intersect!

Nova-Network requirements
~~~~~~~~~~~~~~~~~~~~~~~~~

Both public and floating IP ranges
should be defined within the same network segment (CIDR).
If this is not possible,
additional routing settings between these ranges
are required on your hardware router to connect the two ranges.

**Public range with Nova-Network requirements:**

* Each deployed node requires one IP address from the public IP range.
  In addition, one extra IP address for the environment's Virtual IP
  is required.

**Floating range with Nova-Network requirements:**

* Every VM (instance) connected to the external network
  requires one IP address from the Floating IP range.
  These IP addresses are assigned on demand
  and may be released from the VM
  and returned back to the pool of non-assigned Floating IP addresses.

Neutron requirements
~~~~~~~~~~~~~~~~~~~~

Both public and floating IP ranges
must be defined inside the same network segment (CIDR)!
Fuel cannot configure Neutron with external workarounds at this time.


**Public range with Neutron requirements:**

* Each deployed Controller node and each deployed Zabbix node
  requires one IP address from the public IP range.

* This IP address goes to the node's bridge to the external network ("br-ex").

* Two additional IP addresses are required for the environment's Virtual IP.

.. note::

  * For 5.1 and later Neutron environments, public IP addresses can be
    allocated either to all nodes or just to Controllers and Zabbix
    servers. By default, IP addressess are allocated to Controllers
    and Zabbix servers only. To get them allocated to all nodes,
    **Public network assignment -> Assign public network to all
    nodes** should be selected on the `Setting` tab.

  * When using Fuel 6.1 to manage 5.0.x environments,
    the environment must conform to the 5.0.x practice,
    so each target node must have a public IP assigned to it,
    even when using Neutron.

  * For Fuel 6.1, default gateways on nodes that do not have public IP
    addresses point either to the admin network's gateway or to the
    master node's IP address, in case the admin network's gateway
    is not set.

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

Consider the following environment:

* You have:

  - X = the number of controller nodes;
  - Y = the number of Zabbix nodes;
  - Z = the number of other nodes (Compute, Storage, and MongoDB).

* K = the number of tenants you want to establish.

* M = the number of virtual instances you want to provide the direct external
  access to.

* N = the number of environment's virtual IP addresses that is 3, one for
  each of the following:

  - default gateway;
  - public virtual IP address;
  - virtual IP address for a virtual router. 

Calculate the required number of public and floating IP addresses using these
formulae:

**Nova-Network**

* [(X+Y+Z) + N] for the public range;
* [M] for the floating range.

**Neutron**

* [(X+Y) + N] for the public range;
* [K+M] for the floating range.

.. note::
   All 6.1 Neutron environments, for which **Public network assignment ->
   Assign public network to all nodes** is set, have the same requirements
   as those shown for Nova-Network.
