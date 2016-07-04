.. _upgrade-internals:

====================================
Overview of the Fuel upgrade process
====================================

The upgrade is implemented with upgrade engines, which are python
modules:

* **Host system engine:**

  #. Copies new repositories to Fuel Master node.
  #. Installs a package and all the required dependencies such as
     Puppet manifests, bootstrap images, provisioning images etc.

* **OpenStack engine:**

  #. Installs all data required for OpenStack patching.
  #. Adds new releases using the Nailgun REST API.
     This allows the full list of OpenStack releases to be displayed
     in the Fuel web UI.
