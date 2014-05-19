.. raw:: pdf

   PageBreak

.. index:: Ceilometer

.. _ceilometer-deployment-notes:

Ceilometer deployment notes
===========================

.. contents :local:

Overview
--------

Fuel can deploy the OpenStack Telemetry component *Ceilometer*.
When enabled, Ceilometer collects and shares measurement data
gathered from all OpenStack components. This data cam be used for monitoring
and capacity planning purposes as well as for an alarming service.
Ceilometer's REST API can also provide data to external monitoring software
for a customer's billing system.

Installation
------------

To install Ceilometer with Fuel,
check the appropriate box when configuring your environment.

Notes
-----

Ceilometer can be configured to collect a large amount of metering data
and thus perform a high volume of database writes.
For example, with 100 resources and default configs
Ceilometer could to collect more than 16k samples per hour.
In Fuel 5.0, Ceilometer uses only the common MySQL database,
thus we do not recommend deploying standard Ceilometer
for large production installations.
