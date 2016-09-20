.. _faq:

FAQ
===

**Where can I find Fuel Plugin Builder source code?**

Source code for Fuel Plugin Builder as well as basic plugin examples are located in `fuel-plugins <https://github.com/openstack/fuel-plugins>`_ repository.

**Are there any plugins examples?**

Besides the basic examples in `fuel-plugins <https://github.com/openstack/fuel-plugins>`_ repository there are many existing plugins with open source code, please see the section :ref:`existing-plugins`


**I need to provide some external packages within my plugin, but I don't want to place them in the plugin repository. Is there any other way?**

Use pre_build_hook script to download packages in the required directories:

.. code-block:: ini

  #!/bin/bash
  set -eux

  ROOT="$(dirname `readlink -f $0`)"
  RPM_REPO="${ROOT}"/repositories/centos/
  DEB_REPO="${ROOT}"/repositories/ubuntu/

  wget -P "${RPM_REPO}" http://mirror.fuel-infra.org/fuel-plugins/6.0/centos/glusterfs-3.5.2-1.mira2.x86_64.rpm
  wget -P "${DEB_REPO}" http://mirror.fuel-infra.org/fuel-plugins/6.0/ubuntu/glusterfs-client_3.5.2-4_amd64.deb

In this example the hook  downloads two packages to the plugin's directories before Fuel Plugin Builder starts the build process.

**What is the user context that fuel plugin hooks are invoked in: root or fuel user?**

Plugins hooks are executed under the root user.

**Are there role-naming conventions for plugins?**

There are no strict requirements for naming plugin's roles. It's recommended to use a role name that contains the name of your product and could be unequivocally associated with the plugin.

**The large installer file will be left on a deployed node (under /etc/fuel/plugins/...) after deploymentis complete.  Should we remove it after a successful deployment on a node, to save space there?**

We recommend to provide any product specific files as packages, which will be put in repositories on Fuel master nodes. The other option is to download the needed files from external sources at the time of deployment. The latter option allows to update product specific packages without updating the plugin itself. Files that are copied to /etc/fuel/plugins will be synced to target nodes anew when deployment starts (including the cases when we only start a subset of tasks by hand), so it might be very nonoptimal to store them there and delete them in plugin code,

**I don't see any way to add just my one new role for a plugin to an already-deployed BASE_OS machine.**

Plugins actually aren't expected to use BASE-OS role. BASE_OS role is not intended to be combined with other roles. This role should be used when you want to install just an operating system and do the rest of the work manually. The fuel-plugin should either define its own roles (OS will be installed automatically in that case) or add tasks to already existed roles.
