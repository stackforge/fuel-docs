.. _prerequisites-limitations:

Prerequisites and limitations
-----------------------------

Fuel enables you to deploy environments with multiple features. However,
some of the features have special requirements. Depending on the environment
configuration that you want to create, verify that your hardware, as well as
your software configurations meet the corresponding requirements.

.. list-table:: **Prerequisites and limitations for VMware vSphere**
   :widths: 10 10
   :header-rows: 1

   * - Prerequisites
     - Limitations
   * - * Fuel NSX or Fuel DVS plugin installed before you start creating an
         OpenStack environment.
       * A pre-configured VMware vSphere environment that includes VMware
         ESXi and VMware vCenter cluster.
     - N/A

.. list-table:: **Prerequisites and limitations for workload acceleration**
   :widths: 10 10
   :header-rows: 1

   * - Prerequisites
     - Limitations
   * - * CPU pinning supported for all platforms.
       * For Huge Pages size of 2 MB all platforms are supported.
       * For Huge Pages size of 1 GB, CPU of the selected platform must
         support this feature.
       * SR-IOV requires SR-IOV support by the physical NIC, as well as
         support for Huge Pages in CPU and motherboard.
       * DPDK requires Huge Pages, NIC support, Intel CPU (or QEMU)
         NFV workload.
     - * VMware vSphere as a compute back end is not supported.
       * The only supported network topology is Neutron with VLAN segmentation
