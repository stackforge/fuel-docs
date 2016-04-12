.. _upgrade_apply_patches:

Apply patches
-------------

You can apply only the patches you need one by one or you can
apply all accumulated patches in one go.

The documentation for each patch is available in the corresponding
release notes.

.. note:: Maintenance Updates are only available online. Currently
          there is no option to run these updates from a local
          repository.

Check each patch item and proceed with the instructions.

**To patch the Fuel Master node:**

#. Log in to the Fuel Master node.

   * If you use a local repository, update it by typing::

         fuel-createmirror -M

#. Run the command specified in the documentation to download and install the patch.

**To patch a Fuel Slave node:**

#. Run the command specified in the documentation to download and
   install the patch.

**Apply all accumulated changes in one go:**

Before starting the update, back up all sensitive data that
can be changed during the the whole lifetime of your environment
and the Fuel Master node. We recommend to apply the updates to one
node at a time, so that you can interrupt the update procedure whenever
an issue occurs.

If you have configured any custom repositories, Fuel will use fetch
the upgrade packages from these repositories.

.. note::
   This set of actions should be applied carefully and with
   consideration. It is strongly recommended that you do this on your
   test staging environment before applying the updates to production.

Patch the Fuel Master node
--------------------------

#. Back up your data with dockerctl backup. This will save the data
   to ``/var/backup/fuel/``.
#. Run ``yum update``.
#. Run ``dockerctl destroy all``.
#. Run ``dockerctl start all``.
#. Wait for the new containers deployment to finish.

Patch an Ubuntu slave node
--------------------------

#. Run ``apt-get update``.
#. Run ``apt-get upgrade``.
#. Apply all the additional configuration options as described in the
   supporting  documentation.
#. Reboot the node.

Apply Puppet changes on a slave node
------------------------------------

You may want to apply all changes on a slave node or run a single
granular task so that Fuel Puppet changes take effect.

**To run a complete Puppet cycle on a Fuel Slave node:**

#. Update fuel-libraryX.X on Fuel Master ``yum update``
#. Run ``fuel node --node NODE_ID --deploy``

**To update Puppet manifests and apply a single task:**

#. Update fuel-libraryX.X on Fuel Master ``yum update``
#. Run ``fuel node --node node-XX --task rsync_core_puppet hiera globals TASK``

.. note::
   The tasks rsync_core_puppet, hiera, and globals are required for
   processing any Puppet changes.

**Verify a patch:**

Verify a patch on the Fuel Master node
--------------------------------------

To verify the packages on the Fuel Master node:

#. Log in to the Fuel Master node CLI.
#. Type:

::

   yum clean expire-cache
   yum -y update

Verify a patch on a Fuel slave node
-----------------------------------

To verify the packages are up-to-date on the Fuel Slave nodes:

#. Log in to the Fuel Master node CLI.
#. Update the list of available packages::

      apt-get update

#. Update all packages::

      apt-get dist-upgrade

#. Log in to the Fuel Master node GUI:
#. Click :guilabel:`Support`.
#. Generate and download a diagnostic snapshot by clicking
   :guilabel:`Generate Diagnostic Snapshot`.

   The Fuel Master node generates ``ubuntu_installed_debs.txt``.

#. Analyze ``ubuntu_installed_debs.txt`` to verify the versions of the packages.

   Additionally, you can analyze the ``ubuntu_repo_list.txt`` file to verify
   the repositories.

**Roll back a patch:**

.. note::
   The rollback instructions listed here are for advanced administrators.

Roll back the Fuel Master node
------------------------------

#. Roll back the packages on the Fuel Master node.
   `Refer to this article <https://access.redhat.com/solutions/64069>`__ as an example.
#. Roll back all the changes to the configuration you made when applying
   the patching instructions.
#. Run ``dockerctl destroy all``.
#. Run ``dockerctl start all``.
#. Wait for bootstrap to complete.

Roll back an Ubuntu slave node
------------------------------

You must identify the packages to roll back and where to get
their specific versions, install the packages and roll back the
changes to the configuration.

**To roll back an Ubuntu slave node:**

#. Evacuate all the running resources from the node.
#. Make sure no new workloads are scheduled to the node: Put nova
   services in maintenance, turn on Pacemaker maintenance mode.
#. Look up the packages you want to roll back in ``/var/log/apt/history.log``
   and ``/var/log/dpkg.log``.
#. Figure out where to get the old package version. Run ``apt-cache policy``.
#. Figure out if the old package version is available locally.
#. If it is, install these versions using dpkg. Otherwise, check the
   snapshots of previous repositories on
   `http://mirror.fuel-infra.org/mos/snapshots` and pick the
   repository that contains the packages you need.
#. Add this repository to the environment configuration.
#. On the Fuel Master node run::

    fuel node --node-id <comma_separated_list_of_nodes_you_want_to_update_repo> \
    --tasks upload_core_repos

   This will propagate the new repos configuration.

#. Install the packages with specific versions::

     apt-get install <pkg1>=<ver1> <pkg2>=<ver2>

#. Roll back all the changes to the configuration you made when applying
   the patching instructions.
#. Reboot the node.
