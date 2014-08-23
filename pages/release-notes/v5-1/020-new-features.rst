New Features in Mirantis OpenStack 5.1
======================================

Support for the latest OpenStack IceHouse release
-------------------------------------------------

The OpenStack core projects in the Mirantis OpenStack hardened packages
support the
`OpenStack Icehouse 2014.1.1
<https://wiki.openstack.org/wiki/ReleaseNotes/2014.1.1>`_ release.
Fuel 5.1 deploys this version of OpenStack on either CentOS or Ubuntu.

The Fuel Master Node can be upgraded from 5.0.x
-----------------------------------------------

If you are running a Mirantis OpenStack 5.0 or 5.0.1 environment,
you can upgrade your Fuel Master Node to Fuel 5.1
but leave your current Mirantis OpenStack environments in place
without requiring a redeployment.
The Fuel Master Node retains the ability to add and delete nodes
and perform other operational functions
such as log management and Health Checks on current or previous environments.
After the upgrade, the Fuel Master Node can also deploy
a new Mirantis OpenStack 5.1 environment
or a version of Mirantis OpenStack from which you upgraded.

The following table summarizes the available progressions
for upgrades to the Fuel Master Node:

+----------------------+-------------------------+-----------------------------+
| Initial Fuel version | Fuel can be upgraded to | Upgraded Fuel can deploy    |
|                      |                         | Mirantis OpenStack versions |
+======================+=========================+=============================+
| 5.0                  | 5.1                     | 5.0, 5.0.2, 5.1             |
+----------------------+-------------------------+-----------------------------+
| 5.0                  | 5.0.1, then to 5.1      | 5.0, 5.0.1, 5.0.2, 5.1      |
+----------------------+-------------------------+-----------------------------+
| 5.0.1                | 5.1                     | 5.0.1, 5.0.2, 5.1           |
+----------------------+-------------------------+-----------------------------+
| 5.1                  | N/A                     | 5.1                         |
+----------------------+-------------------------+-----------------------------+

5.0.2 is a technical release that contains
the bug fixes that are included in 5.1
but does not include any additional 5.1 features;
it is included in the 5.1 ISO/IMG file
and can be applied to running 5.0 and 5.0.1 environments.

Upgrading the Fuel Master Node
does not automatically patch or update the OpenStack environment.
See below for information about patching and updating OpenStack environments.

See :ref:`upgrade-ug` for instructions.


Fuel can now patch (update) existing Mirantis OpenStack environments
--------------------------------------------------------------------

Starting with version 5.1, the Fuel Master Node can patch (update)
existing environments from one version of Mirantis OpenStack to another.
Once the Fuel Master Node is upgraded,
the UI provides an option to update an existing environment
to the new patch or update packages.

For example, Mirantis OpenStack 5.0 is based on the 2014.1 version of Icehouse.
Mirantis OpenStack contains the packages required
to update an Icehouse 2014.1 OpenStack environment (deployed with 5.0)
to Icehouse 2014.1.1 (deployed with 5.0.1 and 5.1).
In Mirantis OpenStack 5.1,
this update package is labeled as “2014.1.1-5.0.2”
and is available from the Actions tab in the Update panel.

Note that this capability will patch or update an OpenStack environment
with the same major release version.
In other words, the feature can patch or update an Icehouse environment
from one maintenance release to the next,
but is not able to upgrade an Icehouse environment to Juno.
This upgrade capability is being considered
for a future version of Mirantis OpenStack.

See :ref:`patch-openstack-ug` for instructions.

Fuel is now protected by access control
---------------------------------------

When using either the Fuel UI or Fuel APIs,
users will be asked to provide authentication credentials (e.g. user name and password).
These credentials and the authentication process
are handled by a local instance of Keystone
that is present on the Fuel Master Node.
Users can change their passwords
using the :ref:`Fuel Setup menus<password-pxe>` during installation,
from the :ref:`Fuel console<start-create-env-ug>`,
or from the :ref:`Fuel CLI<cli_usage>`.

More information on setting and updating the user names and passwords
for the system can be found in the on-line documentation.

Mirantis OpenStack now deploys the ML2 Open vSwitch plug-in for Neutron
-----------------------------------------------------------------------
Starting with Havana, the legacy plug-in structure for Neutron
has been deprecated and replaced with a Modular Layer 2 (ML2) plugin structure.
This change enables Neutron to utilize a variety of Layer 2 network technologies
rather than being locked into the monolithic structure
found in previous releases of OpenStack.
Mirantis OpenStack 5.1 now defaults to this new ML2 Open vSwitch plugin
when deploying Neutron into an environment.

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
Mirantis OpenStack 5.1 enables you to select VMWare NSX as an networking option.
Note that VMWare NSX is not supplied with Mirantis OpenStack;
VMWare NSX must be purchased directly from VMWare.

