.. _vsphere_verify_master:

Verify the Fuel Master node operation
=====================================

You need to verify that the Fuel Master node operates correctly.

**To verify the Fuel Master node operation:**

#. Create a new VM on the same ESXi host.
#. Boot the Fuel Master node via PXE.

If the boot is successful,
the "Total nodes" at the top right of the Fuel Web UI will increase
its value after two to five minutes.

**To verify that the Fuel bootstrap node runs on ESXi:**

#. Open the node information window in the Fuel Web UI.
#. Verify that the "Manufacturer" field says "VMWARE".
