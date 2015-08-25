
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
  In addition, two extra IP addresses for the environment's Virtual IPs
  and one for the default gateway are required.

**Floating range with Nova-Network requirements:**

* Every VM instance connected to the external network
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
  requires one IP address from the Public IP range. This IP address
  goes to the node's bridge to the external network ("br-ex").

* Two additional IP addresses for the environment's Virtual IPs and one for
  the default gateway are required.

* When the Neutron DVR feature is enabled, it requires one additional
  IP address for each Compute node.

.. note::

  * For 5.1 and later Neutron environments, Public IP addresses can be
    allocated either to all nodes or just to Controllers and Zabbix
    servers. By default, IP addressess are allocated to Controllers
    and Zabbix servers only. To get them allocated to all nodes,
    **Public network assignment -> Assign public network to all
    nodes** should be selected on the `Settings` tab.

  * When using Fuel 6.1 to manage 5.0.x environments,
    the environment must conform to the 5.0.x practice,
    so each target node must have a Public IP assigned to it,
    even when using Neutron.

  * In Fuel 6.1, nodes that do not have Public IP addresses use Controllers
    to reach out the outside networks. There is a virtual router running
    on Controller nodes (controlled by Corosync), which utilizes a pair
    of Public and Management Virtual IPs to NAT traffic from Management
    to Public network. And nodes with no Public IPs assigned have the default
    gateway pointed to that Virtual IP from Management network.


**Floating range with Neutron requirements:**

* Each defined tenant, including the Admin tenant,
  requires one IP address from the Floating range.

* This IP address goes to the virtual interface of the tenant's virtual router.
  Therefore, one Floating IP is assigned to the Admin tenant automatically
  as part of the OpenStack deployment process.

* Each VM instance connected to the external network
  requires one IP address from the Floating IP range.
  These IP addresses are assigned on demand
  and may be released from the VM
  and returned back to the pool of non-assigned Floating IP addresses.

Example
~~~~~~~

Calculate the numbers of the required Public and Floating IP addresses using
these formulas:

**Neutron**

* for the Public IP range: [(X+Y) + N];
* for the Floating range: [K+M].


**Nova-Network**

* for the Public IP range: [(X+Y+Z) + N];
* for the Floating IP range: [M].

`Where:`

* Number of nodes:

  * **X** = controller nodes
  * **Y** = Zabbix nodes
  * **Z** = other nodes (Compute, Storage, and MongoDB)

* **K** = the number of virtual routers for all the tenants
  (on condition all of them are connected to the external network)

* **M** = the number of virtual instances you want to provide the direct external
  access to

* **N** = the number of extra IP addresses. It is 3 in total for the following:

  * for environment's virtual IP:

    * virtual IP address for a virtual router
    * public virtual IP address

  * 1 for the default gateway

-----

Lets consider the following environment:

* X = 3 controller nodes
* Y = 1 Zabbix node
* Z = 10 compute + 5 Ceph OSD + 3 MongoDB nodes
* K = 10 tenants with one router for each tenant connected
  to the external network
* M = 100 VM instances with the direct external access required
* N = 3 extra IP addresses

Your calculations will result in the following number of the required IP
addresses:

+---------------------+---------------------------+-----------------------------+
| | **Environment**   | | **Neutron**             | | **Nova-Network**          |
| | **details**       | | requirements for        | | requirements for          |
|                     +-------------+--------------+------------+---------------+
|                     | Public IPs  | Floating IPs | Public IPs | Floating IPs  |
+---------------------+-------------+--------------+------------+---------------+
| X = 3               | ✓           |              | ✓          |               |
+---------------------+-------------+--------------+------------+---------------+
| Y = 1               | ✓           |              | ✓          |               |
+---------------------+-------------+--------------+------------+---------------+
| Z = 18              | ✓*          |              | ✓          |               |
+---------------------+-------------+--------------+------------+---------------+
| K = 10              |             | ✓            |    n/a     |     n/a       |
+---------------------+-------------+--------------+------------+---------------+
| M = 100             |             | ✓            |            | ✓             |
+---------------------+-------------+--------------+------------+---------------+
| N = 3               | ✓           |              | ✓          |               |
+---------------------+-------------+--------------+------------+---------------+
| **Total:**          |**7**/**25***| **110**      | **25**     | **100**       |
+---------------------+-------------+--------------+------------+---------------+

.. tip::

   **✓*** - it is the additional requirement for Public IP range for the 6.1
   Neutron environment with **Public network assignment -> Assign public
   network to all nodes** set. In the example, it is [(X+Y+Z) + N] = **25**.

   **n/a** - this value is not applicable to Nova-Network environments.

With DVR enabled, you need to add one additional IP for each Compute
node. Based on the data in the table, for the Public IP range you
need:

* for VLAN: (X+N) + 10 = **16**

* For GRE: (X+Z+N) + 10 = **34**