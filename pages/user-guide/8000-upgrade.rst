.. _upgrade-ug:

Upgrade from an Earlier Version
===============================

If you have a functional Mirantis OpenStack 5.0 cloud environment,
you can upgrade the Fuel Master Node to version 5.0.1.
After you do this, your new Fuel 5.0.1 console
can manage your existing 5.0 OpenStack environment(s),
create new 5.0 OpenStack environments,
as well as create and manage new 5.0.1 OpenStack environments.

.. note::

  This only upgrades the Fuel Master Node.
  It does not patch or upgrade the OpenStack environment.
  The ability to patch and upgrade OpenStack environments
  is planned for a future release.

If you are running Fuel 4.x or earlier,
you cannot upgrade but must install Mirantis OpenStack 5.0.1
and redeploy your environment to use the new release.

To upgrade the Fuel Master Node
that manages an existing Mirantis OpenStack 5.0 cloud environment:

#. Be sure that no installations are in progress in the environment!

#. Download the upgrade tarball from
   `<http://software.mirantis.com>`
   to a location on the Fuel Master Node
   that has at least 3GB of free space
   such as */var/tmp*.
   If your Fuel Master Node does not have an Internet connection,
   you may need to download to a local system
   and then transfer the file to the Fuel Master
   using **scp** or an SSH client.

#. Extract tarball contents:

    ::

       cd /var/tmp  # Use the directory where the tarball is located
       lrzuntar xxx.tar.lrz

#. Run the upgrade script from that same directory:

    ::

       ./upgrade.sh

   The upgrade process can take 30-60 minutes.
   Some operations (such as uploading images) take several minutes;
   the listing of updated files may slow down,
   but this does not mean that the upgrade process has hung.

When the upgrade is complete,
the following messages will appear
under the "Releases" tab on the Fuel UI:

   ::

      New release available: Icehouse on Ubuntu 12.04.4 (2014.1.1-5.0.1)
      New release available: Icehouse on CentOS 6.5 (2014.1.1-5.0.1)

