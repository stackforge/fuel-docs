
.. _vmware-technologies-rn-upd:

Issues in VMware technologies
=============================

.. _vcenter-rn:

Issues First Resolved in Mirantis OpenStack 6.0
-----------------------------------------------

* Nova-network now supports VLAN manager for vCenter.
  See `VLAN manager support for vCenter <https://blueprints.launchpad.net/fuel/+spec/vcenter-vlan-manager>`_.

* The speed of Glance-vCenter interaction is now improved.
  If you encounter any problems, please check your vCenter version and consider updating.
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

* *VMware vCenter/ESXi* option is added to the *Storage Backends*
  tab for Cinder in wizard.
  By default, when you deploy vCenter,
  this is the only available option.
  See `LP1359696 <https://bugs.launchpad.net/fuel/+bug/1359696>`_.

* VMDK CirrOS packages are rebuilt: now they include
  SCSI drivers and correct adapter type.
  See `LP1365468 <https://bugs.launchpad.net/bugs/1365468>`_.

* Nova-network clean-up script is improved
  to address an issue with the VLAN manager.
  See `LP1392719 <https://bugs.launchpad.net/fuel/+bug/1392719>`_.

* Deployment no longer fails when VMware vCenter is used as hypervisor.
  See `LP1388113 <https://bugs.launchpad.net/fuel/+bug/1388113>`_.

* Fuel no longer recommends that you deploy Compute nodes when there is no
  need to have several Computes.
  See `LP1381613 <https://bugs.launchpad.net/fuel/+bug/1381613>`_.

* Previously, the name and the description of the Storage role
  ("Storage - Cinder LVM")
  mentioned that this role provided block storage over
  iSCSI and uses LVM. That is not true for cases when VMware vCenter
  is used as a backend for storage. This role now has
  a common name, "Storage - Cinder", that also fits vCenter environments.
  See `LP1383224 <https://bugs.launchpad.net/bugs/1383224>`_.

Issues Resolved in Mirantis OpenStack 6.0.1
-------------------------------------------

* Previously, when you selected Cinder VMDK,
  cinder-volume was not deployed on the controllers.
  Instead, it required a node with the Cinder role
  that resulted in the unused storage volume.
  See `LP1410517 <https://bugs.launchpad.net/bugs/1410517>`_.


Known limitations with the vCenter integration
----------------------------------------------

VMware vCenter integration is not fully supported in
Mirantis OpenStack 6.0.1, but with the following limitations:

* Nova-compute fails to start if at least one
  vCenter cluster specified in nova.conf file has no ESXi present.
  This leads to full unavailability of nova-compute because all
  vCenter clusters are also served by one nova-compute
  instance.
  See `LP1404123 <https://bugs.launchpad.net/bugs/1404123>`_.

* When vCenter is selected as the hypervisor,
  all Ceph, Cinder, and Nova options are disabled
  in the storage settings.
  Ceph for vCenter installations is not supported in Fuel 6.0.1 at all.

* vCenter has very limited support for Ceilometer.
  Not all metrics about
  instances is collected.
  See
  `Ceilometer support for vCenter <https://blueprints.launchpad.net/fuel/+spec/ceilometer-support-for-vcenter>`_ blueprint.

* Murano is not enabled for vCenter.
  See
  `Enable Murano support for vCenter <https://blueprints.launchpad.net/fuel/+spec/enable-murano-support-for-vcenter>`_ blueprint.

* Fuel recommends that you deploy Compute nodes although there is no
  need to have several Computes. In this case,
  a failure message should be ignored in the Fuel web UI.
  See `LP1381613 <https://bugs.launchpad.net/fuel/+bug/1381613>`_.


.. include:: /pages/release-notes/v6-0/vmware/9020-nsx.rst

