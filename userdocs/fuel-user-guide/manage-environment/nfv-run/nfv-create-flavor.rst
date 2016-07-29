.. _nfv-create-flavor:

Create a workload-accelerated instance flavor
---------------------------------------------

If you have enabled such NFV features as SR-IOV or/and DPDK during the
environment deployment, you can create workload-accelerated instance flavors
and use them to deploy virtual machines with
mission-crtitical applications.

**To create a workload-accelerated instance flavor:**

#. Log in to Horizon.
#. Select :menuselection:`System --> Flavors`.
#. Click :guilabel:`Create Flavor`.
#. In the Create Flavor wizard, specify number of vCPUs, RAM, and Root
   Disk size.
#. Click :guilabel:`Create Flavor`.
#. On the :guilabel:`Flavors` screen, click :guilabel:`No` under
   metadata for the flavor you created in previous step.
#. Add the following metadata parameters and values:

   * ``hw:mem_page_size`` - large
   * ``hw:cpu_policy`` - dedicated

#. If you plan to use DPDK, proceed to :ref:`nfv-launch-vm`.
#. If you plan to use SR-IOV, proceed to :ref:`nfv-create-sriov-port`.
