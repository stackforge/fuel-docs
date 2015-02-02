.. _Monitoring-vm:

Virtual machine monitoring
==========================

Instance metrics
----------------
It is possible to retrieve guests stats from libvirt, see libvirt-domain_ for details

.. _libvirt-domain: http://libvirt.org/html/libvirt-libvirt-domain.html

Block IO
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

.. note:: All CPU usage are reported in nanoseconds since the last boot.
          To compute percentage usage we should consider the number of
          vcpu and the time consumed in an interval of time.

compute node
------------
- used/free disk space
- used/free RAM
- used/free vcpu
- running instances

Guest agent
-----------
Guest agent allows to run scripts or applications *inside* the instance while
it runs.
Unfortunately, there is not support of guest agent with KVM hypervisor at this time,
only XEN driver can handle it.

VM network traffic
------------------

The VM traffic can be analyzes through virtual switches by enabling monitoring
sampling with `sFlow technology`_ on each Open vSwitch servers.

The basic principle consists to sample network traffic and sent all
samples to a `sFlow collector`_ for analyze.

Open source softwares supporting sFlow: Ganglia_, Ntop_

.. _sFlow technology: http://www.inmon.com/technology/
.. _sFlow collector: http://www.sflow.org/products/collectors.php
.. _Ganglia: http://ganglia.sourceforge.net
.. _Ntop: http://www.ntop.org/

.. note:: NetFlow, a commercial standard embed in many physical devices works
          similarly.
