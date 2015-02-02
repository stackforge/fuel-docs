.. _Monitoring-hw-system:


Hardware and System monitoring
==============================

The hardware and system monitoring must be perform on each node composing the
OpenStack cluster.

Hardware
--------

IPMI
____

**IPMI** [#]_   is a well known and widely used by main constructors,
and provide *sensors* of hardware :

- temperature of components
- fan rotation
- voltage of components
- power supply status (redondancy check)
- power status (on or off)

Furthermore, the **System Event Log** exposed a timed event journal of all
events occured on the system.
Each threshold crossing of previous sensors are loggued and we can also
monitor these events:

- memory ECC [#]_ detection: this become critical if it occurs to often.
- chassis intrusion

.. [#] `Inteligent Platform Management Interface`_
.. [#] Error-Correcting-Code memory.

Disk
____

Hard drive device health is critical and often a source of issue.
The monitoring system must rely to the S.M.A.R.T_ interface included in
devices (HDD and SSD).
Linux distribution provide package **smartmontools** to interact with it.

Many attributes/counters are accessible and depend of constructors and some provide
theirs own. In hardware RAID it should varie too and may not be available.
So, to resume there is not a generic solution based on SMART that
`anticipate hardware failures`_ and the monitoring must be configured case by case.
Saying that, we can ususaly leveraging these indicators:

- reallocated sector count
- uncorectable sector count
- reallocated event count
- reallocated sector count
- spin retry count
- temperature


.. _Inteligent Platform Management Interface: http://www.intel.com/content/www/us/en/servers/ipmi/ipmi-specifications.html

.. _S.M.A.R.T: http://en.wikipedia.org/wiki/S.M.A.R.T

.. _anticipate hardware failures: http://static.googleusercontent.com/media/research.google.com/en//archive/disk_failures.pdf


Operating System
----------------

On each nodes these metrics must be checked periodically (~15 seconds) and
alerts must be raised at threshold crossing.
Threshold determination are more and less evident and for some of these depend
of the hardware configuration and the role of the node.
A compute node won't have the same load than a storage node for instance.

All these metrics can be monitored by well known open-source monitoring system
like Zabbix or Nagios.

This implies to deploy an agent on each infrastructure nodes.

- node uptime
- node is alive
    - simple ping
- disk utilisation
    - read and write ops/sec
    - read and write bytes/sec
- filesystems usage
    - threshold : <20% free space
- cpu utilization
    - user/system/wait/idle
    - thresholds depend of the workload: 80% CPU user on a compute node is normal and 10% of CPU wait on storage node too.
- system interruption and context switch
- RAM Usage
    - threashold: >80% used
- system load
    - depend of number of CPU,
      threshold must be dynamically configured : LOAD_five > (cpu num x 1.5)
- swap usage
    - swap usage can be an indicator of memory shortage but must be interpreted
      with caution: should verify the allocation rate and NOT the percentage usage
- I/O
    - thresholds depend of node function (controller, compute or IO node)
    - rate (read / write)
- Processes
    - total number of processes
    - for specific process
         - number of threads
         - memory usage
         - cpu usage (user/system)
- network
    - link status
    - bandwidth
        - depend of the capacity of the ethernet link
        - threshold must be dynamically configured or used percentage unit
    - error
    - bonding
        - check that all interfaces are UP and linked
- soft RAID health
    - check pool state and synchronisation

Infrastructure Network monitoring
=================================

This depends largely of harware used and legacy monitoring in the company. This guide doesn't cover this part.

