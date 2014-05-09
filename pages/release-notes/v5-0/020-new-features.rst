New Features in Mirantis OpenStack 5.0
======================================

Support for the latest stable OpenStack IceHouse release
--------------------------------------------------------

The OpenStack core projects in the Mirantis OpenStack hardened packages
support the
`OpenStack IceHouse 2014.1 <https://wiki.openstack.org/wiki/ReleaseNotes/Icehouse#OpenStack_2014.1_.28Icehouse.29_Release_Notes>`_ release.
Fuel 5.0 deploys this version of OpenStack on either CentOS or Ubuntu.

The Fuel Master Node is now upgradable
--------------------------------------

Mirantis OpenStack 5.0 includes architectural changes
to the Fuel Master Node
that will enable the master node to be upgraded in place to future releases.
This will enable customers to more easily upgrade
to new versions of the software
and take advantage of new capabilities present
in newer versions of the Fuel project and Mirantis OpenStack.

The Fuel Master Node can manage multiple version of Mirantis OpenStack
----------------------------------------------------------------------

Architectural changes to the Fuel Master node
will make it possible for one Fuel Master node
to manage environments that are running
different versions of Mirantis OpenStack.
In other words, when the next release of Mirantis OpenStack is released,
you can upgrade to the new Fuel version
and deploy a new environment with the new version,
but leave your OpenStack 5.0 environment in place;
the Fuel Master Node will be able to` add and delete nodes
and perform other operational functions
such as log management and Health Checks
on both the newly deployed
and your existing OpenStack 5.0 environments.

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

MongoDB is now the default database for OpenStack Telemetry (Ceilometer)
------------------------------------------------------------------------

Mirantis OpenStack 5.0 now defaults to installing MongoDB
as the recommended back-end database for OpenStack Telemetry.
The Fuel Master Node enables you to choose
the installation of MongoDB as a role onto a node.
This resolves the Ceilometer performance issues caused
by the volume of concurrent read/write operations.
