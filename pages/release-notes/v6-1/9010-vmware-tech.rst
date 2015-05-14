
.. _vmware-technologies-rn:

VMware support issues in Mirantis OpenStack
===========================================

.. _vcenter-rn:

Resolved issues with the vCenter integration
--------------------------------------------

* Upload of CirrOS TestVM image no longer fails
  due to broken pipe in Glance vSphere Store. See
  `LP1402354 <https://bugs.launchpad.net/bugs/1402354>`_.



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

* Murano is not enabled for vCenter.
  See
  `the related blueprint <https://blueprints.launchpad.net/fuel/+spec/enable-murano-support-for-vcenter>`_.

* According to the official
  `VMware recommendations <http://docs.openstack.org/kilo/config-reference/content/vmware.html>`_,
  ``reserved_host_memory_mb``
  nova-scheduler’s option should be set to 0,
  whereas Fuel uses a default value which is 512.
  The problem is that vCenter is already doing a memory
  reservation and there is no valuable reason to do it twice.
  The vCenter provides an aggregated memory from all ESXis in
  a vSphere cluster, and this option is applied to a cumulative value,
  but not to each individual ESXi node. Actually,
  512MB memory is lost for each vSphere cluster. See
  `LP1382539 <https://bugs.launchpad.net/bugs/1382539>`_.

* The vCenter credentials are not checked before deployment.
  That means, if you enter incorrect login and password, the
  deployment will fail. Please, check your credentials
  before deployment. See
  `LP1370723 <https://bugs.launchpad.net/bugs/1370723>`_.


.. include:: /pages/release-notes/v6-1/vmware/9020-nsx.rst

