.. _mg-monitoring-domains:

Monitoring Domains
------------------

An effective monitoring solution is comprised of distinct activities
aimed at addressing the different problem domains that the operations
staff will have to handle. These activities are summarized below.

Availability Monitoring
  Availability monitoring, in its broadest sense, is a monitoring activity
  that is responsible for ensuring that the resources for compute, storage,
  and networking, as well as the services mediating their access (via the
  service API endpoints), are effectively available for end-users to consume
  while meeting the performance requirements of the SLA. In terms of
  availability monitoring, we use relevant indicators (or metrics); they provide
  information on how many resources are currently available in the cloud
  infrastructure as well as the process checks ensuring that the services
  delivering the access are up and running. Those indicators are obtained
  from running synthetic transactions, parsing the logs, metrics collectors
  deployed throughout the system, and so forth.

Performance Monitoring
  Performance monitoring is supposes measuring how fast a particular
  resource can be served by the cloud infrastructure in response to a user
  request. For example, measuring how much time it takes to create an
  instance or a volume. Key metrics for performance monitoring can be
  obtained not only from synthetic transactions simulating an end-user
  interaction with a service endpoint but also from analysing the logs,
  instrumenting the code, and extracting performance metrics from the
  OpenStack notifications.

  OpenStack performance and availability monitoring are the two main
  monitoring issues developed in this document since they directly
  relate to the SLA.

Resource Usage Monitoring
  Resource usage monitoring is only partially addressed here. We view it as
  a derivative activity by which a cloud operator can retrieve how much
  resources were consumed by a particular user or tenant during a particular
  time period for chargeback. Resource usage monitoring supposes measuring
  consumable resources of the cloud via the APIs. Another key difference
  between resource usage monitoring and availability monitoring is that
  resource usage monitoring does not have to be performed in real-time.
  Readers interested in resource usage monitoring for OpenStack
  should take a look at the :ref:`Ceilometer<ceilometer-term>` project.

Alerting
  Alerting is a process by which the monitoring system notifies the cloud
  operator about an undesirable situation. The situation is typically described
  in an alarm like manner, for example, when the value of a key indicator
  crosses a threshold or unexpectedly changes a value from OK to NOT OK.
  An unexpected change of state, if not the direct manifestation of a problem,
  is often a precursor of it. Besides, alerting should have the following properties:

  - Provide a comprehensive description of the problem.
  - Provide information about which service is affected.
  - Provide a severity level.
  - Provide the ability to be disabled to avoid false positives during
    maintenance.
  - Provide the ability to combine alarms to express more complex situations.
  - Provide the ability to refer to time-series statistics like median,
    standard deviation and percentiles.

  Furthermore, we recommend that the health status of any OpenStack service
  is expressed using three different values:

  - **Healthy** - when both the HA functions of the controller cluster are
    still being ensured and no critical errors are being reported by the
    monitoring system for a service.
  - **Degraded** - when one or more critical errors are reported by the
    monitoring system for a service but the HA functions of the controller
    cluster are still being ensured.
  - **Failed** - when both the HA functions of the controller cluster are
    not being ensured anymore and one or more critical errors are being
    reported by the monitoring system for a service.

  **A critical error should always be reported in an alert.**

  The immediacy of the operations staff’s response to an alert depends on
  the actual status of the HA cluster. It can be any of the following:

  - **Immediate** - when a service is failed. It is a critical situation
    and so, the alert should be sent to the operations staff for human
    intervention.
  - **Deferred** - when a service is degraded. While a degraded service
    may have a negative impact on the quality of service, the nominal
    function of the cloud service should continue to be ensured by the
    system and so, the handling of the alert could be safely prioritized
    through a ticketing system.

  Obviously, not all errors are critical. An effective monitoring solution
  should put a great deal of care at defining the proper level of alerting
  (smart alerting), in order to avoid flooding the operations staff with
  benign notifications that are not reflective of a critical situation.
  This document strives to provide some hints about how to set your alarms
  with threshold values and status checks but your mileage may vary depending
  on your particular OpenStack environment. `Rally <https://wiki.openstack.org/wiki/Rally>`_ is a load generator for OpenStack that you could use to calibrate
  the alarms of your monitoring system.
