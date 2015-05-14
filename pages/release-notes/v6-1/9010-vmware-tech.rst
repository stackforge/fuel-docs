
.. _vmware-technologies-rn:

Issues in VMware technologies
=============================

.. _vcenter-rn:

Resolved Issues for VMware technologies
---------------------------------------


Known limitations with the vCenter integration
----------------------------------------------

VMware vCenter integration is fully supported in
Mirantis OpenStack 6.1, but with the following limitations:

* When you select Cinder VMDK, Cinder volume is not
  deployed on the controllers; instead, it requires a node
  with the *Cinder - LVM* role. This leads
  to unused storage volume.
  See `LP1410517 <https://bugs.launchpad.net/bugs/1410517>`_.

.. include:: /pages/release-notes/v6-1/vmware/9020-nsx.rst

