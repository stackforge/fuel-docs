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
For example, with a short polling cycle,
one could see up to 13000 writes per hour
for an environment with 400 instances inside the cloud.
In Fuel 4.x, Ceilometer uses only the common MySQL database,
thus we do not recommend deploying standard Ceilometer for large production installations.
