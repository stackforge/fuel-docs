
.. _general-rn:

General OpenStack Issues
------------------------

Resolved OpenStack Issues
+++++++++++++++++++++++++

* If one of the Controller nodes in an HA environment is deleted or
  goes offline, requests to Horizon, Keystone, and other OpenStack
  services reliant on Keystone do not get delayed anymore. Previously,
  it took several seconds to connect to the memcached server on the
  offline controller node. See `LP1405549`_ and `LP1367767`_.

* The issue with the growing number of RabbitMQ queues has
  been fixed. See `LP1396688`_.


Known OpenStack Issues
++++++++++++++++++++++

* Nova hypervisor stats  (CLI - :command:`nova hypervisor-stats`,
  Horizon - hypervisors page) report is misleading when
  shared storage backend (Ceph) is used: the actual amount
  of space available/used is multiplied by the number of
  compute nodes. Note, that this does not affect booting of
  instances in any way, but only confuses the operator
  checking the resources usage report. See `LP1359989`_.


* All AUDIT log records from OpenStack services are being
  translated into syslog WARNING severity, then sent to
  syslog as well. See `LP1402683`_.


* Sometimes OSTF platform tests fail with timeouts and errors,
  because of the inability of OpenStack cloud to handle all the
  requests from them. The reason is that swap is used, because of
  low-speed hard disks on controller nodes. See `LP1417521`_.


* Sometimes RabbitMQ cluster may hang while all its nodes
  are up, all the PIDs are in place, and rabbitmqctl reports
  that everything is OK. But actually RabbitMQ creates only
  load to CPU and does not process messages. OpenStack services
  stall, and restarting the whole RabbitMQ cluster leads to
  some messages loss. Note, that for the 6.1 release there are
  improved HA health checks implemented. So, passed OSTF HA
  health check now ensures everything is OK with underlying
  AMQP layer. But still, there are no checks for the app layer,
  which are OpenStack services running the ``Oslo.messaging`` code.
  See `LP1394324`_.

.. Links
.. _`LP1405549`: https://bugs.launchpad.net/fuel/6.0.x/+bug/1405549
.. _`LP1367767`: https://bugs.launchpad.net/mos/+bug/1367767
.. _`LP1396688`: https://bugs.launchpad.net/fuel/6.1.x/+bug/1396688
.. _`LP1359989`: https://bugs.launchpad.net/mos/6.1.x/+bug/1359989
.. _`LP1402683`: https://bugs.launchpad.net/fuel/+bug/1402683
.. _`LP1417521`: https://bugs.launchpad.net/fuel/+bug/1417521
.. _`LP1394324`: https://bugs.launchpad.net/fuel/6.1.x/+bug/1394324
