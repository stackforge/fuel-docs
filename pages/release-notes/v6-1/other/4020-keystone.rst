.. _keystone-rn:

OpenStack Identity (Keystone)
-----------------------------

Resolved Keystone issues
++++++++++++++++++++++++

* The eventlet monkeypatching now precedes the logging system
  initialization. Previously, it occurred after the logging system
  initialization, thus leaving all the locks used in the
  logging handlers non-patched and breaking ``threading.RLock``.
  The initialization order is fixed, so eventlet locks work
  correctly. See `LP1413341`_.

Known Keystone issues
+++++++++++++++++++++

* Keystone is currently limited to ~150 requests per second which
  may produce a heavy load and slow down the performance in
  large environments. See `LP1313662`_.

.. _`LP1413341`: https://bugs.launchpad.net/mos/+bug/1413341
.. _`LP1313662`: https://bugs.launchpad.net/fuel/+bug/1313662
