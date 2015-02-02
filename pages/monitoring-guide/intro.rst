.. _Monitoring-Introduction:

Introduction to OpenStack monitoring
====================================

Document Objectives
-------------------

This guide bring insights about what is critically important to monitor in
OpenStack, what are the benefits of doing it, and what are the drawbacks of not
doing it.
The document should give the reader a complete understating of
what a comprehensive OpenStack monitoring solution should support.

This guide is fore and foremost a monitoring specification for OpenStack
which the Fuel Zabbix plugin is a reference implementation of.
But practitioners are encouraged to use that specification irrespective of the
Zabbix implementation to build their own solution based on different tools and
even homegrown solutions.

Assumptions
-----------

This document assumes an OpenStack deployment that meets the requirements for
:ref:`high availibilty <Multi-node_HA>` and
:ref:`neutron network with VLAN and GRE segmentation <neutron-topologies-arch>`
as defined in the Mirantis OpenStack Planning Guide reference implementation.

Document scope
--------------

This guide focuses on the monitoring of the OpenStack cloud physical infrastructure
as opposed to the monitoring of the virtual machines and applications running
on top of it.
This is not about providing to tenants the ability to monitor their own virtual
resources utilization, and much less to offer an API to them.

This guide aims to enlight meaningful information on mulitple monitoring facets of the
OpenStack infrastructure:

:availability monitoring: both *hardware* and *software* health check

:capacity management: sizing infrastructure before physical resource exhaustion

:performance monitoring: end-user response time, SLA?, detect performance degradation

:resource usage monitoring: how users use the cloud, virtual resources, trend, quotas.

:troubleshooting: logs & metrics

:alerting:  All through the document, some advice on threshold determination,
            metric interpretation and configuration of relevant alerts are provided.
            *preventive* monitoring to detect issue close to happen.
            smart alerting to avoid noisy system.

.. note:: Threshold settings usually depend on the hardware and on the workload.
          This guide give some advice but remember that they should
          be evaluated against your particular configuration.

What the guide does not covers:

:intrusion and malicious usage detection:
                Security is not covered in this guide,
                however the monitoring solution could be a part, in the sense of
                providing infrastructure information to an external system.

:business metrics monitoring: ???

:network equipment monitoring:  Area of network equipment is too specific and
                                wide to address monitoring of these equipments
                                in this document.
                                We let the reader to refers to vendor documentation.

:storage equipment monitoring: Storage equipement monitoring is vendor specifics,
                               we let the reader to refers to specifics documentation.

:automatic recovery actions: Automatic recovery actions is the logical follow up of anomalie
        detection brought up by a smart monitoring solution.
        This particular functionnality require a dedicated document and is not
        treated in this document

:billing and auditing: The billing of resource usage if out of scope, being more
                       related to tenant monitoring.
                       Also, the auditing is out of scope more related to legal purpose and
                       contractual quality of service.

Intended Audience
-----------------

This guide is for those of you who are running an operational OpenStack cloud
and want to know whether it is running well or not.
More specifically, this is intended to **cloud operators** and
**technical teams** who deploy and operate an OpenStack infrastructure.

The monitoring solution aims to be consumed by several ways owned by as
many actors in the organization. The document addresses requirements to enlight
requisite information for these personas:

:Line of business owner: The Line of Business Owner needs to know how "things"
                         are running and if there are any problems that affect
                         the quality of the service.
                         This persona focuses on marketing and business, not IT.
                         He refers to the top level indicators to know
                         services health and their availabilty.

:Operational support:  Provides customer support encountering issue.
                       Generally organized with a service desk and 2 support levels for
                       problem escalation.
                       Support rely on monitoring solution to perfom diagnostics and also
                       should benefits of preventive alerts.

:Subject Matter Expert:  Investigates and resolves a domain-specific problem.
                         Validates the resolution.
                         Use the monitoring system to troubleshoot and observe the
                         behavior of the platform.

:Cloud administrator:  The Cloud Admin is responsible for managing an OpenStack
                       cloud using Horizon and command line tools.
                       In practice, this persona is assigned the OpenStack 'admin' role.
                       By default, the admin role is allowed to perform any action on
                       objects owned by any tenant.

This guide is not intended to **cloud users**.


Infrastructure Monitoring
-------------------------

To be able to cover monitoring facets quoted above, we look over
several components which which compose infrastructure.
The document takes a walk on the whole stack to collecting metrics and events and performing health check:

:Hardware level:  check health to ensure availability and allow react before hardware issue happen.

:Operating system level:  All OpenStack deployment run on Linux and require traditional system monitoring
                          of physical resources and processes in order.
                          We'll take over what to monitor

:OpenStack system components:  OpenStack software rely on system components which are not part of
                               the OpenStack project and the abstraction layer in each OpenStack project
                               allow to use differents underling components to leveraging functionnalities like
                               relational *database*, *message queue*, *loadbalancer* and also *clustering*.

:OpenStack service components: check availability of services and the healt OK, DEGRADED
                               usage

In addition to performing health checks and collecting metrics we focus
on these elements below, which allow to retrieve valuable information to
feed the monitoring and meanfully the visibility:

:Logs: All components produce logs which are valuable for troubleshooting
       but also to extract warning and error message. Furthermore some desirable
       informations are only available here.
       We'll see how to manage logs generated by all components

:OpenStack notifications: OpenStack service components have possibility to send notifications
                          over the message queue to notify an external system.
                          We'll see how and what should be consume per the monitoring solution


Monitoring solution
-------------------

The document does not focus on any particular monitoring tools,
however, some open source tools are suggested throughout this document to
achieve particular monitoring function.

The solution would require the following characteristics:

- The Monitoring system must provide nearly real-time monitoring and
  historical data as well.
- The monitoring configuration must be automated, human configuration
  is to be avoided as much as possible.
  New node and service must be dynamically configured and reporting/alerting
  system must automatically take into account.
- The Monitoring system must be treated as a production component with its own high
  availability.
  Idealy, monitoring system must be monitored itself by external simple checks.
- Finally, the overhead introduced by the monitoring must be negligible.
