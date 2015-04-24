
.. _updates-cinder-rn:

OpenStack Block Storage (Cinder)
--------------------------------

Resolved Issues
+++++++++++++++

* The original postinst code performed DB sync which involved DB
  migrations, mostly unwanted at that point. The issue is fixed by
  removing the call to DB sync from postinst code, so it does not
  perform DB sync there anymore. See `LP1422350 <https://bugs.launchpad.net/mos/+bug/1422350>`_.

