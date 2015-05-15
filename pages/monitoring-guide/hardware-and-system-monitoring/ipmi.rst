.. _mg-ipmi:

IPMI
----

**IPMI** is a `standard`_ driven by Intel that has been widely adopted by
the server manufacturers. It provides hardware **Sensors Data Records**
to collect information such as:

* Components temperature
* Fan rotation
* Components voltage
* Power supply status (redundancy check)
* Power status (on or off)

The IPMI **System Event Log** provides a timed journal of all events that occurred
in the server. Each threshold crossing of previous sensors is logged with a severity
level that can be one of (recoverable, non-critical, critical, unrecoverable).
See the `IPMI specifications`_ for further details. Other events can also be
logged such as:

* Memory Error-Correcting-Code memory (ECC) detection that can be reported in an
  alert if they happen too often.

* Chassis intrusion detections that can be reported in an alert for security reasons.

Most Linux distributions provide the ``ipmitool`` package that allows to interact with
the IPMI interface.

Retrieve the SDR records for voltage by running::

  # /usr/bin/ipmitool -I lan -L operator -U root -H <ip> \
  -P <password> sdr type "Voltage" list

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

To get the system events logs, run::

  # /usr/bin/ipmitool -I lan -L operator -U root -H <ip> -P <password> sel list

  17 | 01/27/2015 | 11:31:21 | OS Boot | C: boot completed | Asserted
  18 | 01/27/2015 | 11:41:08 | Memory | Correctable ECC | Asserted | CPU 0 DIMM 8
  19 | 01/27/2015 | 12:07:14 | Physical Security #0x51 \
  | General Chassis intrusion | Asserted
  1a | 01/27/2015 | 17:37:46 | Memory | Correctable ECC | Asserted | CPU 0 DIMM 8
  1b | 01/28/2015 | 06:27:27 | Memory | Correctable ECC | Asserted | CPU 0 DIMM 8
  1c | 01/28/2015 | 12:03:13 | Memory | Correctable ECC | Asserted | CPU 0 DIMM 8
  1d | 01/28/2015 | 17:39:00 | Memory | Correctable ECC | Asserted | CPU 0 DIMM 8
  1e | 01/28/2015 | 23:14:46 | Memory | Correctable ECC | Asserted | CPU 0 DIMM 8
  1f | 01/29/2015 | 04:50:33 | Memory | Correctable ECC | Asserted | CPU 0 DIMM 8
  20 | 01/29/2015 | 10:26:19 | Memory | Correctable ECC | Asserted | CPU 0 DIMM 8
  3e | 02/01/2015 | 17:14:54 | VBAT   | 38h | lcr |  7.18 | 2.54 Volts

Get the power status::

  # /usr/bin/ipmitool -I lan -L operator -U root -H <ip> \
  -P <password> power status
  Chassis Power is on

.. note::
   When coupled with the Ironic project, Ceilometer
   has the ability to collect `IPMI sensors`_.





.. _`standard`: http://www.intel.com/content/www/us/en/servers/ipmi/ipmi-specifications.html
.. _`IPMI specifications`: http://www.intel.com/content/www/us/en/servers/ipmi/ipmi-second-gen-interface-spec-v2-rev1-1.html
.. _`IPMI sensors`: http://docs.openstack.org/developer/ceilometer/measurements.html#ironic-hardware-ipmi-sensor-data
