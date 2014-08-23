.. _upgrade-ug:

Upgrade from an Earlier Version
===============================

If you have a functional Mirantis OpenStack 5.x environment,
you can upgrade the Fuel Master Node to version 5.1
but leave your current environments in place.
After you do this, your new Fuel 5.1 console
can manage your existing 5.0 and 5.0.1 OpenStack environment(s),
create new OpenStack environments for any 5.x version,
and create and manage new 5.1 OpenStack environments.

.. note::
  If you are running Mirantis OpenStack 5.0,
  you must upgrade to version 5.0.1
  before you can upgrade to version 5.1.

If you are deploying Fuel 5.1 on a system
that is not running an earlier Fuel 5.x version,
you cannot use Fuel to create or manage environments
for earlier versions of Fuel 5.x.
The following table summarizes the available progressions:

+--------------------------+--------------------------+------------------------------------+
| First version installed  | Upgraded to version(s)   | Available versions for deployment  |
+==========================+==========================+====================================+
| 5.0                      | 5.1                      | 5.0, 5.1                           |
+--------------------------+--------------------------+------------------------------------+
| 5.0                      | 5.0.1, then 5.0.1 to 5.1 | 5.0, 5.0.1, 5.1                    |
+--------------------------+--------------------------+------------------------------------+
| 5.0.1                    | 5.0.1                    | 5.0, 5.0.1, 5.1                    |
+--------------------------+--------------------------+------------------------------------+
| 5.0                      | N/A                      | 5.1                                |
+--------------------------+--------------------------+------------------------------------+

.. note::
  If you are running Fuel 4.x or earlier,
  you cannot upgrade but must install Mirantis OpenStack 5.1
  and redeploy your environment to use the new release.

Note that this only upgrades the Fuel Master Node;
you must patch the OpenStack environment separately
as described in the next section.

To upgrade the Fuel Master Node:

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
       tar -xf xxx.tar

    .. note::
      The upgrade script can work on the packed tar file
      but unpacking the archive before running the upgrade script
      reduces the time required to run the upgrade script.
   

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

      New release available: Icehouse on Ubuntu 12.04.4 (2014.1.1-5.0.2)
      New release available: Icehouse on CentOS 6.5 (2014.1.1-5.0.2)


.. _patch-openstack-ug:

Patch your OpenStack environment
================================

After you upgrade Fuel to 5.1 from an earlier version,
you can use Fuel to update your
deployed OpenStack environments
to the Icehouse 2014.1.1 maintenance release.

To do this:

- Upgrade the Fuel Master node to Fuel 5.1
- Open an environment that was deployed with Fuel 5.0 or 5.0.1.
- Click on the "Action" tab.
- Select the update package you want.
  Fuel downloads the appropriate package(s)
  to the Fuel Master node.
- Fuel prompts you to update the environment
  to the new level.

The upgrade package names are formed
by concatenating the OpenStack version number
with the Fuel release number.
For example,
this update package labeled as “2014.1.1-5.0.2”
updates your environment to Icehouse 2014.1.1
with Fuel 5.0.2.
Fuel 5.0.2 is an enhanced version of Fuel 5.0.1
that is used only for upgrades;
because of internal architectural modifications
for Fuel 5.1,
it is not possible to patch from Fuel 5.0.x to 5.1.

Note that you can patch an Icehouse environment
to a new maintenance release
but you cannot patch a Havana or earlier environment
to be an Icehouse environment.


