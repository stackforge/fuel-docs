
.. _keystone-rn:

OpenStack Identity (Keystone)
-----------------------------

Resolved Keystone Issues
++++++++++++++++++++++++

* The eventlet monkeypatching now precedes the logging system
  initialization. Previously, it occurred after the logging system
  initialization, thus leaving all the locks used in the
  logging handlers non-patched and breaking ``threading.RLock``.
  The initialization order is fixed, so eventlet locks work correctly.
  See `LP1413341`_.

.. _`LP1413341`: https://bugs.launchpad.net/mos/+bug/1413341
