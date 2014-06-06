
.. _haproxy-term:

HAProxy
-------

HAProxy provides load balancing, proxying,
and high availability in a Mirantis OpenStack environment.
Each OpenStack controller runs HAProxy,
which manages a single External Virtual IP (VIP) for all controller nodes
and provides HTTP and TCP load balancing
of requests going to OpenStack API services, RabbitMQ, and MySQL.

See:

- `HA Proxy documentation <http://haproxy.1wt.eu/#docs>`_
