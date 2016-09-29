.. _upgrade-patch-top-ug:

=========================================
Upgrade the Fuel Master node from Liberty
=========================================

You can upgrade the Fuel Master node from Liberty to the latest Fuel version.
After you upgrade Fuel, you can only deploy new environments of the
corresponding Fuel version. Environments deployed using older versions
of Fuel will remain operational.

**To upgrade the Fuel Master node:**

#. Verify that no installations are in progress in any of your OpenStack
   environments.
#. Back up the Fuel Master node as described in :ref:`back-up-fuel`.
#. Power off the Fuel Master node.

#. Perform the update to latest minor Fuel version:

   #. Log in to the Fuel Master node CLI as root.
   #. Verify that ``mos-update`` is available in the list of your repositories:

      .. code-block:: console

         cat /etc/yum.repos.d/mos-updates.repo

      If the ``mos-update`` repository is unavailable, run:

      .. code-block:: console

         yum-config-manager --add-repo=http://mirror.fuel-infra.org/mos-repos/centos/mos9.0-centos7/updates/x86_64/
         rpm --import http://mirror.fuel-infra.org/mos-repos/centos/mos9.0-centos7/updates/RPM-GPG-KEY-mos9.0

   #. Clean the YUM cache:

      .. code-block:: console

       yum clean all

   #. Install a code-based integrity check tool Cudet. This tool also includes
      the necessary update commands for ``fuel2``:

      .. code-block:: console

         yum install python-cudet

   #. Prepare the Fuel Master node for the Noop run:

      .. code-block:: console

         update-prepare prepare master

      This command installs new ``fuel-nailgun`` and ``fuel-astute``
      packages on the Fuel Master node. Also, it executes Nailgun ``dbsync``
      and restarts the ``astute`` and ``nailgun`` services.

   #. Update the Fuel Master node packages, services, and configuration:

      .. code-block:: console

         update-prepare update master

      .. warning:: During the update procedure, the Fuel Master node services
                   will be restarted automatically.

      The script calls ``yum update`` and then runs Puppet tasks to update
      the Fuel Master node.

#. Restore the Fuel Master node as described in :ref:`restore-fuel`.

#. If you want to use CentOS-based bootstrap, rebuild the bootstrap image:

   .. code-block:: console

      $ octane update-bootstrap-centos

#. Reboot all nodes that are in the ``Discover`` status.

When Fuel completes the upgrade procedure, the *New Release available*
message appears in the :guilabel:`Releases` tab.

.. seealso::

   * :ref:`install_configure_bootstrap`