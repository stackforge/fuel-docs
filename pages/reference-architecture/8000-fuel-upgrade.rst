
.. _fuel-upgrade-arch:

How Fuel upgrade works
======================

Users running Fuel 5.0 and later releases
can upgrade the Fuel Master Node to the latest release
and use the upgraded Fuel Master to manage environments
that were created with earlier releases;
see :ref:`upgrade-patch-top-ug` for instructions.
This section discusses the processing flow for the Fuel upgrade.

#. Stop all old containers.
   These are Docker containers,
   each of which contains a Fuel component.
   See :ref:`docker-term` for more information.

#. Upload the new images.

#. Reconfigure the Supervisor with "autostart" set to False.
   This prevents the Supervisor from running containers
   during the upgrade process.

#. Run containers one by one, in the proper order,
   using the `create_and_start_new_containers` method.

#. Reconfigure the Supervisor with "autostart" set to True.
   This allows the Supervisor to start all of the containers
   after it is restarted
   and is the proper mode for the Supervisor
   during normal operations.

#. Verify the containers.

Design considerations:

- Using the Supervisor to run the services during upgrade
  can cause race conditions,
  especially if iptable cleaning runs at the same time.
  In addition, the Supervisor might not always be able
  to start all containers,
  which can result in NAT rules that have the same port number
  but different IP addresses.

- Stopping containers during the upgrade process
  may interrupt non-atomic actions
  such as database migration in the Keystone container.

- Running containers one by one
  prevents IP duplication problems
  that could otherwise occur during the upgrade.
