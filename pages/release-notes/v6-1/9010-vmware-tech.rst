
.. _vmware-technologies-rn:

VMware support issues in Mirantis OpenStack
===========================================

.. _vcenter-rn:


Known limitations with the vCenter integration
----------------------------------------------

VMware vCenter integration is fully supported in
Mirantis OpenStack 6.1, but with the following limitations:

* The first launch of ``Check create, update and delete image
  actions using Glance v2`` OSTF test fails. If launched
  once again, it finishes successfully: Glance works
  without failures with Horizon or the Fuel CLI.
  See `LP1455468 <https://bugs.launchpad.net/bugs/1455468>`_.

* Creating volume from image in Cinder with vCenter backend
  is not supported.
  Note, that this is expected behaviour.
  See `LP1455565 <https://bugs.launchpad.net/bugs/1455565>`_.

* The nova-compute fails to start if vCenter cluster has no ESXi hosts.
  In 6.1 release, each vCenter cluster is served by a
  dedicated nova-compute instance; that means,
  this issue will make a particular nova-compute service
  inavailable.
  See `LP1404123 <https://bugs.launchpad.net/bugs/1404123>`_.

.. include:: /pages/release-notes/v6-1/vmware/9020-nsx.rst

