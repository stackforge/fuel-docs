
.. _cinder-mos:

OpenStack Block Storage (Cinder)
--------------------------------

Resolved issues
+++++++++++++++

* If a connection to Ceph hangs during a cluster deployment, it causes
  operations problems with the cluster. The patch fixes possible
  deadlock in Cinder threads during RBD calls. See `LP1459781`_.

.. _`LP1459781`: https://bugs.launchpad.net/mos/7.0.x/+bug/1459781