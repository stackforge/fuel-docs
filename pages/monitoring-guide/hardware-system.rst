.. _Monitoring-hw-system:


Hardware and System monitoring
==============================

The hardware and system monitoring must be perform on each node composing the
OpenStack cluster.

Hardware
--------

IPMI
````

**IPMI** [#]_   is a well known and widely used by main constructors,
and provide **Sensors Data Record** of hardware :

- temperature of components
- fan rotation
- voltage of components
- power supply status (redondancy check)
- power status (on or off)

The **System Event Log** exposed a timed event journal of all
events occured on the system.

Each threshold crossing of previous *sensors* are logged, with several
severities: recoverable, non-critical, critical,  uncrecoverable.
See `IPMI specifications`_ for details.

Olso, these events are loggued:

- memory ECC [#]_ detection: this become critical if it occurs to often.
- chassis intrusion

Linux distribution provide *ipmitools* package to iteract whit the interface.

Examples of retrie the SDR record for Voltage, journal of events and power status:

   ::

     # /usr/bin/ipmitool -I lan -L operator -U root -H <ip> -P <password> sdr type "Voltage" list
     VTT              | 30h | ok  |  7.10 | 0.99 Volts
     CPU1 Vcore       | 21h | ok  |  3.3 | 0.83 Volts
     CPU2 Vcore       | 22h | ns  |  3.4 | Disabled
     VDIMM AB         | 61h | ok  | 32.1 | 1.49 Volts
     VDIMM CD         | 62h | ok  | 32.2 | 1.49 Volts
     VDIMM EF         | 63h | ns  | 32.3 | Disabled
     VDIMM GH         | 64h | ns  | 32.4 | Disabled
     +1.1 V           | 31h | ok  |  7.11 | 1.09 Volts
     +1.5 V           | 32h | ok  |  7.12 | 1.47 Volts
     3.3V             | 33h | ok  |  7.13 | 3.26 Volts
     +3.3VSB          | 34h | ok  |  7.14 | 3.36 Volts
     5V               | 35h | ok  |  7.15 | 5.06 Volts
     +5VSB            | 36h | ok  |  7.16 | 5.06 Volts
     12V              | 37h | ok  |  7.17 | 12.30 Volt
     VBAT             | 38h | ok  |  7.18 | 3.22 Volts


     # /usr/bin/ipmitool -I lan -L operator -U root -H <ip> -P <password> sel list
     17 | 01/27/2015 | 11:31:21 | OS Boot | C: boot completed | Asserted
     18 | 01/27/2015 | 11:41:08 | Memory | Correctable ECC | Asserted | CPU 0 DIMM 8
     19 | 01/27/2015 | 12:07:14 | Physical Security #0x51 | General Chassis intrusion | Asserted
     1a | 01/27/2015 | 17:37:46 | Memory | Correctable ECC | Asserted | CPU 0 DIMM 8
     1b | 01/28/2015 | 06:27:27 | Memory | Correctable ECC | Asserted | CPU 0 DIMM 8
     1c | 01/28/2015 | 12:03:13 | Memory | Correctable ECC | Asserted | CPU 0 DIMM 8
     1d | 01/28/2015 | 17:39:00 | Memory | Correctable ECC | Asserted | CPU 0 DIMM 8
     1e | 01/28/2015 | 23:14:46 | Memory | Correctable ECC | Asserted | CPU 0 DIMM 8
     1f | 01/29/2015 | 04:50:33 | Memory | Correctable ECC | Asserted | CPU 0 DIMM 8
     20 | 01/29/2015 | 10:26:19 | Memory | Correctable ECC | Asserted | CPU 0 DIMM 8
     3e | 02/01/2015 | 17:14:54 | VBAT   | 38h | lcr |  7.18 | 2.54 Volts

     # /usr/bin/ipmitool -I lan -L operator -U root -H <ip> -P <password> power status
     Chassis Power is on


.. note:: The Ironic project coupled with Ceilometer have the ability to consume
          `IPMI sensors`_.

.. _IPMI specifications: http://www.intel.com/content/www/us/en/servers/ipmi/ipmi-second-gen-interface-spec-v2-rev1-1.html
.. _IPMI sensors: http://docs.openstack.org/developer/ceilometer/measurements.html#ironic-hardware-ipmi-sensor-data
.. [#] `Inteligent Platform Management Interface`_
.. [#] Error-Correcting-Code memory.

Disk
````

Hard drive device health is critical and often a source of issue.
The monitoring system must rely to the S.M.A.R.T_ interface included in
devices, although attributes differ between HDD [#]_ and SSD [#]_.

Many attributes/counters are accessible and depend of constructors and some provide
theirs own. In hardware RAID it should varie too and may not be available.

So, to resume there is not a generic solution based on SMART that
`anticipate hardware failures`_ and the monitoring must be configured case by case.

That said, these indicators for HDD can usually be leveraged:

- Uncorectable sector/event count: indicate hardware issue
- Reallocated sector/event count: indicate hardware issue
- Spin retry count: indicate hardware issue
- Temperature: should usually be lower than 50°C

And for SSD:

- Media Wearout Indicator: indicator of the healthy of cells,
  where 0 is the worst value. When the value is around **20**
  you should consider to change disk.
- Temperature: should usually lower than 50°C

Linux distributions provide package **smartmontools** to interact with it.

To read attributes run the command:

    ::

      # smartctl -a /dev/sda

*smartctl* can try to report health status or pending alert messages by running this command:


    ::

      # smartctl -H /dev/sda
      === START OF READ SMART DATA SECTION ===
      SMART overall-health self-assessment test result: PASSED



.. _Inteligent Platform Management Interface: http://www.intel.com/content/www/us/en/servers/ipmi/ipmi-specifications.html

.. _S.M.A.R.T: http://en.wikipedia.org/wiki/S.M.A.R.T

.. _anticipate hardware failures: http://static.googleusercontent.com/media/research.google.com/en//archive/disk_failures.pdf

.. [#] Hard Disk Drive
.. [#] Solid State Drive

Operating System
----------------

All metrics described can be collected by a well known open-source monitoring system.
This implies to deploy an agent on each node, collect periodically these metrics.

Below, a list of metrics to collect and status checks to perform.
Some advices for threshold determination are described,
Threshold settings are more or less evident and for some of them depend
of the hardware configuration and the role of the node.
(ie. a compute node won't have the same workload than a storage node for
instance).
Status check must naturally raise the informatoin

- Node uptime check
- Node is alive check
    - simple ping
- Disk utilisation
    - to collect
         - bytes per second (read/write)
         - operation per second (read/write)
         - time (read/write)
    - thresholds depend of node function (controller, compute or IO node)
- Filesystem usage
    - to collect
         - free space
         - used space
         - free inodes
         - used inodes
    - several thresholds must be set: <10% <5% <3% free space
    - the rate of space filling: 10%/day would be disturbing
- CPU utilization
    - to collect
         - user
         - system
         - wait
         - idle
    - thresholds depend of the workload: 80% CPU user on a compute node could
      be normal and 10% of CPU wait on storage node too.
- RAM Usage
    - to collect
         - free
         - used
         - cached
         - buffered
    - threshold: >80% used
- System load
    - depend of number of CPU,
      threshold: LOAD_five > (cpu num x 1.5)
- SWAP usage
    - to collect:
      - free
      - used
      - cached
      - io in/out
    - swap usage can be an indicator of memory shortage but must be interpreted
      with caution, an allocation rate during a relative long period indicates a potential 
      issue but NOT a high percentage use, because files may stay in swap for long time
      without any further access to them.
- System interruption and context switch
- Processes
    - Number of processes in state:
         - running
         - paging
         - blocked
         - sleeping
         - zombies
         - stopped
    - Fork rate
    - For specific process (typically OpenStack services)
         - number of threads
         - memory usage
         - cpu usage (user/system)
- Firewall
    - status
    - dropped packets
- Network
    - Link status UP/DOWN
    - Bandwidth
        - depend of the capacity of the ethernet link
        - threshold must be dynamically configured or used percentage unit
    - Error
    - Bonding
        - check that all interfaces are UP and linked
- Soft RAID health
    - check pool state and synchronization


.. note:: There are many Open source tools to collect OS metrics and perform
          status checks: Nagios, Zabbix, Collectd, Diamond, Ganglia, Sensu, ..

Infrastructure Network monitoring
---------------------------------

This depends largely of hardware used and legacy monitoring in the company.
This guide doesn't cover this part.

