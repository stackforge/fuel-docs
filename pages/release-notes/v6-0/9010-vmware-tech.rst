
.. _vmware-technologies-rn:

Issues in VMware technologies
=============================

.. _vcenter-rn:

New Features and Resolved Issues in Mirantis OpenStack 6.0
----------------------------------------------------------
* vCenter as a Hypervisor and NSX as a networking option are now enabled in Fuel.
  Fuel 6.0 has support of vCenter as a hypervisor and NSX at a networking option, so OpenStack can be integrated with both these components.
  See `vCenter NSX support <https://blueprints.launchpad.net/fuel/+spec/vcenter-nsx-support>`_.

* Previously, 1-N mapping was used between nova-compute service and vSphere cluster
  (cluster that is formed from ESXi hosts by vCenter server); single nova-compute
  service instance used many vSphere clusters managed by a single vCenter. Currently,
  this behaviour is changed to 1-1 mapping, so that single nova-compute service
  instance interacts with a single vSphere cluster. What is more, now it is
  possible to add vSphere clusters to the deployed Mirantis OpenStack environment
  with vCenter as a hypervisor option. See `1-1 nova-compute vSphere cluster mapping
  <https://blueprints.launchpad.net/fuel/+spec/1-1-nova-compute-vsphere-cluster-mapping>`_.

* Nova-network now supports VLAN manager for vCenter.
  See `VLAN manager support for vCenter <https://blueprints.launchpad.net/fuel/+spec/vcenter-vlan-manager>`_.

* Sahara is now supported in vCenter.
  See `LP1370708 <https://bugs.launchpad.net/fuel/+bug/1370708>`_.

* Currently, if vCenter installation is chosen, compute and controller
  are on one node and Ceilometer compute agent is now installed on that node, so metrics about
  instances is successfully collected.
  See `Ceilometer support for vCenter <https://blueprints.launchpad.net/fuel/+spec/ceilometer-support-for-vcenter>`_.

* NoVNCproxy now successfully works with vCenter.
  See `LP1368745 <https://bugs.launchpad.net/fuel/+bug/1368745>`_.

* Metadata services are available when vCenter is used as a hypervisor.
  It no longer affects cloud-init based images and all services using
  metadata information. See `LP1370165 <https://bugs.launchpad.net/fuel/+bug/1370165>`_.

* Glance-API service successfully starts in HA mode with vCenter as the Glance backend.
  See `LP1376683 <https://bugs.launchpad.net/fuel/+bug/1376683>`_.

* Cirros images now work properly with vCenter.
  See `LP1362169 <https://bugs.launchpad.net/fuel/+bug/1362169>`_.

* When vCenter is used on Ubuntu, deployment does not fail.
  See `LP1357129 <https://bugs.launchpad.net/fuel/+bug/1357129>`_.

Known limitations for the vCenter integration in 6.0
----------------------------------------------------

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

* When using the VMDK driver,
  instances must be deployed to use operating systems
  that support SCSI adapter.
  This means that the CirrOS image (which only supports IDE disks)
  cannot be used with VMDK.
  The `VMware vSphere documentation <http://docs.openstack.org/trunk/config-reference/content/vmware.html#VMware_converting_images>`_
  contains more information.
  See `LP1365468 <https://bugs.launchpad.net/bugs/1365468>`_.

* If you use Glance in vCenter, Fuel UI displays no warning if Glance settings
  were not entered. In this case, environment will be deployed with an error.
  See `LP1382021 <https://bugs.launchpad.net/fuel/+bug/1382021>`_.

* When environment is deployed in multi-node HA mode, two TestVM images appear in Glance.
  They are available in the Horizon and visible in the vCenter.
  See `LP1381992 <https://bugs.launchpad.net/fuel/+bug/1381992>`_.

* In HA mode for CentOS and Ubuntu OS, 'Launch instance' OSTF test fails because creation of an
  instance requires more then 300 seconds whereas OSTF timeout for this test requires only 300 seconds.
  See `LP1381652 <https://bugs.launchpad.net/fuel/+bug/1381652>`_.

* When we create a new OpenStack environment, the FuelUI does not prompt to configure
  VMWare vCenter/ESXi Glance as it does when selecting a hypervisor.
  See `LP1381640 <https://bugs.launchpad.net/fuel/+bug/1381640>`_.

* When vCenter is used as a hypervisor, there is possibility to deploy compute nodes; nevertheless,
  Fuel recommends to do so.
  See `LP1381613 <https://bugs.launchpad.net/fuel/+bug/1381613>`_.

* In a simple mode on Ubuntu vCenter machine, when OpenStack deployment has already been stopped on one of nodes,
  this node is bootstrapped, but provisioning does not start.
  See `LP1371225 <https://bugs.launchpad.net/fuel/+bug/1371225>`_.

* When using vCenter as a hypervisor, vCenter can be used as a storage backend for Cinder.
  However, 'Storage - Cinder LVM' role is available when adding nodes.
  See `LP1383224 <https://bugs.launchpad.net/fuel/+bug/1383224>`_.

* According to `VMware recommendations <http://docs.openstack.org/trunk/config-reference/content/vmware.html#VMwareVCDriver_configuration_options>`_.,
  ‘reserved_host_memory_mb’ nova-scheduler’s option should be set to 0, whereas Fuel uses a default value which is 512.
  This happens because vCenter is already doing a memory reservation and there is no valuable reason to do it twice.
  vCenter provides an aggregated memory from all ESXis in a vSphere cluster, and this option is applied to a cumulative value, but not to each individual ESXi node.
  Actually, 512MB memory is lost for each vSphere cluster.
  See `LP1382539 <https://bugs.launchpad.net/fuel/+bug/1382539>`_.

* Fuel does not try to connect to vCenter and verify credentials before deployment.
  See `LP1370723 <https://bugs.launchpad.net/fuel/+bug/1370723>`_.

* Speed of copying images between vCenter and non-VMDK Glance backends can be dramatically low.
  VMDK backend for Glance would fix this problem, but this approach is useless if multihypervisor environment is enabled.
  See `LP1370684 <https://bugs.launchpad.net/fuel/+bug/1370684>`_.

* Snapshot of instance failed when vCenter was used as a backend
  for Glance.
  See `LP1383241 <https://bugs.launchpad.net/fuel/+bug/1383241>`_.

.. include:: pages/release-notes/v6-0/vmware/9020-nsx.rst
