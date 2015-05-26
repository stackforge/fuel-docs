
.. _vmware-technologies-rn:

Issues in VMware technologies
=============================

.. _vcenter-rn:

Resolved Issues for VMware technologies
---------------------------------------

* If vCenter is selected as hypervisor, radosgw and Ceph RBD
  can be used by Glance now. Only Ceph storage backends for
  Cinder and Nova are disabled, Ceph can still be used as a
  storage backend for Glance and Swift/S3 object storage.
  See `LP1316377`_.

Known limitations with the vCenter integration
----------------------------------------------

VMware vCenter integration is fully supported in
Mirantis OpenStack 6.1, but with the following limitations:


.. include:: /pages/release-notes/v6-1/vmware/9020-nsx.rst

.. Links
.. _`LP1316377`: https://bugs.launchpad.net/fuel/6.1.x/+bug/1316377
