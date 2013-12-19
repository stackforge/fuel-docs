.. raw:: pdf

   PageBreak

.. index:: Ceilometer

Ceilometer deployment notes
===========================

.. contents :local:

Overview
--------

Fuel has the ability to deploy OpenStack Telemetry component *Ceilometer*.
The main aim of Ceilometer is to collect and share measurement data
gathered from all OpenStack components. This data could be used for monitoring
and capacity planning purposes as well as for an alarming service.
Ceilometer's REST API could also serve as source of data for external
monitoring software of customer's billing system.

Installation
------------

Ceilometer can be installed in Fuel by checking the appropriate check box when
configuring your environment. Ceilometer is supported by CentOS and Ubuntu.

Notes
-----

Ceilometer collects a number of metering data and performs a high volume of database writes.
Currently in Fuel 4.0i, Ceilometer uses only common MySQL database, thus we do not recommend
to deploy standard Ceilometer for large production installations.

Also please note that Notification bus support for Ceilometer is not a part of 4.0 release,
due to a number of issues with MySQl backend [1]_ [2]_.
Implementation is planned in 4.1.

Horizon Metering Panel disabled in 4.0. This panel requires the *metadata_query*.
Ceilometer feature that is not supported by Ceilometer with MySQL driver [3]_.
A significant portion of the Metering panel is removed in the Havana release because
this part displays inconsistent data. [4]_.

* Official Ceilometer `documentation <http://docs.openstack.org/developer/ceilometer/>`_ can be found here.
* Mirantis `blog <http://www.mirantis.com/blog/openstack-metering-using-ceilometer/>`_ about monitoring and Ceilometer.

.. [1] https://bugs.launchpad.net/ceilometer/havana/+bug/1255107
.. [2] https://bugs.launchpad.net/ceilometer/+bug/1257908
.. [3] https://github.com/openstack/ceilometer/blob/stable/havana/doc/source/install/dbreco.rst
.. [4] https://review.openstack.org/#/c/60317/
