.. _nfv-configure:

Configure SR-IOV and DPDK
-------------------------

Before completing the steps described in this section, verify that your
environment meets the requirements in :ref:`prerequisites-limitations`.

To use NFV features, you must configure corresponding settings before you
deploy an OpenStack environment. The values for DPDK, Huge Pages, SR-IOV,
and CPU pinning differ for each workload.

When calculating resource for DPDK, consider that one DPDK core
can process 3 Mpps of network traffic. For example, if you have 2 x 10 GB
network interfaces in bond, you have throughput of 24 Mpps. Therefore, you
need to assign 8 DPDK cores (8 x 3).

All NFV features can be enabled on the same compute node or on separate
compute nodes and do not depend on each other. However, the procedure and
requirements are similar.

For the purpose of example, the following configuration is used:

.. list-table:: **SR-IOV example configuration**
   :widths: 10 10
   :header-rows: 1

   * - Parameter
     - Description
   * - Number of controller nodes
     - 1
   * - Number of compute nodes
     - 2
   * - CPU
     - 40 x 2.30 GHz
   * - Memory
     - 256 GB
   * - Nova CPU pinning
     - 36
   * - Nova Huge Pages
     - 2 MB x 65000 = 130,000 GB
   * - DPDK CPU pinning
     - 4
   * - DPDK Huge Pages
     - 2048 MB

.. include:: /userdocs/snippets/notes/enable-experimental-features.rst

**To configure DPDK and SRIOV:**

#. Log in to the Fuel web UI.
#. Click :guilabel:`New OpenStack Environment`.
#. Follow the prompts of the wizard to create a new OpenStack environment.
#. In the :menuselection:`Compute` screen, select :guilabel:`QEMU-KVM`.
#. In the :menuselection:`Networking Setup` screen, select
   :guilabel:`Neutron with VLAN segmentation` or :guilabel:`Neutron with
   tunneling segmentation` (VXLAN).
#. Complete the configuration wizard as required and click :guilabel:`Create`.
#. Select the environment you have just created.
#. Click :menuselection:`Settings -> Compute`.
#. Select :guilabel:`KVM`.
#. Click :guilabel:`Save Settings`.
#. Click :menuselection:`Nodes -> Add Nodes`.
#. Create controller and compute nodes.

   Select the hardware that supports NFV features for the nodes on which you
   want to enable SR-IOV.

#. Click the node settings icon.
#. Enable Huge Pages and CPU pinning:

   * For SR-IOV:

     #. Click :guilabel:`Node Attributes`.
     #. Type the Nova CPU pinning and Nova Huge Pages parameters.
     #. Click :guilabel:`Save Settings`.

   * For DPDK:

     #. Click :guilabel:`Node Attributes`.
     #. Type the Nova CPU pinning and Nova Huge Pages parameters.
     #. Type the DPDK CPU pinning and DPDK Huge Pages parameters.
     #. Click :guilabel:`Save Settings`.

   * For Huge Pages:

     #. Click :guilabel:`Node Attributes`.
     #. Type the required Huge pages value.

   * For CPU pinning:

     #. Click :guilabel:`Node Attributes`.
     #. Type the required CPU pinning value.

#. Proceed to:

   * For SR-IOV, see: :ref:`nfv-configure-sriov-nic`.
   * For DPDK, see: :ref:`nfv-configure-dpdk-nic`.
