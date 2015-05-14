
.. _vmware-technologies-rn:

VMware support issues in Mirantis OpenStack
===========================================

.. _vcenter-rn:


Known limitations with the vCenter integration
----------------------------------------------

VMware vCenter integration is fully supported in
Mirantis OpenStack 6.1, but with the following limitations:

* Creating volume from image fails
  in vCenter-Cinder availability zone.
  Note, that this is expected behaviour.
  See `LP1455565 <https://bugs.launchpad.net/bugs/1455565>`_.

* The nova-compute fails to start if vCenter cluster has no ESXi hosts.
  In 6.1 release, each vCenter cluster is served by a
  dedicated nova-compute instance; that means,
  this issue will make a particular nova-compute service
  inavailable.
  See `LP1404123 <https://bugs.launchpad.net/bugs/1404123>`_.

.. include:: /pages/release-notes/v6-1/vmware/9020-nsx.rst

