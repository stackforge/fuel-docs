
.. _swift_mos:

OpenStack Block Storage (Swift)
-------------------------------

Resolved issues
+++++++++++++++

* Swift ``.upstart`` scripts do not include instructions for tracking
  unexpected shutdowns of services. The fix adds a ``respawn`` stanza
  and sets the limit to 20 retries within 5 seconds as a reasonable
  value for such kind of services. See `LP1466101`_.

.. Links:
.. _`LP1466101`: https://bugs.launchpad.net/mos/+bug/1466101


