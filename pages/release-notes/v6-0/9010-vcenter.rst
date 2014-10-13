
.. _vcenter-rn:

vCenter
=======

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

* When using the VMDK driver,
  instances must be deployed to use operating systems
  that support SCSI adapter.
  This means that the CirrOS image (which only supports IDE disks)
  cannot be used with VMDK.
  The `VMware vSphere documentation <http://docs.openstack.org/trunk/config-reference/content/vmware.html#VMware_converting_images>`_
  contains more information.
  See `LP1365468 <https://bugs.launchpad.net/bugs/1365468>`_.

