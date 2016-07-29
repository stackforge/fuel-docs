.. _nfv-overview:

Configure workload acceleration
-------------------------------

NFV workload acceleration may significantly improve network
performance in certain configurations. Specifically, NFV workflow acceleration
is beneficial in optimizing tenant traffic in private networks.
Fuel allows system administrators to enable NFV features, such as Huge Pages,
Single-Root I/O Virtualization (SR-IOV), Data Plane Developer Kit (DPDK),
Non-Uniform Memory Access (NUMA) and CPU pining automatically during
the deployment of an OpenStack environment.

Huge Pages accelerate the translation of virtual address of a Linux proccess
to
physical address which enables virtual machine memory allocation from a
predefined memory pool. Using Huge Pages helps to prevent hypervisor overhead
that memory paging often causes.

NUMA and CPU pinning bind together virtual and physical hardware by allowing
to assign predefined CPU cores to particular flavors of virtual machines and
optimizing memory access from these cores.

Both DPDK and SR-IOV assist in increasing network performance. DPDK
increases network on a software level by connecting virtual network interfaces
faces to physical network interfaces through Open Virtual Switch (OVS), while
SR-IOV provides almost wire network speed by mapping virtual network
interfaces to a physical hardware directly. DPDK is hardware-agnostic,
while SR-IOV relies on specific hardware implementation.
DPDK provides more agility in terms of traffic filtering and QoS. However, it
results in greater CPU consumption than SR-IOV. DPDK-enabled OVS uses
less CPU than non-DPDK OVS.

This section includes the following topics:

.. toctree::
   :maxdepth: 2

   nfv/nfv-configure.rst
   nfv/nfv-configure-sriov-nic.rst
   nfv/nfv-configure-dpdk-nic.rst
