.. index:: Reference Architectures: Networking HA Details

.. _Close_look_networking_HA:

HA deployment for Networking
----------------------------

Fuel leverages
`Pacemaker resource agents <http://www.linux-ha.org/wiki/Resource_agents>`_
in order to deploy highly avaiable networking for Openstack environments.

Virtual IP addresses deployment details
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Starting from Fuel 5.0 release, HAproxy service and network interfaces
running virtual IP addresses are residing in separate `haproxy`
network namespace. This allows the HAproxy to process connections
from Openstack services as remote ones and ensures reliable failover
of established connections when the management IP address migrates to
other node, see `Bug/1285449 <https://bugs.launchpad.net/fuel/+bug/1285449>`_.
In order to achieve this, resource agent scripts for `ocf:heartbeat:haproxy`
and `ocf:heartbeat:IPaddr2` were hardened with network namespaces support.

Successfull failover of public VIP address requires controller nodes
to perform an active checking of the public gateway. Fuel configures
Pacemaker resource `clone_ping_vip__public` that makes public VIP to migrate
in case the controller can't ping its public gateway.

TCP keepalive configuration details
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Failover sometimes ends up with dead connections. The detection
of such ones requires additional assistance from the Linux kernel.
To speed up the detection process from default two hours to more acceptable
3 minutes, Fuel adjusts kernel parameters for `net.ipv4.tcp_keepalive_time`,
`net.ipv4.tcp_keepalive_intvl`, `net.ipv4.tcp_keepalive_probes` and
`net.ipv4.tcp_retries2`.
