
.. _upgrade-patch-top-ug:

Upgrading and Updating from Earlier Releases
============================================

If you have a functional Mirantis OpenStack 5.x environment,
you can upgrade the Fuel Master node to version 5.1
but leave your current environments in place.

After you upgrade the Fuel Master node version,
you can also apply a minor update to your existing environments
to apply some of the bug fixes from Mirantis OpenStack 5.1
and to use the latest version of the Icehouse OpenStack release.
This is an :ref:`experimental feature<experimental-features-term>`
for Fuel 5.1.

The terminology used is:

* You can **upgrade** the Fuel Master Node
  to run the latest version of Fuel.
  This version of Fuel can manage and deploy
  environments that were deployed
  with any Mirantis OpenStack 5.0 or later release.

* You can apply a **minor update** to an existing environment to use
  a later version of the OpenStack release (Icehouse, in this case)
  that is installed.
  For example, if your environment is running Icehouse 2014.1,
  you can update it to run 2014.1.1.

* A **patch** is a hot fix to one feature that is applied manually.
  See :ref:`apply-patch-ops` for more information.

.. _upgrade-ug:

Upgrade Fuel from Earlier Versions
----------------------------------

You can upgrade a Fuel Master node
to 5.1 from an earlier version of Mirantis OpenStack Release 5.
After you do this, your new Fuel 5.1 console
can manage your existing 5.0 and 5.0.1 OpenStack environment(s)
and create and manage new 5.1 OpenStack environments.

The following table summarizes the available progressions
for upgrades of the Fuel Master Node:

+----------------------+-------------------------+-----------------------------+
| Initial Fuel version | Fuel is  upgraded to    | Upgraded Fuel can manage    |
+======================+=========================+=============================+
| 5.0                  | 5.1                     | 5.0, 5.1                    |
+----------------------+-------------------------+-----------------------------+
| 5.0                  | 5.0.1, then to 5.1      | 5.0, 5.0.1, 5.1             |
+----------------------+-------------------------+-----------------------------+
| 5.0.1                | 5.1                     | 5.0.1,  5.1                 |
+----------------------+-------------------------+-----------------------------+
| 5.1                  | N/A                     | 5.1                         |
+----------------------+-------------------------+-----------------------------+

Note the following:

*  Fuel 5.1 can only deploy 5.1 environments.

*  Fuel can manage environments that were deployed
   with earlier 5.x releases,
   assuming that you created the environment with the earlier release
   and upgraded the Fuel Master node rather than doing a fresh install.
   For a list of OpenStack releases and versions
   that your Fuel Master node can manage,
   click on the "Releases" tab at the top of your Fuel home page.

*  If you do a fresh install of Fuel 5.1,
   you cannot manage environments deployed with earlier Fuel versions.

*  If you are running Fuel 4.x or earlier,
   you cannot upgrade Fuel but must install Mirantis OpenStack 5.1
   and redeploy your environment to use the new release.

The following procedure upgrades the Fuel software
that runs on the Fuel Master node.
See :ref:`fuel-upgrade-arch` for information
about how the upgrade process is implemented.

To upgrade the Fuel Master Node:

#. Be sure that no installations are in progress in the environment!

#. Download the upgrade tarball from
   `<http://software.mirantis.com>`
   to a location on the Fuel Master Node
   that has at least 2GB of free space
   such as */var/tmp*.
   If your Fuel Master Node does not have an Internet connection,
   you may need to download this file to a local system
   and then transfer the file to the Fuel Master
   using **scp** or an SSH client.

#. Extract tarball contents:

    ::

       cd /var/tmp  # Use the directory where the tarball is located
       lrzuntar filename.tar.lrz

    .. warning:: The Fuel Master node must have at least 2GB of RAM
      in order for **lrzip** to decompress the upgrade archive.
      See :ref:`HardwarePrerequisites` for a full list of
      hardware requirements for the Master node.

      If your Fuel Master node does not have enough RAM
      to decompress the archive,
      you can do it on another system,
      then copy the `upgrade` tarball to the Master node.

#. Run the upgrade script from that same directory and supply
   the Fuel administrator (*admin* user) password:

    ::

       ./upgrade.sh --password <password>

   If you do not specify the password here,
   you will be prompted for the password.
   See :ref:`fuel-passwd-ops` for background information.

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


.. _update-openstack-environ-ug:

Update your OpenStack environment
---------------------------------

When you upgrade your Master Node to Fuel 5.1,
you get :ref:`experimental<experimental-features-term>` access
to the ability to update existing environments
to Mirantis OpenStack 5.0.2.
5.0.2 is a technical release that contains
many of the bug fixes that are included in 5.1
but does not include the new 5.1 architecture and features.
Because of internal architectural modifications
for Fuel 5.1,
it is not possible to update from Mirantis OpenStack 5.0.x to 5.1.
When applied to a 5.0 environment,
5.0.2 also updates the environment to the 2014.1.1 maintenance release
of the OpenStack Icehouse release.

To update your existing environments to 5.0.2:

- Upgrade the Fuel Master node to Fuel 5.1 as described above.
- Enable "Experimental Features" if you have not already done so;
  see :ref:`experimental-features-op` for instructions.
- Open an environment that was deployed with Fuel 5.0 or 5.0.1.
- Click on the "Action" tab.
- Select the update package you want.
- Fuel prompts you to update the environment
  to the new level.

The update package names are formed
by concatenating the OpenStack version number
with the Fuel release number.
For example,
the update package labeled as “2014.1.1-5.0.2”
updates your environment to Icehouse 2014.1.1
with Mirantis OpenStack 5.0.2.

Note that you can update an Icehouse environment
to a later maintenance release,
but you cannot update a Havana or earlier environment
to be an Icehouse environment.


