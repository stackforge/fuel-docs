Known Issues in Mirantis OpenStack 5.1

========================================

This section is under development at this time.
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

Known limitations for the Mellanox SR-IOV plug-in

-------------------------------------------------

The Mellanox :ref:`sr-iov-term` plug-in is fully integrated
===========================================================


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

* 3rd party adapters based on Mellanox chipset may not have SR-IOV enabled
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



Phase I of Zabbix is included in the Experimental package.

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





Additional MongoDB roles cannot be added to an existing deployment

------------------------------------------------------------------



Fuel 5.0.1 installs :ref:`mongodb-term`

as a backend for :ref:`ceilometer-term`.

Any number of MongoDB roles (or standalone nodes)

can initially be deployed into an OpenStack environment

but, after the environment is deployed,

additional MongoDB roles cannot be added.

Be sure to deploy an adequate number of MongoDB roles

(one for each Controller node is ideal)

during the initial deployment.

See `LP1308990 <https://bugs.launchpad.net/fuel/+bug/1308990>`_.



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



  sysctl -w 'sys.net.ipv4.ip_local_reserved_ports=49000'



See `LP116422/ <https://review.openstack.org/#/c/116422/>`_.



Docker is not upgraded

----------------------



The upgrade procedure does not upgrade Docker.

This results in a number of issues; see

`LP1360161 <https://bugs.launchpad.net/fuel/+bug/1360161>`_



Network verification fails if a node is offline

-----------------------------------------------



Network verification can fail if a node is offline

because Astute runs network verification

but Astute does not know which nodes are online..

See `LP1318659 <https://bugs.launchpad.net/fuel/+bug/1318659>`_.



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



Keystone performance issues if memcache instance fails [In progress for 5.1]

----------------------------------------------------------------------------



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



Controller cluster may fail if one MySQL instance fails

-------------------------------------------------------



If the MySQL instance on one Controller node fails,

the entire Controller cluster may be inaccessible

whereas it should just disable the Controller node where MySQL failed

and continue to run with the remaining Controller nodes.

See `LP1326829 <https://bugs.launchpad.net/bugs/1326829>`_.



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

[LP1267569 is scheduled to be fixed in 5.1;

LP1258347 is scheduled to be fixed in 6.0]





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


* **Murano changes deployment status to "successful" when Heat stack failed.**

  Murano uses Heat to allocate OpenStack resources;

  therefore one of the first steps of Environment

  deployment is creation of stack. Creation of stack may

  fail due to various reasons but unfortunately this failure

  will not be detected by Murano and overall Environment

  deployment will be reported as successful.

  See `LP1353589 <https://bugs.launchpad.net/bugs/1353589>`_.



* **External gateway works, but is shown as DOWN in Horizon.**

   On OpenStack installation with Neutron+OVS on the routers

   Port router_gateway is in status DOWN, but all networking works, i.e. instances

   can access the outside world and they are also accessible from the outside

   by their floating IPs. It happens because Horizon and Neutron client

   take port status from the DB, but it's not updated by the agents.

   See `LP1323608 <https://bugs.launchpad.net/bugs/1323608>`_.



* **Ceilometer Swift pollsters do not work.**

  If Ceph and Rados Gateway is used, Ceilometer does not poll Ceph

  due to the endpoints incompatibility between plain Swift and Ceph

  installation. See `LP1352861 <https://bugs.launchpad.net/bugs/1352861>`_.



* **Hypervisor summary displays incorrect total storage.**

  When Ceph is used as a backend for ephemeral storage, an

  incorrect value is shown in Horizon UI

  in Admin/Hypervisors Disk Usage: it adds up the Ceph

  storage seen in each storage node rather than just using the real amount of Ceph storage.

  See `LP1359989 <https://bugs.launchpad.net/bugs/1359989>`_.



* **MongoDB does not support storing objects (dictionaries) with keys, containing '.' and '$'.**

   These symbols are special characters for this database, that's why when Ceilometer is processing

   data samples, containing, for instance, resource metadata with dots in the tag names, that leads

   to the sample writing failure. That usually occurs if metric is collected from the images with special

   tags (like Sahara is creating images with tags like '_sahara_tag_1.2.1'). All data samples, that do not

   contain these forbidden symbols, will be processed as usual without any problems.

   Do not create cloud resources (images, VMs, etc.) containing resource metadata keys with forbidden characters.

   See `LP1360240 <https://bugs.launchpad.net/bugs/1360240>`_.



* **Horizon asks login/password twice after sign-off caused by session timeout.**

   If both the Keystone token and the Horizon session are expired, the user is asked

   to perform a login procedure twice. This is because the token expiration is not

   checked when the user is logged-out due to session expiration - so he/she logs in

   just to find that the token had also expired, and needs to log in second time.

   See `LP1353544 <https://bugs.launchpad.net/bugs/1353544>`_.



* **Horizon filter displays objects incorrectly, when they take more than one page.**

   If pagination is switched for any table, the amount of the displayed objects per page

   can be changed (Settings->User Settings->Items Per Page). See

   `LP1352749 <https://bugs.launchpad.net/bugs/1352749>`_.

* **Currently Fuel provides sub-optimal default disk partition scheme.**

   All available hardware LUNs under LVM will be used and spanned across,

   i.e. OS and guest traffic will be coupled.

   See `LP1306792 <https://bugs.launchpad.net/bugs/1306792>`_.

* Before and while generating shapshots,

  Shotgun does not ensure if there is enough disk space.

  See `LP1328879 <https://bugs.launchpad.net/bugs/1328879>`_.

* L3 agent takes more than 30 seconds

  to failover to a standby controller

  when a controller node fails.

  See `LP1328970 <https://bugs.launchpad.net/bugs/1328970>`_.



* When ovs-agent is started, Critical error appears. It does not
  influence Neutron’s performance. See `LP1347612 <https://bugs.launchpad.net/bugs/1347612>`_.

* Deployments done through the Fuel UI
  create all of the networks on all servers
  even if they are not required by a specific role.
  For example, a Cinder node has VLANs created
  and addresses obtained from the public network.

* New HP BL120/320 RAID controller line is not supported.
  See `LP1359331 <https://bugs.launchpad.net/bugs/1359331>`_.

* When Swift is used with enabled Ceph Rados GW,
   no bulk operations are supported.
   See `LP1361036 <https://bugs.launchpad.net/bugs/1361036>`_.

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



* Fuel menu allows IP range, that overlaps in PXE setup.

  When configuring IP ranges, do not use DHCP addresses

  that overlap the Static addresses used.

  See `LP1365067 <https://bugs.launchpad.net/bugs/1365067>`_.



* VMDK driver prevents instances boot process

  with no matched image adapter type and disk adapter type error.

  Make sure that operating system that runs inside your instance supports SCSI adapters.

  See `LP1365468 <https://bugs.launchpad.net/bugs/1365468>`_.



* When using Ubuntu, in rare cases some nodes may stay

  on the grub prompt. It may occur more frequently if the node is power-cycled

  during the boot process. You should press Enter to continue booting.

  See `LP1356278 <https://bugs.launchpad.net/bugs/1356278>`_.



* Fuel CLI can not be run by a non-root user.

  See `LP1355876 <https://bugs.launchpad.net/bugs/1355876>`_.



* When traceback is in process, an interface with IP address

  that belongs to administrator's subnet, can not be found.

  See `LP1355237 <https://bugs.launchpad.net/bugs/1355237>`_.



* Nailgun network check must be extended to verify that correct numbers

  of IP addresses in range are used.

  See `LP1354803 <https://bugs.launchpad.net/bugs/1354803>`_.



* Backup and restore are accessible via CLI during deployment.

  See `LP1352847 <https://bugs.launchpad.net/bugs/1352847>`_.



* List of "Zabbix monitoring items" is different from "Zabbix overview" list.

  See `LP1352319 <https://bugs.launchpad.net/bugs/1352319>`_.



* When installing Fuel master at a node that already has operating system,

  Fuel asks to approve erasing of all disk data.

  See `LP1351473 <https://bugs.launchpad.net/bugs/1351473>`_.



* Multicast network verification fails when there are more than 11 nodes.

  See `LP1350007 <https://bugs.launchpad.net/bugs/1350007>`_.



* Invalid node status for nodes modified since backup after restore.

  Nodes added to an environment after a backup was made may report as

  offline. Reboot any bootstrapped nodes after restoring your Fuel

  Master from a backup. See `LP1347718 <https://bugs.launchpad.net/bugs/1347718>`_.



* Diagnostic snapshot does not have /var/log/remote symlink.

  See `LP1340615 <https://bugs.launchpad.net/bugs/1340615>`_.



* Large number of disks may fail Ubuntu installation.

  See `LP1340414 <https://bugs.launchpad.net/bugs/1340414>`_.



* During OSTF tests, "Time limit exceeded while waiting

  for 'ping' command to finish" message appears.

  See `LP1339691 <https://bugs.launchpad.net/bugs/1339691>`_.



* After resetting the environment, OSTF test results from the last

  environment are still displayed. See `LP1338669 <https://bugs.launchpad.net/bugs/1338669>`_.



* IP ranges can not be updated for management and storage networks.

  See `LP1365368 <https://bugs.launchpad.net/bugs/1365368>`_.

* After update Sahara OSTF tests display in HA suite.

  See `LP1357330 <https://bugs.launchpad.net/bugs/1357330>`_.


* After cluster reset one of the nodes is offline.

  See `LP1359237 <https://bugs.launchpad.net/bugs/1359237>`_.

* Upgrade procedure does not update agent/mc agent/network checker.
  See `LP1343139 <https://bugs.launchpad.net/bugs/1343139>`_.

* Keystone does not start with Apache due to mispackaged PasteDeploy egg.
  See `LP1316857 <https://bugs.launchpad.net/bugs/1316857>`_.

* Multiple ranges are available only for Public and Floating networks.
  See `LP1341026 <https://bugs.launchpad.net/bugs/1341026>`_.

* Network verification checker does not test OVS VLANs.
  See `LP1350623 <https://bugs.launchpad.net/bugs/1350623>`_.

* Group of nodes can not be added as controllers. You have to click each node,
  that must be a Controller, separately. See `LP1355404 <https://bugs.launchpad.net/bugs/1355404>`_.

* When there are no NSX settings, Fuel UI allows clicking "Deploy changes".
  Make sure that you have specified NSX settings.
  See `LP1347682 <https://bugs.launchpad.net/bugs/1347682>`_.

* When a new environment is created, after clicking "Load Defaults" button
  a cluster with incorrect settings will appear. See
  See `LP1342684 <https://bugs.launchpad.net/bugs/1342684>`_.

* If one of the nodes is in downtime, it leads to memcached delays in Horizon.
  See `LP1367767 <https://bugs.launchpad.net/bugs/1367767>`_.

  You should perform the following workaround:

1. Edit /etc/openstack-dashboard/local_settings file
   and temporarily remove the problem controller IP:PORT from LOCATION line in CACHE structure:

  ::


     
     CACHES = {
      'default': {
        'BACKEND' : 'django.core.cache.backends.memcached.MemcachedCache',
        'LOCATION' : "192.168.0.3:11211;192.168.0.5:11211;192.168.0.6:11211"
     },
     service ceph-radosgw start



2. Restart Apache web server.


Known Issues in Mirantis OpenStack 5.1 and 5.0.2

================================================

* When instance launches, file injection does not work.

  See `LP1335697 <https://bugs.launchpad.net/bugs/1335697>`_.
