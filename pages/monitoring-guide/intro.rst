
.. _Monitoring-Introduction:

Introduction to OpenStack monitoring
====================================

The scope of the document
-------------------------

Openstack is a huge, distributed and complex system. It relies on several
technologies and its wild configuration and deployment possibilities
largely depend of deployer context.

This document refers to the OpenStack reference architecture running
with :ref:`High availibilty deployment<Multi-node_HA>` with
:ref:`Neutron network with VLAN and GRE segregation <neutron-topologies-arch>`.

No specific tools is prefered to setup the monitoring, it's up to you to use yours.
That said, some are quoted in the doc as examples.

Who This Guide Is For
---------------------

This guide is for those of you running an operational OpenStack cloud
and want to know how it's running well or not.
Provide general monitoring guide to bootstrap
OpenStack monitoring for operational management team.

Monitoring areas
----------------

This guide aims to enlight meaningful informations for problem detection, cloud usage and troubleshooting.

This goal is achieved by monitoring components and services health, provide visibilty of cloud usage to enable a capacity planning management and reflet user experiences by highlighting theirs issue/sucess.

To be able to cover all these areas, metrics and events must be collected from several
sources of informations which are strewn across components and must be stored
in consistent backend(s).

The document take a walk on the whole stack to collect metrics and events:

- Hardware
- Operating System
- OpenStack Services
- Logs
- OpenStack notifications

Finally, the document give some advices on thresholds determination and configuration of
relevant alerts to ensure an operational cloud and allow reacting before users complain.

Monitoring infrastructure
-------------------------

The Monitoring system must provide semi-real-time monitoring and
historical data as well.

The monitoring configuration must be automated, human configuration
is to be avoided as much as possible.
New node and service must be dynamically configured and reporting/alerting
system must automatically take into account.

Monitoring system must be treat as a production component with its own high
availability deployment to avoid the "blindly syndrome".
Idealy, monitoring system must be monitored itself by external simple checks.

The overhead introduced by the monitoring must be negligeable (<1%?).
