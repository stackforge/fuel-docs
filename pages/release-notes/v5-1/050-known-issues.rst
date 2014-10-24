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

* When using vCenter as a hypervisor, vCenter
  can be used as a storage backend for Cinder.
  However, **Storage - Cinder LVM** role is
  available when adding nodes.
  To work around this problem, you
  should install a node with
  **Storage - Cinder LVM** role.
  See `LP1383224 <https://bugs.launchpad.net/fuel/+bug/1383224>`_.

* Fuel does not check vCenter credentials before deployment.
  Deployment may finish successfully even if credentials are incorrect
  or connectivity is disabled.
  To work around this issue, you have to perform a redeployment
  or change vCenter credentials manually.
  See `LP1370723 <https://bugs.launchpad.net/fuel/+bug/1370723>`_.

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

Enabled 10gig interfaces may lead to kernel problem
---------------------------------------------------

When using 10gig interfaces, the kernel can not turn interfaces
in promisc mode due to generic segmentation offload.
Every time this error leads to agent migration to another host;
instances leave their IP addresses because they have no more
access to DHCP server. To work this problem around, perform

::

     ethtool -K eth1 gso off
     ethtool -K eth1 gro off



See `LP1275650 <https://bugs.launchpad.net/bugs/1275650>`_.


**Deassociate floating IP** button may disappear from Horizon menu		
------------------------------------------------------------------

The **Deassociate floating IP** button may disappear		
from the Horizon menu when using Neutron network topologies.
To work around this problem, in Horizon navigate to *Project* page.
In *Access&Security*, open *Floating IPs* and deassociate IP addresses
there.
See `LP1325575 <https://bugs.launchpad.net/bugs/1325575>`_.


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

Ceph OSD has several problems
-----------------------------

* Placing Ceph OSD on Controllers is highly unadvisable as it can severely
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

Administrator's panel does not work in Horizon for custom role
--------------------------------------------------------------

Once user with this role authenticates, administrator's tab disappears.
This issue is caused by hardcoded **openstack.roles.admin** permission
in Horizon's code.
To work around this problem, issue the following command:

::

    grep -Irl "openstack.roles.admin" /usr/share/openstack-dashboard/openstack_dashboard/|xargs
    sed -i 's/openstack.roles.admin/openstack.roles.customadmin/g' && service apache2 restart


Nevertheless, after running this command
user can not access
any of Horizon entries
(for example, volumes and instances).
To access these pages, remove
**admin=True**
in the **tenant_list()**
from
**https://github.com/openstack/horizon/blob/stable/icehouse/openstack_dashboard/api/keystone.py#L257** file.

See `LP1371161 <https://bugs.launchpad.net/mos/+bug/1371161>`_
and the upstream `LP1161144 <https://bugs.launchpad.net/horizon/+bug/1161144>`_.

Other limitations
-----------------

* The floating VLAN and public networks
  networks are locked together
  and can only run via the same physical interface on the server.
  See the
  `Separate public and floating networks blueprint <https://blueprints.launchpad.net/fuel/+spec/separate-public-floating>`_.
  for information about ongoing work to remove this restriction.

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

* If you do not define *Nova quotas* on the Fuel web **Settings** tab when deploying an environment,
  you will not be able to modify user/project quotas. The Horizon UI will fail.
* If "Nova quotas" has not been chosen in cluster deployment settings,
  it will be impossible to modify user/project quotas.
  Horizon UI will fail with **Modified project information and members, but unable to modify project quotas** error.
  To work around this problem, you should deploy clusters with  enabled **Nova quotas** option to use this option.
  See `LP1332457 <https://bugs.launchpad.net/bugs/1332457>`_.

* When ovs-agent is started, Critical error appears.
  See `LP1347612 <https://bugs.launchpad.net/bugs/1347612>`_.

* Nova services register themselves in a database on start
  by doing an RPC call to nova-conductor.
  If this call fails (for example, if RabbitMQ is currently down), a service does not start.
  Upstart does not respawn services: services will remain down even when RPC connectivity is restored.
  See `LP1370539 <https://bugs.launchpad.net/bugs/1370539>`_.

* RabbitMQ takes a very long time to start in HA mode.
  See `LP1383247 <https://bugs.launchpad.net/bugs/1383247>`_.

* After Fuel upgrade, Rsync Docker container uses old puppet
  manifests while generating xinetd configuration.
  This happens because the folder with puppet manifests inside 'rsync'
  container is mounted from host system and '/etc/puppet/modules' directory contains old files.
  This problem has the following workaround:

  ::

      [root@fuel-lab-cz5558 ~]# dockerctl shell rsync sed -e 's/puppet\/modules/
      puppet\/2014.1.1-5.1\/modules/' -e 's/apply/apply --modulepath \/etc\/puppet\
      /2014.1.1-5.1\/modules/' -i /usr/local/bin/start.sh
      [root@fuel-lab-cz5558 ~]# dockerctl restart rsync

  See `LP1382531 <https://bugs.launchpad.net/bugs/1382531>`_.

* Ceph OSD can not be stopped after installation.
  To work around this problem, reboot Ceph node.
  See `LP1374160 <https://bugs.launchpad.net/bugs/1374160>`_.

* Logs of agent rescheduling script do not contain enough information
  about dead agents and debugging issues that are found.
  See LP1371664 <https://bugs.launchpad.net/bugs/1371664>`_.

* After MySQL is consequently terminated at the Controller nodes,
  Pacemaker could bring it into unmanageable state.
  See `LP1388771 <https://bugs.launchpad.net/bugs/1388771>`_.

* Ceilometer Swift agent fails when primary controller is shut down.
  See `LP1380800 <https://bugs.launchpad.net/bugs/1380800>`_
  and the upstream `LP1337715 <https://bugs.launchpad.net/ceilometer/+bug/1337715>`_.

* After adding node with *Mongo* role to the cluster using CLI,
  role is not assigned. See `LP1376831 <https://bugs.launchpad.net/bugs/1376831>`_.

* After primary controller is shut down in HA environment,
  VMs are losing private and floating IP addresses and connectivity.
  See `LP1371104 <https://bugs.launchpad.net/bugs/1371104>`_.

