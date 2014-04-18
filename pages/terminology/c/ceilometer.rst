
.. _ceilometer-term:

Ceilometer
----------
Ceilometer collects and shares measurement data
gathered from all OpenStack components.
This data can be used for monitoring and capacity planning,
or to create an alarming service,
or can serve data to external software for a customer billing system.
the framework can be expanded to collect measurements for other needs.

Fuel can install Ceilometer on systems running
either the CentOS or Ubuntu operating system;
check the appropriate box when configuring your environment.

Note that Ceilometer collects a great deal of data
and performas a large volume of database writes;
for 400 resources inside the cloud,
Ceilometer could do up to 13000 writes per office.
In Fuel 4.x, Ceilometer uses only the common MySQL database,
thus we do not recommend deploying standard Ceilometer
for large production installations.

Notification bus support for Ceilometer is not part of the Fuel 4.x release
because of issues with the MySQL backend.
.. See
.. `Bug 1255107 <https://bugs.launchpad.net/ceilometer/havana/+bug/1255107>`_ and
.. `Bug 1257908 <https://bugs.launchpad.net/ceilometer/+bug/1257908>`_
for more details.

The Horizon Metering Panel is disabled in Fuel 4.1;
this functionality requires Ceilomter to run with the *metadata_query* feature
which Ceilometer does not support with the MSQL driver.
.. See `Bug 60317 <https://review.openstack.org/#/c/60317/>`_


For more information, see
*  `Ceilometer deployment notes <http://docs.mirantis.com/fuel/fuel-4.1/user-guide.html#ceilometer-deployment-notes>`_
* `Ceilometer wiki <https://wiki.openstack.org/wiki/Ceilometer>`_
* `Ceilometer blob <https://github.com/openstack/ceilometer/blob/stable/havana/doc/source/install/dbreco.rst>`_

