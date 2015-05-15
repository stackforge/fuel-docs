.. _mg-disks-monitoring:

Disks Monitoring
----------------

The disks are often the primary cause of server failures. You should
monitor the disks of your servers to detect and whenever possible
anticipate the occurrence of those failures. First signs of problems
with your disks are generally reported by the kernel. Usually, disks
errors are logged in :file:`/var/log/kern.log` or :file:`/var/log/messages`,
but the location may differ depending on your Linux distribution.

A recommended approach is to watch your system logs for bad drives using
programs like Logstash or Heka or even dedicated tools like `swift-drive-audit`_
that can be run using cron.

Another approach to check the status of your disks is to rely on the `S.M.A.R.T`_
interface when it is supported although some differences may be found between
Hard Disk Drives (HDD) and Solid State Disks (SSD) devices.

Many attributes/counters are available through the S.M.A.R.T interface but your
mileage may vary depending on the disk manufacturer.

It is hard to `anticipate disk failures`_ in a deterministic way. The handling of
disk failures is generally addressed on a case-by-case basis using S.M.A.R.T
attributes that can be indicative of a dysfunctioning and as such conductive
of future problems.

For HDD:

* Uncorrectable sector/event count
* Reallocated sector/event count
* Spin retry count
* Temperature: should usually be lower than 50°C

And for SDD:

* Media Wearout Indicator: indicator of the cells health, where 0 is the worst
  value. When the value reaches around 20 you should consider changing the disk.

* Temperature: should usually be lower than 50°C

Linux distributions provide the `smartmontools <https://www.smartmontools.org/>`_ package to play with the
S.M.A.R.T interface.

To read the attributes of your sda disk run::

 # smartctl -a /dev/sda

The :command:`smartctl` command displays a health status or pending alerts when
used with the :option:`-H` option.

::

  # smartctl -H /dev/sda
  === START OF READ SMART DATA SECTION ===
  SMART overall-health self-assessment test result: PASSED



.. _`swift-drive-audit`: http://docs.openstack.org/developer/swift/admin_guide.html#detecting-failed-drives
.. _`S.M.A.R.T`: http://en.wikipedia.org/wiki/S.M.A.R.T.
.. _`anticipate disk failures`: http://static.googleusercontent.com/media/research.google.com/en//archive/disk_failures.pdf
.. _`smartmontools`: https://www.smartmontools.org/



