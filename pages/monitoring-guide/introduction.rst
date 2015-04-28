.. _mg-introduction:

Introduction
============

This document does not attempt to tout a particular solution or monitoring
system for OpenStack. Instead, it strives to provide good practices and
document specific guidelines about how to monitor OpenStack effectively
irrespectively of the technology being used. This includes concrete examples
about how to collect and process key metrics to increase your operational
visibility, check various health indicators to detect critical failure
conditions, index and search the logs for root cause analysis and
troubleshooting. Also, it must be highlighted from the start that this
document provides guidelines for monitoring the OpenStack **infrastructure**
and host services. It is not a guide for the monitoring the virtual machines
nor the applications running on top of them.

The expected outcome is two-fold.

* Gain insights into what is critically important to watch in OpenStack so that
  operators can be alerted in near real-time to anticipate and react to
  undesirable situations.
* Provide a comprehensive set of guidelines to implement
  your own monitoring system. In that sense, this document can also be viewed as
  a specification you can use to implement your own solution using technologies
  like Zabbix or the LMA Toolchain that are provided as `Fuel plugins
  <https://software.mirantis.com/fuel-plugins/>`_ for Mirantis
  OpenStack 6.1 onward.

In addition, we think that an effective monitoring solution for OpenStack should
have the following main characteristics.

* Provide near real-time insights and alerting.
* Support discovery and configuration management automation so that the error
  prone manual setup can be completely avoided.
* The monitoring system supports its own self-monitoring and high availability.
