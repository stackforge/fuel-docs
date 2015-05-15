
.. _updates-ceilometer-rn:

OpenStack Telemetry (Ceilometer)
--------------------------------

Resolved Issues
+++++++++++++++

* The PyMongo is updated to 2.6.3 for CentOS-based installations and does not
  cause a memory leak anymore. See `LP1425603 <https://bugs.launchpad.net/mos/+bug/1425603>`_.

* The Telemetry messaging listener is changed from the eventlet
  ``notification_listener`` executor to the blocking one. It is done
  to avoid failures of the ceilometer-agent-notification instances after
  restart and connection to RabbitMQ (that previously had socket errors
  about handshake timeout in its logs). See `LP1393505 <https://bugs.launchpad.net/mos/+bug/1393505>`_.

* When ``self.timer`` is set to ``False``, each request's time is not
  recorded anymore, and therefore, it doesn’t cause unexpected
  memory leak. See `LP1439278 <https://bugs.launchpad.net/mos/+bug/1439278>`_.

* Previously, python-ceilometerclient didn't support the
  ``os_endpoint_type`` option for the keystone authentication.
  The bug fix adds this support. See `LP1449649 <https://bugs.launchpad.net/mos/+bug/1449649>`_.
