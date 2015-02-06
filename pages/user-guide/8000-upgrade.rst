
.. _upgrade-patch-top-ug:

Upgrading and Updating from Earlier Releases
============================================

If you have a functional Mirantis OpenStack 5.x environment,
you can upgrade the Fuel Master node to version 6.0
but leave your current environments in place.

The terminology used is:

* You can **upgrade** the Fuel Master Node
  to run the latest version of Fuel.
  This version of Fuel can manage and deploy
  environments that were deployed
  with any Mirantis OpenStack 5.0 or later release.

* A **minor update** is applied to an existing environment,
  enabling it to use a later version of the OpenStack release
  that is installed.
  For example, minor updates were provided for
  Mirantis OpenStack 5.x releases (Icehouse).
  No update functionality is provided in Mirantis OpenStack 6.0,
  but we plan to provide the ability to update
  to upcoming Mirantis OpenStack 6.x releases.

* A **patch** is a hot fix to one feature that is applied manually.
  See :ref:`apply-patch-ops` for more information.

.. _upgrade-ug:

Upgrade Fuel from Earlier Versions
----------------------------------

You can upgrade a Fuel Master node
to 6.0 from an earlier version of Mirantis OpenStack Release 5.x.
After you do this, your new Fuel 6.0 console
can manage your existing 5.x.x OpenStack environment(s)
and create and manage new 6.0 OpenStack environments.

The following table summarizes the available progressions
for upgrades of the Fuel Master Node:

+----------------------+------------------------+--------------------------+
| Initial Fuel version | Fuel is upgraded to    | Upgraded Fuel can manage |
+======================+========================+==========================+
| 5.0                  | 5.1, then to 5.1.1,    | 2014.1-5.0               |
|                      | then to 6.0            |                          |
|                      |                        | 2014.1.1-5.0.2           |
|                      |                        |                          |
|                      |                        | 2014.1.1-5.1             |
|                      |                        |                          |
|                      |                        | 2014.1.3-5.1.1           |
|                      |                        |                          |
|                      |                        | 2014.2-6.0               |
+----------------------+------------------------+--------------------------+
| 5.0                  | 5.0.1, then to 5.1,    | 2014.1-5.0               |
|                      |                        |                          |
|                      | then to 5.1.1          | 2014.1.1-5.0.1           |
|                      |                        |                          |
|                      | then to 6.0            | 2014.1.1-5.0.2           |
|                      |                        |                          |
|                      |                        | 2014.1.1-5.1             |
|                      |                        |                          |
|                      |                        | 2014.1.3-5.1.1           |
|                      |                        |                          |
|                      |                        | 2014.2-6.0               |
+----------------------+------------------------+--------------------------+
| 5.0.1                | 5.1, then to 5.1.1     | 2014.1.1-5.0.1           |
|                      |                        |                          |
|                      | then to 6.0            | 2014.1.1-5.0.2           |
|                      |                        |                          |
|                      |                        | 2014.1.1-5.1             |
|                      |                        |                          |
|                      |                        | 2014.1.3-5.1.1           |
|                      |                        |                          |
|                      |                        | 2014.2-6.0               |
+----------------------+------------------------+--------------------------+
| 5.1                  | 5.1.1, then to 6.0     | 2014.1.1-5.1             |
|                      |                        |                          |
|                      |                        | 2014.1.3-5.1.1           |
|                      |                        |                          |
|                      |                        | 2014.2-6.0               |
+----------------------+------------------------+--------------------------+


Note the following:

*  Fuel 6.0 can only deploy 6.0 environments.

*  Fuel can manage environments that were deployed
   with 5.x releases,
   assuming that you created the environment with the earlier release
   and upgraded the Fuel Master node rather than doing a fresh install.
   For a list of OpenStack releases and versions
   that your Fuel Master node can manage,
   click on the "Releases" tab at the top of your Fuel home page.

*  If you do a fresh install of Fuel 6.0,
   you cannot manage environments deployed with earlier Fuel versions.

*  If you are running Fuel 4.x or earlier,
   you cannot upgrade Fuel but must install Mirantis OpenStack 6.0
   and redeploy your environment to use the new release.

The following procedure upgrades the Fuel software
that runs on the Fuel Master node.
See :ref:`fuel-upgrade-arch` for information
about how the upgrade process is implemented.

To upgrade the Fuel Master Node:

#. **Be sure that no installations are in progress in the environment.**

#. Download the upgrade tarball from
   `http://software.mirantis.com`
   to a location on the Fuel Master Node
   that has at least 2 GB of free space for
   the archive, such as */var/tmp*.

   .. note:: To extract the archive, disk requirements
      are increased to 8 GB (for a fully extracted archive)
      for the upgrade package to 6.0.

   If your Fuel Master Node does not have an Internet connection,
   you may need to download this file to a local system
   and then transfer the file to the Fuel Master
   using **scp** or an SSH client.

#. Extract the tarball contents:

    ::

       cd /var/tmp  # Use the directory where the tarball is located
       lrzuntar filename.tar.lrz

    .. warning:: The Fuel Master node must have at least 2 GB of RAM
      in order for **lrzip** to decompress the upgrade archive.
      See :ref:`HardwarePrerequisites` for a full list of
      hardware requirements for the Master node.

      If your Fuel Master node does not have enough RAM
      to decompress the archive,
      you can unpack it with **lrzuntar**
      or its equivalent on another system,
      then transfer the extracted files to the Master node.

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

      New release available: Juno on Ubuntu 12.04.4 (2014.2-6.0)
      New release available: Juno on CentOS 6.5 (2014.2-6.0)


.. _update-openstack-environ-ug:

Update your OpenStack environment
---------------------------------

Mirantis OpenStack 6.0 is our first release
that is based on the OpenStack Juno release
so no update functionality is provided.
Update functionality was provided as
an :ref:`experimental feature<experimental-features-term>`
in 5.x releases
and we plan to provide it in 6.x releases
after 6.0.
