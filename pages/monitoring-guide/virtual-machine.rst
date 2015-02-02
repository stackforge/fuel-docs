.. _Monitoring-vm:

Virtual machine monitoring
==========================

Instance metrics
----------------

It possible to retrieve guests stats from libvirt, see libvirt-domain_ for details

.. _libvirt-domain: http://libvirt.org/html/libvirt-libvirt-domain.html


block IO
````````

- read_reqs
- read_bytes
- write_reqs
- write_bytes

Network IO
``````````

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
```

- cputime
- vcputime
- systemtime
- usertime

.. note:: all CPU usage are reported in nanoseconds since the last boot. To compute percentage usage we should consider the number of vcpu and the time consumed in an interval of time.


compute node
------------

- used/free disk space
- used/free RAM
- used/free vcpu
- running instances


Guest agent
-----------

Guest agent allow to run scripts or applications *inside* the instance while
it runs.
Unfortunately, there are not support of guest agent whith KVM hypervisor at this time,
only XEN driver can handle it.
