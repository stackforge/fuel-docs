
New Features in Mirantis OpenStack 5.0.1
========================================

Support for the latest stable OpenStack IceHouse release
--------------------------------------------------------
penStack core projects in the Mirantis OpenStack hardened packages
support the
`OpenStack IceHouse 2014.1.1 <https://wiki.openstack.org/wiki/ReleaseNotes/2014.1.1>`_ release.
Fuel 5.0.1 deploys this version of OpenStack on either CentOS or Ubuntu.

The Fuel Master Node is now upgradable
--------------------------------------

Mirantis OpenStack 5.0 included architectural changes
to the Fuel Master Node
that enable the master node to be upgraded in place
with this release.
You do not need to redeploy your existing Mirantis OpenStack Environment
to take advantage of the 5.0.1 enhancements;
instead, you can upgrade that environment.
See 

The Fuel Master Node can manage multiple versions of Mirantis OpenStack
-----------------------------------------------------------------------

The architectural changes made to the Fuel Master node in version 5.0
now make it possible for one Fuel Master node
to manage environments that are running
different versions of Mirantis OpenStack.
In other words, if you are running a Mirantis OpenStack 5.0 environment,
you can now upgrade to Fuel 5.0.1
and deploy a new environment with the new version,
but leave your OpenStack 5.0 environment in place;
the Fuel Master Node will be able to add and delete nodes
and perform other operational functions
such as log management and Health Checks
on both the newly deployed 5.0.1 environment
and your existing OpenStack 5.0 environments.


