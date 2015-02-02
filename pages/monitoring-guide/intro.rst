
.. _Monitoring-Introduction:

Introduction to OpenStack monitoring
====================================

Openstack is a huge, distributed and complex system. It relies on several
technologies and its wild configuration and deployment possibilities
largely depend of company context.

This document refers to the OpenStack reference architecture running on Linux
with :ref:`High availibilty deployment<pacemaker-corosync-arch>` with
:ref:`Neutron network with VLAN and GRE segregation <neutron-topologies-arch>`.

This monitoring guide aims to provide general monitoring strategy for
operational management team, by revealing meaningful informations about
services health, problem detection, cloud usage and its capacity,
user experiences and troubleshooting as well.

The Monitoring infrastructure should provide real-time monitoring as well as
historical data and must be dynamic and evolutive.
Furthermore, it must be treat as a production component with its own high
availability deployment to avoid the "blindly syndrome".
What's worse to take business or technical decisions without facts and
prevent/solve outages without context ?

It's all about proactive monitoring with relevant alerts to ensure an
operational cloud, a capacity planning management and a service level agreement.

To acquire this coverage, metrics and events must be collected from several
sources of informations which are strewn across components and must be stored
in consistent backend(s).

We'll take a look through the whole stack to collect metrics/event from:

- Hardware
- Operating System
- Services
- Logs
- OpenStack notifications
