New Features in Mirantis OpenStack 6.0
======================================

Support for the latest OpenStack Juno release
---------------------------------------------

The OpenStack core projects in the Mirantis OpenStack hardened packages
support the
`OpenStack Juno 2014.???
<https://wiki.openstack.org/wiki/ReleaseNotes/Juno>`_ release.
Fuel 6.0 deploys this version of OpenStack on either CentOS or Ubuntu.

The Fuel Master Node can be upgraded from ???
-----------------------------------------------

[OLD TEXT]
If you are running a Mirantis OpenStack 5.0 or 5.0.1 environment,
you can upgrade your Fuel Master Node to Fuel 5.1
but leave your current Mirantis OpenStack environments in place
without requiring a redeployment.
After the upgrade, the Fuel Master Node can deploy
a new Mirantis OpenStack 5.1 environment
and manage environments that were deployed with an earlier Fuel version,
performing operational functions
such as adding and deleting nodes,
viewing logs, and running Health Checks.

Upgrading the Fuel Master Node
does not update the OpenStack environment.
See below for information about updating OpenStack environments.

See :ref:`upgrade-ug` for instructions.


Fuel 6.0 can update existing ????? Mirantis OpenStack environments to ????? (Experimental)
------------------------------------------------------------------------------------------

[OLD TEXT]
Starting with version 5.1,
an :ref:`experimental feature<experimental-features-term>`
enables the Fuel Master Node to update
existing 5.0.x environments to 5.0.2.
Once the Fuel Master Node is upgraded,
the UI provides an option to update
an existing 5.0.x environment to 5.0.2.

5.0.2 is a technical release that contains
some of the bug fixes that are included in 5.1
and the 2014.1.1 maintenance release of Icehouse.
Release 5.1 includes some significant architectural modifications
that make it impossible to update a 5.0.x environment to 5.1,
so Mirantis is offering the 5.0.2 release
to provide the fixes that can be applied to the existing architecture.

See :ref:`update-openstack-environ-ug` for instructions.
You can also use Fuel CLI to update the environment;
see :ref:`cli_usage` for details.

.. note::
  If you are running Fuel 4.x or earlier,
  you cannot upgrade but must install Mirantis OpenStack 5.1
  and redeploy your environment to use the new release.

Additional Information
----------------------

For current information about Issues and Blueprints
for Mirantis OpenStack 5.1, see the
`Fuel for OpenStack 6.0 Milestone <https://launchpad.net/fuel/+milestone/6.0>`_
page.

