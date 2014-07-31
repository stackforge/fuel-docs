New Features in Mirantis OpenStack 4.0
====================================== 

Mirantis OpenStack hardened packages support the latest stable OpenStack Havana maintenance release
---------------------------------------------------------------------------------------------------

The OpenStack core projects in the Mirantis OpenStack hardened packages
support the `OpenStack Havana 2013.2.1
<https://wiki.openstack.org/wiki/ReleaseNotes/2013.2.1>`_ release.
Fuel will deploy this version of OpenStack on CentOS or Ubuntu. For Red Hat Enterprise
Linux OpenStack Platform (RHEL-OSP), Fuel will deploy RHEL-OSP version 3.0,
which is based on Grizzly.

Ceilometer and Heat included in Mirantis OpenStack hardened packages
--------------------------------------------------------------------

The integrated Heat and Ceilometer projects are included in the Mirantis
OpenStack hardened packages. Heat is automatically deployed into each
environment. Ceilometer can optionally be deployed by Fuel on a
per-environment basis.

Murano has been updated
-----------------------

The Murano project now includes a metadata repository service used to
store deployment scenarios and support for Linux services. The demo image
has also been updated and now includes the Murano agent, which can be used to
test the cluster deployment with the Murano service.

