.. _Monitoring-configuration-management:

Configuration Management
========================

The configuration management tools (or whatever) used to deploy the OpenStack
cluster must include the monitoring bits as well.

This allow to configure monitoring fitting your deployment and by an automated way,
which is mandatory for a distributed and dynamic infrastructure.
We cannot accept to manually deploy monitoring tooling and configuration for
each change in the infrastructure.

For example:

- deploy special scripts where they must launch by monitoring system
- cluster members relationships between nodes
- ...
