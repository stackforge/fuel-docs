
.. _sr-iov-term:

SR-IOV
------------------------------------
SR-IOV stands for "Single Root I/O Virtualization".
It is a specification that allows a PCI device
to appear virtually in multiple virtual machines (VMs),
each of which has its own virtual function.
The specification defines virtual functions (VFs)
for the VMs and a physical function for the :ref:`hypervisor<hypervisor-term>`.
The usage of SR-IOV within the cloud allows you
to reach to higher performance
because the traffic bypasses the TCP/IP stack in the kernel.
