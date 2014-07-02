

New Features in Mirantis OpenStack 5.0.1
========================================

Support for the latest stable OpenStack IceHouse release
--------------------------------------------------------
Mirantis OpenStack 5.0.1 provides hardened packages
of the core OpenStack components
that are included in the
`OpenStack Icehouse 2014.1.1 <https://wiki.openstack.org/wiki/ReleaseNotes/2014.1.1>`_ release.
Fuel 5.0.1 can deploy this version of OpenStack on either CentOS or Ubuntu.

The Fuel Master Node is now upgradable
--------------------------------------

If you are running a Mirantis OpenStack 5.0 environment,
you can now upgrade to Fuel 5.0.1
but leave your OpenStack 5.0 environment in place.
After the upgrade,
the Fuel Master Node will be able to deploy
either a Mirantis OpenStack 5.0 or 5.0.1 environment.
It can add and delete nodes
and perform other operational functions
such as log management and Health Checks
on either a 5.0.1 environment
or a 5.0 environment.
See :ref:`upgrade-ug` for details and instructions.

.. Note:: This only upgrades the Fuel Master Node.
   It does not patch or upgrade the OpenStack environment.
   The ability to patch and upgrade OpenStack environments
   is planned for a future release.

To deploy a Mirantis OpenStack 5.0 environment from the Fuel 5.0.1 dashboard,
choose one of the 2014.1 distros for the environment
on the :ref:`name-distro-ug` screen.


