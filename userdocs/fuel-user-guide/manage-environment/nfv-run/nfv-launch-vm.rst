.. _nfv-launch-vm:

Launch a virtual machine with workload acceleration
---------------------------------------------------

After you created a specific VM flavor as described in
:ref:`nfv-create-flavor` and configured an SR-IOV port as
described in :ref:`nfv-create-sriov-port` (for SR-IOV only),
you can launch a virtual machine that supports DPDK and SR-IOV
NFV features.

**To launch a virtual machine with workload acceleration:**

#. Log in to Horizon.
#. On the :guilabel:`Source` screen, select a virtual machine template in
   QCOW2 format.
#. On the :guilabel:`Flavor` screen, select a flavor that has
   workload-accelerated features enabled.
#. Select from the following options:

   * If you want to use DPDK, on the :guilabel:`Networks` screen, select the
     ``admin_internal_net``.
   * If you want to use SR-IOV, on the :guilabel:`Network Ports` screen,
     select the SR-IOV port that you have created in
     :ref:`nfv-create-sriov-port`.
#. Launch the instance.
#. Proceed to :ref:`nfv-associate-floating-ip`.
