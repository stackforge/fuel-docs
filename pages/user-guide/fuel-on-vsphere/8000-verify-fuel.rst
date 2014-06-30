
.. _verify-fuel-boot-vsphere:

Verify that Fuel booted on ESXi
-------------------------------

To test the operability of the Fuel Master Node,
you can create another VM on the same ESXi Host
and boot it using PXE;
it is a default boot option for VMWare.
If the boot is successful,
the "Total Nodes" counter in the upper right corner
of the Fuel Web UI will increase its value
after two to five minutes.


.. image:: /_images/vCenter/6a-fuel-vcenter-slave-settings.png
   :width: 50%


.. image:: /_images/vCenter/6b-fuel-vcenter-slave-nodes-occur.png
   :width: 50%

To verify that the  Fuel bootstrap node runs on ESXi,
open the Node Info window in the Fuel Web UI
and verify that the ‘Manufacturer’ field says "VMWARE":


.. image:: /_images/vCenter/6.1-fuel-vcenter-bootstrap-vmware.png
   :width: 50%

