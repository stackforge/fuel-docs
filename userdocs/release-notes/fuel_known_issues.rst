============
Known Issues
============

This section lists known issues in this release:

* Disk partitioning on controllers does not automatically reset back
  to the default state if you change the Glance backend.
  See `LP1450100 <https://bugs.launchpad.net/bugs/1450100>`_.

* No option to connect to a remote repository via HTTP Proxy without
  building a local mirror.
  See `LP1460169 <https://bugs.launchpad.net/bugs/1460169>`_.

* Default disk allocation may not use entire disk space.
  To prevent this, before deploying, check that you do not
  have unallocated disk space by going to :guilabel:`Nodes`, selecting
  a node and clicking :guilabel:`Configure Disks`.
  See `LP1490597 <https://bugs.launchpad.net/bugs/1490597>`_.

* A system with CentOS-7.2 and e1000 network interface may become temporarily
  unresponsive with the system log entries similar to the following ones:
  
  .. code-block:: console

     [ 2045.553869] e1000 0000:00:03.0 enp0s3: Detected Tx Unit Hang
     [ 2045.553869] Tx Queue <0>
     [ 2045.553869] TDH <3>
     [ 2045.553869] TDT <3>
     [ 2045.553869] next_to_use <de>
     [ 2045.553869] next_to_clean <3>
     [ 2045.553869] buffer_info[next_to_clean]
     [ 2045.553869] time_stamp <1001a8c59>
     [ 2045.553869] next_to_watch <16>
     [ 2045.553869] jiffies <1001aa291>
     [ 2045.553869] next_to_watch.status <0>
     [ 2046.720054] ------------[ cut here ]------------
     [ 2046.720084] WARNING: at net/sched/sch_generic.c:297
     dev_watchdog+0x270/0x280()
     [ 2046.720100] NETDEV WATCHDOG: enp0s3 (e1000): transmit queue 0 timed out
     [ 2046.720104] Modules linked in: loop xt_CHECKSUM iptable_mangle nf_log_ipv4
     nf_log_common xt_LOG xt_limit ipt_MASQUERADE nf_nat_masque
     [ 2046.721693] CPU: 0 PID: 0 Comm: swapper/0 Not tainted
     3.10.0-327.3.1.el7.x86_64 #1
     [ 2046.721693] Hardware name: QEMU Standard PC (i440FX + PIIX, 1996),
     BIOS 1.7.5-20151012_155810-obs-1 04/01/2014
     [ 2046.721693] ffff88007fc03d88 76f0075ca754d7b4 ffff88007fc03d40 ffffffff8163516c
     [ 2046.721693] ffff88007fc03d78 ffffffff8107b200 0000000000000000 ffff88007a352000
     [ 2046.721693] ffff88007878ac80 0000000000000001 0000000000000000 ffff88007fc03de0
     [ 2046.721693] Call Trace:
     [ 2046.721693] <IRQ> [<ffffffff8163516c>] dump_stack+0x19/0x1b
     [ 2046.721693] [<ffffffff8107b200>] warn_slowpath_common+0x70/0xb0
     [ 2046.721693] [<ffffffff8107b29c>] warn_slowpath_fmt+0x5c/0x80
     [ 2046.721693] [<ffffffff8154ca50>] dev_watchdog+0x270/0x280
     [ 2046.721693] [<ffffffff8154c7e0>] ? dev_graft_qdisc+0x80/0x80
     [ 2046.721693] [<ffffffff8108b0a6>] call_timer_fn+0x36/0x110
     [ 2046.721693] [<ffffffff8154c7e0>] ? dev_graft_qdisc+0x80/0x80
     [ 2046.721693] [<ffffffff8108dd97>] run_timer_softirq+0x237/0x340
     [ 2046.721693] [<ffffffff81084b0f>] __do_softirq+0xef/0x280
     [ 2046.721693] [<ffffffff816471dc>] call_softirq+0x1c/0x30
     [ 2046.721693] [<ffffffff81016fc5>] do_softirq+0x65/0xa0
     [ 2046.721693] [<ffffffff81084ea5>] irq_exit+0x115/0x120
     [ 2046.721693] [<ffffffff81647e55>] smp_apic_timer_interrupt+0x45/0x60
     [ 2046.721693] [<ffffffff8164651d>] apic_timer_interrupt+0x6d/0x80


  The issue is with both hardware and virtual e1000 network interface.
  The time during which the system is unresponsive is less than a minute.
  The cause of the issue is network interface restart.
  System logs 
  This is a known e1000 driver issue with various distributions: CentOS,
  Ubuntu, RHEL.
  See `LP1526544 <https://bugs.launchpad.net/bugs/1526544>`_.

  **Solutions:**

  * Use "virtio" driver: To work around the issue with the virtual interface,
    use the "virtio" driver. This solution may have limitations
    -- for example, bonding interface does not work with "virtio".
    Please check if this workaround is compatible with your use case.

  * Disable TSO offloading -- run-time only: Disable the setting in run-time
    with the command:

    .. code-block:: console

       ethtool -K <ifname> tso off

  * Disable TSO offloading -- persistent change: To make the change persistent,
    create a script that will set this option on every 'ifup':

    #. Create an empty file:

       .. code-block:: console

          touch /sbin/ifup-local

    #. Make the file executable:

       .. code-block:: console

          chmod +x /sbin/ifup-local

    #. Put the following lines into the file:

       .. code-block:: console

           #!/bin/bash
           if [[ -z "${1}" ]]; then
            exit
           fi
           devpath=$(readlink -m /sys/class/net/${1})
           if [[ "${devpath}" == /sys/devices/virtual/* ]]; then
             exit
           fi
           ethtool -K ${1} tso off

* Deployment with enabled SR-IOV fails on some hardware with
  the "sriov_iommu_check" entry in the log.
  This is a known issue with Linux kernel and some hardware platforms.
  See `LP1556854 <https://bugs.launchpad.net/bugs/1556854>`_.

* For performance reasons, integration of S3 API/Keystone is disabled by
  default. See `LP1446704 <https://bugs.launchpad.net/fuel/+bug/1446704>`_.