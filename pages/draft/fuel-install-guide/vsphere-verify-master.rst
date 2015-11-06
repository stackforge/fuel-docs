.. _vsphere_verify_master:

Verify the Fuel Master node operation
=====================================

To verify the Fuel Master node operation, create a new VM on the same
ESXi host and boot it via PXE. If the boot is successful,
the "Total nodes" at the top right of the Fuel Web UI will increase
its value after two to five minutes.

To verify that the  Fuel bootstrap node runs on ESXi, open
the node information window in the Fuel Web UI and verify that
the "Manufacturer" field says "VMWARE".
