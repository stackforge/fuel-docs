

New Features in Mirantis OpenStack 5.0.1
========================================

Support for the latest stable OpenStack IceHouse release
--------------------------------------------------------
OpenStack core projects in the Mirantis OpenStack hardened packages
support the
`OpenStack IceHouse 2014.1.1 <https://wiki.openstack.org/wiki/ReleaseNotes/2014.1.1>`_ release.
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

.. See :ref:`upgrade-ug` for details and instructions.

::

  Note that this only upgrades the Fuel Master Node.
  It does not patch or upgrade the OpenStack environment.
  The ability to patch and upgrade OpenStack environments
  is planned for a future release.


