New Features in Mirantis OpenStack 5.1
======================================

Support for the latest OpenStack IceHouse release
-------------------------------------------------

The OpenStack core projects in the Mirantis OpenStack hardened packages
support the
`OpenStack Icehouse 2014.1.1
<https://wiki.openstack.org/wiki/ReleaseNotes/2014.1.3>`_ release.
Fuel 5.1 deploys this version of OpenStack on either CentOS or Ubuntu.

The Fuel Master Node can be upgraded from 5.0.x and 5.1
-------------------------------------------------------

The Upgrade feature introduced in Mirantis OpenStack 5.1
has been extended in Release 5.1.1.
If you are running a Mirantis OpenStack 5.0.x or 5.1 environment,
you can upgrade your Fuel Master Node to Fuel 5.1.1
but leave your current Mirantis OpenStack environments in place.
After the upgrade, the Fuel Master Node can deploy
a new Mirantis OpenStack 5.1.1 environment
and manage environments that were deployed with an earlier Fuel version,
performing operational functions
such as adding and deleting nodes,
viewing logs, and running Health Checks.

Upgrading the Fuel Master Node
does not update the OpenStack environment.
See below for information about updating OpenStack environments.

See :ref:`upgrade-ug` for instructions.

Fuel 5.1.1 can update some existing Mirantis OpenStack environments (Experimental)
----------------------------------------------------------------------------------

After you upgrade the Fuel Master Node to 5.1.1,
an :ref:`experimental feature<experimental-features-term>`
enables the Fuel Master Node to perform the following updates:

- Existing 5.1 environments can be updated to 5.1.1.

- Existing 5.0.x environments can be updated to 5.0.3.

5.0.3 is a technical release that contains
some of the bug fixes that are included in 5.1 and 5.1.1
and the 2014.1.1 and 2014.1.3 maintenance releases of Icehouse.
Release 5.1 includes some significant architectural modifications
that make it impossible to update a 5.0.x environment to 5.1.x,
so Mirantis offers the 5.0.3 release
to provide the fixes that can be applied to the existing architecture.

:ref:`update-openstack-environ-ug` gives instructions
for updating your OpenStack environment.
You can also use Fuel CLI to update the environment;
see :ref:`cli_usage` for details.

.. note::
  If you are running Fuel 4.x or earlier,
  you cannot upgrade but must install Mirantis OpenStack 5.1
  and redeploy your environment to use the new release.

New Features First Introduced in Mirantis OpenStack 5.1
=======================================================

The following features were first introduced
in Mirantis OpenStack 5.1.

Fuel is now protected by access control
---------------------------------------

When using either the Fuel UI or Fuel APIs,
users will be asked to provide authentication credentials
(in other words, user name and password).
Beginning with Release 5.1.1,
these credentials are also required
when updating Fuel to the latest release.
These credentials and the authentication process
are handled by a local instance of Keystone
that is present on the Fuel Master Node.
Users can change their passwords
using the :ref:`Fuel Setup menus<password-pxe>` during installation,
from the :ref:`Fuel console<start-create-env-ug>`,
or from the :ref:`Fuel CLI<cli_usage>`.

Information about setting and updating the user names and passwords
for the system can be found in :ref:`fuel-passwd-ops`.

Mirantis OpenStack now deploys the ML2 Open vSwitch plug-in for Neutron
-----------------------------------------------------------------------
Starting with Havana, the legacy plug-in structure for Neutron
has been deprecated and replaced with
a Modular Layer 2 (:ref:`ML2<ml2-term>`) plugin structure.
This change enables Neutron to utilize a variety of Layer 2 network technologies
rather than being locked into the monolithic structure
found in previous releases of OpenStack.
Mirantis OpenStack 5.1 now defaults to this new ML2 Open vSwitch plugin
when deploying Neutron into an environment.
See also :ref:`ml2-create-ops`.

Experimental features must be explicitly enabled for Mirantis OpenStack
-----------------------------------------------------------------------

In previous versions of Mirantis OpenStack,
experimental features were enabled by default and could not be turned off.
Starting with Mirantis OpenStack 5.1,
experimental features are disabled by default
and require an explicit action to enable the features.
See :ref:`experimental-features-term` for more information.

The Fuel Master Node can now be backed up and restored
------------------------------------------------------
Building on the :ref:`Docker<docker-term>` packaging architecture
introduced in Mirantis Openstack 5.0,
the current state of the Fuel Master Node
can now be backed up and, if necessary, restored.
This must be done from the command line.
See :ref:`Backup_and_restore_Fuel_Master` for instructions.

VMware NSX is now supported as a network option
-----------------------------------------------
VMWare NSX is a is a software-defined network (SDN)
that uses controllers and overlay networking.
Mirantis OpenStack 5.1 enables you to select VMWare NSX as an networking option
when using the KVM hypervisor.
Note that VMWare NSX is not supplied with Mirantis OpenStack;
VMWare NSX must be purchased directly from VMWare.

In Release 5.1, Mirantis OpenStack requires an NSX Service node
in order to operate an NSX cluster.
OpenStack itself can be used with an NSX cluster
that lacks a Service node,
but the Neutron NSX plug-in used for Mirantis OpenStack
is configured to use the Service node.
