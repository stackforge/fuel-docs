
.. _Monitoring-Introduction:

Introduction to OpenStack monitoring
====================================

Openstack is a large, distributed and complexe area. It's involve severals technologies and have a lot of moving parts. And furthermore its configuration and deployments largely depends of compagny context usage.

This monitoring guide aims to provide general monitoring strategy.

Audience:

- operation management
- security management

Sources of informations:

- hardware
- system OS
- logs
- services instrumentation
- AMQP notifications

The Monitoring infrastructure should provide  **real-time monitoring**, must be a **distributed architecture** and must be **dynamic and evolutive**

Monitoring areas coverage:

- proactive monitoring (effective alerting)
- troubleshooting
- service level agreement
- capacity planning/forecasting

Others terms to address:

- availabilty vs performance
- metrics versus alerting
