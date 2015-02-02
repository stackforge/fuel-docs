
.. _Monitoring-Logs:

Logs monitoring
===============

An effective log management is a requirement to avoid being blind
when things go wrong, specially for OpenStack.
Its necessary to have a strategy to manage and browse them efficiently.

This section describes possiblities and good practices to manage logs to
accelerate diagnostic and extract information.

Log management requires to handle all kind of logs:

1. system logs, these log files must be considered, depending on the distribution:

- /var/log/auth.log
- /var/log/cron.log
- /var/log/daemon.log
- /var/log/kern.log
- /var/log/messages.log

2. OpenStack workers have their own log files which largely depend on the deployment too.
   In next sections :ref:`Core components<Monitoring-system-components>` and
   :ref:`OpenStack services<Monitoring-OSt-services>` specific log filenames are listed.

Purposes
--------

The benefits to exploit logs are multiple:

1. First of all, logs are the first source of information for
   troubleshooting [#]_ [#]_ and performing root cause analysis.

2. Logs contain information allowing to reveal bad situations:

- ERROR entries
- special *patterns* error, specific for each application

3. Furthermore some metrics may be derivated from logs to feed the metric
   repository and contextualized if possible with information like *request-id*,
   *tenant-id*, *user-id*:

- ERROR rates
- HTTP return code of API
- HTTP response time of API
- HTTP call rate on API

.. note:: API call response times represent end-to-end time **only** for read operations.

.. note:: Currently, an effort on `logging consistency across all OpenStack components`_
          is on its way. It should provide unified logging format and best practices
          to provide better/easier usage of logs by operators.

.. [#] `log request-id mapping <http://specs.openstack.org/openstack/nova-specs/specs/juno/approved/log-request-id-mappings.html>`_
.. [#] `tracing instance request <http://docs.openstack.org/openstack-ops/content/logging_monitoring.html#tracing_instance_request>`_
.. _logging consistency across all OpenStack components: https://review.openstack.org/#/c/132552/

Logs aggregation
----------------

An usual practice would be to centralize all logs on a remote location.
This provide the main advantage to have a central place
for the whole logs to perform troubleshooting or launch batch processing.

To notice that Fuel allows to configure easyly the centralization of all
OpenStack workers logs to an external *RSYSLOG* server.
See :ref:`Syslog configuration<syslog-ug>`.


Logs parser and indexation
--------------------------

Nowadays, logs should all be indexed to enable a quick search utility for
troubleshooting. This replaces *old school* commands like *grep* and *awk* to search *pattern*.
Furthermor, tools offer a web based interface to perform search and create dashboards
with special queries to enlight your logs.

Log parsing allow to select, transform and forward particular log entries to an external sytem,
for example to detect errors occurences.

Log parsing and log indexation could be acquired after the log aggregation
step or can replace it completely.

Tools:

- Logstash or Heka: forwarder and log parser
- GrayLog: log indexation
- ElasticSearch: log indexation
- Kibana: web based user interface
