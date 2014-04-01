Changing Network Parameters After Installation
----------------------------------------------

It is possible to run "fuelmenu" from a root shell on Fuel Master node after 
deployment to make minor changes to network interfaces, DNS, and gateway. The 
PXE settings, however, cannot be changed after deployment as it will lead to 
deployment failure.

.. warning::

  Once IP settings are set at the boot time for Fuel Master node, they 
  **should not be changed during the whole lifecycle of Fuel.**
