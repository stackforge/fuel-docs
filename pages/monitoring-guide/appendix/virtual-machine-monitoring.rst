.. _mg-virtual-machine-monitoring:

Virtual Machine Monitoring
--------------------------

It is possible to collect guests statistics from libvirt,
see `libvirt-domain <http://libvirt.org/html/libvirt-libvirt-domain.html>`_
for details.

#. Block IO

   * read_reqs
   * read_bytes
   * write_reqs
   * write_bytes

#. Network IO

   * rx_bytes
   * rx_packets
   * rx_errors
   * rx_drops
   * tx_bytes
   * tx_packets
   * tx_errors
   * tx_drops

#. CPU

   * cputime
   * vcputime
   * systemtime
   * usertime

.. note::
   The VCPU time is global and cumulative and is reported
   in nanoseconds since the last boot. To calculate a VCPU
   usage percentage you need to divide vcputime by the number
   of VCPUS divided by the wallclock time of the sampling interval.

Guest agent
+++++++++++

A guest agent allows running scripts or applications inside
an instance while it runs. Unfortunately, there is no support
of the guest agent with KVM hypervisor at the moment, only XEN
driver supports it.
