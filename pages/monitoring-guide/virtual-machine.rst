.. _Monitoring-vm:

Virtual machine monitoring
==========================

Instance metrics
----------------

It possible to retrieve guests stats from libvirt, see libvirt-domain_ for details

.. _libvirt-domain: http://libvirt.org/html/libvirt-libvirt-domain.html


block IO
________

- read_reqs
- read_bytes
- write_reqs
- write_bytes

Network IO
__________

- rx_bytes
- rx_packets
- rx_errors
- rx_drops
- tx_bytes
- tx_packets
- tx_errors
- tx_drops

.. note:: represents total number

CPU
___

- cputime
- vcputime
- systemtime
- usertime

.. note:: all CPU usage are reported in nonoseconds since the last boot. To compute percentage usage we should consider the number of vcpu and the time consumed in an interval of time.

Instance creation time
----------------------

The instance creation time can be retrieved from notifications_ *compute.instance.create.end* emitted by *nova-compute* by the simple compute of *launched_at* - *created_at* attributes.

.. note:: the caluclated time doesn't include the boot time of the guest operating system.

.. _notifications: https://wiki.openstack.org/wiki/SystemUsageData#compute.instance.create..7Bstart.2Cerror.2Cend.7D:

compute node
------------

- used/free disk space
- used/free RAM
- used/free vcpu
- running instances
