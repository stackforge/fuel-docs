.. _mg-time-sync:

Time Synchronization
++++++++++++++++++++

Lastly, it is utterly important that all the OpenStack nodes and the
monitoring system be on the exact same time clock. Without a proper
time synchronisation across the system it will be impossible to make
any kind of sensible root cause analysis, metrics time-series will
be useless, it will cause all sorts of high availability and
operations management problems. It is also a good practice to set up
the **UTC** time zone for all the nodes. Usually, the *Network Time
Protocol(NTP)* is used to synchronize the system clocks with remote
NTP time servers. The **ntpd** daemon must run on each node and
should be configured to use several external time servers. The Linux
distributions provide packages with pre-configured NTP servers but
it is necessary to use a pool of geographically closest NTP servers.
The monitoring system should check that the *ntpd* server is alive
and kicking to ensure that the OpenStack cloud is time synchronized
across all the nodes.
