.. _mg-operating-system-monitoring:

Operating System Monitoring
---------------------------
Getting access to an operating system’s health status and key metrics
is largely supported by all Linux distributions through a plethora
of tools and monitoring applications including Nagios, Zabbix, Collectd,
Diamond, Ganglia, Sensu, and others.

Below is the list of key metrics that we think are critical to collect in
the context of OpenStack monitoring. Whenever possible we try to provide
alerting criteria that should be applied to these metrics, but they largely
depend on the node’s role (workload characterisation) and hardware
characteristics of the servers.


Host Monitoring
+++++++++++++++

============================ ============== ==========================================
Metrics                      Unit           Purpose
============================ ============== ==========================================
node uptime check            second         diag
OS version                   string         diag
kernel version               string         diag
host is alive (simple ping)  bool           alert: When host is down
============================ ============== ==========================================


Disk Usage Monitoring
+++++++++++++++++++++

============================ ============== ==========================================
Metrics                      Unit           Purpose
============================ ============== ==========================================
read                         bytes/sec      diag
write                        bytes/sec      diag
operation read               operation/sec  diag
read time                    millisecond    diag
write time                   millisecond    diag
============================ ============== ==========================================


Soft RAID Monitoring
++++++++++++++++++++

============================ =========================================================
Checks                       Alert criteria
============================ =========================================================
pool state                   missing member
synchronization              synchronization running
============================ =========================================================


Filesystem Usage Monitoring
+++++++++++++++++++++++++++

============================ ==========================================================
Metrics                      Purpose
============================ ==========================================================
free space                   Alert: static thresholds like <10% or <5% free space in
                             the file system can generate false positives.
                             It is instead recommended to set a smarter alarm that is
                             based on the trend observed from historical data so that
                             you are alerted only when it is projected that the file
                             system becomes full within the next 24 hours for example.

used space                   diag
 
free inodes                  Alert: Below 10% free inodes may indicate too many small
                             files or zero sized files on disk. An exhaustion of inodes
                             raises the error “no space left” regardless of whether there
                             is still plenty of free space on the file system or not.

used inodes                  diag
============================ ==========================================================


CPU Usage Monitoring
++++++++++++++++++++

============================ ==========================================================
Metric                       Purpose
============================ ==========================================================
% CPU user                   diag

% CPU system                 diag

% CPU wait                   Alert: Above 10% of CPU wait could be suspicious
                             depending on the node’s role which calls for further
                             investigations. For example, a CPU wait above around
                             10% on the compute nodes is probably not a desirable
                             situation because it means that the local disk(s) are
                             a performance bottleneck for the hypervisor.

% CPU idle                   Alert: Below 20% CPU idle could be a problem depending
                             on the node’s role which calls for further investigations.
                             For example, below 20% CPU idle on controller nodes is
                             probably not a desirable situation because it means that
                             the cloud management system is overloaded. On the other
                             hand, below 20% CPU idle on the compute nodes may be
                             considered as normal and even expected depending on the
                             operator’s overcommitment policies.

system load (5, 10, 15)      diag

context switches             diag: It is important to take a close look at the rate of
                             context switches. A rate that is too high should be
                             interpreted as an anomaly that may result from having too
                             many processes running on a node or from running poorly
                             parallelized applications that are too heavily competing
                             for shared resources.
============================ ==========================================================


RAM Usage Monitoring
++++++++++++++++++++

Setting alarms for RAM usage is not necessarily appropriate, because it could
generate false positives. This is due to the fact that some applications
allocate more memory than they currently need, for example, to support caches.
And so, in order to correctly identify a condition of memory shortage in an
alarm, you would have to take into account how the applications actually use
the memory, which is not really possible in practice.

================== ================== ==================
Metrics            Unit               Purpose
================== ================== ==================
free               megabytes          diag
used               megabytes          diag
cached             megabytes          diag
buffered           megabytes          diag
================== ================== ==================


Swap Usage Monitoring
+++++++++++++++++++++

Same thing for the swap usage. Swap usage may be an indication of a memory
shortage situation when you observe a steady increase of swap space usage
over a relative long period of time. But, probably, not in terms of usage
percentage, because files may stay in swap for a long period of time without
any further access to them.

================== ================== ==================
Metrics             Unit               Purpose
================== ================== ==================
free               megabytes          diag
used               megabytes          diag
cached             megabytes          diag
io in/out          megabytes          diag
================== ================== ==================


Process Statistics Monitoring
+++++++++++++++++++++++++++++

It is generally a good idea to collect process statics to be stored in a
time-series database for trend analysis and anomaly detection using statistical
models.

===================================== ==================
Metrics                               Purpose
===================================== ==================
number of processes running           diag
number of processes paging            diag
number of processes blocked           diag
number of processes sleeping          diag
number of processes zombies           diag
number of processes stopped           diag
fork rate  megabytes                  diag
===================================== ==================

More fine-grained statistics could be collected for key processes like those
supporting the OpenStack services:

===================================== ==================
Metrics                               Purpose
===================================== ==================
number of threads                     diag
memory usage (Mbytes)                 diag
cpu usage (user/system)               diag
===================================== ==================


Network Interface Card (NIC) Monitoring
+++++++++++++++++++++++++++++++++++++++

**Collected metrics**

=============== ===================================================================
Metrics         Purpose
=============== ===================================================================
bandwidth       Alert: When bandwidth is consumed steadily approaching the nominal
                bandwidth of the network link.

errors          Alert: When errors rate is too high.
=============== ===================================================================

**Status checks**

=============== ===================================================================
Checks          Purpose
=============== ===================================================================
link status     diag
bonding status  diag
=============== ===================================================================

.. note::
   Bonding can be achieved with Linux bonding or Open vSwitch.

   Linux bonding status information is found in
   :file:`/sys/class/net/<bondX>/operate`.
   See as an example how Nagios performs `linux bonding checks`_.

   Open vSwitch bonding status information is displayed with the
   :command:`ovs-appctl bond/show`


Firewall (iptables) Monitoring
++++++++++++++++++++++++++++++

=============== =================== ===============================================
Checks          Source              Purpose
=============== =================== ===============================================
status          iptables -L  Alert: When firewall is not enabled
=============== =================== ===============================================

It is generally a good idea to collect firewall metrics for diagnostic.
The :command:`iptstate` command allows the number of connections and TCP
sessions metrics collection.

=================================== ===============================================
Metrics                             Purpose
=================================== ===============================================
dropped packets                     diag
number of connection TCP            diag
number of connection UDP            diag
number of connection ICMP           diag
number of TCP sessions SYN          diag
number of TCP sessions TIME_WAIT    diag
number of TCP sessions ESTABLISHED  diag
number of TCP sessions CLOSE        diag
=================================== ===============================================




.. _`linux bonding checks`: http://exchange.nagios.org/directory/Plugins/Operating-Systems/Linux/check_linux_bonding/details




