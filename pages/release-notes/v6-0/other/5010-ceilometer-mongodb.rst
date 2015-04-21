
.. _ceilometer-mongodb-rn:

OpenStack Telemetry (Ceilometer) and MongoDB Database
-----------------------------------------------------

New Features and Resolved Issues in Mirantis OpenStack 6.0
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

* Ceilometer now successfully connects
  to AMQP after the primary controller is shut down.
  See `LP1373569 <https://bugs.launchpad.net/fuel/+bug/1373569>`_.

* Logs from the MongoDB server are now written
  to a separate file instead of syslog
  to prevent free disk space problems.
  See `LP1367234 <https://bugs.launchpad.net/fuel/+bug/1367234>`_.

* MongoDB provisioning no longer fails;
  it sets up a cluster in recovery state.
  See `LP1381826 <https://bugs.launchpad.net/fuel/+bug/1381826>`_.

* MongoDB now retries on AutoReconnect exceptions.
  See `LP1383225 <https://bugs.launchpad.net/fuel/+bug/1383225>`_ and
  the upstream `LP1309555 <https://bugs.launchpad.net/ceilometer/+bug/1309555>`_.

* Ceilometer successfully collects all metrics for Neutron.
  See `LP1403135 <https://bugs.launchpad.net/bugs/1403135>`_.

Known Issues in Mirantis OpenStack 6.0
++++++++++++++++++++++++++++++++++++++

MongoDB issues
~~~~~~~~~~~~~~

- Additional MongoDB roles cannot be added to an existing deployment
  from the Fuel Web UI.
  Fuel installs :ref:`mongodb-term`
  as a backend for :ref:`ceilometer-term`.
  Any number of MongoDB roles (or standalone nodes)
  can be deployed into an OpenStack environment
  during the initial deployment
  (one for each Controller node is ideal);
  but after the environment is deployed,
  additional MongoDB roles can only be added
  by using shell commands;
  see :ref:`add-mongodb-ops` for details.

- If traffic is dropped to MongoDB port on the primary controller,
  Ceilometer randomly fails in HA mode.
  See `LP1371799 <https://bugs.launchpad.net/fuel/+bug/1371799>`_.

Ceilometer issues
~~~~~~~~~~~~~~~~~

* When you deploy an HA-mode environment,
  create a container and object and download the object,
  Ceilometer does not collect some
  `metrics <http://docs.openstack.org/developer/ceilometer/measurements.html>`_
  (such as *storage.objects.incoming.bytes*,
  *storage.objects.outgoing.bytes*, and *storage.api.request*)
  for :ref:`Swift<swift-object-storage-term>`.
  See `LP1400240 <https://bugs.launchpad.net/bugs/1400240>`_.

* The `ceilometer-agent-notification` service
  may fail to connect to the queue after RabbitMQ is restarted.
  This seems to happen only in HA mode
  and we have only been able to reproduce one instance
  of `ceilometer-agent-notification` failing.
  As a work around, restart `ceilometer-agent-notification`
  after restarting RabbitMQ. The issue can be fixed by updating
  the product. See :ref:`Maintenance updates for Ceilometer <updates-ceilometer-rn>`.

* Ceilometer does not obtain Nova \*.rate pollsters.
  This is related to an upstream bug:
  `1394228 <https://bugs.launchpad.net/ceilometer/+bug/1394228>`_.
  See `LP1400324 <https://bugs.launchpad.net/mos/+bug/1400324>`_.

  As a work-around:

  #. Add `Patch 139037 <https://review.openstack.org/#/c/139037/>`_
     to the Ceilometer code on all nodes in the environment.

  #. Add `Patch 147180 <http://paste.openstack.org/show/147180/>`_
     to `sinks` in the */etc/ceilometer/pipeline.yaml* file
     on all nodes in the environment.

  #. Restart Ceilometer on all nodes in the environment.


