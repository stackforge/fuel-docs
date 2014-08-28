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
gathered from all OpenStack components. This data can be used for monitoring
and capacity planning purposes as well as for an alarming service.
Ceilometer's REST API can also provide data to external monitoring software
for a customer's billing system.

Installation
------------

To install Ceilometer with Fuel,
check the appropriate box when configuring your environment.

Performance and database backend
--------------------------------

Ceilometer can be configured to collect a large amount of metering data
and thus perform a high volume of database writes.
For example, with 100 resources and default configs
Ceilometer collects around 16k samples per hour.

Starting with version 5.0, Mirantis OpenStack defaults to installing
:ref:`mongodb-term` as the recommended back-end database for Ceilometer.
The Fuel Master Node enables you to choose
the installation of MongoDB as a role onto a node;
see :ref:`assign-roles-ug` for instructions.
This resolves the Ceilometer performance issues caused
by the volume of concurrent read/write operations.
