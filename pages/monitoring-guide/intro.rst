.. _Monitoring-Introduction:

Introduction to OpenStack monitoring
====================================

The scope of the document
-------------------------

Openstack is a huge, distributed and complex system. It relies on several
technologies and its wild configuration and deployment possibilities
largely depend on on the operator's experience.

This document refers to the OpenStack :ref:`High availibilty<Multi-node_HA>`
reference architecture with
:ref:`Neutron network with VLAN and GRE segregation <neutron-topologies-arch>`.

No specific tools is recommended to setup the monitoring, it's up to you to use yours.
That said, some open source tools are quoted in the doc as examples.

Who This Guide For
------------------

This guide is for those of you who are running an operational OpenStack cloud
and want to know whether it is running well or not.

Monitoring areas
----------------

This guide aims to enlight meaningful information of monitoring setup for
problem detection, cloud usage reporting and troubleshooting.

This goal is achieved by monitoring components and services health, providing
visibilty of cloud usage to enable a capacity planning management and reflecting
user experience by highlighting their issue/success.

To be able to cover all these areas, service health, metrics and events must
be collected from several sources of information which are strewn across components.
The document takes a walk on the whole stack to collect them:

- Hardware
- Operating System
- OpenStack Services
- Logs
- OpenStack notifications

All through the document, some advice on threshold determination and
configuration of relevant alerts are provided.

.. note:: Threshold settings usually depend on the hardware and on the workload.
          This guide is going to give some advice but remember that they should
          be evaluated against your particular configuration.

Monitoring infrastructure
-------------------------

The Monitoring system must provide nearly real-time monitoring and
historical data as well.

The monitoring configuration must be automated, human configuration
is to be avoided as much as possible.
New node and service must be dynamically configured and reporting/alerting
system must automatically take into account.

The Monitoring system must be treated as a production component with its own high
availability deployment to avoid the "blindly syndrome".
Idealy, monitoring system must be monitored itself by external simple checks.

The overhead introduced by the monitoring must be negligible.
