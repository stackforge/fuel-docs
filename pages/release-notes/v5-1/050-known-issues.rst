Known Issues in Mirantis OpenStack 5.1.1
========================================

For current information about Issues and Blueprints
for Mirantis OpenStack 5.1.1, see the
`Fuel for OpenStack 5.1.1 Milestone <https://launchpad.net/fuel/+milestone/5.1.1>`_
page.

Known limitations for the vCenter integration
---------------------------------------------

The vCenter integration with Mirantis OpenStack 5.1.1 is fully supported,
but it has some known limitations:

* vCenter should be used as the storage backend for Cinder
  when vCenter is used as the hypervisor,
  but the Fuel UI does not list this as an option
  on the :ref:`assign-roles-vcenter-ug` screen;
  instead, you should select the **Storage - Cinder LVM** role,
  which actually selects vCenter as the storage backend for Cinder
  when vCenter is the hypervisor.
  See `LP1383224 <https://bugs.launchpad.net/fuel/+bug/1383224>`_.

* Fuel does not check vCenter credentials before deployment,
  so the deployment may finish successfully
  even if the credentials are incorrect or connectivity is disabled.
  To resolve this issue,
  you must manually set the vCenter credentials
  and redeploy the environment.
  See `LP1370723 <https://bugs.launchpad.net/fuel/+bug/1370723>`_.

* Instances boot process crashes
  due to not matching image adapter and disk adapter
  types when they are used with VMDK driver.
  When you create a volume in Cinder (this volume is an SCSI disk
  and no option for selecting IDE disk type is available),
  CirrOS is unable to access the volume. Nevertheless, the volume will
  be successfully attached to instance. To work around this problem,
  download `deb <http://mirror.fuel-infra.org/fwm/6.0/ubuntu/pool/main/cirros-testvmware_0.3.3-ubuntu5_amd64.deb>`_
  and `rpm <http://mirror.fuel-infra.org/fwm/6.0/centos/os/x86_64/Packages/cirros-testvm-0.3.2-3.mira1.x86_64.rpm>`_ packages
  and replace the old packages with downloaded ones on the Fuel master node. After deployment, run the following command on the controller:

  ::

         glance image-update --property vmware_adaptertype="lsiLogic" UUID-of-TestVM

See `LP1365468 <https://bugs.launchpad.net/fuel/+bug/1365468>`_.


Known limitations for the VMware NSX integration
------------------------------------------------

The VMware NSX integration into Mirantis OpenStack 5.1.1
is an :ref:`experimental feature<experimental-features-term>`,
with the following known limitations:

* The NSX cluster is left in a half-configured state
  if the deployment is :ref:`stopped<Stop_Deployment>` or reset.
  You must manually remove all network logical entities
  that were created during the unsuccessful deployment;
  otherwise, the next deployment will fail
  because it cannot register OpenvSwitches in NSX
  nor properly configure 'br-int' bridges on the target nodes
  because older ones with same names exist in the NSX cluster.

* If the NSX cluster resides in a separate network
  that has L3 connectivity with the OpenStack Public network,
  you must enable Public address assignment for all
  nodes, see :ref:`neutron-nsx-arch`.

* In HA environment with enabled NSX, instances do not receive the network configuration,
  As the result, the OSTF **Check network connectivity from instance via floating IP** test fails
  and Neutron L3 and DHCP agents do not start. To work around this problem,
  remove Corosync resource bindings (collocations and orders) tied up with *clone_p_neutron-openvswitch-agent*:

  ::

     crm configure delete dhcp-after-ovs
     crm configure delete dhcp-with-ovs
     crm configure delete l3-after-ovs
     crm configure delete l3-with-ovs

  Then run **crm configure** command and add Neutron L3-agent location for
  all controllers. To find the names of the controllers, apply
  **crm configure show|grep 'location p_neutron-dhcp-agent'** command.
  For example output, see `LP1396163 <https://bugs.launchpad.net/fuel/+bug/1396163>`_.

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

* 3rd party adapters based on the Mellanox chipset
  may not have SR-IOV enabled by default.
  If you have such an adapter, please contact the device manufacturer for
  configuration instructions and for the required firmware.

* Mellanox OEM adapter cards may be burned with SR-IOV disabled.
  If you have such a card,
  you may need to burn a special firmware version
  to enable SR-IOV.

* Mellanox provides additional information in their
  `HowTo Install Mirantis Fuel 5.1 OpenStack with
  Mellanox Adapters Support
  <http://community.mellanox.com/docs/DOC-1474>`_ document,
  including example images to use with the Mellanox SR-IOV plugin
  and advanced configuration instructions,
  including instructions for increasing the number of virtual functions.

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

Fuel upgrade fails if custom python modules are installed as eggs
-----------------------------------------------------------------

Installing additional python modules on the Fuel Master node
using pip or easy_install
may cause the Fuel upgrade script to fail.
See `LP1341564 <https://bugs.launchpad.net/fuel/+bug/1341564>`_.

Networking issues
-----------------

* When using 10gb network interfaces,
  the kernel can not enable promiscuous mode on the interface
  because of generic segmentation offload.
  This error causes agents to migrate to another host;
  instances lose their IP addresses
  because they can no longer access the DHCP server.
  To resolve this problem, issue the following commands:

  ::

       ethtool -K eth1 gso off
       ethtool -K eth1 gro off



  See `LP1275650 <https://bugs.launchpad.net/bugs/1275650>`_.

* The floating VLAN and public networks
  are locked together and must use
  the same physical interface on the server.
  See the
  `Separate public and floating networks blueprint <https://blueprints.launchpad.net/fuel/+spec/separate-public-floating>`_.
  for information about ongoing work to remove this restriction.

* Some OpenStack services listen to all of the interfaces,
  a situation that may be detected and reported
  by third-party scanning tools not provided by Mirantis.
  Please discuss this issue with your security administrator
  if it is a concern for your organization.

* During OpenStack deployment,
  a spurious critical error may appear in a log related to the ovs-agent.
  The error is misleading; no actual malfunction has occurred.
  See `LP1347612 <https://bugs.launchpad.net/bugs/1347612>`_.

* In rare circumstances, :ref:`OpenvSwitch<ovs-term>` flows
  that enable network access to VM instances are dropped.
  Restarting the Neutron L3 agent restores the connectivity.
  See `LP1393771 <https://bugs.launchpad.net/bugs/1393771>`_.

Horizon issues
--------------

**Deassociate floating IP** button may disappear from Horizon menu		
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

The **Deassociate floating IP** button may disappear
from the Horizon menu when using Neutron network topologies.
You can, however, still use the Horizon UI
to deassocciate IP addresses:
navigate to the *Project* page,
then open *Access&Security* -> *Floating IPs*
and deassociate the IP addresses here.
See `LP1325575 <https://bugs.launchpad.net/bugs/1325575>`_.

Administrator's panel does not work in Horizon for custom role
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

The Administrator's tab may disappear
after the `admin` user authenticates for a custom role.
This is because of hardcoded permissions
in the Horizon *openstack.roles.admin* file.
To resolve the problem:

#. Issue the following command to correct the permissions set
   in the *openstack.roles.admin* file:

   ::

       grep -Irl "openstack.roles.admin" /usr/share/openstack-dashboard/openstack_dashboard/|xargs
       sed -i 's/openstack.roles.admin/openstack.roles.customadmin/g' && service apache2 restart

#. Edit the
   *https://github.com/openstack/horizon/blob/stable/icehouse/openstack_dashboard/api/keystone.py#L257* file
   and remove **admin=True** from the **tenant_list()** section
   to all users to access volumes, instances,
   and other Horizon entities.

See `LP1371161 <https://bugs.launchpad.net/mos/+bug/1371161>`_
and the upstream `LP1161144 <https://bugs.launchpad.net/horizon/+bug/1161144>`_.


CentOS issues using Neutron-enabled installations with VLANs
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
For CentOS, the Fuel provides work-arounds
that can be configured on the :ref:`vlan-splinters-ug` screen.

VLAN splinters can be enabled in two separate modes --
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

Ceph OSD known issues
---------------------

* Placing Ceph OSD on Controllers is highly unadvisable as it can severely
  degrade controller's performance.
  It is better to use separate storage nodes
  if you have enough hardware.

* A Ceph OSD node can not be stopped with the
  **stop ceph-osd id=xx** command;
  to stop the node, you must reboot the Ceph node:
  ::

    reboot ceph node : stop ceph-osd id=xx

  See `LP1374160 <https://bugs.launchpad.net/bugs/1374160>`_.

Upgrade and Update issues
-------------------------

* Some packages are not updated on nodes after
  :ref:`upgrading<upgrade-ug>` Fuel.
  See `LP1364586 <https://bugs.launchpad.net/bugs/1364586>`_.


Other limitations
-----------------

* On target nodes that use Ubuntu as the operating system,
  Ubuntu provisioning applies the default Base System partitioning
  even if the user chose a different scheme.

* You must enable *Nova quotas*
  on the Fuel web **Settings** tab when deploying an environment,
  or you will not be able to modify user/project quotas.
  Horizon UI will fail with the
  `Modified project information and members,
  but unable to modify project quotas` error.
  See `LP1332457 <https://bugs.launchpad.net/bugs/1332457>`_.

* When Nova services are initialized,
  they register themselves in a database
  by issuing an RPC call to nova-conductor.
  If this call fails
  (for example, if RabbitMQ is currently down),
  a service does not start.
  Upstart does not respawn services;
  services remain down even when RPC connectivity is restored.
  See `LP1370539 <https://bugs.launchpad.net/bugs/1370539>`_.

* RabbitMQ takes a very long time to start in HA mode.
  See `LP1383247 <https://bugs.launchpad.net/bugs/1383247>`_.

* If MySQL is manually terminated on all the Controller nodes
  (by, for instance, using one of the **kill** commands),
  :ref:`Pacemaker<pacemaker-term>` does not restart it
  but instead it is in an unmanaged state.
  See `LP1388771 <https://bugs.launchpad.net/bugs/1388771>`_.

* 'Create volume and attach it to instance' OSFT does not work.
  See `LP1346133 <https://bugs.launchpad.net/bugs/1346133>`_.

* The scripts that are provided to install Fuel on VirtualBox
  (see `Quick Start Guide <https://software.mirantis.com/quick-start/>`_)
  create separate host interfaces.
  If a user associates logical networks
  with different physical interfaces on different nodes,
  it causes network connectivity issues between OpenStack components.
  Please check to see if this has happened prior to deployment
  by clicking the 'Verify Networks' button on the Networks tab.

* You must run **deep_clean** before you run **make iso**
  to build an ISO file or old packages on your system may cause **make iso** to fail.
  See `LP1393777 <https://bugs.launchpad.net/bugs/1393777>`_.
