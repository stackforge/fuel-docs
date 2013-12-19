.. raw:: pdf

   PageBreak

.. index:: Ceilometer

Ceilometer deployment notes
===========================

.. contents :local:

Overview
--------

Fuel has ability to deploy OpenStack Telemetry component *Ceilometer*.
The main aim of the Ceilometer is to collect and share measurement data
from all OpenStack components. This data could be used for monitoring
and capacity planning purposes ans well as for alarming service.
Ceilometer's REST API could also serve as source of data for external
monitoring software of customer billing system.

Installation
------------

Ceilometer could be installed in Fuel by checking the appropriate check box when
configuring your environment. Ceilometer is supported by CentOS and Ubuntu.

Notes
-----

Ceilometer collects number of metering data and performs a lot of database writes.
Currently in Fuel 4.0 Ceilometer uses only common MySQL database, thus we do not recommend
to deploy standard Ceilometer for large production installations.
Also please note that Notification bus support for Ceilometer is not a part
of 4.0 release, its implementation is planned in 4.1 release.

* Official ceilometer `documentation <http://docs.openstack.org/developer/ceilometer/>`_ can be found here.
* Mirantis `blog <http://www.mirantis.com/blog/openstack-metering-using-ceilometer/>`_ about monitoring and Ceilometer.
