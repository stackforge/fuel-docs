.. index:: Reference Architectures: Networking HA Details

.. _Close_look_networking_HA:

HA deployment for Networking
----------------------------

Fuel leverages
`Pacemaker resource agents <http://www.linux-ha.org/wiki/Resource_agents>`_
in order to deploy highly available networking for OpenStack environments.

Virtual IP addresses deployment details
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Starting from the Fuel 5.0 release, HAProxy service and network interfaces
running virtual IP addresses reside in separate `haproxy`
network namespace. Using a separate namespace forces Linux kernel to treat
connections from OpenStack services to HAProxy as remote ones, this ensures
reliable failover of established connections when the management IP address
migrates to another node
(see `LP1285449 <https://bugs.launchpad.net/fuel/+bug/1285449>`_).
In order to achieve this, resource agent scripts for `ocf:heartbeat:haproxy`
and `ocf:heartbeat:IPaddr2` were hardened with network namespaces support.

Successful failover of public VIP address requires controller nodes
to perform active checking of the public gateway. Fuel configures
the Pacemaker resource `clone_ping_vip__public` that makes public VIP to
migrate in case the controller can't ping its public gateway.

TCP keepalive configuration details
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Failover sometimes ends up with dead connections. The detection
of such connections requires additional assistance from the Linux kernel.
To speed up the detection process from the default of two hours to a more
acceptable 3 minutes, Fuel adjusts kernel parameters for
`net.ipv4.tcp_keepalive_time`, `net.ipv4.tcp_keepalive_intvl`,
`net.ipv4.tcp_keepalive_probes` and `net.ipv4.tcp_retries2`.
