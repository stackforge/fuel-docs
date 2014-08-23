
About Releases 5.1 and 5.0.2
============================

Release 5.1 is the latest release in the Mirantis OpenStack product line.
It includes a number of new features and bug fixes
for Fuel and Mirantis OpenStack;
these are documented later in this document.
Users who are running earlier versions of Fuel 5.x
can upgrade to Fuel 5.1 rather than doing a fresh install.
When you upgrade to Fuel 5.1,
you can use your 5.1 Fuel UI to manage any 5.x environments
that you had previously installed.

Release 5.1 includes some significant architectural modifications
that make it impossible to upgrade a 5.0.x environment to 5.1.
For this reason, the 5.1 upgrade tarball
also includes Release 5.0.2,
which is a technical release containing
many of the bug fixes that are included in 5.1.
When you upgrade to Release 5.1,
the software is provided to upgrade
existing 5.0.x environments to 5.0.2.
5.0.2 environments do not have access to all the features
and bug fixes that are included in Release 5.1
but it does include all the fixes that can be applied to the existing architecture.
To up grade an existing environment,
use the "Actions" tab on the Fuel 5.1 console.

See :ref:`upgrade-patch-top-ug` for more details.

.. note::
  If you are running Fuel 4.x or earlier,
  you cannot upgrade but must install Mirantis OpenStack 5.1
  and redeploy your environment to use the new release.

