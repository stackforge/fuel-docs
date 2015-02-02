
.. _Monitoring-Logs:

Logs monitoring
===============

Logs is the first source of information for error detection, troubleshooting and performing root cause analysis.

The first low hanging fruits would be to detects patterns is logs revealing bad situations:
- ERROR entries
- special *patterns* specific for each services
- security entries from differents daemons (ssh)

Ideally logs should all be indexed including Operating System, Daemons and OpenStack services for a reasonable time. It enable a quick search utility for troubleshooting through the whole deployment

Also some metrics may be extracted from logs to feed our metrics repository and contextualized with context information if available (request ID, Tenant ID, User ID):

- ERROR rates
- HTTP return code for APIs

Currently an effort on logging consistency across all OpenStack components is on its way. It should provide unified logging format and best practices to provide better/easier usage of logs by operators.

https://review.openstack.org/#/c/132552/


Logs aggregation
----------------

A minimum good practice is to send all logs remotly on a dedicate server. Usally acquive by *rsyslog*.

Fuel allows to configure all OpenStack services to send their logs to an external *rsyslog*.  See :ref:`Syslog configuration<syslog-ug>`

Logs indexation
---------------

Log indexation could be acquived after the log aggregation step or can totaly repacing it.
This consist to feed a database with all log of the infrastructure, providing


Services configuration requirements
-----------------------------------

Log formats must be consistent between services


Tools
-----

Zabbix: detect and alert on different patterns found in logs

Heka or logstash: log forwarder
ElasticSearch: log indexation
Kibana: web based user interface
