.. _update_fuel:

============================
Update Fuel to latest Mitaka
============================

A number of the Fuel Newton features are back-ported to Mitaka after
the Fuel Mitaka release. You can update the Fuel Master node to consume
these features.

**To update the Fuel Master node from the initially released Mitaka to the latest Mitaka version:**

#. Log in to the Fuel Master node CLI as root.
#. Verify that the update repository, for example, ``mos-update``, is available
   in the list of your repositories:

   .. code-block:: console

      cat /etc/yum.repos.d/mos-updates.repo

   If the update repository is unavailable, run:

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

   If any ``fuel-nailgun`` extension is already installed on the Fuel Master node, the
   ``update-prepare`` script does not restart the Nailgun services.
   You should restart the Nailgun services manually using the following
   command:

   .. code-block:: console

      systemctl restart assassind nailgun oswl_flavor_collectord \
      oswl_image_collectord oswl_keystone_user_collectord \
      oswl_tenant_collectord oswl_vm_collectord oswl_volume_collectord \
      receiverd statsenderd

#. Update the Fuel Master node packages, services, and configuration:

   .. code-block:: console

      update-prepare update master

   .. warning:: During the update procedure, the Fuel Master node services
                will be restarted automatically.

   The script calls ``yum update`` and then runs Puppet tasks to update
   the Fuel Master node.