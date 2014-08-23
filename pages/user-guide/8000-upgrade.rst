
.. _upgrade-patch-top-ug:

Upgrade and Patch from Earlier Versions
=======================================

If you have a functional Mirantis OpenStack 5.x environment,
you can upgrade the Fuel Master node to version 5.1
but leave your current environments in place.

After you upgrade the Fuel Master node version,
you can also patch your existing environments
to use the latest version of the Icehouse OpenStack release.

The terminology used is:

* You can **upgrade** the Fuel Master Node
  to run the latest version of Fuel.
  This version of Fuel can manage and deploy
  environments that were deployed
  with any Mirantis OpenStack 5.0 or later release.

* You can **patch** your environment to use
  a later version of the OpenStack release that is installed.
  For example, if your environment is running Icehouse 2014.1,
  you can patch it to run 2014.1.1.

* The term **update** is reserved
  to describe the process of moving an existing OpenStack deployment
  to use a later OpenStack release.
  For example, you might in the future be able to update
  your Icehouse OpenStack environment to run the Juno release.
  It is not possible to update an existing Havana OpenStack deployment
  to use Icehouse.

The upgrade and patching procedures are described below.

.. _upgrade-ug:

Upgrade from Earlier Fuel Versions
----------------------------------

You can upgrade a Fuel Master node
to 5.1 from an earlier version of Mirantis OpenStack Release 5.
After you do this, your new Fuel 5.1 console
can manage your existing 5.0 and 5.0.1 OpenStack environment(s),
create new OpenStack environments for any 5.x version,
and create and manage new 5.1 OpenStack environments.

If you are deploying Fuel 5.1 on a system
that is not running an earlier Fuel 5.x version,
you cannot use Fuel to create or manage environments
for earlier versions of Fuel 5.x.

The following table summarizes the available progressions
for upgrades of the Fuel Master Node:

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

.. note::
  If you are running Fuel 4.x or earlier,
  you cannot upgrade but must install Mirantis OpenStack 5.1
  and redeploy your environment to use the new release.

This procedure upgrades the Fuel software that runs on the Fuel Master node.
After you upgrade the Fuel Master node,
you can patch the OpenStack environment
as described in the next section.

To upgrade the Fuel Master Node:

#. Be sure that no installations are in progress in the environment!

#. Backup your Fuel Master node
   following the instructions in :ref:`Backup_and_restore_Fuel_Master`.

   For maximum protection, copy the backup file
   (**/var/backup/fuel** by default) to a location
   other than the server that runs the Fuel Master node.

#. Download the upgrade tarball from
   `<http://software.mirantis.com>`
   to a location on the Fuel Master Node
   that has at least 3GB of free space
   such as */var/tmp*.
   If your Fuel Master Node does not have an Internet connection,
   you may need to download this file to a local system
   and then transfer the file to the Fuel Master
   using **scp** or an SSH client.

#. Extract tarball contents:

    ::

       cd /var/tmp  # Use the directory where the tarball is located
       lrzuntar filename.tar.lrz

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
      New release available: Icehouse on Ubuntu 12.04.4 (2014.1.1-5.1)
      New release available: Icehouse on CentOS 6.5 (2014.1.1-5.1)


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


