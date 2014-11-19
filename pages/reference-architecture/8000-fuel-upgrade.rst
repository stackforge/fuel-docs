
.. _fuel-upgrade-arch:

How Fuel upgrade works
======================

Users running Fuel 5.1
can upgrade the Fuel Master Node to Fuel 5.1.1
and use the upgraded Fuel Master to manage
existing 5.1 environments;
see :ref:`upgrade-patch-top-ug` for instructions.
This section discusses the processing flow for the Fuel upgrade.

The upgrade is implemented with four upgrade engines
(also called upgraders or upgrade stages).
The engines are python modules
that are located in a
`separate directory <https://github.com/stackforge/fuel-web/tree/master/fuel_upgrade_system/fuel_upgrade/fuel_upgrade/engines>`_:

- **Host system engine** -- Runs :ref:`puppet-term`
  to upgrade the host-system.
  Puppet upgrades fuelclient, dockerctl, and other packages.

- **Bootstrap engine** -- Installs new bootstrap image
  for :ref:`cobbler-term`.

- **Docker engine** -- Upgrades the Docker containers,
  each of which contains a Fuel component.
  See :ref:`docker-term` for more information:

  #. Stop all old containers.

  #. Upload the new images.

  #. Reconfigure the Supervisor with "autostart" set to False.
     This prevents the Supervisor from running containers
     during the upgrade process.

  #. Run containers one by one, in the proper order.

  #. Reconfigure **supervisord** with "autostart" set to True.
     This allows **supervisord** to start all of the containers
     after it is restarted
     and is the proper mode for **supervisord**
     during normal operations.

  #. Verify the services running in the containers.

- **OpenStack engine** -- Installs all data
  that is required for the OpenStack patching feature.

  #. Installs new repositories.

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
