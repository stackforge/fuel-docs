.. _patching-ops:

Applying patches
================

Introduction
------------

Patching in brief:

* The patching feature is introduced in Mirantis OpenStack 6.1
  and will not work in older releases.
* The list of patches and instructions on how to apply patches is
  at the `errata portal <https://errata.mirantis.com/>`__. This is
  your go-to information source for all available patches.
* There are two types of patches: bugfixes and security updates.
* Patches are downloaded from the Mirantis public repositories.

Usage scenarios
---------------

Default scenario
++++++++++++++++

In the default scenario you download patches from the default Mirantis
mirrors.

* Make sure you are registered at at the `official Mirantis website <https://software.mirantis.com/openstack-download-form/>`__.
* Once you are registered, you will receive regular email notifications
  on the available patches with a link to the `errata portal <http://errata.mirantis.com/>`__.
* Your repos by default are configured to download the patches from
  Mirantis. The patching repos are:
  .. image:: /_images/patchingReposOps.png
* Check each item and proceed with the instructions described in each
  errata item (plan accordingly).

  * Patching Fuel Master node:

    * Run the command specified in the errata item to install the patch.
    * After the patch is installed, restart the affected service as
      specified in the errata item.

  * Patching a slave node running Ubuntu or CentOS:

    * Run the command specified in the errata item to download the patch.
    * Run the command specified in the errata item to install the patch.

Custom scenario: deploying from local mirrors; patching from local mirrors
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

In this custom scenario you deploy from your local mirrors and download
patches from your local mirrors.

For information on how to create and update local mirrors of Mirantis
OpenStack see :ref:`Configuring repositories<configuring-repos-ops>`.

* Make sure you are registered at at the `official Mirantis website <https://software.mirantis.com/openstack-download-form/>`__.
* Once you are registered, you will receive regular email notifications
  on the available patches with a link to the `errata portal <http://errata.mirantis.com/>`__.
* Check each item and proceed with the instructions described in each
  errata item (plan accordingly).

  * Patching Fuel Master node:

    * Make sure your local mirror is up to date: run ``fuel-createmirror -M``
    * Run the command specified in the errata item to download the patch.
    * Run the command specified in the errata item to install the patch.
    * After the patch is installed, restart the affected service as
      specified in the errata item.

  * Patching a slave node running Ubuntu or CentOS:

    * Run the command specified in the errata item to download the patch.
    * Run the command specified in the errata item to install the patch.

Custom scenario: deploying from Mirantis mirrors; patching from local mirrors
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

In this custom scenario you deploy from Mirantis mirrors and download
patches from your local mirrors.

* Make sure you are registered at at the `official Mirantis website <https://software.mirantis.com/openstack-download-form/>`__.
* Configure your local mirrors to download patches from Mirantis
  mirrors as described in :ref:`Configuring repositories<configuring-repos-ops>`.
* Once you are registered, you will receive regular email notifications
  on the available patches with a link to the `errata portal <http://errata.mirantis.com/>`__.
* Check each item and proceed with the instructions described in each
  errata item (plan accordingly).

  * Patching Fuel Master node:

    * Make sure your local mirror is up to date: run ``fuel-createmirror -M``
    * Run the command specified in the errata item to download the patch.
    * Run the command specified in the errata item to install the patch.
    * After the patch is installed, restart the affected service as
      specified in the errata item.

  * Patching a slave node running Ubuntu or CentOS:

    * Run the command specified in the errata item to download the patch.
    * Run the command specified in the errata item to install the patch.

Additional information
++++++++++++++++++++++

**Rolling back patches**

.. note::
   Use the instructions listed here only for Mirantis OpenStack 6.1.

.. note::
   The rollback instructions listed here are for advanced administrators.
   If you are not sure how to plan and execute the rollbacks,
   your best option is to contact `Mirantis support <https://www.mirantis.com/services/enterprise-support-services/>`__.

Rolling back Fuel Master node
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

* Roll back the packages on the Fuel Master node.
  `Refer to this article <https://access.redhat.com/solutions/64069>`__ as an example.
* Roll back all the changes to the configuration you made when applying
  the patching instructions.
* Run ``dockerctl destroy all``.
* Run ``dockerctl start all``.
* Wait for bootstrap to complete.

Rolling back a CentOS slave node
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

* Evacuate all the running resources from the node.
* Make sure new workloads are not scheduled to the node: Put nova
  services in maintenance, turn on Pacemaker into maintenance mode etc.
* Install packages with specific versions:

  ``yum list all <component name or part of the name like kernel>``

  ``yum downgrade <pkgname><pkg version>``
* Roll back the packages on the node.
  `Refer to this article <https://access.redhat.com/solutions/64069>`__ as an example.
* Roll back all the changes to the configuration you made when applying
  the patching instructions.
* Reboot the node.

Rolling back an Ubuntu slave node
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

* Evacuate all the running resources from the node.
* Make sure new workloads are not scheduled to the node: Put nova
  services in maintenance, turn on Pacemaker into maintenance mode etc.
* Look up the packages you want to roll back in ``/var/log/apt/history.log``
  and ``/var/log/dpkg.log``.
* Figure out where to get the old package version. Run ``apt-cache policy``.
* Figure out if the old package version is available locally.
* If it is, install these versions using dpkg. Otherwise, check the
  snapshots of previous repositories on
  `http://mirror.fuel-infra.org/mos/snapshots` and pick the
  repository that contains the packages you need.
* Add this repository to the environment configuration.
* On the Fuel Master node run:

  ::

    fuel node --node-id <comma_separated_list_of_nodes_you_want_to_update_repo>
    --tasks upload_core_repos

  This will propagate the new repos configuration.

* Install the packages with specific versions:

  ``apt-get install <pkg1>=<ver1> <pkg2>=<ver2>``
* Roll back all the changes to the configuration you made when applying
  the patching instructions.
*  Reboot the node.


**Applying all accumulated changes in one go**

.. note::
   This set of actions should be applied carefully and with
   consideration. It is strongly recommended that you do this on your
   test staging environment before applying the updates to production.

It is a good practice to apply the updates node by node so that you can
stop the update procedure whenever an issue occurs. It is also
strongly recommended to back up all sensitive data that can be altered
continuously during the whole lifetime of your environment and
the Fuel Master node.

These instructions assume that if you add any custom repositories to
your environment configuration, these commands will update your
environment taking packages from these repositories.

Patching Fuel Master node
^^^^^^^^^^^^^^^^^^^^^^^^^

* Back up your data with dockerctl backup. This will save the data
  to ``/var/backup/fuel/``.
* Run ``yum update``.
* Run ``dockerctl destroy all``.
* Run ``dockerctl start all``.
* Wait for the new containers deployment to finish.

Patching an Ubuntu slave node
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

* Run ``apt-get update``.
* Run ``apt-get upgrade``.
* Apply all the additional configuration options as described in all the
  related `errata items <http://errata.mirantis.com/>`__.
* Reboot the node.

Patching a CentOS slave node
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

* Run ``yum update``.
* Apply all the additional configuration options as described in all the
  related `errata items <http://errata.mirantis.com/>`__.
* Reboot the node.


**Does installing a new cluster come with all the latest updates?**

Yes, installing a new cluster comes with all the latest updates.
