
The Fuel Master Node can be upgraded from 5.1.x to 6.0 GA
---------------------------------------------------------

If you are running a Mirantis OpenStack 5.1 or 5.1.1 environment, you can
upgrade your Fuel Master Node to Fuel 6.0 and keep your current Mirantis
OpenStack environments in place without requiring a redeployment. After the
upgrade, the Fuel Master Node can deploy a new Mirantis OpenStack 6.0
environment and manage environments that were deployed with an earlier Fuel
version, performing operational functions such as adding and deleting nodes,
viewing logs, and running Health Checks.

Internal enhancements have been implemented to improve the upgrade experience.
These include:

- The upgrade tarball is smaller than in earlier releases. This simplifies the
  distribution workflow, reduces the amount of time required to download and
  unpack the tarball, and reduces the amount of free space on the Fuel Master
  node that is required for the upgrade.

- Users must supply a password during upgrade.

Upgrading the Fuel Master Node does not update the OpenStack environment. See
below for information about updating OpenStack environments.

See :ref:`upgrade-ug` for instructions.

.. note::
  Upgrade from 6.0 Technical Preview to 6.0 GA is not supported.

