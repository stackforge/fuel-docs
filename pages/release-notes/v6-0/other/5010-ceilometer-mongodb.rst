
.. _ceilometer-mongodb-rn:

OpenStack Telemetry (Ceilometer) and MongoDB Database
-----------------------------------------------------

New Features and Resolved Issues in Mirantis OpenStack 6.0
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

MongoDB issues
++++++++++++++

- Additional MongoDB roles cannot be added to an existing deployment
  Fuel installs :ref:`mongodb-term`
  as a backend for :ref:`ceilometer-term`.
  Any number of MongoDB roles (or standalone nodes)
  can initially be deployed into an OpenStack environment
  but, after the environment is deployed,
  additional MongoDB roles cannot be added.
  Be sure to deploy an adequate number of MongoDB roles
  (one for each Controller node is ideal)
  during the initial deployment.
  See `LP1308990 <https://bugs.launchpad.net/fuel/+bug/1308990>`_.

- If traffic is dropped to MongoDB port on the primary controller,
  Ceilometer randomly fails in HA mode.
  See `LP1371799 <https://bugs.launchpad.net/fuel/+bug/1371799>`_.

Ceilometer does not collect some notifications for Swift
++++++++++++++++++++++++++++++++++++++++++++++++++++++++

When you deploy HA-mode environment,
create a container and object and download the object,
Ceilometer does not obtain some
`metrics <http://docs.openstack.org/developer/ceilometer/measurements.html>`_
(such as *storage.objects.incoming.bytes*,
*storage.objects.outgoing.bytes*, and *storage.api.request*)
for :ref:`Swift<swift-object-storage-term>`.
See `LP1400240 <https://bugs.launchpad.net/bugs/1400240>`_.
