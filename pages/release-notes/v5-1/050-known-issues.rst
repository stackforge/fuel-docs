Known Issues in Mirantis OpenStack 5.1
======================================

For current information about Issues and Blueprints
for Mirantis OpenStack 5.1, see the
`Fuel for OpenStack 5.1 Milestone <https://launchpad.net/fuel/+milestone/5.1>`_
page.

Known limitations for the vCenter integration
---------------------------------------------

The vCenter integration with Mirantis OpenStack 5.x is fully supported,
but it has some known limitations:

* vCenter integration can be enabled
  only if Nova-network is the network type.
  vCenter integration is not yet supported with the Neutron network type.

* When vCenter is selected as the hypervisor,
  all Ceph, Cinder, and Nova options are disabled
  in the storage settings.
  It is possible to use Ceph as the storage backend for Glance
  and for Swift/S3 object storage,
  but you must select it on the Fuel :ref:`Settings<settings-storage-ug>` page.
  See `LP1316377 <https://bugs.launchpad.net/fuel/+bug/1316377>`_.

* On CentOS in HA mode on vCenter's machine on primary controller OpenStack
  deployment crashes because RabbitMQ can not connect to primary controller.
  See `LP1370558 <https://bugs.launchpad.net/fuel/+bug/1370558>`_.

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

Known limitations for the VMware NSX integration
------------------------------------------------

The VMware NSX integration into Mirantis OpenStack 5.1 is supported,
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

* In HA mode on NSX machine, OpenStack deployment crashes due to unavailable Neutron and Keystone services.
  See `LP1369529 <https://bugs.launchpad.net/bugs/1369529>`_.

* When there are no NSX settings, Fuel UI allows clicking "Deploy changes".
  Make sure that you have specified NSX settings.
  See `LP1347682 <https://bugs.launchpad.net/bugs/1347682>`_.

VMDK requires operating systems that support SCSI adapters
----------------------------------------------------------

When using the VMDK driver,
instances must be deployed to use operating systems
that support SCSI adapter.
This means that the CirrOS image (which only supports IDE disks)
cannot be used with VMDK.
The `VMware vSphere documentation <http://docs.openstack.org/trunk/config-reference/content/vmware.html#VMware_converting_images>`_
contains more information.
See `LP1365468 <https://bugs.launchpad.net/bugs/1365468>`_.

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

* External network is not configured when changing the ML2 mechanism
  to Mellanox and Open vSwitch.
  When installing Centos HA with Neutron with VLAN
  and changing the ML2 mechanism to Mellanox and Open vSwitch,
  the external network is not configured after deployment.
  See `LP1369988 <https://bugs.launchpad.net/bugs/1369988>`_.

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

- The Zabbix-server role must be installed on a dedicated node;
  it cannot be combined with any other role.
- Phase I does not support Ceilometer, Savanna, Murano, Heat, or Ceph.
- Zabbix agents cannot be configured to report
  to a remote (outside the current environment) Zabbix server
- Zabbix agents cannot be configured to report
  to multiple Zabbix servers.
- There are false Zabbix issues after deploying with Nova-network.
  This can be resolved via attaching "Template App OpenStack Nova Network" to compute nodes
  instead of controller nodes. See `LP1365171 <https://bugs.launchpad.net/fuel/+bug/1365171>`_.
- List of "Zabbix monitoring items" is different from "Zabbix overview" list.
  See `LP1352319 <https://bugs.launchpad.net/bugs/1352319>`_.

See :ref:`zabbix-plan` for more information.


Fuel upgrade fails if custom python modules are installed as eggs
-----------------------------------------------------------------

Installing additional python modules on the Fuel Master node
using pip or easy_install
may cause the Fuel upgrade script to fail.
See `LP1341564 <https://bugs.launchpad.net/fuel/+bug/1341564>`_.

Fuel uses ports that may be used by other services
--------------------------------------------------

Fuel uses some high ports that may be used by other services
such as RPC, NFS, passfive FTP (ephemeral ports 49000-65535).
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

Docker may allocate the same IP address for different containers
----------------------------------------------------------------
Docker may allocate the same IP addresses for different containers.
See `LP1357357 <https://bugs.launchpad.net/bugs/1357357>`_.

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

Ceph nodes are not updated
--------------------------

When updating the environment from 5.0.x to 5.0.2,
the Ceph nodes are not updated.
You can update the Ceph nodes manually.

- Update the environment to 5.0.2.

- Restart the monitors.

- Run the **ceph pg dump** command
  and check the output;
  if unclean pages are found,
  resolve these issues before updating the Ceph nodes.

- After all monitors are restarted,
  update the code on the OSD nodes one by one,
  restart the OSD service,
  and wait until all OSD nodes have rebuilt cleanly.

See `LP1363983 <https://bugs.launchpad.net/fuel/+bug/1363983>`_.

Placing Ceph OSD on Controller nodes is not recommended
-------------------------------------------------------

Placing Ceph OSD on Controllers is highly unadvisable because it can severely
degrade controller's performance.
It is better to use separate storage nodes
if you have enough hardware.

Controller cluster may fail if one MySQL instance fails
-------------------------------------------------------

If the MySQL instance on one Controller node fails,
the entire Controller cluster may be inaccessible
whereas it should just disable the Controller node where MySQL failed
and continue to run with the remaining Controller nodes.
See `LP1326829 <https://bugs.launchpad.net/bugs/1326829>`_.

HP BL120/320 RAID controller line is not supported
--------------------------------------------------

See `LP1359331 <https://bugs.launchpad.net/bugs/1359331>`_.

RAID-1 spans all configured disks on a node [Needs 5.1 clarification]
---------------------------------------------------------------------

RAID-1 spans all configured disks on a node,
putting a boot partition on each disk
because OpenStack does not have access to the BIOS.
It is not currently possible to exclude some drives
from the Fuel configuration on the Fuel UI.
This means that one cannot, for example,
configure some drives to be used for backup and recover
or as b-cache.

You can work around this issue as follows.
This example is for a system that has three disks: sda, sdb, and sdc.
Fuel will provision sda and sdb as RAID-1 for OpenStack
but sdc will not be used  as part of the RAID-1 array:

#. Use the Fuel CLI to obtain provisioning data:
   ::

     fuel provisioning --env-id 1 --default -d

#. Remove the drive which you do not want to be part of RAID:
   ::

     - size: 300
       type: boot
     - file_system: ext2
       mount: /boot
       name: Boot
       size: 200
       type: raid


#. Run deployment
   ::

     fuel provisioning --env-id 1 -u

#. Confirm that your partition is not included in the RAID array:
   ::

     [root@node-2 ~]# cat /proc/mdstat
     Personalities : [raid1]
     md0 : active raid1 sda3[0] sdb3[1] 204736 blocks
           super 1.0 [2/2] [UU]


See `LP1267569 <https://bugs.launchpad.net/fuel/+bug/1267569>`_
and `LP1258347 <https://bugs.launchpad.net/fuel/+bug/1258347>`_.
[LP1267569 is scheduled to be fixed in 5.1;
LP1258347 is scheduled to be fixed in 6.0]

LACP Bonding must be enabled in switch before deploying an environment that uses it
-----------------------------------------------------------------------------------

Network interfaces must be connected to a switch with LACP enabled
before attempting to deploy an environment
with "LACP balance-tcp" enabled
or the deployment will fail
with many network error messages.
See `LP1370593 <https://bugs.launchpad.net/fuel/+bug/1370593>`_.

Horizon and other services may be unavailable if a controller fails
-------------------------------------------------------------------

If the public NIC on the primary controller becomes unavailable,
the public VIP does not migrate to another controller.
This does not break your OpenStack environment
but services such as Horizon that use the Public VIP
become unavailable.
Bringing the affected bridge interface back online
restores access to these services.
See `LP1370510 <https://bugs.launchpad.net/fuel/+bug/1370510>`_.

Deploying new controllers causes services downtime
--------------------------------------------------

When :ref:`adding controllers<add-controller-ops>`
to an existing environment,
nova-api is unavailable for a few minutes
which causes services to be unavailable.
See `LP1370067 <https://bugs.launchpad.net/fuel/+bug/1370067>`_.

Environment cannot be reset to use Cinder rather than Ceph
----------------------------------------------------------

If you use Fuel to deploy a Mirantis OpenStack environment
that uses Ceph for volume, image, and ephemeral storage
then reset the environment to use Cinder rather than Ceph,
the controller node is unable to locate the HDD
and the environment cannot be redeployed.
See `LP1370006 <https://bugs.launchpad.net/fuel/+bug/1370006>`_.

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

Controller has unallocated space when Ceph is used as image backend
-------------------------------------------------------------------

When using Ceph as the backend for Glance image storage,
unallocated space is left on the Controller.
See `LP1295717 <https://bugs.launchpad.net/bugs/1295717>`_.
This is being addressed as part of the
`volume manager refactoring <https://blueprints.launchpad.net/fuel/+spec/volume-manager-refactoring>`_
that is under development.

Hypervisor summary displays incorrect total storage for Ceph ephemeral storage
------------------------------------------------------------------------------

The Horizon Admin/Hypervisors Disk Usage field
shows an incorrect value when Ceph is used as the back end for ephemeral storage.
The value show in a sum of all Ceph storage seen on each storage node
instead of the actual amount of Ceph storage.
See `LP1359989 <https://bugs.launchpad.net/bugs/1359989>`_.

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

Horizon filter displays long objects incorrectly
------------------------------------------------

Objects that are bigger than one page
may be displayed incorrectly in Horizon.
The amount of data Horizon displays per page can be modified
with **Settings->User Settings->Items Per Page**
When pagination is switched for any table.
See `LP1352749 <https://bugs.launchpad.net/bugs/1352749>`_.

Ceilometer does not correctly poll Ceph as a back-end for Swift
---------------------------------------------------------------

When Ceph and the Rados Gateway is used for Swift,
Ceilometer does not poll Ceph
because the endpoints between Swift and Ceph are incompatible.
See `LP1352861 <https://bugs.launchpad.net/bugs/1352861>`_.

Bulk operations are not supported for Swift using Ceph as a backend
-------------------------------------------------------------------

When Swift is used with Ceph Rados GW enabled as the backend,
bulk operations are not supported.
See `LP1361036 <https://bugs.launchpad.net/bugs/1361036>`_.

MongoDB cannot store dictionary objects with keys that use $ and . special characters
-------------------------------------------------------------------------------------

The special characters '.' and '$' are special characters for the MongoDB database
and so cannot be used as keys in dictionary objects.
When Ceilometer processes data samples
that contain these characters in the resource metadata
(for example, has tag names with dots in them),
the sample writing fails.
This usually occurs when metric data is collected
from images with special tags
(such as images Sahara creates with tags like '_sahara_tag_1.2.1').
All data samples that do not contain these forbidden symbols
are processed as usual without any problems.
Do not create images, VMs, and other cloud resources
that contain resource metadata keys that use the $ and . special characters.
See `LP1360240 <https://bugs.launchpad.net/bugs/1360240>`_.

Additional MongoDB roles cannot be added to an existing deployment
------------------------------------------------------------------

Fuel installs :ref:`mongodb-term`
as a backend for :ref:`ceilometer-term`.
Any number of MongoDB roles (or standalone nodes)
can initially be deployed into an OpenStack environment
but, after the environment is deployed,
additional MongoDB roles cannot be added.
Be sure to deploy an adequate number of MongoDB roles
(one for each Controller node is ideal)
during the initial deployment.
See `LP1308990 <https://bugs.launchpad.net/fuel/+bug/1308990>`_.

Shotgun does not check available disk space before taking a diagnostic snapshot
-------------------------------------------------------------------------------

Shotgun does not ensure that adequate disk space is available
for the diagnostic snapshot.
Users should manually verify the disk space
before taking a diagnostic snapshot.
See `LP1328879 <https://bugs.launchpad.net/bugs/1328879>`_.

Diagnostic snapshot does not have /var/log/remote symlink
---------------------------------------------------------

The diagnostic snapshot skips the symbolic link
from */var/log/remote* to */var/log/docker-logs/remote*.
See `LP1340615 <https://bugs.launchpad.net/bugs/1340615>`_.

Spurious "Critical error" appears in neutron-openvswitch-agent.log
------------------------------------------------------------------

A Critical error is logged in the *neutron-openvswitch-agent.log*
on the Compute node.
It does not affect the behavior of Neutron networking
and can be ignored.
This is related to the upstream
`LP <https://bugs.launchpad.net/nova/+bug/1246848>`_.
* When ovs-agent is started, Critical error appears.
See `LP1347612 <https://bugs.launchpad.net/bugs/1347612>`_.

Fuel default disk partition scheme is sub-optimal
-------------------------------------------------

* All available hardware LUNs under LVM are used and spanned across;
  for example, OpenStack and guest traffic are coupled.
  See `LP1306792 <https://bugs.launchpad.net/bugs/1306792>`_.

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
  service ceph-radosgw start

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

* 'Create volume and attach it to instance' OSFT does not work.
  See `LP1346133 <https://bugs.launchpad.net/bugs/1346133>`_.

* OSTF provides wrong failure message for ping probes.
  See `LP1323433 <https://bugs.launchpad.net/bugs/1323433>`_.

* "Request image list" OSTF test fails for environment with 'error' status.
  See `LP1330458 <https://bugs.launchpad.net/bugs/1330458>`_.

* During OSTF tests, "Time limit exceeded while waiting
  for 'ping' command to finish" message appears.
  See `LP1339691 <https://bugs.launchpad.net/bugs/1339691>`_.

* After update, Sahara OSTF tests are displayed in HA suite instead of Platform test.
  See `LP1357330 <https://bugs.launchpad.net/bugs/1357330>`_.

* After resetting the environment, OSTF test results from the last
  environment are still displayed.
  See `LP1338669 <https://bugs.launchpad.net/bugs/1338669>`_.


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

* **The Admin(PXE) network cannot be assigned to a bonded interface.**
  When implementing bonding, at least three NICs are required:
  two for the bonding plus one for the Admin(PXE) network,
  which cannot reside on the bond and cannot be moved.
  See `LP1290513 <https://bugs.launchpad.net/fuel/+bug/1290513>`_.

* **Murano requires the Neutron network type.**
  If you choose nova-network as the network type during deployment,
  the option to install the Murano project is greyed out.
  This is a design decision made by the OpenStack community;
  it allows us to focus our efforts on Neutron,
  and we see little demand for Murano support on Nova-network.

* Some OSTF tests do not give descriptive message when they fail.
  See `LP1371051 <https://bugs.launchpad.net/fuel/+bug/1371051>`_.
* **Murano changes deployment status to "successful" when Heat stack failed.**
  Murano uses Heat to allocate OpenStack resources;
  therefore one of the first steps of Environment
  deployment is creation of stack. Creation of stack may
  fail due to various reasons but unfortunately this failure
  will not be detected by Murano and overall Environment
  deployment will be reported as successful.
  See `LP1353589 <https://bugs.launchpad.net/bugs/1353589>`_.

* L3 agent takes more than 30 seconds
  to failover to a standby controller
  when a controller node fails.
  See `LP1328970 <https://bugs.launchpad.net/bugs/1328970>`_.

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

* Do not recreate the RadosGW region map after initial deployment
  of the OpenStack environment;
  this may cause the map to be corrupted so that RadosGW cannot start.
  If this happens, you can repair the RadosGW region map
  with the following command sequence:
  ::

     radosgw-admin region-map update
     service ceph-radosgw start

  See `LP1287166 <https://bugs.launchpad.net/fuel/+bug/1287166>`_.

* We could improve performance significantly by upgrading
  to a later version of the CentOS distribution
  (using the 3.10 kernel or later).
  See `LP1322641 <https://bugs.launchpad.net/bugs/1322641>`_.

* Docker loads images very slowly on the Fuel Master Node.
  See `LP1333458 <https://bugs.launchpad.net/bugs/1333458>`_.

* When using Ubuntu, in rare cases some nodes may stay
  on the grub prompt. It may occur more frequently if the node is power-cycled
  during the boot process. You should press Enter to continue booting.
  See `LP1356278 <https://bugs.launchpad.net/bugs/1356278>`_.

* :ref:`Fuel CLI<cli_usage>` can not be run by a non-root user.
  See `LP1355876 <https://bugs.launchpad.net/bugs/1355876>`_.

* Large number of disks may fail Ubuntu installation.
  See `LP1340414 <https://bugs.launchpad.net/bugs/1340414>`_.

* IP ranges can not be updated for management and storage networks.
  See `LP1365368 <https://bugs.launchpad.net/bugs/1365368>`_.


