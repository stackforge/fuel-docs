
.. _updates-glance-rn:

OpenStack Image (Glance)
------------------------

Resolved Issues
+++++++++++++++

* Currently, the wsgi server allows persist connections.
  Hence, even after the response is sent to a client,
  it does not close the client's socket connection.
  Because of this problem, the green thread is not
  released back to the pool.

  The fix introduces new configuration options:
  `http_keepalive` and `client_socket_timeout`.
  See `LP1463522`_.

.. Links
.. _`LP1463522`: https://bugs.launchpad.net/mos/+bug/1463522
