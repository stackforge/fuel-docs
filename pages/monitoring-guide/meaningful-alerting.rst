.. _Monitoring-meaningful-alerting:

Meaningful alerting
===================

human action required **immediatly**
human action required **soon**


Alerting is a big topic in operation management, it's depends of excalation path, area impatcted and the team involved.

What is sure is that humans doesn't scale well to handle thousand of alarms.
The primary goal is to avoid noisy alerting system which spam operators and results of no action.

Threshold crossing
------------------

some thresholds are easily settable and can

But a crossing threshold doesn't necessarily imply to alert operator straight away,
the system should avoid alert on *flapping services*, *false positive* alerts.

Also, thresholds must be determined by studying a normal operation usage,
meaning to have suffcient history back and be able to compare again a
referential aka *baseline*


Anomaly detection
-----------------


Change and events logger
------------------------

The purpose would be to log every external changes and events which could
have a direct or indirect impact on the system and its utilization.

This help to perform diagnostic for operational team when things goes wrong or at least unusual.

The feed of this repository involves different teams, not only technical teams.

- press release
- new release deployment
- sytem upgrade
- introduction of new infrastructure components
- network infra change
- partenairs changes

tools:

- `anthracite`_


.. _anthracite: https://github.com/Dieterbe/anthracite


Metrics 2.0
-----------

metric 2.0: include context informations in each metrics within tags/properties

- openstack release
- openstack region
- openstack role
- node hostname
- program name
- unity
- type
- tenant-id
- user-id
- request id across services


Alerting
--------

Alert on threshold crossing is not enough because too noisy and often
doesn't indicate a truly outage (in HA deployment).

Anomaly detection

distinguish degraded services versus unavailable services
