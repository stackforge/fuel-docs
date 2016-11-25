.. _lcm-git-repo:

Modify configurations from a Git repository
===========================================

If you have an internal or external Git repository set up for
your environment, you can store and modify Fuel and OpenStack
configurations in this repository and apply changes to your
environments. This approach enables you to modify the settings
you typically cannot modify through the Fuel web UI.

The functionality is implemented through an additional Infrastructure-as-
a-Code extension to Fuel. You need to clone the
``fuel-nailgun-extension-iac`` repository
on your Fuel Master node before you can use this feature.

With the Infrastructure-as-a-Code extension to Fuel you can:

* Associate a Git repository with a specific OpenStack environment.
* Perform management operations, such as create, read, update, and delete
  (CRUD), with the files in the repository.
* Audit changes and enforce operations in the OpenStack environment.
* List the applied changes.
* Manage white lists for the applied changes.

This section includes the following topics:

.. toctree::
   :maxdepth: 1

   lcm-git-repo/lcm-prerequisites.rst
   lcm-git-repo/configure-iac.rst
   lcm-git-repo/repo-structure.rst
   lcm-git-repo/set-up-git-repo.rst
   lcm-git-repo/audit-enforce-changes.rst
   lcm-git-repo/filter-results.rst
