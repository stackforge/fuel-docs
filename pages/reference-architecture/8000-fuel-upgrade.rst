
.. _fuel-upgrade-arch:

How Fuel upgrade works
======================

Users running Fuel 6.0
can upgrade the Fuel Master Node to the latest release.
See :ref:`upgrade-patch-top-ug` for instructions.
This section discusses the processing flow for the Fuel upgrade.

The upgrade is implemented with three upgrade engines
(also called upgraders or upgrade stages).
The engines are python modules
that are located in a
`separate directory <https://github.com/stackforge/fuel-web/tree/master/fuel_upgrade_system/fuel_upgrade/fuel_upgrade/engines>`_:

- **Host system engine** -- Copies
  new repositories to Fuel Master node,
  installs the ``fuel-6.1.0.rpm``
  package and all the dependencies such as
  Puppet manifests, bootstrap images,
  provisioning images and so on.

- **Docker engine**:

  #. Point the supervisor to a new
     directory with the configuration files.
     Since it is empty, no containers will be started
     by the supervisor.

  #. Stop old containers.

  #. Upload new Docker images.

  #. Run containers one by one, in the proper order.

  #. Generate new supervisor configs.
  #. Verify the services running in the containers.

- **OpenStack engine** -- Installs all data
  that is required for the OpenStack patching feature.

  #. Installs Puppet manifests and modules.

  #. Adds new releases using the :ref:`nailgun-term` REST API.
     This allows the full list of OpenStack releases
     to be displayed in the Fuel UI.

Design considerations:

- The Docker engine does not use **supervisord**
  to run the services during upgrade
  because it can cause race conditions,
  especially if the iptables clean-up script runs at the same time.
  In addition, **supervisord** may not always be able
  to start all containers,
  which can result in NAT rules that have the same port number
  but different IP addresses.

- Stopping containers during the upgrade process
  may interrupt non-atomic actions
  such as database migration in the Keystone container.

- Running containers one by one
  prevents IP duplication problems
  that could otherwise occur during the upgrade
  because of a Docker IP allocation bug.

- A set of `pre-upgrade hooks <https://github.com/stackforge/fuel-web/tree/master/fuel_upgrade_system/fuel_upgrade/fuel_upgrade/pre_upgrade_hooks>`_
  are run before the upgrade engines
  to perform some necessary preliminary steps for upgrade.
  This is not the optimal implementation,
  but is required for Fuel to manage environments
  that were deployed with earlier versions that had a different design.
  For example, one of these hooks adds default login credentials
  to the configuration file before the upgrade process runs;
  this is required because
  earlier versions of Fuel did not have the authentication feature.
