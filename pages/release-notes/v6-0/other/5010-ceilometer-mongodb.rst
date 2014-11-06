
.. _ceilometer-mongodb-rn:

OpenStack Telemetry (Ceilometer) and MongoDB Database
-----------------------------------------------------

New Features and Resolved Issues in Mirantis OpenStack 6.0
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

* Ceilometer now successfully connects to AMQP after primary controller is shut down.
  See `LP1373569 <https://bugs.launchpad.net/fuel/+bug/1373569>`_.

* Logs from MongoDB server are now written to a separate file instead of syslog
  to avoid free disk space problems.
  See `LP1367234 <https://bugs.launchpad.net/fuel/+bug/1367234>`_.

* MongoDB provisioning no longer fails; it sets up a cluster
  in recovery state.
  See `LP1381826 <https://bugs.launchpad.net/fuel/+bug/1381826>`_.

* MongoDB now retries on AutoReconnect exceptions.
  See `LP1383225 <https://bugs.launchpad.net/fuel/+bug/1383225>`_ and
  the upstream `LP1309555 <https://bugs.launchpad.net/ceilometer/+bug/1309555>`_.

* Ceilometer successfully collects all metrics for Neutron.
  See `LP1403135 <https://bugs.launchpad.net/bugs/1403135>`_.

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

- If MongoDB is blocked on primary controller, Ceilometer randomply fails in HA mode.
  See `LP1371799 <https://bugs.launchpad.net/fuel/+bug/1371799>`_.

Ceilometer cannot obtain several Nova pollsters
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In HA mode, Ceilometer fails to receive disk device pollsters.
To work around this issue, you should do the following:

#. Add `this patch set <https://review.openstack.org/#/c/139037/>`_ to Ceilometer code to all environment nodes.

#. Copy to *sinks* in */etc/ceilometer/pipeline.yaml* file on all environment nodes this code:

   ::

        - name: disk_sink
        transformers:
           - name: "rate_of_change"
              parameters:
                source:
                    map_from:
                        name: "disk\\.(read|write)\\.(bytes|requests)"
                        unit: "(B|request)"
                target:
                    map_to:
                        name: "disk.\\1.\\2.rate"
                        unit: "\\1/s"
                    type: "gauge"
        publishers:
             - notifier://

#. Restart Ceilometer on all environment nodes.
   See `LP1400324 <https://bugs.launchpad.net/bugs/1400324>`_ .

Ceilometer does not collect some notifications for Swift
++++++++++++++++++++++++++++++++++++++++++++++++++++++++

When you deploy HA-mode environment,
create a container and object and download the object, Ceilometer does not obtain
some  `metrics <http://docs.openstack.org/developer/ceilometer/measurements.html>`_
for :ref:`Swift<swift-object-storage-term>` (for example, *storage.objects.incoming.bytes*, *storage.objects.outgoing.bytes*, *storage.api.request*).
See `LP1400240 <https://bugs.launchpad.net/bugs/1400240>`_.