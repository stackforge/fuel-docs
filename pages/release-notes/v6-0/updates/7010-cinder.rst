
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
  from Ceph (100GB, 1TB) blocked eventlet loop, and all cinder-volume
  services hanged until the volumes were removed. The issue is fixed
  by moving all RADOS calls to a separate python thread that does not
  block the eventlet loop. See `LP1444546`_.

* Previously, volumes with a header referencing a backing file could
  leak file data into the destination image when uploading a volume
  to an image. Now, when uploading volumes to image, backing files
  are disallowed. See `LP1465333`_.

* Sometimes connection to Ceph hangs that causes operations problems
  with cluster. The patch fixes possible deadlock in Cinder threads
  during RBD calls. See `LP1459781`_.

.. Links:
.. _`LP1422350`: https://bugs.launchpad.net/mos/+bug/1422350
.. _`LP1444546`: https://bugs.launchpad.net/mos/+bug/1444546
.. _`LP1457055`: https://bugs.launchpad.net/mos/+bug/1457055
.. _`LP1465333`: https://bugs.launchpad.net/mos/+bug/1465333
.. _`LP1459781`: https://bugs.launchpad.net/mos/+bug/1459781
