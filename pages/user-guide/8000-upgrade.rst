
.. _upgrade-ug:

Upgrade from an Earlier Version
===============================

Fuel 5.0.1 provides the first phase of the in-place upgrades
for Mirantis OpenStack.
If you have a functional Fuel 5.0 cloud environment,
you can install the 5.0.1 onto the Fuel Master Node.
After you do this, your new Fuel 5.0.1 Fuel console
can manage your existing 5.0 OpenStack environment(s)
as well as any new OpenStack environments
you might be using.

The following functionality is not available for Fuel 5.0.1
but is planned for upcoming releases:

- Ability to patch the OpenStack environment
  **within the same OpenStack release**.
  For example, you will be able to patch
  your OpenStack Icehouse environment
  to a later version of Icehouse

- Ability to upgrade an OpenStack cloud environment
  to a new OpenStack release.
  For example, you will be able to perform inplace upgrade
  of your OpenStack Icehouse environment
  (Mirantis OpenStack 5.x)
  to the OpenStack Juno environment
  (Mirantis OpenStack 6.x).

Note that you cannot do an in-place upgrade of an environment
that is running Mirantis OpenStack 4.x or earlier.
You must, instead, redeploy your environment
to use the new release.

To upgrade the Fuel Master Node
that manages an existing Mirantis OpenStack 5.0 cloud environment:

#. Be sure that no installations are in progress in the environment!

#. Download the upgrade tarball from
   `<http://software.mirantis.com>` to a local system.

#. Use **scp** or your SSH client to copy the tarball to a location on the
   Fuel Master Node disk that has adequate space, such as */var/tmp*.

#. Extract tarball contents:

    ::

       cd /var/tmp  # Use the directory where the tarball is located
       tar -xf xxx.tar

#. Run the upgrade script from that same directory:

    ::

       ./upgrade.sh

The upgrade process can take 30-60 minutes.
When it is complete,
one of the following messages will appear on the Fuel UI:

   New release available: Icehouse on Ubuntu 12.04.4 (2014.1.1-5.0.1)
   New release available: Icehouse on CentOS 6.5 (2014.1.1-5.0.1)

