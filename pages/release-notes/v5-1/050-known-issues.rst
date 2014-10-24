Known Issues in Mirantis OpenStack 5.1.1
========================================

For current information about Issues and Blueprints
for Mirantis OpenStack 5.1.1, see the
`Fuel for OpenStack 5.1.1 Milestone <https://launchpad.net/fuel/+milestone/5.1.1>`_
page.

Known limitations for the vCenter integration
---------------------------------------------

The vCenter integration with Mirantis OpenStack 5.x is fully supported,
but it has some known limitations:

* vCenter integration can be enabled
  only if Nova-network is the network type.
  vCenter integration is not yet supported with the Neutron network type.

* NoVNCproxy does not work with vCenter.
  See `LP1368745 <https://bugs.launchpad.net/fuel/+bug/1368745>`_.

* The default Ceilometer configuration
  does not collect metering information for vCenter.
  This also means that, when the vCenter installation is used with Heat,
  autoscaling does not work as well
  because the alarms sent to Heat are implemented with meters.
  See `LP1370700 <https://bugs.launchpad.net/fuel/+bug/1370700>`_.
  You can manually configure Ceilometer to collect vCenter metering;
  see :ref:`ceilometer-ops` for instructions.

* When VMware vCenter is used
  as a hypervisor, then metadata services stay available.
  Previuosly, metadata services behavoir
  influenced cloud-init based images and all services which used metadata information.
  See LP1370165 <https://bugs.launchpad.net/fuel/+bug/1370165>`_.

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
in Mirantis OpenStack 5.1.
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
for more information about using Open VSwitch.

Placing Ceph OSD on Controller nodes is not recommended
-------------------------------------------------------

Placing Ceph OSD on Controllers is highly unadvisable because it can severely
degrade controller's performance.
It is better to use separate storage nodes
if you have enough hardware.

Evacuate fails on Ceph backed volumes
-------------------------------------

VM instances that use ephermeral drives with Ceph RBD as the backend
cannot be evacuated using the **nova evacuate** command
because of an error in the instance rebuild logic.
To move such instances to another compute node,
use live migration.
In order to be able to rebuild VM instances
from a failed compute node,
use Cinder volume backed instances.

See `LP1367610 <https://bugs.launchpad.net/mos/+bug/1367610>`_
and the upstream `LP1249319 <https://bugs.launchpad.net/nova/+bug/1249319>`_.

Horizon falsely shows that the external gateway is down
-------------------------------------------------------

In OpenStack environments that use Neutron and Open vSwitch on the routers,
Horizon may show that the external gateway (router_gateway) is down
when all networking is functional.
This happens because Horizon and the Neutron client
query port status from the database
but the agents do not update this status.
When this happens, instances can access the outside world
and be accessed from the outside world by their floating IP addresses
so this error can be ignored.
See `LP1323608 <https://bugs.launchpad.net/bugs/1323608>`_.

Horizon asks for username and password twice after session timeout
------------------------------------------------------------------

Users have to log into Horizon twice after a session times out.
This happens when both the Keystone token
and the Horizon session expire at the same time.
Because the session has expired,
the token expiration cannot be checked when the user is logged out.
So the user logs into Horizon and then the session sees that the token has expired
so requires a second login for that.
See `LP1353544 <https://bugs.launchpad.net/bugs/1353544>`_.

Ceilometer does not correctly poll Ceph as a back-end for Swift
---------------------------------------------------------------

When Ceph and the Rados Gateway is used for Swift,
Ceilometer does not poll Ceph
because the endpoints between Swift and Ceph are incompatible.
See `LP1352861 <https://bugs.launchpad.net/bugs/1352861>`_.

Spurious "Critical error" appears in neutron-openvswitch-agent.log
------------------------------------------------------------------

A Critical error is logged in the *neutron-openvswitch-agent.log*
on the Compute node.
It does not affect the behavior of Neutron networking
and can be ignored.
This is related to the upstream
`LP1246848 <https://bugs.launchpad.net/nova/+bug/1246848>`_.
* When ovs-agent is started, Critical error appears.
See `LP1347612 <https://bugs.launchpad.net/bugs/1347612>`_.

Fuel default disk partition scheme is sub-optimal
-------------------------------------------------

* On target nodes that use Ubuntu as the operating system,
  Ubuntu provisioning applies the default Base System partition
  even if the user chose a different scheme.

Horizon performance is degraded when a node is down
---------------------------------------------------

Horizon uses memcached servers for caching
and it connects to each one directly.
If one of the nodes is down so that its memcached server does not respond,
Horizon operations may be delayed.
See `LP1367767 <https://bugs.launchpad.net/bugs/1367767>`_.

You can perform the following workaround:

To work around this, edit
the */etc/openstack-dashboard/local_settings* file
and temporarily remove the IP:PORT string from the LOCATION line
for the problem controller from the CACHE structure:
::

  CACHES = {
    'default': {
      'BACKEND' : 'django.core.cache.backends.memcached.MemcachedCache',
      'LOCATION' : "192.168.0.3:11211;192.168.0.5:11211;192.168.0.6:11211"
  },

Then restart the Apache web server.

New node may not boot because of IOMMU issues
---------------------------------------------

A new node fails when trying to boot into bootstrap.
To fix this issue,
add the "intel_iommu=off" kernel parameter on the Fuel Master node
with the following console command on master node:
::

    `dockerctl shell cobbler cobbler profile edit --name bootstrap --kopts="intel_iommu=off" --in-place`

See `LP1324483 <https://bugs.launchpad.net/bugs/1324483>`_.

Anaconda fails with LVME error on CentOS
----------------------------------------

Anaconda fails with LVME error: deployment was aborted by provisioning timeout,
because installation of CentOS failed on one of compute nodes.
See `LP1321790 <https://bugs.launchpad.net/bugs/1321790>`_.
This is related to known issues with Anaconda.

During traceback, and interface with an IP address on admin subnet is not found
-------------------------------------------------------------------------------

When traceback is in process, an interface with IP address
that belongs to administrator's subnet, can not be found.
This happens because the configuration was updated in the base
and the node still has out-of-date configuration.
See `LP1355237 <https://bugs.launchpad.net/bugs/1355237>`_.

Fuel GUI does not prevent overlapping IP ranges
-----------------------------------------------

Fuel menu allows IP ranges that overlap in PXE setup.
When configuring IP ranges, be very careful not to use DHCP addresses
that overlap the Static addresses used.
See :ref:`public-floating-ips-arch` for more information.
See `LP1365067 <https://bugs.launchpad.net/bugs/1365067>`_.

Invalid node status after restoring Fuel Master node from backup
----------------------------------------------------------------

Invalid node status for nodes modified since backup after restore.
Nodes added to an environment after a backup may be report as offline.
Reboot any bootstrapped nodes after restoring your Fuel Master from a backup.
See `LP1347718 <https://bugs.launchpad.net/bugs/1347718>`_.

Creating volume from image performs full data copy even with Ceph backend
-------------------------------------------------------------------------

A regression was introduced into configuration of RBD backend for Cinder. In
previous versions of Mirantis OpenStack, enabling RBD backend for both Cinder
and Glance enabled zero-copy creation of a Cinder volume from a Glance image.

To re-enable this functionality in Mirantis OpenStack 5.1, add the following
line to */etc/cinder/cinder.conf*::

    glance_api_version=2

Then restart the *cinder-volume* service on all controller nodes.
See `LP1373096 <https://bugs.launchpad.net/bugs/1373096>`_.

OpenStack services report multiple AMQP reconnects in the logs
--------------------------------------------------------------

nova-api and other services may call fork() soon after the process
starts. This may lead to a situation when the AMQP heartbeat sending
thread is initialized and run in the context of the parent process,
while the reply waiters are added to the list in the child process. When
this happens, the thread won't send any heartbeats and RabbitMQ will
close AMQP connections after timeout.

This problem is addressed in **oslo.messaging** packages from
MOS 5.1.1 package repositories
(`CentOS <http://mirror.fuel-infra.org/fwm/5.1.1/centos/os/x86_64/Packages/python-oslo-messaging-1.3.0-fuel5.1.mira4.noarch.rpm>`_,
`Ubuntu <http://mirror.fuel-infra.org/fwm/5.1.1/ubuntu/pool/main/python-oslo.messaging_1.3.0-fuel5.1~mira5_all.deb>`_).
After installing these packages, restart the affected services.
See `LP1371723 <https://bugs.launchpad.net/bugs/1371723>`_.

Known Issues in Mirantis OpenStack 5.1 and 5.0.2
================================================

File injection fails when an instance launches
----------------------------------------------

Instances with file injection cannot be launched
after the OpenStack environment is launched.
Instances that do not require file injection can be launched.
As a workaround, execute the **update-guestfs-appliance** command
on each Compute node.
See `LP1335697 <https://bugs.launchpad.net/bugs/1335697>`_.

Some components are omitted when upgrading to Release 5.0.2
-----------------------------------------------------------

* Some packages are not updated on nodes after Fuel upgrade.
  See `LP1364586 <https://bugs.launchpad.net/bugs/1364586>`_.

* The upgrade procedure does not update packages
  that are part of the control plane rather than OpenStack.
  This includes the Fuel agent, mcollective agent, and the network checker.
  Not upgrading these components means
  that bugs fixed in those packages are not applied
  to environments that were previously deployed
  and introduces some limitations
  for the actions that can be added or modified
  to the Astute network checker.
  See `LP1343139 <https://bugs.launchpad.net/bugs/1343139>`_.

Timeout errors may occur when updating your environment from 5.0 to 5.0.2
-------------------------------------------------------------------------

When updating the environment from 5.0 to 5.0.2,
a "timeout exceeded" error may occur.
See `LP1367796 <https://bugs.launchpad.net/bugs/1367796>`_.

Glance API log contains "Container HEAD failed" errors
------------------------------------------------------

After a successful deployment,
the glance-api log reports errors.
See `LP1325917 <https://bugs.launchpad.net/bugs/1325917>`_.

OSTF (Health Check) issues
--------------------------

* Platform OSTF tests fail with "HTTP unauthorized" error.
  See `LP1349408 <https://bugs.launchpad.net/bugs/1349408>`_.
  even if the user chooses a different scheme.

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
  and we see little demand for Murano support on Nova-network.
  ?

* **Murano changes deployment status to "successful" when Heat stack failed.**
  Murano uses Heat to allocate OpenStack resources;
  therefore one of the first steps of Environment
  deployment is creation of stack. Creation of stack may
  fail due to various reasons but unfortunately this failure
  will not be detected by Murano and overall Environment
  deployment will be reported as successful.
  See `LP1353589 <https://bugs.launchpad.net/bugs/1353589>`_.

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
  by clicking on the “Verify Networks” button on the Networks tab.

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

* Nova services register themselves in a database on start
  by doing an RPC call to nova-conductor.
  If this call fails (e.g. if RabbitMQ is currently down), a service will not start.
  Upstart does not respawn services though, i.e. services will remain down even when RPC connectivity is restored.
  See `LP1370539 <https://bugs.launchpad.net/bugs/1370539>`_.
