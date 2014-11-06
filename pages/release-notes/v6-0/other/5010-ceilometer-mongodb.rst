
.. _ceilometer-mongodb-rn:

OpenStack Telemetry (Ceilometer) and MongoDB Database
-----------------------------------------------------

New Features and Resolved Issues in Mirantis OpenStack 6.0
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

* Deployment of HA cluster with Ceilometer
  no longer fails with Puppet errors.
  See `LP1381982 <https://bugs.launchpad.net/fuel/+bug/1381982>`_.

* Ceilometer now successfully connetcs to AMQP after controller is shut down.
  See `LP1373569 <https://bugs.launchpad.net/fuel/+bug/1373569>`_.

Known Issues in Mirantis OpenStack 6.0
++++++++++++++++++++++++++++++++++++++

MongoDB has several bugs
~~~~~~~~~~~~~~~~~~~~~~~~

- The special characters '.' and '$' are special characters for the MongoDB database
  and so cannot be used as keys in dictionary objects.
  When Ceilometer processes data samples
  that contain these characters in the resource metadata
  (for example, has tag names with dots in them),
  the sample writing fails.
  Do not create images, VMs, and other cloud resources
  that contain resource metadata keys that use the $ and . special characters.
  See `LP1360240 <https://bugs.launchpad.net/bugs/1360240>`_.

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

- If MongoDB was blocked on primary controller, Ceilometer randomply fails in HA mode.
  See `LP1371799 <https://bugs.launchpad.net/fuel/+bug/1371799>`_.
