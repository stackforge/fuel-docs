
.. _vmware-technologies-rn:

Issues in VMware technologies
=============================

.. _vcenter-rn:

New Features and Resolved Issues in Mirantis OpenStack 6.0
----------------------------------------------------------
* vCenter as a Hypervisor and NSX as a networking option are now enabled in Fuel.
  Fuel 5.0 had a limited support of vCenter as a hypervisor and no NSX support at all,
  but OpenStack can be integrated with both these components.
  See `vCenter NSX support <https://blueprints.launchpad.net/fuel/+spec/vcenter-nsx-support>`_.

* Previously, 1-N mapping was used between nova-compute service and vSphere cluster
  (cluster that is formed from ESXi hosts by vCenter server); single nova-compute
  service instance used many vSphere clusters managed by a single vCenter. Currently,
  this behaviour is changed to 1-1 mapping, so that single nova-compute service
  instance interacts with a single vSphere cluster. What's more, now it is
  possible to add vSphere clusters to   deployed Mirantis OpenStack environment
  with vCenter as a hypervisor option. See `1-1 nova-compute vSphere cluster mapping
  <https://blueprints.launchpad.net/fuel/+spec/1-1-nova-compute-vsphere-cluster-mapping>`_.

* Nova-network now supports VLAN manager for vCenter.
  See `VLAN manager support for vCenter <https://blueprints.launchpad.net/fuel/+spec/vcenter-vlan-manager>`_.

* Currently, if vCenter installation is chosen, compute and controller
  are on one node and Ceilometer compute agent is now installed on that node, so metrics about
  instances is successfully collected.
  See `Ceilometer support for vCenter <https://blueprints.launchpad.net/fuel/+spec/ceilometer-support-for-vcenter>`_.

* NoVNCproxy now successfully works with vCenter.
  See `LP1368745 <https://bugs.launchpad.net/fuel/+bug/1368745>`_.

* Metadata services are available when vCenter is used as a hypervisor.
  It no longer affects cloud-init based images and all services using
  metadata information. See `LP1370165 <https://bugs.launchpad.net/fuel/+bug/1370165>`_.

Known limitations for the vCenter integration in 5.1
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

.. include:: pages/release-notes/v6-0/vmware/9020-nsx.rst
