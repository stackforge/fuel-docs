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

But a crossing threshold doesn't necessarily imply to alert operator straight away, the system should avoid alert on *flapping services*, *false positive* alerts.

Also, thresholds must be determined by studing a normal operation usage, meaning to have suffcient history back and be able to compare again a referential aka *baseline*


Anomaly detection
-----------------


Events impacting usage
----------------------

press release
new release deployment

antharcite tools


Metrics 2.0
-----------

metric 2.0: include context informations in each metrics within tags/properties

- openstack release
- openstack region
- openstack role
- node hostname
- program name
- tenant-id
- user-id
- request id across services


Alerting
--------

Alert on threshold crossing is not enought because too noisy and aften doesn't indicate a truly

Anomaly detection

distinguish degraded services versus unavailable services
