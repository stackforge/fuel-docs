Known Issues in Mirantis OpenStack 5.1.1
========================================

For current information about Issues and Blueprints
for Mirantis OpenStack 5.1.1, see the
`Fuel for OpenStack 5.1.1 Milestone <https://launchpad.net/fuel/+milestone/5.1.1>`_
page.


Known limitations for the VMware NSX integration
------------------------------------------------

The VMware NSX integration into Mirantis OpenStack 5.1.1 is supported,
but it has some known limitations:

* Deployment interruption (stoppage or reset) by end user or errors during
  deployment leave NSX cluster in half configured state.  User has to manually
  remove all network logical entities that were created during the unsuccessful
  deployment; otherwise, the next deployment will fail due to inability to
  register OpenvSwitches in NSX and 'br-int' bridges on nodes would not be
  configured properly, because older ones with same names exist in NSX cluster.

* If the NSX cluster resides in a separate network that has L3 connectivity with
  the OpenStack Public network, you must enable Public address assignment for all
  nodes, see :ref:`neutron-nsx-arch`.

Known limitations for the Mellanox SR-IOV plug-in
-------------------------------------------------

The Mellanox SR-IOV plug-in is fully integrated
into Mirantis OpenStack 5.1
but it has some known limitations:

* The Mellanox SR-IOV plugin has been tested
  against guest images of the following Linux distributions:

  - CentOS 6.4 with kernel 2.6.32-358.el6.x86
  - Ubuntu 13.10 with kernel 3.11.0-26-generic

* By default, up to 16 virtual functions (VFs) can be configured.
  To use more VFs in the compute nodes,
  you must make additional configuration changes manually
  or through a script.

* 3rd party adapters based on the Mellanox chipset may not have SR-IOV enabled
  by default. In such a case, please contact the device manufacturer for
  configuration instructions and for the required firmware.

* Mellanox OEM adapter cards may be burned with SR-IOV disabled.
  In such cases,
  you may need to burn a special firmware version
  to enable SR-IOV.

* Mellanox provides additional information in their `HowTo Install Mirantis Fuel 5.1 OpenStack with
  Mellanox Adapters Support
  <http://community.mellanox.com/docs/DOC-1474>`_ document,
  including example images to use with the Mellanox SR-IOV plugin
  and advanced configuration instructions
  (for example, instructions to increase the number of virtual functions).
  and advanced configuration instructions.

Zabbix Issues
-------------

Phase I of Zabbix is included as an
:ref:`Experimental<experimental-features-term>` feature
in Mirantis OpenStack 5.1.1.

[TBD: what's up with it now?still experimental?]

This version has the following known issues:

- A CentOS environment cannot be configured to run Zabbix.
  `A patch <https://review.openstack.org/121588>`_ is available and has to be
  :ref:`applied manually<apply-patch-ops>` to work around this issue.
  See `LP1368151 <https://bugs.launchpad.net/bugs/1368151>`_.
- The Zabbix-server role must be installed on a dedicated node;
  it cannot be combined with any other role.
- Phase I does not support Ceilometer, Savanna, Murano, Heat, or Ceph.
- Zabbix agents cannot be configured to report
  to a remote (outside the current environment) Zabbix server
- Zabbix agents cannot be configured to report
  to multiple Zabbix servers.

See :ref:`zabbix-plan` for more information.

Fuel uses ports that may be used by other services
--------------------------------------------------

[TBD: what's up with it now?]

Fuel uses some high ports that may be used by other services
such as RPC, NFS, passive FTP (ephemeral ports 49000-65535).
In some cases, this can lead to a port conflict during service restart.
To avoid this, issue the following command
so that ports above 49000 are not automatically assigned to other services:
`sysctl -w 'sys.net.ipv4.ip_local_reserved_ports=49000'`
[incorrect number] See `LP116422 <https://review.openstack.org/#/c/116422>`_.


CentOS issues using Neutron-enabled installations with VLANS
------------------------------------------------------------

[TBD: what's up with it?]

Deployments using CentOS may run into problems
using Neutron VLANs or GRE
(with VLAN tags on the management, storage or public networks).
The problems include poor performance, intermittent connectivity problems,
one VLAN but not others working, or total failure to pass traffic.
This is because the CentOS kernel is based on a pre-3.3 kernel
and so has poor support for VLAN tagged packets
moving through :ref:`ovs-term`  Bridges.
Ubuntu is not affected by this issue.

A workaround is to enable VLAN Splinters in OVS.
For CentOS, the Fuel UI Settings page can now deploy
with a VLAN splinters workaround enabled in two separate modes --
soft trunks and hard trunks:

*  The **soft trunks mode** configures OVS to enable splinters
   and attempts to automatically detect in-use VLANs.
   This provides the least amount of performance overhead
   but the traffic may not be passed onto the OVS bridge in some edge cases.

*  The **hard trunks mode** also configureS OVS to enable splinters
   but uses an explicitly defined list of all VLANs across all interfaces.
   This should prevent the occasional failures associated with the soft mode
   but requires that corresponding tags be created on all of the interfaces.
   This introduces additional performance overhead.
   In the hard trunks mode,
   you should use fewer than 50 VLANs in the Neutron VLAN mode.

Fuel also provides another option here:
using the experimental Fedora long-term support 3.10 kernel.
This option has had minimal testing
and may invalidate your agreements with your hardware vendor.
But using this kernel may allow you to use VLAN tagged packets
without using VLAN splinters,
which can provide significant performance advantages.
See :ref:`ovs-arch`
for more information about using Open VSwitch.

Placing Ceph OSD on Controller nodes is not recommended
-------------------------------------------------------

[TBD]
Placing Ceph OSD on Controllers is highly unadvisable because it can severely
degrade controller's performance.
It is better to use separate storage nodes
if you have enough hardware.

* On target nodes that use Ubuntu as the operating system,
  Ubuntu provisioning applies the default Base System partition
  even if the user chose a different scheme.

* Some packages are not updated on nodes after Fuel upgrade.
  See `LP1364586 <https://bugs.launchpad.net/bugs/1364586>`_.

* 'Create volume and attach it to instance' OSFT does not work.
  See `LP1346133 <https://bugs.launchpad.net/bugs/1346133>`_.


Other limitations [TBD]
-----------------------

* **The Fuel Master Node can only be installed with CentOS as the host OS.**
  While Mirantis OpenStack nodes can be installed
  with either Ubuntu or CentOS as the host OS,
  the Fuel Master Node is only supported on CentOS.

* **The floating VLAN and public networks**
  **must use the same L2 network and L3 Subnet.**
  These two networks are locked together
  and can only run via the same physical interface on the server.
  See the `Separate public and floating networks blueprint <https://blueprints.launchpad.net/fuel/+spec/separate-public-floating>`_.
  for information about ongoing work to remove this restriction.

* **Murano requires the Neutron network type.**
  If you choose nova-network as the network type during deployment,
  the option to install the Murano project is greyed out.
  This is a design decision made by the OpenStack community;
  it allows us to focus our efforts on Neutron,
  and we see little demand for Murano support on nova-network.

* Deployments done through the Fuel UI
  create all of the networks on all servers
  even if they are not required by a specific role.
  For example, a Cinder node has VLANs created
  and addresses obtained from the public network.

* Some OpenStack services listen to all of the interfaces,
  a situation that may be detected and reported
  by third-party scanning tools not provided by Mirantis.
  Please discuss this issue with your security administrator
  if it is a concern for your organization.

* The provided scripts that enable Fuel
  to be automatically installed on VirtualBox
  create separate host interfaces.
  If a user associates logical networks
  with different physical interfaces on different nodes,
  it causes network connectivity issues between OpenStack components.
  Please check to see if this has happened prior to deployment
  by clicking on the 'Verify Networks' button on the Networks tab.

* The Fuel Master node services (such as PostgrSQL and RabbitMQ)
  are not restricted by a firewall.
  The Fuel Master node should live in a restricted L2 network
  so this should not create a security vulnerability.

* If "Nova quotas" option has not been chosen in cluster deployment settings,
  it is be impossible to modify user/project quotas. Horizon UI will
  fail with rather misleading error ''Modified project information and members, but unable to modify project quotas''.
  This will be improved in the future versions of MOS. At the mean time,
  in order to be able to use quotas, you should deploy clusters with "Nova quotas" option enabled.
  See `LP1332457 <https://bugs.launchpad.net/bugs/1332457>`_.

* When ovs-agent is started, Critical error appears.
  See `LP1347612 <https://bugs.launchpad.net/bugs/1347612>`_.

* Nova services register themselves in a database on start
  by doing an RPC call to nova-conductor.
  If this call fails (e.g. if RabbitMQ is currently down), a service will not start.
  Upstart does not respawn services though, i.e. services will remain down even when RPC connectivity is restored.
  See `LP1370539 <https://bugs.launchpad.net/bugs/1370539>`_.
