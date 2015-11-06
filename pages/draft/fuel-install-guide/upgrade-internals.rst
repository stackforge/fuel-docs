
.. _upgrade-internals:

Overeview of the Fuel upgrade mechanism
=======================================

The upgrade is implemented with three upgrade engines, which are python
modules:

* **Host system engine** -- Copies new repositories to Fuel Master node,
  installs a package and all the required dependencies such as
  Puppet manifests, bootstrap images, provisioning images etc.

* **Docker engine**:

  #. Points the supervisor to a new directory with the configuration
     files. No containers are started by the supervisor at this time.
  #. Stops old containers.
  #. Uploads new Docker images.
  #. Runs containers one by one.
  #. Generates new supervisor configurayion files.
  #. Verifies the services running in the containers.

* **OpenStack engine**:

  #. Installs all data required for OpenStack patching.
  #. Adds new releases using the :ref:`nailgun-term` REST API.
     This allows the full list of OpenStack releases to be displayed
     in the Fuel web UI.

.. seealso::

     - :ref:`upgrade-table`
