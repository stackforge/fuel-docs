
.. _Monitoring-Logs:

Logs monitoring
===============

Logs are the first source of information for error detection,
troubleshooting [#]_ [#]_ and performing root cause analysis.

The first low hanging fruits would be to detect patterns in logs revealing
bad situations:

- ERROR entries
- special *patterns* indicating error, specific for each application
- security entries from different daemons.

Also some metrics may be derivated from logs to feed the metrics repository
and contextualized if possible with information like *request-id*,
*tenant-id*, *user-id*:

- ERROR rates
- HTTP return code for the API services
- HTTP response time for the API services,
- HTTP call rate on services API

Currently, an effort on `logging consistency across all OpenStack components`_
is on its way. It should provide unified logging format and best practices
to provide better/easier usage of logs by operators.

.. [#] http://specs.openstack.org/openstack/nova-specs/specs/juno/approved/log-request-id-mappings.html
.. [#] http://docs.openstack.org/openstack-ops/content/logging_monitoring.html#tracing_instance_request
.. _logging consistency across all OpenStack components: https://review.openstack.org/#/c/132552/

Logs filenames
--------------

For system logs, these log files must be considered, depending on the distribution:

- /var/log/auth.log
- /var/log/cron.log
- /var/log/daemon.log
- /var/log/kern.log
- /var/log/messages.log
- /var/log/memcache.log


Also, daemons have their own log files which largely depend on the deployment.
In next sections :ref:`Core components<Monitoring-system-components>` and
:ref:`OpenStack services<Monitoring-OSt-services>` specific log filenames are listed.

Logs aggregation
----------------

A minimum good practice is to send all logs remotely on a dedicated server.
Usually achieved by *RSYSLOG*.

Fuel allows to configure all OpenStack services to send their logs to
an external *rsyslog*.  See :ref:`Syslog configuration<syslog-ug>`

Logs indexation
---------------

Ideally, logs should all be indexed including Operating System, Daemons and
OpenStack services for a reasonable time.
It enables a quick search utility for troubleshooting through the whole
deployment.

Log indexation could be acquired after the log aggregation step or can
replace it completely.

Tools
-----

Possible tools to use:

- Zabbix: detect and alert on different patterns found in logs
- RSYSLOG: log aggregator
- Logstash or Heka: forwarder and log parser
- ElasticSearch: log indexation
- Kibana: web based user interface
