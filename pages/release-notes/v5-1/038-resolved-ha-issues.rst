
Resolved OpenStack High Availability Issues
===========================================

Mirantis OpenStack 5.1 includes fixes for a number of OpenStack issues
related to the stability and scalability of Highly Available clusters:
These fixes have been contributed to the community
for possible inclusion in future OpenStack distributions.

AMQP heartbeat and other HA improvements
----------------------------------------

A heartbeat mechanism is added to the oslo.messaging library
(used for AMQP based RPC between OpenStack components)
to detect and drop hung RabbitMQ sessions
and force a reconnect to a healthy controller.

The AMQP heartbeat has to be enabled because the interaction between
Linux TCP/IP stack, AMQP protocol, its implementation in pyamqp and
kombo libraries for Python, OpenStack oslo.messaging library, and the
Eventlet networking library for Python can result in hung RabbitMQ
sessions when a controller node goes offline.

When that happened, RPC failed for one or more OpenStack components and
major areas of functionality, such as provisioning instances or
attaching volumes, were blocked. Without the heartbeat,
affected services had to be restarted to recover.
See `LP1341656 <https://bugs.launchpad.net/mos/+bug/1341656>`_
(partially fixed in 5.0.1);
relates to OpenStack `LP856764 <https://bugs.launchpad.net/nova/+bug/856764>`_.

MySQL is available after full restart of environment
----------------------------------------------------

Older versions of Galera
(which manages MySQL in an OpenStack environment)
sometimes failed if the Controllers in an HA environment
come back online in a different order than Galera expected.
Release 5.1 includes a new RA (resource agent)
for Galera and Pacemaker
that supports a cluster bootstrap
that can reboot the whole cluster or any node in the cluster.
It uses Galera GTID (Global Transaction ID)
to determine which node has the latest database version
and uses this node as the Galera PC (Primary Component).
The administrator can manually choose a different node
to serve as the PC.
This fixes this issue.
See `LP1297355 <https://bugs.launchpad.net/fuel/+bug/1297355>`_.

Keystone performance issues if memcache instance fails [rewrite text -- In progress for 5.1]
--------------------------------------------------------------------------------------------

When several OS controller nodes are used
with 'memcached' installed on each of them,
each 'keystone' instance is configured
to use all of the 'memcached' instances.
Thus, if one of the controller nodes became inaccessible,
then whole cluster may cease to be workable
because of delays in the memcached backend.

This behavior is the way the python memcache clients themselves work.
There is currently no acceptable workaround
that would allow the use all available 'memcached' instances
without such issues.
See `LP1332058 <https://bugs.launchpad.net/keystone/+bug/1332058>`_
and `LP1340657 <https://bugs.launchpad.net/bugs/1340657>`_
(related to `LP1332058 <https://bugs.launchpad.net/keystone/+bug/1332058>`_).


RabbitMQ Service now restarts properly after rebooting the primary Controller node
----------------------------------------------------------------------------------

The RabbitMQ clustering mechanism had flaws
that sometimes prevented it from restarting
after the primary Controller node was rebooted,
which resulted in the node status being "offline".
Many of these flaws have been resolved,
but rebooting the primary Controller node
still requires that services be restarted
in a precise order; this is explained in
:ref:`restart-rabbitmq-ops`.
See `LP1318936 <https://bugs.launchpad.net/fuel/+bug/1318936>_`.

Management network now restarts correctly
-----------------------------------------

The interface state is now checked when restarting
the Management logical network.
This solves the problems that sometime occured
when br-mgmt (the bridge for the Management logical network
on the Neutron topology) was shut down from the main Controller node,
making the Controller cluster was unreachable.
See `LP1323277 <https://bugs.launchpad.net/fuel/+bug/1323277>`_.

Improvements to Pacemaker and Corosync
--------------------------------------

Structural changes have been implemented for Pacemaker and Corosync
to improve the stability, performance, and scalability
of highly available clusters.
These are detailed in  `HA Improvements of pacemaker and corosync <https://blueprints.launchpad.net/fuel/+spec/ha-pacemaker-improvements>`_.
This resolves `LP1283062 <https://bugs.launchpad.net/fuel/+bug/1283062>`_,
`LP1312627 <https://bugs.launchpad.net/fuel/+bug/1312627>`_,
and other issues.

