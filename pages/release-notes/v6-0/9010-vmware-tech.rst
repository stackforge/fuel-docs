
.. _vmware-technologies-rn:

Issues in VMware technologies
=============================

.. _vcenter-rn:

New Features and Resolved Issues in Mirantis OpenStack 6.0
----------------------------------------------------------

* Nova-network now supports VLAN manager for vCenter.
  See `VLAN manager support for vCenter <https://blueprints.launchpad.net/fuel/+spec/vcenter-vlan-manager>`_.

* The speed of Glance-vCenter interaction was improved.
  If still some problems occur, check your vCenter version and update it.
  See `VMware support resource <https://www.vmware.com/support/vsphere5/doc/vsphere-vcenter-server-55u2-release-notes.html>`_ and `vSphere as Glance backend <https://blueprints.launchpad.net/fuel/+spec/vsphere-glance-backend>`_ blueprint.

* Sahara is now supported in vCenter. For instructions on
  building and converting images for vCenter, visit
  `Building Images for Vanilla Plugin¶ <http://sahara.readthedocs.org/en/stable-juno/userdoc/diskimagebuilder.html>`_.
  See `LP1370708 <https://bugs.launchpad.net/fuel/+bug/1370708>`_.

* NoVNCproxy now successfully works with vCenter.
  See `LP1368745 <https://bugs.launchpad.net/fuel/+bug/1368745>`_.

* Metadata services are available when vCenter is used as a hypervisor.
  It no longer affects cloud-init based images and all services using
  metadata information. See `LP1370165 <https://bugs.launchpad.net/fuel/+bug/1370165>`_.

* VMware DataStore option is added to the **Storage Backends**
  tab for Cinder in wizard.
  By default, when you deploy vCenter with Cinder configured as a VMDK driver,
  this is the only available option.
  See `LP1359696 <https://bugs.launchpad.net/fuel/+bug/1359696>`_.


Known limitations for the vCenter integration in 6.0
----------------------------------------------------

The vCenter integration with Mirantis OpenStack 6.0 is fully supported,
but it has some known limitations:

* When vCenter is selected as the hypervisor,
  all Ceph, Cinder, and Nova options are disabled
  in the storage settings.
  Note that Ceph for vCenter installations is not supported in Fuel 6.0 at all.

* vCenter has very limited support for Ceilometer.
  Not all metrics about
  instances is collected.
  See
  `Ceilometer support for vCenter <https://blueprints.launchpad.net/fuel/+spec/ceilometer-support-for-vcenter>`_ blueprint.

* Murano is not enabled for vCenter.
  See
  `Enable Murano support for vCenter <https://blueprints.launchpad.net/fuel/+spec/enable-murano-support-for-vcenter>`_ blueprint.

* When using the Cinder VMDK driver,
  instances must be deployed to use operating systems
  that support SCSI adapter.
  This means that the CirrOS image (which only supports IDE disks)
  cannot be used with Cinder volumes.
  The `VMware vSphere documentation <http://docs.openstack.org/trunk/config-reference/content/vmware.html#VMware_converting_images>`_
  contains more information.
  See `LP1365468 <https://bugs.launchpad.net/bugs/1365468>`_.

* If you use Glance in vCenter, Fuel web UI displays no warning if Glance settings
  were not entered. In this case, environment will be deployed with an error.
  See `LP1382021 <https://bugs.launchpad.net/fuel/+bug/1382021>`_.

* Fuel recommends you to deploy Compute nodes although there is no
  need to have several Computes. In this case,
  a failure message should be ignored in Fuel web UI.
  See `LP1381613 <https://bugs.launchpad.net/fuel/+bug/1381613>`_.

* When using vCenter as a hypervisor, vCenter can be used as a storage backend for Cinder.
  However, **Storage - Cinder LVM** role is only available storage node when adding nodes.
  It's just a naming problem, so installing this role will enable Cinder VMDK feature.
  See `LP1383224 <https://bugs.launchpad.net/fuel/+bug/1383224>`_.

* According to
  `VMware recommendations <http://docs.openstack.org/trunk/config-reference/content/vmware.html#VMwareVCDriver_configuration_options>`_.,
  ‘reserved_host_memory_mb’ nova-scheduler’s option should be set to 0,
  whereas Fuel uses a default value which is 512.
  The problem is that vCenter is already doing a memory reservation
  and there is no valuable reason to do it twice.
  vCenter provides an aggregated memory from all ESXis in a
  vSphere cluster, and this option is applied to a cumulative
  value, but not to each individual ESXi node.
  Actually, 512MB memory is lost for each vSphere cluster.
  See `LP1382539 <https://bugs.launchpad.net/fuel/+bug/1382539>`_.

* Fuel does not try to connect to vCenter and verify credentials before deployment.
  If you do not use Glance with VMDK as a backend, deployment might
  finish successfully even if credentials or connectivity do not work.
  In this case, you have to redeploy the environment or change credentials on it manually.
  See `LP1370723 <https://bugs.launchpad.net/fuel/+bug/1370723>`_.

* Deployment fails when VMware vCenter is used as hypervisor.
  At the end of deployment process
  TestVM glance image is being created using CirrOS.
  When vCenter is used, **glance image-create** command expects
  */opt/vm/cirros-i386-disk.vmdk* vmdk image
  on Controller node, but this image file is missing.
  See `LP1388113 <https://bugs.launchpad.net/fuel/+bug/1388113>`_.

* Fuel 6.0 supports VLAN manager, but the following problem occurs:
  failover of a Controller, when nova-network moves to another Controller,
  provides no clean-up procedure for removing unnecessary IP addresses,
  firewall rules and stopping DHCP servers on a failed Controller.
  This may lead to network problems with VMs
  See `LP1392719 <https://bugs.launchpad.net/fuel/+bug/1392719>`_.

.. include:: pages/release-notes/v6-0/vmware/9020-nsx.rst

