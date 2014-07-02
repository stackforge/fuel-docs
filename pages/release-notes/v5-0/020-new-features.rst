Features First Released in Mirantis OpenStack 5.0
=================================================

Support for the initial OpenStack IceHouse release
-----------------------------------------------------

The OpenStack core projects in the Mirantis OpenStack hardened packages
support the
`OpenStack Icehouse 2014.1 <https://wiki.openstack.org/wiki/ReleaseNotes/Icehouse#OpenStack_2014.1_.28Icehouse.29_Release_Notes>`_ release.
Fuel 5.0 deploys this version of OpenStack on either CentOS or Ubuntu.

vCenter can provide access to compute resources from attached ESXi servers
--------------------------------------------------------------------------

Mirantis OpenStack 5.0 offers the choice of VMWare vCenter
as a hypervisor technology,
enabling customers with existing VMWare vCenter
and ESXI server environments
to utilize ESXi servers as compute resources for Mirantis OpenStack.
Fuel will install a Nova-compute service
with the VMWare vCenter server driver activated onto a controller node.
This service then communicates directly with vCenter
so that the OpenStack scheduler can create
VM instances on ESXi servers.
See :ref:`vcenter-plan`
for information about planning your vSphere integration
and links to instructions for setting up and installing your environment.

MongoDB is now the default database for OpenStack Telemetry (Ceilometer)
------------------------------------------------------------------------

Mirantis OpenStack 5.0 now defaults to installing :ref:`MongoDB<mongodb-term>`
as the recommended back-end database
for OpenStack Telemetry (Ceilometer).
When deploying your OpenStack environment with Fuel,
you must deploy MongoDB roles in order to install Ceilometer;
you should deploy an odd number of MongoDB roles,
preferably one per Controller node.
This resolves the Ceilometer performance issues caused
by the volume of concurrent read/write operations.
It is possible (although highly **not** recommended)
to manually revert to using MySQL as the database for Ceilometer
after the environment is deployed.
