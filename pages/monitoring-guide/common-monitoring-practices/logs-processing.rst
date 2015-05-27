.. _mg-logs-processing:

Logs Processing
+++++++++++++++

In addition to performing health checks and collecting metrics, a
common monitoring practice is to exploit the information that is
available in the logs that are produced by the system. Valuable
operational data can be extracted from those unstructured messages
which should be indexed for search and troubleshooting. The log
messages that are produced by the Mirantis OpenStack distribution
are sent to syslog at the INFO level by default. Fuel allows to
easily configure OpenStack to send all the logs to an external
*rsyslog* server. Those logs contain information about the severity
level, the program that issued the log, the service (Nova, Glance,
Cinder, …) that issued the log
(:ref:`syslogfacility <syslog_facility>`), metadata info like
``tenant_id`` and ``request_id`` that are useful for aggregation and
correlation, *error codes* like the HTTP error codes of the service
endpoints, performance info like the HTTP response time, and so forth.

.. _syslog_facility:

*Ideally, we should have one syslog facility per service but there are
only eight local facilities.*

.. note::
   The HTTP requests response time is meaningful only for synchronous
   transactions. Asynchronous transactions like those involved in the
   creation of an instance or volume will only account for the time it
   takes for the service API endpoint to authenticate and transmit the
   request to the AMQP bus, and as such, is not reflective of the
   actual time it takes to process a request end-to-end.

| Operations metrics can be derived from those logs for diagnostic and
  alerting purposes. This includes but is not limited to:

* Operations errors. A sudden spike of errors in the logs, like those
  found in service API endpoint logs (HTTP return code 5xx), should
  be monitored since they may be the manifestation of a critical
  condition.

* HTTP transactions time. The HTTP transactions time should be
  monitored since it directly affects the end user experience.

* Logs rate. A sudden drop off of the logs rate should be monitored
  since it can indicate something went wrong in the system or users
  do not have access to the cloud any more.
