Known Issues in Mirantis OpenStack 5.0.1
========================================

Known limitations for the vCenter integration
---------------------------------------------

The vCenter integration with Mirantis OpenStack 5.0 is fully supported,
but it has some known limitations:

* vCenter integration can be enabled
  only if Nova-network is the network type.
  vCenter integration is not yet supported with the Neutron network type.
* vCenter integration does not provide high availability
  for the Nova-compute service.
  Only one compute service is enabled
  and, if the service or the controller on which the service is deployed fail,
  OpenStack is unable to access the ESXi server resources
  for scheduling the VMs.
  See `LP1312653 <https://bugs.launchpad.net/fuel/+bug/1312653>`_.
* When vCenter is selected as the hypervisor,
  all Ceph, Cinder, and Nova options are disabled
  in the storage settings.
  It is possible to use Ceph as the storage backend for Glance
  and for Swift/S3 object storage,
  but it must be configured .
  See `LP1316377 <https://bugs.launchpad.net/fuel/+bug/1316377>`_.

Additional MongoDB roles cannot be added to an existing deployment
------------------------------------------------------------------

Fuel 5.0.1 installs MongoDB as a backend for Ceilometer.
When installing OpenStack in HA mode,
Fuel does not force the user to set up multiple MongoDB roles.
As a result, a user can set up a single MongoDB role for Ceilometer,
which is inadequate for an HA environment.
See `LP1338486 <https://bugs.launchpad.net/bugs/1338486>`_.

Any number of MongoDB roles (or standalone nodes)
can initially be deployed into an OpenStack environment
but, after the environment is deployed,
additional MongoDB roles cannot be added.
Be sure to deploy an adequate number of MongoDB roles
(one for each Controller node is ideal)
during the initial deployment.
See `LP1308990 <https://bugs.launchpad.net/fuel/+bug/1308990>`_.

Fuel update process omits Murano database tables
------------------------------------------------

The Fuel update process does not migrate Murano database tables.
If you are upgrading from a Mirantis 5.0 system
and running Murano,
you can work around this problem by stopping the **mysql** process
and issuing the following command:

::

  python /usr/lib/python2.7/dist-packages/muranoapi/cmd/manage.py --config-file /etc/murano/murano.conf db-sync

To verify that the Murano database tables are restored,
restart **mysql** and run the following commands:

::

    mysql
    mysql> connect murano;
    mysql> show tables;

See `LP1349377 <https://bugs.launchpad.net/fuel/+bug/1349377>`_.

Network verification does not check OVS and bonding
---------------------------------------------------

The Fuel "Verify Networks" functionality
does not check :ref:`ovs-term` and :ref:`bonding-term` connections.
See the `Network checks for Neutron blueprint <https://blueprints.launchpad.net/fuel/+spec/network-checker-neutron-vlan>`_.

Fuel is not enforcing quorum on Controller clusters
---------------------------------------------------

In order to incrementally add Controllers into the cluster,
Fuel temporarily sets the **no-quorum-policy="ignore"** property
in the :ref:`crm<crm-term>` configuration
but is not resetting this property to activate the quorum
after the environment is deployed.
Consequently, in Controller clusters of three or more nodes,
restarting the Management network
results in no L3 agents running on any of the nodes in the cluster.
The work-around is to follow the instructions in
`Setting Basic Cluster Properties <http://docs.openstack.org/high-availability-guide/content/_setting_basic_cluster_properties.html>`_
to unset this property.
See `LP1348548 <https://bugs.launchpad.net/fuel/+bug/1348548>`_.

Controllers are deployed sequentially rather than in parallel
-------------------------------------------------------------

Multiple controllers are deployed sequentially
rather than in parallel.
This increases the deployment time,
but does not otherwise adversely affect the environment.
See `LP1310494 <https://bugs.launchpad.net/fuel/+bug/1310494>`_.

Some logs are excluded from the Diagnostic Snapshot
---------------------------------------------------

The diagnostic snapshot does not include all the logs.
The logs are available under the */var/log* directory,
but some logs in this directory are symlinks
and the diagnostic snapshot does not capture them.
See `LP1323436 <https://bugs.launchpad.net/bugs/1323436>`_
and `LP1318514 <https://bugs.launchpad.net/bugs/1318514>`_.

"Deassociate floating IP" button may disappear from Horizon menu
----------------------------------------------------------------

The "Deassociate floating IP" button may disappear
from the Horizon menu when using Neutron network topologies.
See `LP1325575 <https://bugs.launchpad.net/bugs/1325575>`_.

RAID-1 spans all configured disks on a node
-------------------------------------------

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

1. Use the Fuel CLI to obtain provisioning data:
   ::

     fuel provisioning --env-id 1 --default -d

2. Remove the drive which you do not want to be part of RAID:
   ::

     - size: 300
       type: boot
     - file_system: ext2
       mount: /boot
       name: Boot
       size: 200
       type: raid


3. Run deployment
   ::

     fuel provisioning --env-id 1 -u

4. Confirm that your partition is not included in the RAID array:
   ::

     [root@node-2 ~]# cat /proc/mdstat
     Personalities : [raid1]
     md0 : active raid1 sda3[0] sdb3[1] 204736 blocks
           super 1.0 [2/2] [UU]


See `LP1267569 <https://bugs.launchpad.net/fuel/+bug/1267569>`_
and `LP1258347 <https://bugs.launchpad.net/fuel/+bug/1258347>`_.

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
See `LP1291128 <https://bugs.launchpad.net/fuel/+bug/1291128>`_.

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

Adding new Compute node with CLI causes Puppet to run on all nodes
------------------------------------------------------------------

Using the Fuel CLI to add a new Compute node to an environment
causes Puppet to run on all nodes in the environment.
Use the following work-around to resolve this issue:

::

    psql -U nailgun -W -h 127.0.0.1
    update clusters set is_customized=false where id=${ID};

See `LP1280318 <https://bugs.launchpad.net/fuel/+bug/1280318>`_.

GRE-enabled Neutron installation runs inter VM traffic through management network
---------------------------------------------------------------------------------

In Neutron GRE installations configured with the Fuel UI,
a single physical interface is used
for both OpenStack management traffic and VM-to-VM communications.
This limitation only affects implementations deployed using the Fuel UI;
you can use the :ref:`Fuel CLI<cli_usage>` to use other physical interfaces
when you configure your environment.
See `LP1285059 <https://bugs.launchpad.net/fuel/+bug/1285059>`_.

CentOS does not support some newer CPUs
---------------------------------------

CentOS does not support some recent CPUs
such as the latest Ultra Low Voltage (ULV) line by Intel
(Core iX-4xxxU, Haswell);
newer ultralite Ultrabooks are usually equipped with such CPUs.

As a result, the Fuel Master node
(which always runs the CentOS distribution)
cannot be deployed on these systems.
Controller, Compute, and Storage nodes can use these systems
but they must use the Ubuntu distribution.

As a workaround, you can use a virtualization manager,
such as QEMU or KVM, to emulate an older CPU on such systems.
Note that VirtualBox has no CPU model emulation feature.
See `LP1322502 <https://bugs.launchpad.net/fuel/+bug/1322502>`_.

CentOS issues booting on some servers
-------------------------------------

Because of a CentOS bug
(see `CentOS6492 <http://bugs.centos.org/view.php?id=6492>`_),
deployments that use CentOS as the host OS on the OpenStack nodes
may get stuck at the very beginning of the provisioning stage
because of boot issues on some hardware.
To resolve this situation,
add the following kernel parameters
on the "Settings" tab in the Fuel UI:
::

    ipmi_si.tryacpi=0 ipmi_si.trydefaults=0 ipmi_si.trydmi=0

Then run this command in the Fuel Master node shell:
::

    dockerctl shell cobbler cobbler profile edit --name centos-x86_64
    --kopts="ipmi_si.tryacpi=0 ipmi_s i.trydefaults=0 ipmi_si.trydmi=0" --in-place

See `LP1312671 <https://bugs.launchpad.net/fuel/+bug/1312671>`_.

Bootstrap does not see Brocade NICs
-----------------------------------

The bootstrap process does not detect Brocade NICs
so they cannot be configured from the Fuel UI.
The work-around is to use the Fuel CLI to configure all brocade NICS
that are to be included in the environment
then upload this information into the Fuel UI.
See `LP1260492 <https://bugs.launchpad.net/fuel/+bug/1260492>`_.

Ubuntu does not support NetFPGA cards
-------------------------------------

CentOS does include drivers for netFPGA devices.
See `LP1270889 <https://bugs.launchpad.net/fuel/+bug/1270889>`_.

Bootstrap does not see Broadcom 10gig NICS
------------------------------------------

See `LP1260492 <https://bugs.launchpad.net/fuel/+bug/1260492>`_.

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
   In the hard trunks mode,  you should use fewer than 50 VLANs in the Neutron VLAN mode.

See :ref:`ovs-arch`
for more information about using Open VSwitch.

Keystone performance issues if memcache instance fails
------------------------------------------------------

When several OS controller nodes are used
with 'memcached' installed on each of them,
each 'keystone' instance is configured
to use all of the 'memcached' instances.
Thus, if one of the controller nodes became inaccessible,
then whole cluster may cease to be workable
because of delays in the memcached backend.

This behavior is the way the python memcache clients themselves work.
There is currently no acceptable workaround
that would allow the use all available 'memcached' instances
without such issues.
See `LP1332058 <https://bugs.launchpad.net/keystone/+bug/1332058>`_
and `LP1340657 <https://bugs.launchpad.net/bugs/1340657>`_.

Placing Ceph OSD on Controller nodes is not recommended
-------------------------------------------------------

Placing Ceph OSD on Controllers is highly unadvisable because it can severely
degrade controller's performance.
It is better to use separate storage nodes
if you have enough hardware.

MySQL may not be available after full restart of environment
------------------------------------------------------------

The current version of Galera
(which manages MySQL in an OpenStack environment)
may fail if the Controllers in an HA environment
come back online in a different order than Galera expects.
We expect a new version of Galera to support
arbitrary orders of shutdown and startup,
which will fix this issue.
See `LP1297355 <https://bugs.launchpad.net/fuel/+bug/1297355>`_.

Controller cluster may fail if one MySQL instance fails
-------------------------------------------------------

If the MySQL instance on one Controller node fails,
the entire Controller cluster may be inaccessible
whereas it should just disable the Controller node where MySQL failed
and continue to run with the remaining Controller nodes.
See `LP1326829 <https://bugs.launchpad.net/bugs/1326829>`_.

Management network may not restart correctly
--------------------------------------------

If br-mgmt (the bridge for the Management logical network
on the Neutron topology) is shut down from the main Controller node,
the Controller cluster may not be reachable.
Shutting down this bridge means that that Controller node
cannot communicate with any other node over the Management network.
See `LP1323277 <https://bugs.launchpad.net/fuel/+bug/1323277>`_.

Corosync is not fully scalable
------------------------------

Corosync does not scale up correctly
which may degrade performance in large environments.
See `LP1312627 <https://bugs.launchpad.net/fuel/+bug/1312627>`_.

Glance may not send notifications to Ceilometer
------------------------------------------------

Glance may not send notifications to Ceilometer
so notifications such as "image.update" and "image.upload"
are not reported in the "ceilometer meter-list" output.
See `LP1314196 <https://bugs.launchpad.net/fuel/+bug/1314196>`_.

Live Migration does not work if the instance has floating IP assigned
---------------------------------------------------------------------

The migration process will fail if the instance has a floating IP
address signed.

Other limitations
-----------------

* **The Fuel Master Node can only be installed with CentOS as the host OS.**
  While Mirantis OpenStack nodes can be installed
  with Ubuntu or CentOS as the host OS,
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

* Deployments done through the Fuel UI create all of the networks on all servers
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

* When configuring disks on nodes where Ubuntu has been selected as the host OS,
  the Base System partition modifications are not properly applied.
  The default Base System partition
  is applied regardless of the user choice
  due to limitations in Ubuntu provisioning.

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
