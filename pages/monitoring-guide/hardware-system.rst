.. _Monitoring-hw-system:


Hardware and System monitoring
==============================

The hardware and system monitoring must be performed on each node composing the
OpenStack cluster.

Hardware
--------

IPMI
````

**IPMI** [#]_   is well known and widely used by main hardware vendors,
and provides **Sensors Data Record** of hardware:

- temperature of components
- fan rotation
- voltage of components
- power supply status (redundancy check)
- power status (on or off)

The **System Event Log** exposes a timed event journal of all
events occured on the system.

Each threshold crossing of previous *sensors* are logged, with several
severities: recoverable, non-critical, critical, uncrecoverable.
See `IPMI specifications`_ for details.

Other events may also be logged such as:

- memory ECC [#]_ detection: this becomes critical if it occurs too often.
- chassis intrusion

Linux distributions provide *ipmitools* package to interact with the interface.

Examples of retrieving the SDR record for Voltage:

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

Example of system event log:

   ::

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

Example of power status:

   ::

     # /usr/bin/ipmitool -I lan -L operator -U root -H <ip> -P <password> power status
     Chassis Power is on


.. note:: The Ironic project coupled with Ceilometer have the ability to consume
          `IPMI sensors`_.

.. _IPMI specifications: http://www.intel.com/content/www/us/en/servers/ipmi/ipmi-second-gen-interface-spec-v2-rev1-1.html
.. _IPMI sensors: http://docs.openstack.org/developer/ceilometer/measurements.html#ironic-hardware-ipmi-sensor-data
.. [#] `Intelligent Platform Management Interface`_
.. [#] Error-Correcting-Code memory.

Disk
````

Hard drive device health is critical and often a source of issue.

First signs of potential failure are generally reported by the kernel.
Usually, errors are logged in file */var/log/kern.log* or */var/log/messages*,
but the location differs between linux distributions.
A strategy to detect these errors would be to `scrutinize frequently`_ this log.

.. _scrutinize frequently: http://docs.openstack.org/developer/swift/admin_guide.html#detecting-failed-drives

A complementary way to check disks status is to rely to the S.M.A.R.T_ interface
included in devices, although attributes differ between HDD [#]_ and SSD [#]_.

Many attributes/counters are available but depend of constructors and some provide
their own. In hardware RAID it should vary too and may not be available.

So, to resume there is not a generic solution based on SMART that
`anticipate hardware failures`_ and the monitoring must be configured case by case.

That said, these indicators for HDD can usually be leveraged:

- Uncorrectable sector/event count: indicate a potential future hardware issue
- Reallocated sector/event count: indicate a potential future hardware issue
- Spin retry count: indicate a potential future hardware issue
- Temperature: should usually be lower than 50°C

And for SSD:

- Media Wearout Indicator: indicator of the healthy of cells,
  where 0 is the worst value. When the value is around **20**
  you should consider to change the disk.
- Temperature: should usually be lower than 50°C

Linux distributions provide package **smartmontools** to interact with it.

To read attributes run the command:

    ::

      # smartctl -a /dev/sda

*smartctl* can try to report health status or pending alert messages by running this command:


    ::

      # smartctl -H /dev/sda
      === START OF READ SMART DATA SECTION ===
      SMART overall-health self-assessment test result: PASSED



.. _Intelligent Platform Management Interface: http://www.intel.com/content/www/us/en/servers/ipmi/ipmi-specifications.html

.. _S.M.A.R.T: http://en.wikipedia.org/wiki/S.M.A.R.T

.. _anticipate hardware failures: http://static.googleusercontent.com/media/research.google.com/en//archive/disk_failures.pdf

.. [#] Hard Disk Drive
.. [#] Solid State Drive

Operating System
----------------

All metrics described below can be collected by well known open-source monitoring systems.
This implies to deploy an agent on each node to collect these metrics periodically.

Below, a list of metrics to collect and status checks to perform.
Some advices for threshold determination are described.

.. note:: There are many open source tools to collect OS metrics and perform
          status checks: Nagios, Zabbix, Collectd, Diamond, Ganglia, Sensu, ..

Host
````

+-----------------------------------+--------+--------------+
| Metric                            | Unit   | Threshold    |
+===================================+========+==============+
| Node uptime check                 | second |              |
+-----------------------------------+--------+--------------+
| OS version                        | string |              |
+-----------------------------------+--------+--------------+
| Kernel version                    | string |              |
+-----------------------------------+--------+--------------+
| check host is alive (simple ping) | bool   | host is down |
+-----------------------------------+--------+--------------+

Disk
````
- Disk utilisation:

+--------------------+---------------+
| Metric             | Unit          |
+====================+===============+
| read               | bytes/sec     |
+--------------------+---------------+
| write              | bytes/sec     |
+--------------------+---------------+
| operation read     | operation/sec |
+--------------------+---------------+
| read time          | millisecond   |
+--------------------+---------------+
| write time         | millisecond   |
+--------------------+---------------+

Thresholds depend of node role and hardware velocity.

- Soft RAID health

+-----------------+-----------------+
| Check           | Warning         |
+=================+=================+
| pool state      | missing member  |
+-----------------+-----------------+
| synchronization | synchronization |
|                 | running         |
+-----------------+-----------------+

Filesystem usage
````````````````

+-------------+--------------------------------------------------------------------------------------------+
| Metric      | Threshold                                                                                  |
+=============+============================================================================================+
| free space  | <10% <5% <3% free space the rate of space filling: for example 10%/day would be disturbing |
+-------------+--------------------------------------------------------------------------------------------+
| used space  |                                                                                            |
+-------------+--------------------------------------------------------------------------------------------+
| free inodes |                                                                                            |
+-------------+--------------------------------------------------------------------------------------------+
| used inodes |                                                                                            |
+-------------+--------------------------------------------------------------------------------------------+


CPU
```

+-------------------------+------------+---------------------------------------------------------------+
| Metric                  | Unit       | Threshold                                                     |
+=========================+============+===============================================================+
| % CPU user              | percentage | thresholds depends of the workload: 80% CPU user on a compute |
|                         |            | node could be normal and 10% of CPU wait on storage node too. |
+-------------------------+------------+---------------------------------------------------------------+
| % CPU system            | percentage |                                                               |
+-------------------------+------------+---------------------------------------------------------------+
| % CPU wait              | percentage |                                                               |
+-------------------------+------------+---------------------------------------------------------------+
| % CPU idle              | percentage |                                                               |
+-------------------------+------------+---------------------------------------------------------------+
| system load (5, 10, 15) | float      |                                                               |
+-------------------------+------------+---------------------------------------------------------------+
| context switch          | number/sec | Depends of the type of applications                           |
+-------------------------+------------+---------------------------------------------------------------+

Memory
``````
- RAM Usage:

+----------+-----------+------------+
| Metric   | Unit      | Threshold  |
+==========+===========+============+
| free     | mega      |            |
|          | bytes     |            |
+----------+-----------+------------+
| used     | mega      | >80% used  |
|          | bytes     |            |
+----------+-----------+------------+
| cached   | mega      |            |
|          | bytes     |            |
+----------+-----------+------------+
| buffered | mega      |            |
|          | bytes     |            |
+----------+-----------+------------+


- SWAP usage:

+-----------+------------+-----------+
| Metric    | Unit       | Threshold |
+===========+============+===========+
| free      | mega bytes |           |
+-----------+------------+-----------+
| used      | mega bytes | \*        |
+-----------+------------+-----------+
| cached    | mega bytes |           |
+-----------+------------+-----------+
| io in/out | bytes/sec  |           |
+-----------+------------+-----------+

\* swap usage can be an indicator of memory shortage but must be interpreted
with caution, an allocation rate during a relative long period indicates a potential
issue but NOT a high percentage use, because files may stay in swap for a long time
without any further access to them.

Processes
`````````

+------------------------------+------------+--------------------+
| Metric                       | Unit       | Threshold          |
+==============================+============+====================+
| number of processes running  | process    | Depends of role    |
|                              |            | and workload       |
+------------------------------+------------+--------------------+
| number of processes paging   | process    |                    |
+------------------------------+------------+--------------------+
| number of processes blocked  | process    |                    |
+------------------------------+------------+--------------------+
| number of processes sleeping | process    |                    |
+------------------------------+------------+--------------------+
| number of processes zombies  | process    | > 0                |
+------------------------------+------------+--------------------+
| number of processes stopped  | process    |                    |
+------------------------------+------------+--------------------+
| fork rate                    | fork/sec   |                    |
+------------------------------+------------+--------------------+


It is also useful to monitor specific processes, typically OpenStack services to
follow their resource consumption, and detect anomalies:

+-------------------------+------------+----------------------------------------------------+
| Metric                  | Unit       | Threshold                                          |
+=========================+============+====================================================+
| number of threads       | thread     | Depends of configuration and normal usage observed |
+-------------------------+------------+----------------------------------------------------+
| memory usage            | mega bytes |                                                    |
+-------------------------+------------+----------------------------------------------------+
| cpu usage (user/system) | percentage | Depends of configuration and normal usage observed |
+-------------------------+------------+----------------------------------------------------+


Network
```````

NIC
:::

+---------------------+-------------------+-----------------------------------------------------------------------+
| Metric              | Unit              | Threshold                                                             |
+=====================+===================+=======================================================================+
| bandwidth           | bytes/sec         | Depends on the capacity of the ethernet link, threshold must be       |
|                     |                   | dynamically configured or used percentage unit                        |
+---------------------+-------------------+-----------------------------------------------------------------------+
| error               | error/sec         |                                                                       |
+---------------------+-------------------+-----------------------------------------------------------------------+

Status checks:

+---------------------+------------------+-----------------------------------------------+-------------------------+
| Check               | Warning          | Critical                                      | Command                 |
+=====================+==================+===============================================+=========================+
| link status         |                  | Status is down                                | ip addr show <nic>      |
+---------------------+------------------+-----------------------------------------------+-------------------------+
| bonding status \*   | one interface is | all interfaces are DOWN                       |                         |
|                     | DOWN             |                                               |                         |
+---------------------+------------------+-----------------------------------------------+-------------------------+

\* Bonding can be achived with *Linux bonding* or *Open vSwitch*:

* Linux bonding status information is found in */sys/class/net/<bondX>/operate*.
  As example *Nagios* have a `linux bonding check script
  <http://exchange.nagios.org/directory/Plugins/Operating-Systems/Linux/check_linux_bonding/details>`_
* Open vSwitch bonding status information is displayed by command **ovs-appctl bond/show**

Firewall (iptables)
:::::::::::::::::::

+-----------------------------------+----------------+---------+-------------------------+
| Metric                            | Unit           | Type    | Threshold               |
+===================================+================+=========+=========================+
| dropped packets                   | packet         | Counter | rate too high           |
+-----------------------------------+----------------+---------+-------------------------+
| number of connection TCP          | connection     | Gauge   |                         |
+-----------------------------------+----------------+---------+-------------------------+
| number of connection UDP          | connection     | Gauge   |                         |
+-----------------------------------+----------------+---------+-------------------------+
| number of connection ICMP         | connection     | Gauge   |                         |
+-----------------------------------+----------------+---------+-------------------------+
| number of TCP sessions SYN        | session        | Gauge   |                         |
+-----------------------------------+----------------+---------+-------------------------+
| number of TCP sessions TIME_WAIT  | session        | Gauge   |                         |
+-----------------------------------+----------------+---------+-------------------------+
| number of TCP sessions ESTABISHED | session        | Gauge   |                         |
+-----------------------------------+----------------+---------+-------------------------+
| number of TCP sessions CLOSE      | session        | Gauge   |                         |
+-----------------------------------+----------------+---------+-------------------------+

The tool **iptstate** allow to count number of connection and TCP session.

+---------------------+----------------------------+------------------+
| Check               | Critical                   | Command          |
+=====================+============================+==================+
| status              | Firewall is not enbled     | iptables -L      |
+---------------------+----------------------------+------------------+


Infrastructure Network monitoring
---------------------------------

This guide doesn't cover this part.
