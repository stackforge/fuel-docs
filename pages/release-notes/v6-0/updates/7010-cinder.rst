
.. _updates-cinder-rn:

OpenStack Block Storage (Cinder)
--------------------------------

Resolved Issues
+++++++++++++++

* The original postinst code performed DB sync which involved DB
  migrations, mostly unwanted at that point. The issue is fixed by
  removing the call to DB sync from postinst code, so it does not
  perform DB sync there anymore. See `LP1422350`_.

* Previously, making long-running tasks like removing big volumes
  (100GB, 1TB) blocked eventlet loop and all cinder-volume services
  hanged until the volumes were removed. The issue is fixed by moving
  all rados calls to a separate python thread that does not block
  eventlet loop. See `LP1444546`_.

* Now, in case of restarting RabbitMQ during rpc-call
  ``oslo.messaging`` RPC does not get stuck doing infinite connection
  retries anymore. See `LP1457055`_.

.. Links
.. _`LP1422350`: https://bugs.launchpad.net/mos/+bug/1422350
.. _`LP1444546`: https://bugs.launchpad.net/mos/+bug/1444546
.. _`LP1457055`: https://bugs.launchpad.net/mos/+bug/1457055
