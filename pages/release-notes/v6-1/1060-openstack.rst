
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

* During OpenStack deployment, a spurious critical error may appear
  in the ``openvswitch-agent.log`` file. The error is misleading;
  no actual malfunction occurs. See `LP1347612`_.

* There is a minor issue with modules for Puppet which may cause
  the deployment fail with MySQL deadlock errors because of
  concurrent Puppet run at controllers. The workaround is to
  repeat the failed deploy action again. See `LP1330875`_.

* Rarely, cloud deployment may fail if it is chosen to deploy with
  Murano. This is because some process may listen to the same port
  as the RabbitMQ used by Murano. The workaround is to reset the
  environment and redeploy it. See `LP1467024`_.

* Disk partitioning on controllers does not automatically reset back
  to the default state if a Glance backend is changed. See `LP1450100`_.

.. Links
.. _`LP1347612`: https://bugs.launchpad.net/mos/6.1.x/+bug/1347612
.. _`LP1330875`: https://bugs.launchpad.net/fuel/6.1.x/+bug/1330875
.. _`LP1467024`: https://bugs.launchpad.net/fuel/+bug/1467024
.. _`LP1450100`: https://bugs.launchpad.net/fuel/+bug/1450100
