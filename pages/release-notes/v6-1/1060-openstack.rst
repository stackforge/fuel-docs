
.. _fuel-general.rst:

OpenStack Deployment Issues
===========================

Resolved deployment issues
--------------------------

* Ruby conflicts in the CentOS repository
  have been fixed. You can now successfully
  run plain yum updates.
  See `LP1403088 <https://bugs.launchpad.net/fuel/+bug/1403088>`_.

* The SQLAlchemy (and, if appropriate, the Neutron database pool)
  are now tuned to scale
  to better accommodate Nova-network, Neutron,
  Cinder, and Glance on larger hardware configurations.
  See `LP1274784 <https://bugs.launchpad.net/fuel/+bug/1274784>`_.

* The *vm.swappiness* parameter has been decreased to
  10 on Controller nodes. The previously default
  value of 60 on some occasions resulted request delays
  to the APIs and slowed down the RabbitMQ and/or MySQL
  performance.
  See `LP1413702 <https://bugs.launchpad.net/fuel/+bug/1413702>`_.

Known deployment issues
-----------------------
