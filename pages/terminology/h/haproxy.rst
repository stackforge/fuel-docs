
.. _haproxy-term:

HAProxy
-------

Every OpenStack controller runs HAProxy,
which manages a single External Virtual IP (VIP) for all controller nodes
and provides HTTP and TCP load balancing
of requests going to OpenStack API services, RabbitMQ, and MySQL.

See:

- `HA Proxy documentation <http://haproxy.1wt.eu/#docs>`_
