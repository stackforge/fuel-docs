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
into Mirantis OpenStack 5.1.1
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

RabbitMQ users may be lost
--------------------------

Murano users may be lost
when the Primary Controller in an HA cluster is shut down.
This is because RabbitMQ does not handle Murano users correctly.
See `LP1372483 <https://bugs.launchpad.net/fuel/+bug/1372483>`_.

As a workaround, you can reset the RabbitMQ credentials
as follows:

#. Obtain the OS RabbitMQ credentials:
   ::

     grep -E "(^rabbit_user|^rabbit_pass)" /etc/nova/nova.conf
     rabbit_userid=USERNAME
     rabbit_password=SOMEPASS

#. Edit the */etc/murano/murano.conf* file on all Controllers
   in the deployed environment.
   Add the values obtained above to the [DEFAULT] section of the file:
   ::

     ...
     rabbit_userid=USERNAME
     rabbit_password=SOMEPASS
     ...

#. Restart the **murano-api** and **murano-engine** services
   on all Controllers in the deployed environment.

   - For Ubuntu:
     ::

       service murano-api restart
       service murano-engine restart



   - For CentOS:
     ::

       service openstack-murano-api restart
       service openstack-murano-engine restart

Fuel upgrade fails if custom python modules are installed as eggs
-----------------------------------------------------------------

Installing additional python modules on the Fuel Master node
using pip or easy_install
may cause the Fuel upgrade script to fail.
See `LP1341564 <https://bugs.launchpad.net/fuel/+bug/1341564>`_.

Fuel uses ports that may be used by other services
--------------------------------------------------

Fuel uses some high ports that may be used by other services
such as RPC, NFS, passive FTP (ephemeral ports 49000-65535).
In some cases, this can lead to a port conflict during service restart.
To avoid this, issue the following command
so that ports above 49000 are not automatically assigned to other services:
`sysctl -w 'sys.net.ipv4.ip_local_reserved_ports=49000'`
See `LP116422/ <https://review.openstack.org/#/c/116422/>`_.

Docker is not updated
---------------------

The OpenStack update procedure does not update Docker.
This results in a number of issues; see
`LP1360161 <https://bugs.launchpad.net/fuel/+bug/1360161>`_

Network verification issues
---------------------------

* Network verification can fail if a node is offline
  because Astute runs network verification
  but Astute does not know which nodes are online..
  See `LP1318659 <https://bugs.launchpad.net/fuel/+bug/1318659>`_.

* The network verification checker does not test OVS VLANs.
  See `LP1350623 <https://bugs.launchpad.net/bugs/1350623>`_.

Multiple TestVM images may be created
-------------------------------------

Multiple TestVM images may be created
and will appear on the Horizon dashboard.
Any of the images can be used.
See `LP1342039 <https://bugs.launchpad.net/fuel/+bug/1342039>`_.

"Deassociate floating IP" button may disappear from Horizon menu
----------------------------------------------------------------

The "Deassociate floating IP" button may disappear
from the Horizon menu when using Neutron network topologies.
See `LP1325575 <https://bugs.launchpad.net/bugs/1325575>`_.

Some UEFI hardware cannot be used
---------------------------------

Some UEFI chips (such as the Lenovo W520)
do not emulate legacy BIOS
in a way that is compatible with the grub settings
used for the Fuel Master node.

This issue also affects servers used
as Controller, Compute, and Storage nodes;
because they are booted from PXE rom
and then the chain32 loader boots from the hard drive,
it is possible to boot them with an operating system
that is already installed,
but it is not possible to install an operating system on them
because the operating system distributions that are provided
do not include UEFI images.
See `LP1291128 <https://bugs.launchpad.net/fuel/+bug/1291128>`_
and the `UEFI support blueprint <https://blueprints.launchpad.net/fuel/+spec/uefi-support>`_.

Fuel may not allocate enough IP addresses for expansion
-------------------------------------------------------

The pool of IP addresses to be used by all nodes
in the OpenStack environment
is allocated when the Fuel Master Node is initially deployed.
The IP settings cannot be changed
after the initial boot of the Fuel Master Node.
This may mean that the IP pool
is too small to support additional nodes
added to the environment
without redeploying the environment.

See `LP1271571 <https://bugs.launchpad.net/fuel/+bug/1271571>`_
for a detailed description of the issues
and pointers to blueprints of proposed solutions.
See :ref:`public-floating-ips-arch`
for more information.

GRE-enabled Neutron installation runs inter VM traffic through management network
---------------------------------------------------------------------------------

In Neutron GRE installations configured with the Fuel UI,
a single physical interface is used
for both OpenStack management traffic and VM-to-VM communications.
This limitation only affects implementations deployed using the Fuel UI;
you can use the :ref:`Fuel CLI<cli_usage>` to use other physical interfaces
when you configure your environment.
See `LP1285059 <https://bugs.launchpad.net/fuel/+bug/1285059>`_.

Ubuntu does not support NetFPGA cards
-------------------------------------

CentOS includes drivers for netFPGA devices
but Ubuntu does not.
See `LP1270889 <https://bugs.launchpad.net/fuel/+bug/1270889>`_.

CentOS issues using Neutron-enabled installations with VLANS
------------------------------------------------------------

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
for more information about using Open vSwitch.

Placing Ceph OSD on Controller nodes is not recommended
-------------------------------------------------------

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

Other limitations
-----------------

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

* Deployment fails with connection to Keystone endpoint error.
  See `LP1386633 <https://bugs.launchpad.net/bugs/1386633>`_.

* RabbitMQ start takes a very long time in HA mode.
  See `LP1383247 <https://bugs.launchpad.net/bugs/1383247>`_.

* After Fuel upgrade, Rsync Docker container uses old puppet
  manifests while generating xinetd configuration.
  See `LP1382531 <https://bugs.launchpad.net/bugs/1382531>`_.

* Ceph OSD can not be stopped after installation.
  See `LP1374160 <https://bugs.launchpad.net/bugs/1374160>`_.

* Logs of agent rescheduling script do not contain enough information
  about dead agents and debugging issues that are found.
  See LP1371664 <https://bugs.launchpad.net/bugs/1371664>`_.

* Mirantis OpenStack can not be installed on OpenCompute hardware.
  See `LP1368068 <https://bugs.launchpad.net/bugs/1368068>`_.

* Sometimes Ceph-node freezes on the grub-step when choosing an operation
  system to boot. See `LP1356278 <https://bugs.launchpad.net/bugs/1356278>`_.

* When using 10gig interfaces, the kernel can not turn interfaces
  in promisc mode due to generic segmentation offload.
  Every time this error leads to agent migration to another host;
  instances leave their IP addresses because they have no more
  access to DHCP server.
  To work this problem around, perform

::

     ethtool -K eth1 gso off
     ethtool -K eth1 gro off

  See `LP1275650 <https://bugs.launchpad.net/bugs/1275650>`_.

* Oslo-messaging is not updated to the new version.
  See `LP1359705 <https://bugs.launchpad.net/bugs/1359705>`_.

* After MySQL is terminated, Pacemaker brings it
  into unmanageable state on controller.
  See `LP1388771 <https://bugs.launchpad.net/bugs/1388771>`_.

* Ceilometer Swift agent fails when primary controller is shut down.
  See `LP1380800 <https://bugs.launchpad.net/bugs/1380800>`_.

* After adding node to the cluster with 'mongo' role using CLI,
  role is not assigned. See `LP1376831 <https://bugs.launchpad.net/bugs/1376831>`_.

* If default "admin" name was changed to any custom, tenant reports a wrong name.
  See `LP1376515 <https://bugs.launchpad.net/bugs/1376515>`_.

* Upgrade fails with 'Index out of range' message.
  See `LP1373376 <https://bugs.launchpad.net/bugs/1373376>`_.

* After HA failover, VMs are losing connectivity and their IP addresses.
  See `LP1371104 <https://bugs.launchpad.net/bugs/1371104>`_.
