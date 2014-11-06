
.. _vmware-technologies-rn:

Issues in VMware technologies
=============================

.. _vcenter-rn:


[TBD]

New Features and Resolved Issues in Mirantis OpenStack 6.0
----------------------------------------------------------
* Nova-network now supports VLAN manager for vCenter.
  See `VLAN manager support for vCenter <https://blueprints.launchpad.net/fuel/+spec/vcenter-vlan-manager>`_.

* The speed of Glance-vCenter interaction was improved.
  If still some problems occur, check your vCenter version and update it.
  See `VMware support resource <https://www.vmware.com/support/vsphere5/doc/vsphere-vcenter-server-55u2-release-notes.html>`_.

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

* VMware DataStore option was added to the'Storage Backends' tab
  for Cinder in wizard.
  See `LP1359696 <https://bugs.launchpad.net/fuel/+bug/1359696>`_.

* Glance-API service successfully starts in HA mode with vCenter as the Glance backend.
  See `LP1376683 <https://bugs.launchpad.net/fuel/+bug/1376683>`_.

* Cirros images now work properly with vCenter.
  See `LP1362169 <https://bugs.launchpad.net/fuel/+bug/1362169>`_.

* When vCenter is used on Ubuntu, deployment does not fail.
  See `LP1357129 <https://bugs.launchpad.net/fuel/+bug/1357129>`_.

Known limitations for the vCenter integration in 6.0
----------------------------------------------------

The vCenter integration with Mirantis OpenStack 6.0 is fully supported,
but it has some known limitations:

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
  They are available in Horizon and visible in the vCenter.
  Both of them are fully functional.
  See `LP1381992 <https://bugs.launchpad.net/fuel/+bug/1381992>`_.

* When we create a new OpenStack environment, the FuelUI does not prompt user to configure
  VMware vCenter/ESXi Glance as it does when selecting a hypervisor.
  The user's credentials are not checked, so make sure you have
  entered valid credentials; otherwise, the deployment
  will fail.
  See `LP1381640 <https://bugs.launchpad.net/fuel/+bug/1381640>`_.

* Fuel allows you to deploy Compute nodes although there is no
  compute node when vCenter is used as the hypervisor. In this case,
  a failure message should be ignored in Fuel web UI.
  See `LP1381613 <https://bugs.launchpad.net/fuel/+bug/1381613>`_.

* When using vCenter as a hypervisor, vCenter can be used as a storage backend for Cinder.
  However, 'Storage - Cinder LVM' role is available when adding nodes.
  To work around this problem, you should add one node with ' Storage - Cinder LVM' role.
  See `LP1383224 <https://bugs.launchpad.net/fuel/+bug/1383224>`_.

* According to
  `VMware recommendations <http://docs.openstack.org/trunk/config-reference/content/vmware.html#VMwareVCDriver_configuration_options>`_.,
  ‘reserved_host_memory_mb’ nova-scheduler’s option should be set to 0,
  whereas Fuel uses a default value which is 512.
  This happens because vCenter is already doing a memory reservation
  and there is no valuable reason to do it twice.
  vCenter provides an aggregated memory from all ESXis in a
  vSphere cluster, and this option is applied to a cumulative
  value, but not to each individual ESXi node.
  Actually, 512MB memory is lost for each vSphere cluster.
  See `LP1382539 <https://bugs.launchpad.net/fuel/+bug/1382539>`_.

* Fuel does not try to connect to vCenter and verify credentials before deployment.
  See `LP1370723 <https://bugs.launchpad.net/fuel/+bug/1370723>`_.

* Speed of copying images between vCenter and non-VMDK Glance backends can be dramatically low.
  VMDK backend for Glance would fix this problem, but this approach is useless if multihypervisor environment is enabled.
  See `VMware vCenter templates available as Glance images blueprint <https://blueprints.launchpad.net/glance/+spec/hypervisor-templates-as-glance-images>`_.

* Currently, vCenter IP field does not take a hostname;
  only connection via IP address is supported.
  See `LP1370753 <https://bugs.launchpad.net/fuel/+bug/1370753>`_.

* On CentOS in HA mode on vCenter machine, cluster deployment finishes
  successfully, but nova-network service is not deployed at primary controller.
  You should not delete controller; otherwise, your environment will crash.
  See `LP1371638 <https://bugs.launchpad.net/fuel/+bug/11371638>`_.

* When  node with controller role is added to the environment,
  Cinder LVM stays unavailable. To work this problem around
  and unblock UI element, follow [TBD: post a link to external resource]
  See `LP1387636 <https://bugs.launchpad.net/fuel/+bug/1387636>`_.

For more information see:
.. include:: pages/release-notes/v6-0/vmware/9020-nsx.rst
