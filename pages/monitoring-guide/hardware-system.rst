.. _Monitoring-hw-system:


Hardware and System monitoring
==============================

The hardware and system monitoring must be perform on each node composing the OpenStack cluster.

Hardware
--------

IPMI
____

`Inteligent Platform Management Interface`_ is a well known and widely used by main constructors, and provide *sensors* of hardware :

- temperature of components
- fan rotation
- voltage of components
- power supply status
- power status

Thurthermore, the **System Event Log** exposed a timed event journal of all events occured on the system, including threshold crossing of previous sensors:
- memory ecc detection
- chassis intrusion

Disk
____

Hard drive device health is critical and often a source of issue.
The monitoring system must rely to the S.M.A.R.T_ interface included in devices (HDD and SSD).
Linux distribution provide package **smartmontools** to interact with it.

Many attributes/counters are accessible and depend of constructors and some provide theirs own. In hardware RAID it should varie too and may not be available.
So, to resume there is not a generic solution based on SMART that `anticipate hardware failures`_ and the monitoring must be configured case by case.
Saying that, we can ususaly leaveraging these indicators:

- reallocated sector count
- uncorectable sector count
- reallocated event count
- reallocated sector count
- spin retry count
- temperature

NIC
___


errors

bonding status

.. _Inteligent Platform Management Interface: http://www.intel.com/content/www/us/en/servers/ipmi/ipmi-specifications.html

.. _S.M.A.R.T: http://en.wikipedia.org/wiki/S.M.A.R.T

.. _anticipate hardware failures: http://static.googleusercontent.com/media/research.google.com/en//archive/disk_failures.pdf

Operating System
----------------

node is alive

filesystem usage
inode usage

CPU utilization:

- User/System/IO wait
- TOP processes

load average

RAM Usage

Swap Usage

soft RAID health

network IO

Available vCPUs

