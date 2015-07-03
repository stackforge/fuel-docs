
.. _updates-others-rn:

RabbitMQ
--------

Resolved Issues
+++++++++++++++

* In the case RabbitMQ had been restarted and queues were
  disappeared Oslo.Messaging may got stuck during the
  reconnection process. As the result, some of the OpenStack
  services may become anavailable before failover procedure
  has been finished.
  The fix re-create a queue once it is not found and tries
  to consume it one more time.
  See `LP1463802`_.

Libvirt
-------

Resolved Issues
+++++++++++++++

* While rebooting image files are checked and reloaded from
  Glance. When a normal reboot is performed, it results in
  an unnecessary image (re-)downloading from Glance.
  But during a hard reboot and a subsequent host boot such
  downloading definitely fails because of absent credentials
  in the context at this point needed to access Glance.

  The fix introduces an extra check if credentials are
  presented in the context, and skip any activities on
  images downloading when there are no credentials.
  See `LP1462991`_.

.. Links
.. _`LP1462991`: https://bugs.launchpad.net/mos/+bug/1462991
